precision mediump float;
varying vec2 v_texCoord;
uniform sampler2D u_texture;

const float numColors = 8.0;

void main () {
	vec4 c = texture2D(u_texture, v_texCoord);
	c *= numColors;
	c = floor(c);
	c /= numColors;
	gl_FragColor = c;
}

