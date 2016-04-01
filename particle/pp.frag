precision mediump float;
varying vec2 v_texCoord;
uniform sampler2D u_texture;

void main () {
	gl_FragColor = texture2D(u_texture, v_texCoord);
	//gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}

