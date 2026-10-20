const CACHE_NAME = 'lista-produtos-cache-v1';
const ARQUIVOS_ESTATICOS = [
  '/', '/index.html', '/css/style.css',
  '/js/script.js', '/manifest.json',
  '/icons/icon-192.png', '/icons/icon-512.png'
];
 
self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ARQUIVOS_ESTATICOS);
    })
  );
  self.skipWaiting();
});
 
self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys().then((nomesCache) => {
      return Promise.all(
        nomesCache
          .filter((nome) => nome !== CACHE_NAME)
          .map((nome) => caches.delete(nome))
      );
    })
  );
  self.clients.claim();
});