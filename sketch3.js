var x = 0.1, 
	y = -0.1,
	a = -0.966918,
    b = 2.879879,
    c = 0.765145,
	d = 0.744728,
	ox,
	oy;

var tx = { oMin: -4, oMax: 4, tMin: 0, tMax: canvas.width },
	ty = { oMin: -2, oMax: 2, tMin: 0, tMax: canvas.height };

var iterate = function () {
	ox = x.toPrecision(12);
	oy = y.toPrecision(12);
	x = Math.sin(oy * b) + c * Math.sin(ox * b);
	y = Math.sin(ox * a) + d * Math.sin(oy * a);
};

var count = 0;

function main() {
	count++;
	x = 0.1; 
	y = 0.1;
    b = 2.879879  + 0.05 * Math.sin(count / 100);	
	d = 0.744728  + 0.05 * Math.sin(count / 13);	
	clearImage();
//	fadeImage(50);
	for (var i = 0; i < 150000; i++) {
		iterate(); if (i < 100) continue;
		px = translate(x, tx) | 0; if (px < 1) px = 0;
		py = translate(y, ty) | 0; if (py < 1) py = 0;
		pixel(px, py, 128, 0, 0, 25);
	}
}
