/* vector stuff */
function Vector(x, y) {
	this.x = x;
	this.y = y;

	return this;
}

Vector.prototype.add = function (v) {
	this.x += v.x;
	this.y += v.y;
}


var fillStyle,
	strokeStyle;

var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d");
	context.translate(0.5, 0.5);

var _draw = function () {
	context.fillStyle = fillStyle;
	context.fill();
	context.strokeStyle = strokeStyle;
	context.stroke();
}

var color = function (r, g, b, a) {
	if (a) {
		return "rgba(" + r + "," + g + "," + b + "," + a + ")";
	} else {
		return "rgb(" + r + "," + g + "," + b + ")";
	}
}

var clear = function () {
	context.clearRect(0, 0, canvas.width, canvas.height);
	//_draw();
}

var circle = function (x, y, rx, ry) {
	context.beginPath();
	context.arc(x, y, rx, 2 * Math.PI, false);
	_draw();
}

var rectangle = function (x, y, l, w, noStroke) {
	if (noStroke) {
		context.fillStyle = fillStyle;
		return context.fillRect(x, y, l, w);
	}
	context.beginPath();
	context.rect(x, y, l, w)
	_draw();
}

var line = function(x, y, w, z) {
	context.beginPath();
	context.moveTo(x, y);
	context.lineTo(w, z);
	context.stroke();
}

var checkBounds = function (v, min, max, wrap) {
	if (wrap) {
		return v > max ? min : v < min ? max : v; 
	} else {
		return v > max ? max : v < min ? min : v
	}

}

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
}

var _main = function () {
	if (typeof main === "function") {
		main();
	}
	setTimeout(_main, 60);
}

_main();
