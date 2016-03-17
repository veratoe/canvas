precision mediump float;

varying vec2 a_position;
uniform float time;

float wave(vec2 p, float angle) {
	vec2 direction = vec2(cos(angle), sin(angle));
	return cos(dot(p, direction));
}
void main() {
	float b = 0.0;

	for (int i = 1; i <= 11; i++) {
		b += wave(a_position, time / float(i));
	}
	gl_FragColor = vec4(b, b, b, 1.0);
}
