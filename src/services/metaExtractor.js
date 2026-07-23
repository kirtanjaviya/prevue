/**
 * Service to extract OG metadata (Title, Description, OG Image) from a website URL.
 */

const resolveUrl = (path, base) => {
  if (!path) return null;
  if (path.startsWith("data:")) return path;
  try {
    return new URL(path, base).href;
  } catch {
    return path;
  }
};

/**
 * Parses raw HTML string to extract title, description, and main OG image.
 */
const parseHtmlMetadata = (htmlString, targetUrl) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const getMeta = (names) => {
    for (const name of names) {
      let el = doc.querySelector(`meta[property="${name}"]`);
      if (el && el.getAttribute("content")) return el.getAttribute("content").trim();
      el = doc.querySelector(`meta[name="${name}"]`);
      if (el && el.getAttribute("content")) return el.getAttribute("content").trim();
    }
    return null;
  };

  // Title
  const title =
    getMeta(["og:title", "twitter:title"]) ||
    doc.querySelector("title")?.textContent?.trim() ||
    "";

  // Description
  const description =
    getMeta(["og:description", "twitter:description", "description"]) || "";

  // OG / Twitter Image
  const rawImage = getMeta([
    "og:image",
    "og:image:url",
    "og:image:secure_url",
    "twitter:image",
    "twitter:image:src",
  ]);

  const imageUrl = resolveUrl(rawImage, targetUrl);

  return {
    title,
    description,
    imageUrl,
  };
};

/**
 * Extract Open Graph metadata from target URL.
 */
export const extractWebsiteMetaData = async (targetUrl) => {
  let normalizedUrl = targetUrl.trim();
  if (!/^https?:\/\//i.test(normalizedUrl)) {
    normalizedUrl = `https://${normalizedUrl}`;
  }

  let extractedData = {
    title: "",
    description: "",
    url: normalizedUrl,
    imageUrl: null,
  };

  // Strategy 1: Microlink API
  try {
    const microlinkRes = await fetch(
      `https://api.microlink.io?url=${encodeURIComponent(normalizedUrl)}`,
      { signal: AbortSignal.timeout(6000) }
    );

    if (microlinkRes.ok) {
      const json = await microlinkRes.json();
      if (json.status === "success" && json.data) {
        const d = json.data;
        extractedData.title = d.title || "";
        extractedData.description = d.description || "";
        extractedData.url = d.url || normalizedUrl;
        extractedData.imageUrl = d.image?.url || null;
      }
    }
  } catch (err) {
    console.warn("Microlink extraction warning:", err);
  }

  // Strategy 2: CORS Proxy HTML Scraper fallback if missing fields
  if (!extractedData.title || !extractedData.description || !extractedData.imageUrl) {
    try {
      const corsProxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(normalizedUrl)}`;
      const proxyRes = await fetch(corsProxyUrl, { signal: AbortSignal.timeout(7000) });

      if (proxyRes.ok) {
        const data = await proxyRes.json();
        if (data.contents) {
          const parsed = parseHtmlMetadata(data.contents, normalizedUrl);
          if (!extractedData.title && parsed.title) extractedData.title = parsed.title;
          if (!extractedData.description && parsed.description) extractedData.description = parsed.description;
          if (!extractedData.imageUrl && parsed.imageUrl) extractedData.imageUrl = parsed.imageUrl;
        }
      }
    } catch (err) {
      console.warn("CORS Proxy extraction warning:", err);
    }
  }

  return extractedData;
};
