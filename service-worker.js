
const myCache = 'static-cache';
  const pageToCache = [ '/offlineApp.html' ];

  self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(myCache)
      .then(function(cache) {
        return cache.addAll(pageToCache);
      })
    );
  });

  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
      .then(function(response) {
        return response || fetchAndCache(event.request);
      })
    );
  });

  function fetchAndCache(url) {
    return fetch(url)
    .then(function(response) {
      // check for valid response
      if (!response.ok) {
        throw Error(response.statusText);
      }
     return caches.open(myCache)
      .then(function(cache) {
        cache.put(url, response.clone());
        return response;
      });
    })
    .catch(function(error) {
      console.log('Request failed:', error);
      // offline 404 page really needs  go here but I have not bothered yet
    });
  }
