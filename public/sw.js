const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(addResourcesToCache(["/", "/index.html", "/styles.css", "/app.mjs", "/asset/icon.png", "/manifest.json", "gameLogin.mjs"]));
});

const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }
  return fetch(request);
};
self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});
