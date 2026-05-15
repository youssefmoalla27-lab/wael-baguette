const CACHE_NAME = "khalidiya-baguettes-v1";
const ASSETS = [
  "./",
  "./index.html?v=20260515-1",
  "./styles.css?v=20260515-1",
  "./app.js?v=20260515-1",
  "./manifest.json?v=20260515-1",
  "./favicon.svg?v=20260515-1",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(caches.match(event.request).then((cachedResponse) => cachedResponse || fetch(event.request)));
});
