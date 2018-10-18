importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  workbox.routing.registerRoute(
    'http://localhost:8000/todos',
    workbox.strategies.networkFirst()
  );

  workbox.routing.registerRoute(
    /\.(?:js|css|html)$/,
    workbox.strategies.networkFirst(),
  );
  workbox.routing.registerRoute(
    'http://localhost:8080',
    workbox.strategies.networkFirst()
  );

  workbox.routing.registerRoute(
    // Cache image files
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    // Use the cache if it's available
    workbox.strategies.cacheFirst({
      // Use a custom cache name
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          // Cache only 20 images
          maxEntries: 20,
          // Cache for a maximum of a week
          maxAgeSeconds: 7 * 24 * 60 * 60,
        })
      ],
    })
  );

  const bgSyncPlugin = new workbox.backgroundSync.Plugin('todoQueue', {
    maxRetentionTime: 24 * 60
  });
  
  workbox.routing.registerRoute(
    'http://localhost:8000/todos',
    workbox.strategies.networkOnly({
      plugins: [bgSyncPlugin]
    }),
    'POST'
  )
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}