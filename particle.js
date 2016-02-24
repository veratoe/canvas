function Particle(pos, vel, size) {
	
	this.update = function (field) {
		var v = field.getVector(pos.x, pos.y);
		v.multiply(2/size);
		vel.add(v);		
		pos.add(vel);
		this.checkBounds();
		return this;	
	};

	this.draw = function () {
		strokeStyle = color(30, 30, 30);
		var length = vel.length() * 10| 0;
		fillStyle = color(255, 255 - length, 255 - length, 255);
		circle(pos.x, pos.y, size, size);
		return this;
	};

	this.checkBounds = function () {
		if (pos.x > 959 || pos.x < 0 || pos.y > 459 || pos.y < 0) {
			pos.x = random(0, 960);
			pos.y = random(0, 480);
			vel = new Vector(random(-1, 1, true), random(-1, 1, true));
		}
		//pos.x = checkBounds(pos.x, 0, 959, true);
		//pos.y = checkBounds(pos.y, 0, 479, true);
	}
}
