'use strict';

const CACHE_NAME = 'ass-to-svg-v1.2';
const PRECACHE = [
  '/ass-to-svg',
  '/ass-to-svg/',
  '/ass-to-svg/index.html',
  '/ass-to-svg/sw.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(c => Promise.all(PRECACHE.map(p => c.add(p).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (e.request.mode === 'navigate' || (e.request.headers.get('accept') || '').includes('text/html')) {
    e.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match('/ass-to-svg/index.html').then(cachedIndex => {
          fetch('/ass-to-svg/index.html').then(resp => {
            if (resp && resp.status === 200) cache.put('/ass-to-svg/index.html', resp.clone());
          }).catch(() => {});
          return cachedIndex || fetch(e.request);
        })
      )
    );
    return;
  }
  if (!e.request.url.includes('/ass-to-svg/')) return;
  e.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(e.request).then(cached => {
        const fetchPromise = fetch(e.request).then(resp => {
          if (resp && resp.status === 200) cache.put(e.request, resp.clone());
          return resp;
        }).catch(() => undefined);
        return cached || fetchPromise;
      })
    )
  );
});
