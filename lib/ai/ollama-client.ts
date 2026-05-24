const DEFAULT_MODEL = process.env.OLLAMA_MODEL ?? "qwen2.5:7b";

export function isAiEnabled(): boolean {
  return process.env.AI_ENABLED === "true";
}

export async function generateWithOllama(prompt: string): Promise<string> {
  const baseUrl = process.env.OLLAMA_BASE_URL ?? "http://127.0.0.1:11434";

  const res = await fetch(`${baseUrl}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      prompt,
      stream: false,
      options: { temperature: 0.3, num_predict: 256 },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Ollama error ${res.status}: ${text}`);
  }

  const json = (await res.json()) as { response?: string };
  return (json.response ?? "").trim();
}
