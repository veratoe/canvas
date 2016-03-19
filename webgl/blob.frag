#define NUM_PARTICLES 25
#define COL_STEPS 10
precision mediump float;

uniform vec2 uParticles[NUM_PARTICLES];
uniform float u_time;

varying vec2 position;

void main() {
	float r = 0.0;
	float d = 0.0;
	for (int i = 0; i < NUM_PARTICLES;  i++) {
		d = distance(position, uParticles[i]);

		r += 0.007 / d;
	}	
	r = r * float(COL_STEPS);
	r = floor(r);
	r = r / float(COL_STEPS);

	gl_FragColor = vec4(r, 0.0, 0.0, 1.0);
}
