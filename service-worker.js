const CACHE_NAME = 'ngeterin-v1';
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/beranda.html",
  "/pages/lacak.html",
  "/pages/kurir.html",
  "/pages/karir.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/css/stylehp.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/image/Cepat.png",
  "/image/Lacak_Barang.png",
  "/image/Protokol_Kesehatan.png",
  "/image/putihapple.png",
  "/image/putihgoogleplay.png",
  "/image/Utama.png",
  "/image/Foto.jpg",
  "/image/Ngeterin192.png",
  "/image/Ngeterin144.png",
  "/image/Ngeterin96.png",
  "/image/Ngeterin72.png",
  "/image/Ngeterin48.png",
  "/manifest.json"
];
 
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }
    
            console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
            );
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});