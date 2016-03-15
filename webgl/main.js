var max_points = 100000,
	program;

gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
gl.enable(gl.POINT_SMOOTHING);

createProgramFromAjax("basic.vertex", "basic.frag", function (p) {
	program = p;
	loop();
});


var vertices = [];
var a = -0.966918,
	b = 2.879879,
	c = 0.765145,
	d = 0.744728;

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

var tick = 0;

var loop = function () {
	a = -0.966918 + Math.sin(tick / 200)  * 0.2;
	createVertices();
	tick++;
	main();
	requestAnimationFrame(loop);
};

var main = function () {
	gl.useProgram(program);
	var positionLocation = gl.getAttribLocation(program, "a_position");
	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
	gl.enableVertexAttribArray(positionLocation);
	gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
	gl.drawArrays(gl.POINTS, 0, max_points);

};
