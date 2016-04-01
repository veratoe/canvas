var num_particles = 500,
	particle_size = 400;

var time = 0;
	sTime = Date.now();

var program, post_program;
var vertices;

var createBlobArray = function (size) {
	var array = [];
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			var x = i - size / 2,
				y = j - size / 2,
				r = x * x + y * y;
				r = Math.sqrt(r);
				if (r < 1) r = 1;

				var rr = 255 / r | 0;
			
			array.push(rr, 0, 0, 0);
		}
	}
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
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, particle_size, particle_size, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(array));
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
			dx = -y,
			dy = x,
			m = 0.01;


			
			particles[i*2] += m *  dx;
			particles[i*2 + 1] += m * dy;
	}
};

var particleBuffer,
	particleTexture,
	framebuffer,
	framebufferTexture;

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

	// draw to frame buffer;
	var tex = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, tex);
	gl.texImage2D(gl.TEXTURE_2D, 0, 
				gl.RGBA, 
				canvas.width, 
				canvas.height,
				0, 
				gl.RGBA,
				gl.UNSIGNED_BYTE, 
				null);
	
	var	fb = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
	gl.framebufferTexture2D(gl.FRAMEBUFFER,
								gl.COLOR_ATTACHMENT0,
								gl.TEXTURE_2D,
								tex,
								0);
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.drawArrays(gl.POINTS, 0, num_particles);

	// en de boel naar schermke
	gl.bindTexture(gl.TEXTURE_2D, null);
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	var vb = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vb);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
			1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0
	]), gl.STATIC_DRAW);
	gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(0);
	gl.useProgram(post_program);
	gl.bindTexture(gl.TEXTURE_2D, tex);
	gl.drawArrays(gl.TRIANGLES, 0, 6);
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

createProgramFromAjax("pp.vertex", "pp.frag", function (p) {
	post_program = p;
});
