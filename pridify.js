var selectors = [
  'img[src^="https://fbcdn-profile"]',
  'img[src*=".twimg.com/profile_images/"]',
];

// Based on https://remysharp.com/2010/07/21/throttling-function-calls
function throttle(func, threshhold) {
  var before;
  var timeout;
  return function () {
    var context = this;
    var now = +new Date();
    var args = arguments;
    if (before && now < before + threshhold) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        before = now;
        func.apply(context, args);
      }, threshhold);
    } else {
      // don't delay, act now
      before = now;
      func.apply(context, args);
    }
  };
}

function pridifyImage(image) {
  var prideGradients = 'linear-gradient(to bottom, rgba(255, 62, 24, 0.5), rgba(255, 62, 24, 0.5) 16.666%, rgba(252, 154, 0, 0.5) 16.666%, rgba(252, 154, 0, 0.5) 33.333%, rgba(255, 216, 0, 0.5) 33.333%, rgba(255, 216, 0, 0.5) 50%, rgba(57, 234, 124, 0.5) 50%, rgba(57, 234, 124, 0.5) 66.666%, rgba(11, 178, 255, 0.5) 66.666%, rgba(11, 178, 255, 0.5) 83.333%, rgba(152, 90, 255, 0.5) 83.333%, rgba(152, 90, 255, 0.5))';
  image.style.backgroundImage = prideGradients + ', url(URL)'.replace(/URL/, image.src);
  image.style.backgroundSize = 'cover';
  image.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
}

var pridifyAll = throttle(function (selector) {
  var images = document.querySelectorAll(selector);
  for (var i = 0; i < images.length; i++) {
    pridifyImage(images[i]);
  }
}, 500);

var observer = new MutationObserver(function(mutations) {
  pridifyAll(selectors.join());
});

observer.observe(document.body, { subtree: true, childList: true });

