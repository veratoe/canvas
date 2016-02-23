var vectors = [],
	particles = [];

var drawSquares = function () {

	for (var i = 0; i < 32; i++) {
		for (var j = 0; j < 16; j++) {
			a = vectors[i][j].x *  128 | 0;
			b =  vectors[i][j].y * 128 | 0;
					
			fillStyle = color(128 + a, 128 + a, 255, 0.3);
			strokeStyle = null;
			rectangle(i*30, j*30, 30, 30, true);
		}
	}
};

var drawVectors = function () {
	for (var i = 0; i < 32; i++) {
		for (var j = 0; j < 16; j++) {
			line(i * 30 + 15, j * 30 + 15, i * 30 + 15 + vectors[i][j].x * 10, j * 30 + 15 + vectors[i][j].y * 10);
		}
	}
};

var populateVectors = function () {

	for (var i = 0; i < 32; i++) {
		for (var j = 0; j < 16; j++) {
			if (!vectors[i]) vectors [i] = [];
			vectors[i][j] = new Vector(random(-1,1, true), random(-1,1, true));
		}
	}
};

var main = function () {
	clear();
	drawVectors();
	drawSquares();
	for (var i = 0; i < particles.length; i++) {
		particles[i].update()
					.draw();

	}
};

for (var i = 0; i < 20; i++) {
	particles.push(new Particle(new Vector(random(960), random(480)), new Vector(random(-1, 1, true), random(-1,1, true))));
}
populateVectors();
