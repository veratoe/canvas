var max_particles = 100;

var time = 0;
	sTime = Date.now();

var program;
var vertices;

var createVertices = function() {
	vertices = [
		-1.0, 1.0,
		-1.0, -1.0,
		1.0, -1.0,
		1.0, -1.0,
		1.0, 1.0,
		-1.0, 1.0
	];
};

var particles = [];

var createParticles = function () {
	for (var i = 0; i < max_particles; i++) {
		particles.push(Math.random() * 2 -1, Math.random() * 2 -1);
	}
};

var updateParticles = function () {
	for (var i = 0; i < max_particles / 2; i++) {
		for (var j = 0; j < max_particles / 2; j++) {
			if (i === j) continue;
			var dx = particles[i*2] - particles[j*2],
				dy = particles[i*2 +1] - particles[j*2 + 1];
			
			var d = Math.sqrt(dx*dx + dy*dy);

			particles[j*2] += 0.0001 / d * dx;
			particles[j*2+1] += 0.0001 / d * dy;
		}
	}
};

var render = function () {
	gl.useProgram(program);
	var positionLocation = gl.getAttribLocation(program, "a_position");
	var particlesLocation = gl.getUniformLocation(program, "uParticles");
	var timeLocation = gl.getUniformLocation(program, "u_time");
	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.uniform2fv(particlesLocation, particles);
	gl.enableVertexAttribArray(positionLocation);
	gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
	gl.drawArrays(gl.TRIANGLES, 0, 6);

	time = Date.now() - sTime;

};


var frame = 0;

var loop = function () {
	//if (frame % 5 === 0) {
		updateParticles();
		render();
	//}
	frame++;
	requestAnimationFrame(loop);
};

createVertices();
createParticles();
createProgramFromAjax("blob.vertex", "blob.frag", function (p) {
	program = p;
	loop();
});
