
const ImagePreloader = function() {
	this.items = []
}

ImagePreloader.prototype.queue = function (paths) {
	this.items = this.items.concat(paths)
}

ImagePreloader.prototype.preloadImage = function (path) {
	return new Promise(function(resolve) {
		var image = new Image()
		image.onload = resolve
		image.onerror = resolve
		image.src = path
	})
}

ImagePreloader.prototype.preload = function () {
	return Promise.all(this.items.map(i => i = this.preloadImage(i)))
}

export default ImagePreloader
