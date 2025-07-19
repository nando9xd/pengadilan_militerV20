self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('eSidang-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles/dashboard.css',
        '/manifest.json',
        // Add other assets to cache as needed
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['eSidang-cache-v1'];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});