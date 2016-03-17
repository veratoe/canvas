function make2DProjection(width, height) {
	return [
		2 / width, 0, 0,
		0, -2 / height, 0,
		0, 0, 1
	];
}
