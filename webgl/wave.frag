precision mediump float;

varying vec2 position;
uniform float u_time;

void main() {
	vec2 z;
	float x = 0.0, y = 0.0, c = 0.0;

	z.x = position.x * 2.0 - 0.5 + sin(u_time) * 0.5;
	z.y = position.y - 0.5 + sin(u_time) * 0.5;

	for (int i = 0; i < 100; i++) {
		c += 0.01;	
		x = (z.x * z.x - z.y * z.y) + position.x;
		y = (2.0 * z.y * z.x) + position.y;

		if ((x * x + y * y) > 4.0) {
			break;
		}
		z.x = x;
		z.y = y;
	}
	gl_FragColor = vec4(c, c, c, 1.0);
}
