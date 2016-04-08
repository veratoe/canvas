precision mediump float;
varying vec2 v_position;
uniform int u_p[256];

void main() {
	float i = floor(abs(v_position.x * 512.0));
	int w = int(i);
	int p = u_p[w];
	gl_FragColor = vec4(p / 256, 1.0, 0.0, 1.0);
}
