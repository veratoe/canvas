var worms = [];

worms.push(new Worm(random(960), random(500), random(40)));

document.onmouseup = function () {
	worms.push(new Worm(random(960), random(500), random(40)));
}

function main() {

	clear();
	context.fillStyle = 'black';
	context.fillRect(0, 0, 960, 500);	
	for (var i = 0; i < worms.length; i++) {
		worms[i].update()
				.draw();
		
	}
}
