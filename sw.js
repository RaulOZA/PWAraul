// Asignar nombre a la cache
// CONSTANTE
const CACHE_NAME = "vi_cache_PWA";

var urlsToCache = [
    // CSS
    "./css/style.css",
    "./css/style.css.map",
    "./css/style.sass",
    "./css/_footer.sass",
    "./css/_generales.sass",
    "./css/_header.sass",
    "./css/_main.sass",
    "./css/_mediaqueries.sass",
    "./css/_mixins.sass",
    "./css/_variables.sass",
    "./css/lightbox.min.css",
    
    // Imágenes: Certificados
    "./img/certificados/close.png",
    "./img/certificados/css.jpg",
    "./img/certificados/desarrollo1.jpg",
    "./img/certificados/desarrollo2.jpg",
    "./img/certificados/html.jpg",
    "./img/certificados/javascript.jpg",
    "./img/certificados/loading.gif",
    "./img/certificados/next.png",
    "./img/certificados/prev.png",
    "./img/certificados/programacion.png",
    
    // Imágenes: Habilidades
    "./img/habilidades/bootstrap.jpg",
    "./img/habilidades/css.jpg",
    "./img/habilidades/html.jpg",
    "./img/habilidades/javascript.jpg",
    "./img/habilidades/js.jpg",
    "./img/habilidades/sass.jpg",
    "./img/habilidades/wordpress.png",

    // Imágenes: Logo
    "./img/logo/16.jpg",
    "./img/logo/32.jpg",
    "./img/logo/64.jpg",
    "./img/logo/96.jpg",
    "./img/logo/128.jpg",
    "./img/logo/192.jpg",
    "./img/logo/256.jpg",
    "./img/logo/384.jpg",
    "./img/logo/512.jpg",
    "./img/logo/1024.jpg",

    // Imágenes: Proyectos
    "./img/proyectos/airbnb.jpg",
    "./img/proyectos/blog.jpg",
    "./img/proyectos/cafe.jpg",
    "./img/proyectos/galería.jpg",
    "./img/proyectos/bg.jpg",
    "./img/proyectos/english.png",
    "./img/proyectos/español.png",
    "./img/proyectos/foto.jpg",
    "./img/proyectos/prism1.png",

    // JS
    "./js/baffle.min.js",
    "./js/jquery.min.js",
    "./js/lightbox-plus-jquery.min.js",
    "./js/main.js",
    "./js/t.min.js",
    
    // HTML
    "./index.html",
    
    // Manifest
    "./manifest.json"
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                self.skipWaiting();
            })
            .catch(err => {
                console.log('No se ha cargado la caché', err);
            })
    );
});

// Evento Activate: activa el Service Worker y permite trabajar offline
self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhiteList.indexOf(cacheName)=== -1) {
                        // Elimina cachés antiguos que no están en la lista blanca
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Activa el Service Worker inmediatamente sin esperar a que los clientes recarguen
            self.clients.claim();
        })
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    // devuelvo datos desde cache
                    return res;
                }
                return fetch(e.request);
            })
    );
});
