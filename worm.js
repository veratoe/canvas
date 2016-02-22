function Worm(ix, iy, ir) {
	
	var x = ix, 
		y = iy,
		r = ir;
	
	var velocity = { x: random(-5, 5), y: random(5, -5) };

	var history = [],
		maxHistory = random(50);

	this.fillStyle = "rgba(" + random(255) + "," + random(255) + "," + random(255) + ", 0.1)"; 

	this.update = function () {
		x += velocity.x;
		y += velocity.y;

		velocity.x += Math.random() * 2 -1;
		velocity.y += Math.random() * 2 -1;
		velocity.x = velocity.x > 1 ? 1 : (velocity.x < -1) ? -1 : velocity.x;
		velocity.y = velocity.y > 1 ? 1 : (velocity.y < -1) ? -1 : velocity.y;

		this.checkBounds();

		history.push({ x: x, y: y});
		if (history.length > maxHistory) {
			history.splice(0, 1);
		}
		return this;
	}

	this.checkBounds = function () {
		x = x > 960 ? 0 : x;
		x = x < 0 ? 960 : x;
		y = y > 500 ? 0 : y;
		y = y < 0 ? 500 : y;
	}

	this.draw = function() {
		strokeStyle = this.fillStyle;
		fillStyle = 'none';
		for (var i = 0; i < history.length; i++) {
			circle(history[i].x, history[i].y, r);
		}
		return this;
	}

}
