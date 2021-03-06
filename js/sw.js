const cacheName = 'incidentsVisited';
const filesToCache = [
    '/',
    '/css/styles.css',
    '/js/bundle_main.js',
    '/js/bundle_incident.js'
];
self.addEventListener('install', function (e) {
    console.log('service worker installed');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('serviceWorker is caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});


self.addEventListener('fetch', function (event) {
    var CACHE_NAME = 'incidentsVisited';
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            // IMPORTANT: Clone the request. A request is a stream and
            // can only be consumed once. Since we are consuming this
            // once by cache and once by the browser for fetch, we need
            // to clone the response.
            let fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
                function (response) {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // IMPORTANT: Clone the response. A response is a stream
                    // and because we want the browser to consume the response
                    // as well as the cache consuming the response, we need
                    // to clone it so we have two streams.
                    var responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(function (cache) {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }
            );
        }).catch(function (error) {
            console.log(error);
        })
    );
});
