// رفع رقم النسخة يخلي المتصفح يمسح الكاش القديم ويحمل الجديد تلقائيًا
const CACHE_NAME = 'tasbeeh-v2';
const RUNTIME_CACHE = 'tasbeeh-runtime-v2';

// أهم الملفات اللي لازم تتخزن أول ما التطبيق يتفتح (App Shell)
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icon-192.png',
  '/icon-512.png',
  '/tasbeeh.svg'
];

// Install event: نخزن الـ App Shell فورًا
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(APP_SHELL).catch(() => {
        console.log('بعض الملفات فشلت في التخزين وقت التثبيت');
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate event: نمسح أي كاش قديم من نسخة سابقة
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// استراتيجية: Cache First مع تحديث في الخلفية (Stale-While-Revalidate)
// كده لو مفيش نت، التطبيق بيفتح فورًا من النسخة المخزنة على الجهاز،
// ولو فيه نت، بيحدث نسخة الكاش في الخلفية من غير ما يأخر فتح التطبيق.
self.addEventListener('fetch', event => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  // طلبات التنقل بين الصفحات (فتح التطبيق نفسه)
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match('/index.html').then(cachedShell => {
        const networkFetch = fetch(request)
          .then(response => {
            if (response && response.status === 200) {
              const copy = response.clone();
              caches.open(CACHE_NAME).then(cache => cache.put('/index.html', copy)).catch(() => {});
            }
            return response;
          })
          .catch(() => cachedShell);

        // لو عندنا نسخة مخزنة، هاتها فورًا (سرعة + شغل أوفلاين)، وحدّث في الخلفية
        return cachedShell || networkFetch;
      })
    );
    return;
  }

  // باقي الطلبات (JS, CSS, صور, خطوط... حتى لو من مصدر خارجي زي Google Fonts)
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      // نجيب من النت في الخلفية عشان نحدث الكاش (سواء رجّعنا الكاش أو لأ)
      const networkFetch = fetch(request)
        .then(networkResponse => {
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            const responseToCache = networkResponse.clone();
            caches.open(RUNTIME_CACHE).then(cache => {
              cache.put(request, responseToCache).catch(() => {});
            });
          }
          return networkResponse;
        })
        .catch(() => null);

      if (cachedResponse) {
        // فيه نسخة مخزنة: رجّعها فورًا، والتحديث بيحصل في الخلفية من غير ما اليوزر يستنى
        return cachedResponse;
      }

      // مفيش نسخة مخزنة: استنى الشبكة، ولو فشلت رجّع رسالة أوفلاين واضحة
      return networkFetch.then(response => {
        if (response) return response;
        return new Response('Offline - content not available', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({ 'Content-Type': 'text/plain' })
        });
      });
    })
  );
});
