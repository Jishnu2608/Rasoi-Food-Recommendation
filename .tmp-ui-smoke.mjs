import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const edge = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const userDataDir = path.resolve(".tmp-edge-ui-smoke");
const port = 9444;
const appUrl = process.env.RASOI_SMOKE_URL ?? "http://localhost:3001";

fs.mkdirSync(userDataDir, { recursive: true });

const browser = spawn(
  edge,
  [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const get = (url) =>
  new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });

function cdpSocket(url) {
  const socket = new WebSocket(url);
  const pending = new Map();
  let id = 0;

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message);
      pending.delete(message.id);
    }
  };

  const opened = new Promise((resolve) => {
    socket.onopen = resolve;
  });

  return {
    opened,
    close: () => socket.close(),
    send: (method, params = {}) =>
      new Promise((resolve) => {
        const messageId = ++id;
        pending.set(messageId, resolve);
        socket.send(JSON.stringify({ id: messageId, method, params }));
      }),
  };
}

async function main() {
  let webSocketDebuggerUrl;
  for (let i = 0; i < 30; i += 1) {
    try {
      webSocketDebuggerUrl = JSON.parse(
        await get(`http://127.0.0.1:${port}/json/version`),
      ).webSocketDebuggerUrl;
      break;
    } catch {
      await wait(250);
    }
  }

  if (!webSocketDebuggerUrl) throw new Error("CDP unavailable");

  const root = cdpSocket(webSocketDebuggerUrl);
  await root.opened;
  const target = await root.send("Target.createTarget", { url: appUrl });
  const pageInfo = JSON.parse(await get(`http://127.0.0.1:${port}/json`)).find(
    (item) => item.id === target.result.targetId,
  );
  const page = cdpSocket(pageInfo.webSocketDebuggerUrl);
  await page.opened;
  await page.send("Runtime.enable");
  await page.send("Page.enable");

  async function visit(pathname) {
    await page.send("Page.navigate", { url: `${appUrl}${pathname}` });
    await wait(3500);
    const result = await page.send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => ({
        url: location.pathname + location.search,
        h1: document.querySelector("h1")?.textContent?.trim() ?? null,
        premiumPanels: document.querySelectorAll(".premium-panel").length,
        premiumCards: document.querySelectorAll(".premium-card").length,
        kineticChips: document.querySelectorAll(".kinetic-chip").length,
        hasFooter: document.body.textContent.includes("Made with"),
        hasContact: document.body.textContent.includes("Know a dish Rasoi missed?"),
        bodyOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
      }))()`,
    });
    return result.result.result.value;
  }

  const checks = [
    await visit("/"),
    await visit("/recommend?q=aloo,pyaz,tamatar,dahi,chawal"),
    await visit("/recipe/masala-karela"),
  ];

  console.log(JSON.stringify(checks, null, 2));
  page.close();
  root.close();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    browser.kill();
  });
