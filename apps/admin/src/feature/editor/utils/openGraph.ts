import type { OpenGraphMetadata } from "@boo/editor";

const endpoint = import.meta.env.VITE_OPEN_GRAPH_ENDPOINT as string | undefined;

function normalizeUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(
      trimmed.match(/^https?:\/\//) ? trimmed : `https://${trimmed}`,
    );
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

function getFallbackMetadata(url: string): OpenGraphMetadata {
  const hostname = new URL(url).hostname.replace(/^www\./, "");

  return {
    url,
    title: hostname,
    siteName: hostname,
  };
}

export async function getOpenGraphMetadata(
  value: string,
): Promise<OpenGraphMetadata | null> {
  const url = normalizeUrl(value);
  if (!url) return null;
  if (!endpoint) return getFallbackMetadata(url);

  const response = await fetch(`${endpoint}?url=${encodeURIComponent(url)}`);

  if (!response.ok) return getFallbackMetadata(url);

  const metadata = (await response.json()).data as Partial<OpenGraphMetadata>;

  return {
    ...getFallbackMetadata(url),
    ...metadata,
    url,
  };
}
