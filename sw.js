const CACHE_NAME = 'rahbar-cache-v6'; // ভার্সন আপডেট করা হলো যাতে নতুন পরিবর্তনগুলো কাজ করে
const assets = [
  './',
  './index.html',
  './reader.html',
  './icon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js',
  'https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js'
];

// সার্ভিস ওয়ার্কার ইনস্টলেশন এবং ফাইল ক্যাশ করা
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('রাহবার অ্যাপের ফাইলগুলো ক্যাশ করা হচ্ছে...');
      return cache.addAll(assets);
    })
  );
  self.skipWaiting(); // নতুন সংস্করণ সাথে সাথে সক্রিয় করতে
});

// পুরনো ক্যাশ মুছে ফেলা (যাতে মেমোরি পরিষ্কার থাকে)
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// অফলাইনে ফাইল সরবরাহ করা
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
