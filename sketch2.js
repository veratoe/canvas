var	particles = [];

var canvas = document.querySelector("canvas");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var drawVectors = function (field) {
	var s = 30,
		imax = canvas.width / s | 0,
		jmax = canvas.height / s| 0;

	for (var i = 0; i < imax;  i++) {
		for (var j = 0; j < jmax; j++) {
			var v = field.getVector(i * s, j * s);
			var r = v.x * 128 | 0;
			var g = v.y * 128 | 0;
			var l = v.length();
			if (l > 1) l = 1;
			fillStyle = color(128 + r, 128 + g, 20, l * 0.04);
			strokeStyle = null;
			//rectangle(i*s, j*s, s, s, true);
			strokeStyle = color(128, 128, 128, l);
			var lx = i * s + s / 2,
				ly = j * s + s /2;
			line(lx, ly, lx + v.x * 5, ly + v.y * 5);
		}
	}
};

var w = 0,
	t = 55,
	m = 1;

var field = new Field(
	function (x,y) {
		x += Math.sin(w / t / 4);
		y *= Math.cos(w/t/3);
		var a = Math.sin(x * x) - y,
			b = Math.sin(y * x) + Math.cos(x),
			c = Math.sin(w / t / 8) + random(-0.05, 0.05, true);
		return { 
			//x: Math.sin(w / 10) * Math.sin(x), 
			//y: Math.sin(w / 10) * Math.cos(y) 
			x: c * m * a,// + random(-0.05, 0.05, true),
			y: c * m * b// + random(-0.05, 0.05, true)
		};
	},
	{ oMin: 0, oMax: canvas.width, tMin: -2, tMax: 2 },
	{ oMin: 0, oMax: canvas.height, tMin: -2.5, tMax: 2.5  }
);

var main = function () {
	//clear();
	fade(5);
	//drawVectors(field);
	for (var i = 0; i < particles.length; i++) {
		particles[i].update(field)
					.draw();

	}
	w++;

};


for (var i = 0; i < 1000;i++) {
	particles.push(
		new Particle(
			new Vector(random(canvas.width), random(canvas.height)), 
			new Vector(0,0),
			random(1, 5, true)
	));
}
