var num_particles = 500;

var time = 0;
	sTime = Date.now();

var program;
var vertices;

var createRandomArray = function (length) {
	var array = [];
	for (var i = 0; i < length; i++) {
		array[i] = Math.random() * 255 | 0;	
	}
	return array;
};

var createBlobArray = function (size) {
	var array = [];
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			var d = Math.pow(i - size / 2, 2) + Math.pow(j - size / 2, 2) + 1;
			array.push(255 / Math.sqrt(d) | 0, 0, 0, 0);
		}
	}
	console.log(size, array);
	return array;
};

var createTextureFromArray = function (array) {
	var texture = gl.createTexture();
	// texture mooi renderbaar maken
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 180, 180, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(array));
	return texture;
};

var particles = [];

var createParticles = function () {
	for (var i = 0; i < num_particles; i++) {
		particles.push(Math.random() * 2 -1, Math.random() * 2 -1);
	}
};

var updateParticles = function () {
	for (var i = 0; i < num_particles; i++) {
		for (var j = 0; j < num_particles; j++) {
			if (i === j) continue;
			var dx = particles[i*2] - particles[j*2],
				dy = particles[i*2 +1] - particles[j*2 + 1];
			
			var d = Math.sqrt(dx*dx + dy*dy) + Math.random() * 0.5 - 0.25;

			particles[j*2] += 0.0001 / d * dx
			particles[j*2+1] += 0.0001 / d * dy;
		}
	}
};

var particleBuffer,
	particleTexture;

var init = function () {
	createParticles();
	particleBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, particleBuffer);
	particleTexture = createTextureFromArray(createBlobArray( 180 ));
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	//gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
	gl.depthMask(false);
};

var render = function () {
	gl.clearColor(1.0, 1.0, 1.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.useProgram(program);
	var a_position = gl.getAttribLocation(program, "a_position");		
	gl.bindBuffer(gl.ARRAY_BUFFER, particleBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(particles), gl.DYNAMIC_DRAW);
	gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(a_position);
	gl.drawArrays(gl.POINTS, 0, num_particles);
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

init();
createProgramFromAjax("particle.vertex", "particle.frag", function (p) {
	program = p;
	loop();
});
