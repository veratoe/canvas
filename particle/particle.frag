precision mediump float;
uniform sampler2D u_texture;

void main() {
	//vec4 color = texture2D(u_texture, gl_PointCoord);
	gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
