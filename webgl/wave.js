var vertices;
createProgramFromAjax("wave.vertex", "wave.frag", function (p) {
	program = p;
	createVertices();
	loop();
});

var frame = 0;

var loop = function () {
	if (frame % 5 === 0) {
		main();
	}
	frame++;
	requestAnimationFrame(loop);
};

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

var time,
	sTime = Date.now()

var main = function () {
	gl.useProgram(program);
	var positionLocation = gl.getAttribLocation(program, "a_position");
	var timeLocation = gl.getUniformLocation(program, "u_time");
	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.uniform1f(timeLocation, (Date.now() - sTime) / 1000);
	gl.enableVertexAttribArray(positionLocation);
	gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
	gl.drawArrays(gl.TRIANGLES, 0, 6);

};
