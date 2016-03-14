createProgramFromAjax("basic.vertex", "basic.frag", function (program) {
	main(program);
});

var vertices = [];

var createVertices = function() {
	for (var i = 0; i < 1000; i++) {
		vertices.push(Math.random() * 2 - 1, Math.random() * 2 -1);
	}
}

var main = function (program) {
	createVertices();
	gl.useProgram(program);
	var positionLocation = gl.getAttribLocation(program, "a_position");

	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.enableVertexAttribArray(positionLocation);
	gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
	gl.drawArrays(gl.POINTS, 0, 100);

};
