/* Service worker – offline cache for the PE II Trainer (stale-while-revalidate). */
const CACHE = 'pe2trainer-v2';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './manifest.webmanifest',
  './icon.svg',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './js/fmt.js',
  './js/store.js',
  './js/plot.js',
  './js/graphs.js',
  './js/games.js',
  './js/app.js',
  './data/t00_toolbox.js',
  './data/t01_phosphate.js',
  './data/t02_scaling.js',
  './data/t03_fe_mn.js',
  './data/t04_oxidation.js',
  './data/t05_disinfection.js',
  './data/t06_gas_exchange.js',
  './data/t07_aeration.js',
  './data/t08_stripping.js',
  './data/t09_particles.js',
  './data/t10_coag_floc.js',
  './data/t11_sedimentation.js',
  './data/t12_filtration.js',
  './data/t13_ultrafiltration.js',
  './data/t14_reverse_osmosis.js',
  './data/t15_activated_carbon.js',
  './data/t16_system.js',
  './data/t99_traps.js',
  './data/strategy.js',
  './data/exams_2014_2016.js',
  './data/exams_2017_2019.js',
  './data/exams_2020_2023.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== location.origin) return;
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cached) => {
      const network = fetch(event.request)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(event.request, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
