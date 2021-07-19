// install event handler
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('static').then(cache => {
      return cache.addAll([
        '/',
        'css/styles.css',
        'js/entry.js',
        'js/login.js',
        'js/logout.js',
        '/icons/icon-192x192.png',
        '/icons/icon-256x256.png',
        '/icons/icon-384x384.png',
        '/icons/icon-512x512.png',
        '/img/WMtD.png',
        '/img/WMtD_emailBanner.png',
        '/img/favicon-32x32.png',
        '/img/favicon-16x16.png',
        '/img/asu-fb-share.png',
        '/img/workersmakethediff-twitter.png',
        '/manifest.webmanifest',
      ]);
    })
  );
  console.log('Install');
  self.skipWaiting();
});

// retrieve assets from cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});