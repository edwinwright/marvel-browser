// https://www.sitepoint.com/preloading-images-in-parallel-with-promises/

function ImagePreloader() {
  this.items = [];
}

ImagePreloader.prototype.queue = function queue(paths) {
  this.items = this.items.concat(paths);
};

ImagePreloader.prototype.preloadImage = function preloadImage(path) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = path;
  });
};

ImagePreloader.prototype.preload = function preload() {
  return Promise.all(this.items.map(i => this.preloadImage(i)));
};

export default ImagePreloader;
