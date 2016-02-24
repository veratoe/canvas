var	particles = [];

var drawVectors = function (field) {
	for (var i = 0; i < 64; i++) {
		for (var j = 0; j < 32; j++) {
			var v = field.getVector(i * 15, j * 15);
			var r = v.x * 128 | 0;
			var g = v.y * 128 | 0;
			var l = v.length();
			if (l > 1) l = 1;
			fillStyle = color(128 + r, 128 + g, 20, l * 0.4);
			strokeStyle = null;
			rectangle(i*15, j*15, 15, 15, true);
			strokeStyle = "#888";
			line(
				i * 15 + 8, 
				j * 15 + 8, 
				i * 15 + 8 + v.x * 4, 
				j * 15 + 8 + v.y * 5);
		}
	}
};

var w = 0,
	t = 25,
	m = 0.6;

var field = new Field(
	function (x,y) { 
		var a = Math.sin(x * x) - y,
			b = Math.sin(y * x) + Math.cos(x); 
		return { 
			//x: Math.sin(w / 10) * Math.sin(x), 
			//y: Math.sin(w / 10) * Math.cos(y) 
			x: m * Math.sin(w / t) * a + random(-0.05, 0.05, true),
			y: m * Math.sin(w / t) * b + random(-0.05, 0.05, true)
		};
	},
	{ oMin: 0, oMax: 960, tMin: -2.5, tMax: 2.5 },
	{ oMin: 0, oMax: 480, tMin: -3.5, tMax: 3.5  }
);

var main = function () {
	clear();
	drawVectors(field);
	for (var i = 0; i < particles.length; i++) {
		particles[i].update(field)
					.draw();

	}
	w++;

};

for (var i = 0; i < 1000; i++) {
	particles.push(
		new Particle(
			new Vector(random(960), random(480)), 
			new Vector(random(-2, 2, true), random(-2, 2, true)),
			random(1, 10)
	));
}
