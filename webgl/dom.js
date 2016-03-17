function createSlider(label, min, max, step, value, callback) {
	var root = document.querySelector("#controls"),
		child = document.createElement("div");

	root.appendChild(child);

	var input = document.createElement("input");
	input.type = "range";
	input.value = value;
	input.min = min;
	input.max = max;
	input.step = step;


	var l = document.createElement("label");
	l.innerHTML = label;
	child.appendChild(l);

	var s = document.createElement("span");
	s.innerHTML = value;
	child.appendChild(s);
	
	input.addEventListener("change", function (e) {
		var v = +event.srcElement.value;
		s.innerHTML = v;
		callback(v);
	});

	child.appendChild(input);
}

function createChecbkox(label, value, callback) {
	var root = document.querySelector("#controls"),
		child = document.createElement("div");

	root.appendChild(child);

	var l = document.createElement("label");
	l.innerHTML = label;
	child.appendChild(l);
	
	var input = document.createElement("input");
	input.type = "checkbox";
	input.checked = value;
	child.appendChild(input);

	input.addEventListener("change", function (e) {
		var v = +event.srcElement.checked;
		callback(v);
	});

}
