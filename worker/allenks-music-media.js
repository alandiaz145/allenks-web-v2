// R2 gateway: all MP3s are streamable by Alan's authorization; downloads remain allowlisted.
// Deploy to allenks-music-media.allenbeatsadb.workers.dev with MUSIC_BUCKET binding.
const MEDIA = Object.freeze({
  "audio/alternative-ending": "audio/ALLEN KS - ALTERNATIVE ENDING.mp3",
  "audio/back-strong": "audio/ALLEN KS - BACK STRONG.mp3",
  "audio/break-it-down": "audio/ALLEN KS - BREAK IT DOWN.mp3",
  "audio/bring-it": "audio/ALLEN KS - BRING IT.mp3",
  "audio/bust-it": "audio/ALLEN KS - BUST IT.mp3",
  "audio/check-this-out": "audio/ALLEN KS - CHECK THIS OUT!.mp3",
  "audio/conqueror": "audio/ALLEN KS - CONQUEROR.mp3",
  "audio/corruption": "audio/ALLEN KS - CORRUPTION.mp3",
  "audio/damnation": "audio/ALLEN KS - DAMNATION.mp3",
  "audio/go-down": "audio/ALLEN KS - GO DOWN.mp3",
  "audio/gods-messenger": "audio/ALLEN KS - GODS MESSENGER.mp3",
  "audio/soul-mission": "audio/ALLEN KS - SOUL MISSION.mp3",
  "covers/alternative-ending": "covers/ALLEN KS - ALTERNATIVE ENDING.png",
  "covers/back-strong": "covers/ALLEN KS - BACK STRONG.png",
  "covers/break-it-down": "covers/BREAK IT DOWN.jpg",
  "covers/bring-it": "covers/BRING IT FINAL.jpg",
  "covers/bust-it": "covers/ALLEN KS - BUST IT.jpg",
  "covers/check-this-out": "covers/ALLEN KS - CHECK THIS OUT!.png",
  "covers/conqueror": "covers/ALLEN KS - CONQUEROR.jpg",
  "covers/damnation": "covers/ALLEN KS - DAMNATION.png",
  "covers/go-down": "covers/GO DOWN.png",
  "covers/soul-mission": "covers/ALLEN KS - SOUL MISSION.png"
});

const ORIGINS = new Set(["https://allenks.com.ar", "https://www.allenks.com.ar"]);
const common = {"X-Content-Type-Options": "nosniff", "Cache-Control": "public, max-age=3600"};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");
    const cors = ORIGINS.has(origin) ? {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Range, If-None-Match",
      "Access-Control-Expose-Headers": "Content-Range, Content-Length, Accept-Ranges, ETag",
      "Vary": "Origin"
    } : {};
    if (request.method === "OPTIONS") return new Response(null, {status: 204, headers: {...common, ...cors}});
    if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method not allowed", {status: 405, headers: {...common, ...cors}});
    // Alan explicitly authorized public listing of all MP3 names, including
    // unreleased recordings and remixes. Never expose R2 keys, sizes or URLs.
    if (url.pathname === "/catalog.json" && !url.search) {
      const result = await env.MUSIC_BUCKET.list({prefix: "audio/", limit: 1000});
      const covers = await env.MUSIC_BUCKET.list({prefix: "covers/", limit: 1000});
      const body = JSON.stringify({
        names: result.objects.map(object => object.key.slice("audio/".length)).filter(name => /\.mp3$/i.test(name)),
        covers: covers.objects.map(object => object.key.slice("covers/".length)).filter(name => /\.(png|jpe?g|webp)$/i.test(name)),
        truncated: Boolean(result.truncated)
      });
      return new Response(request.method === "HEAD" ? null : body, {
        headers: {...common, ...cors, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=300"}
      });
    }
    let name;
    try { name = decodeURIComponent(url.pathname.slice(1)); }
    catch { return new Response("Not found", {status: 404, headers: {...common, ...cors}}); }
    const download = name.startsWith("download/");
    const streaming = name.startsWith("stream/");
    const cover = name.startsWith("cover/");
    const filename = name.slice(streaming ? 7 : cover ? 6 : 0);
    const validSingleFile = filename && !/[\\/\u0000-\u001f]/.test(filename);
    const key = streaming && validSingleFile && /\.mp3$/i.test(filename)
      ? `audio/${filename}`
      : cover && validSingleFile && /\.(png|jpe?g|webp)$/i.test(filename)
      ? `covers/${filename}`
      : MEDIA[download ? `audio/${name.slice(9)}` : name];
    if (!key || url.search) return new Response("Not found", {status: 404, headers: {...common, ...cors}});

    const object = await env.MUSIC_BUCKET.get(key, {range: request.headers});
    if (!object) return new Response("Not found", {status: 404, headers: {...common, ...cors}});
    const headers = new Headers({...common, ...cors});
    object.writeHttpMetadata(headers);
    if (streaming) headers.set("Content-Type", "audio/mpeg");
    if (download) {
      const filename = key.split("/").pop().replace(/[\r\n"\\]/g, "");
      headers.set("Content-Disposition", `attachment; filename="${filename}"`);
    }
    headers.set("ETag", object.httpEtag);
    headers.set("Accept-Ranges", "bytes");
    const partial = Boolean(request.headers.get("Range") && object.range);
    if (partial) {
      const start = object.range.offset ?? 0;
      const end = start + (object.range.length ?? object.size) - 1;
      headers.set("Content-Range", `bytes ${start}-${end}/${object.size}`);
      headers.set("Content-Length", String(end - start + 1));
    } else headers.set("Content-Length", String(object.size));
    return new Response(request.method === "HEAD" ? null : object.body, {
      status: partial ? 206 : 200, headers
    });
  }
};
