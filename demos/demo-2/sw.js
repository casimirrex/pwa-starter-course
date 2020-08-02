var urlList = [
    '/',
    '/index.html',
    '/css/main.css',
    '/css/normalize.css',
    '/img/tip-200.png',
    '/img/tip-1200.png',
    '/js/index.js',
];

self.addEventListener('install', event => {
    console.log(`Event fired: ${event.type}`);
    console.dir(event);
    // The service worker is installing, so it's our chance
    // to setup the app. In this case, we're telling
    // the browser to wait until we've populated the cache
    // before considering this service worker installed
    event.waitUntil(
        // create a local cache for our app resources
        caches.open('pwa-learn-cache')
            // Once it's open...
            .then(cache => {
                console.log('SW: Cache opened');
                // Cache all the resources from the array
                return cache.addAll(urlList);
            })
            .catch(error => {
                console.error(error);
            })
    );
});

self.addEventListener('activate', event => {
    console.log(`Event fired: ${event.type}`);
    console.dir(event);
});

self.addEventListener('fetch', event => {
    console.log(`SW: ${event.type} ${event.request.url}`);
    // Fires whenever the app requests a resource (file or data)
    event.respondWith(
        // check to see if it's in the cache
        caches.match(event.request)
            .then(response => {
                // if it is, then return the cached response
                // object from the cache
                if (response) {
                    console.log(`SW: Return Cache ${event.request.url}`);
                    return response;
                }
                // otherwise, tell the browser to go get the
                // resource from the network
                console.log(`SW: Return Network ${event.request.url}`);
                return fetch(event.request);
            })
    );
});
