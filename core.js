/* field stuff */

function Field(func, tx, ty) {

	this.getVector = function(x,y) {
		x = tx ? translate(x, tx) : x;
		y = ty ? translate(y, ty) : y;
		i = func(x,y);
		return new Vector(i.x, i.y);
	};

}

/* vector stuff */
function Vector(x, y) {
	this.x = x;
	this.y = y;

	return this;
}

Vector.prototype.add = function (v) {
	this.x += v && v.x;
	this.y += v && v.y;
};

Vector.prototype.multiply = function (p) {
	this.x *= p;
	this.y *= p;
};

Vector.prototype.length = function () {
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.normalize = function (z) {
	var length = this.length() || 1;
	z = z || 1;
	this.x = this.x / length * z;
	this.y = this.y / length * z;
	return this;
};

Vector.prototype.copy = function () {
	return new Vector(this.x, this.y);
};

var fillStyle,
	strokeStyle;

var _draw = function () {
	context.fillStyle = fillStyle;
	context.fill();
	context.strokeStyle = strokeStyle;
	context.stroke();
};

var color = function (r, g, b, a) {
	if (a !== undefined) {
		return "rgba(" + r + "," + g + "," + b + "," + a + ")";
	} else {
		return "rgb(" + r + "," + g + "," + b + ")";
	}
};

var clear = function () {
	context.clearRect(0, 0, canvas.width, canvas.height);
};

var pixel = function (x, y, r, g, b, a) {
	var index = (y * canvas.width + x) * 4;

	var or = imageData.data[index], 
		og = imageData.data[index + 1], 
		ob = imageData.data[index + 2];
	
	var nr = (or * (255 - a) + r * a) / 255 | 0,
		ng = (og * (255 - a) + g * a) / 255 | 0,
		nb = (ob * (255 - a) + b * a) / 255 | 0;

	imageData.data[index] = nr;
	imageData.data[index + 1] = ng;
	imageData.data[index + 2] = nb;
	imageData.data[index + 3] = 255;
	
};

var fade = function (amount) {
	var image = context.getImageData(0, 0, canvas.width, canvas.height),
		data = image.data;

	for (var i = 0; i < data.length; i++) {
		data[i] -= amount;
	}

	context.putImageData(image, 0, 0);

};

var circle = function (x, y, rx, ry) {
	context.beginPath();
	context.arc(x, y, rx, 2 * Math.PI, false);
	_draw();
};

var rectangle = function (x, y, l, w, noStroke) {
	if (noStroke) {
		context.fillStyle = fillStyle;
		return context.fillRect(x, y, l, w);
	}
	context.beginPath();
	context.rect(x, y, l, w);
	_draw();
};

var line = function(x, y, a, b, w ) {
	context.beginPath();
	context.moveTo(x, y);
	context.lineTo(a, b);
	context.lineCap = "round";
	context.lineWidth = w || 1;
	_draw();
};

var checkBounds = function (v, min, max, wrap) {
	if (wrap) {
		return v > max ? min : v < min ? max : v; 
	} else {
		return v > max ? max : v < min ? min : v;
	}

};

var translate = function (a, t) {
	var oRange = t.oMax - t.oMin,
		tRange = t.tMax - t.tMin;
	return (a - t.oMin) / oRange * tRange + t.tMin;
};

var random = function(a, b, precise) {
	var r;
	if (b) {
		r = Math.random() * (b - a) + a;
	} else {
		r = Math.random() * a;
	}
	if (!precise) {
		r = r | 0;
	}
	return r;
};

var canvas,
	context,
	imageData,
	arrayBuffer,
	buf8,
	dataBuffer,
	frameCount = 0,
	lFrameCount =0,
	framesPerSecond = 0,
	time = Date.now(),
	sTime = time,
	lTime = 0;

var _init = function () {

	canvas = document.querySelector("canvas");
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
	context = canvas.getContext("2d");
	imageData = context.getImageData(0, 0, canvas.width, canvas.height);
/*	arrayBuffer = new ArrayBuffer(imageData.data.length);
	buf8 = new Uint8ClampedArray(arrayBuffer);
	dataBuffer = new Uint32Array(arrayBuffer);*/
};

var _main = function () {
	var dt = 1,
		df = 0;

	if (typeof main === "function") {
		main();
	}
	
	time = Date.now();
	df = frameCount - lFrameCount;
	dt = time - lTime;
	if (dt > 100) {
		fps = (df / dt * 1000).toFixed(2);
		oFps = (1000 * frameCount / (time - sTime)).toFixed(2);
		lFrameCount = frameCount;
		lTime = time;
		document.getElementById("fps").innerHTML = fps + " | " + oFps + " | " + frameCount;
	}
	context.putImageData(imageData, 0, 0);
	frameCount++;
	requestAnimationFrame(_main);

};

_init();
_main();
