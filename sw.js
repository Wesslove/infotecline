// Service Worker pour Infotecline PWA
const CACHE_NAME = 'infotecline-v1';
const ASSETS_TO_CACHE = [
  '/',
  'index.html',
  'about.html',
  'maintenance.html',
  '404.html',
  'assets/styles/styles.css',
  'assets/styles/about.css',
  'assets/styles/Automatisation.css',
  'assets/styles/cybersecurite.css',
  'assets/styles/migration-microsoft-365.css',
  'assets/styles/power-platform.css',
  'assets/js/ift.js',
  'assets/images/logo.svg',
  'assets/images/roboot.png',
  'manifest.json'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker en cours d\'installation...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache ouvert');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch((error) => {
        console.error('Erreur lors du cache:', error);
      })
  );
  self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker en cours d\'activation...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression d\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Stratégie de cache: Cache First, fallback Network
self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes non-GET
  if (event.request.method !== 'GET') {
    return;
  }

  // Stratégie pour les assets statiques
  if (event.request.url.includes('/assets/')) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => response || fetch(event.request))
        .catch(() => new Response('Asset non disponible', { status: 404 }))
    );
    return;
  }

  // Stratégie Network First pour les pages HTML (pour contenu frais)
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache le résultat si c'est une réponse valide
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(() => {
        // Fallback au cache ou à une page offline
        return caches.match(event.request)
          .then((response) => response || caches.match('404.html'));
      })
  );
});
