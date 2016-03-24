var num_particles = 1000,
	particle_size = 100;

var time = 0;
	sTime = Date.now();

var program;
var vertices;

var createRandomArray = function (length) {
	var array = [];
	for (var i = 0; i < length; i++) {
		array[i] = Math.random()* 256 | 0;	
	}
	return array;
};

var createBlobArray = function (size) {
	var array = [];
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			var x = i - size / 2,
				y = j - size / 2,
				d = 1 / (  
					Math.pow(x, 2) + 
					Math.pow(y, 2)),
				r = d / 256 | 0,
				g = (d - r * 256) | 0;
				
				if (d < 0.0005) d = 0.0	;
			array.push(Math.sqrt(d), 0, 0, 0);
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
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, particle_size, particle_size, 0, gl.RGBA, gl.FLOAT, new Float32Array(array));
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
		var x = particles[i*2],
			y = particles[i*2 + 1],
			//dx = -y * (1 - x - y) + x / 4,
			//dy = 2 - (x * x) + y / 4;
			dx = -y,
			dy = x,
			m = 0.001;


			
			particles[i*2] += m *  dx;
			particles[i*2 + 1] += m * dy;
	}
};

var particleBuffer,
	particleTexture;

var init = function () {
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	gl.depthMask(false);
	gl.getExtension('OES_texture_float');
	gl.getExtension('OES_texture_float_linear');
	
	createParticles();
	particleBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, particleBuffer);
	particleTexture = createTextureFromArray(createBlobArray( particle_size ));
};

var render = function () {
	gl.clearColor(1.0, 1.0, 1.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.useProgram(program);

	// texture
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, particleTexture);
	var a_position = gl.getAttribLocation(program, "a_position");		
	var u_pointSize = gl.getUniformLocation(program, "u_pointSize");
	gl.uniform1f(u_pointSize, particle_size);
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
