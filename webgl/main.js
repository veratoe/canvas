var max_points = 300000,
	program;

gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

createProgramFromAjax("basic.vertex", "basic.frag", function (p) {
	program = p;
	loop();
});


var vertices = [];
var a = -0.966918,
	b = 2.879879,
	c = 0.765145,
	d = 0.744728;

var scale = 1;

var createVertices = function() {
	vertices = [];
	var ox = 0.1, oy = 0.1, x = 0, y = 0;
	var sin = Math.sin, 
		cos = Math.cos;
	
	for (var i = 0; i < max_points; i++) {
		x = sin(oy*b) + c * sin(ox*b);
		y = sin(ox*a) + d * sin(oy*a);
		vertices.push(x, y);
		ox = x; 
		oy = y;
	}
};

createSlider("b", 2.5, 4.5, 0.01, b, function (val) { b = val; });
createSlider("c", 0, 3, 0.01, c, function (val) { c = val; });
createSlider("d", 0, 3, 0.01, d, function (val) { d = val; });
createSlider("points", 100, 1000000, null, max_points, function (val) { max_points = val; });
createSlider("scale", 0.01, 3, 0.01, scale, function (val) { scale = val; });
createChecbkox("motion", motion, function (val) { motion = val });

var tick = 0,
	motion;

var loop = function () {
	a = -0.966918 + Math.sin(tick / 200)  * 0.5;
	createVertices();
	if (motion)	{
		tick++;
	}
	main();
	requestAnimationFrame(loop);
};

var main = function () {
	gl.useProgram(program);
	var positionLocation = gl.getAttribLocation(program, "a_position");
	var matrixLocation = gl.getUniformLocation(program, "u_matrix");
	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
	gl.enableVertexAttribArray(positionLocation);
	gl.uniformMatrix3fv(matrixLocation, false, make2DProjection(8 * scale, 4 * scale));
	gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
	gl.drawArrays(gl.POINTS, 0, max_points);

};
