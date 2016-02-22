function Particle(pos, vel) {
	
	var pos, vel;
		
	this.update = function () {
		var v = vectors[pos.x/30 >> 0][pos.y/30 >> 0];
		vel.add(v);
		pos.add(vel);
		this.checkBounds();
		return this;	
	}

	this.draw = function () {
		strokeStyle = color(30, 30, 30);
		circle(pos.x, pos.y, 10, 10);
		return this;
	}

	this.checkBounds = function () {
		pos.x = checkBounds(pos.x, 0, 959, true);
		pos.y = checkBounds(pos.y, 0, 479, true);
	}
}
