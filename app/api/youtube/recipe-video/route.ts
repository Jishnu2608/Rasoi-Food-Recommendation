import { NextResponse } from "next/server";
import { z } from "zod";

const querySchema = z.object({
  q: z.string().min(2).max(160),
});

interface YouTubeSearchResponse {
  items?: {
    id?: { videoId?: string };
    snippet?: {
      title?: string;
      channelTitle?: string;
      thumbnails?: {
        medium?: { url?: string };
        high?: { url?: string };
      };
    };
  }[];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({ q: searchParams.get("q") ?? "" });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid video query" }, { status: 400 });
  }

  const query = `${parsed.data.q} recipe`;
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  const key = process.env.YOUTUBE_API_KEY;

  if (!key) {
    return NextResponse.json({ enabled: false, query, searchUrl });
  }

  try {
    const apiUrl = new URL("https://www.googleapis.com/youtube/v3/search");
    apiUrl.searchParams.set("part", "snippet");
    apiUrl.searchParams.set("type", "video");
    apiUrl.searchParams.set("maxResults", "1");
    apiUrl.searchParams.set("order", "viewCount");
    apiUrl.searchParams.set("q", query);
    apiUrl.searchParams.set("key", key);

    const res = await fetch(apiUrl, { next: { revalidate: 60 * 60 * 24 } });
    if (!res.ok) throw new Error("YouTube lookup failed");

    const data = (await res.json()) as YouTubeSearchResponse;
    const item = data.items?.[0];
    const videoId = item?.id?.videoId;

    if (!videoId) {
      return NextResponse.json({ enabled: true, query, searchUrl });
    }

    return NextResponse.json({
      enabled: true,
      videoId,
      title: item?.snippet?.title ?? null,
      channelTitle: item?.snippet?.channelTitle ?? null,
      thumbnail:
        item?.snippet?.thumbnails?.high?.url ??
        item?.snippet?.thumbnails?.medium?.url ??
        null,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
      watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
      searchUrl,
      query,
    });
  } catch {
    return NextResponse.json({ enabled: false, query, searchUrl });
  }
}
