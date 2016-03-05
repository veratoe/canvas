function Particle(pos, vel, size) {
var maxAge = 300,
	maxV = 10;
	var age = random(0, maxAge);
	var lPos = pos.copy();

	this.update = function (field) {
		var v = field.getVector(pos.x, pos.y);
		v.multiply(3);
		vel.add(v);	
		if (vel.length() > maxV) 
			vel.normalize(maxV);
		var q = vel.copy();
		q.multiply(3);
		pos.add(vel);
		age++;
		this.checkAge();
		return this;	
	};

	this.draw = function () {
		var l = vel.length() * 10  | 0;
		if (l > 128) l = 128;
		var o = 0.7 * l / (maxV * 10);
		if (age < 50) o *= age / 50;
 		strokeStyle = color(178 + l, 178, 178 -l,  o);
		line(pos.x, pos.y, lPos.x, lPos.y, size);
		lPos = pos.copy();
		return this;
	};

	this.checkAge = function () {
		if (age > maxAge) {
			this.reset();
		}
	};

	this.reset = function () {
		pos.x = random(0, canvas.width);
		pos.y = random(0, canvas.height); //random(0, 480);
		lPos = pos.copy();
		vel = new Vector(0, 0);
		age = 0;
	}

	this.checkBounds = function () {
		if (pos.x > canvas.width || pos.x < 0 || pos.y > canvas.height || pos.y < 0) {
		}
		//pos.x = checkBounds(pos.x, 0, 959, true);
		//pos.y = checkBounds(pos.y, 0, 479, true);
	}
}
