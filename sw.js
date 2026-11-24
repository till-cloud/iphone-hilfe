/* Service Worker: App funktioniert auch ohne Internet.
   Strategie: sofort aus dem Speicher antworten, im Hintergrund neu laden.
   Neue Anleitungen erscheinen damit spätestens beim zweiten Öffnen.
   Bei größeren Änderungen VERSION hochzählen. */
const VERSION = "v2";
const CACHE = "iphone-hilfe-" + VERSION;

const DATEIEN = [
  "./",
  "index.html",
  "style.css",
  "app.js",
  "zeichnungen.js",
  "anleitungen.js",
  "manifest.webmanifest",
  "app-icon/icon-180.png",
  "app-icon/icon-192.png",
  "app-icon/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(DATEIEN)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((namen) => Promise.all(namen.filter((n) => n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const gespeichert = await cache.match(req, { ignoreSearch: true });
      const netz = fetch(req)
        .then((antwort) => {
          if (antwort.ok) cache.put(req, antwort.clone());
          return antwort;
        })
        .catch(() => null);
      if (gespeichert) {
        e.waitUntil(netz);
        return gespeichert;
      }
      const antwort = await netz;
      return antwort || (req.mode === "navigate" ? cache.match("index.html") : Response.error());
    })
  );
});
