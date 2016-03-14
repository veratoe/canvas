// Thu Mar 10 21:55:32 CET 2016
// le mansie webgl boilerplate

var canvas = document.querySelector("canvas");
/*	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientWidth;*/
var gl = canvas.getContext("webgl");

function compileShader(source, type) {
	var shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		throw "Could not compile " + type + " shader: " + gl.getShaderInfoLog(shader);
	}
	return shader;
}

function createProgram(vShader, fShader) {
	var program = gl.createProgram();
	gl.attachShader(program, vShader);
	gl.attachShader(program, fShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		throw "Could not link program: " + gl.getProgramInfoLog(program);
	}
	return program;
}

/*function createShaderFromTag(id) {
	var script = document.getElementById(id);
	if (!script) {
		throw "Could not find script tag: " + id;
	}
	var source = script.text;
	var type;

	switch(script.type) {
		case "x-shader/x-vertex": type = gl.VERTEX_SHADER; break;
		case "x-shader/x-fragment": type = gl.FRAGMENT_SHADER; break;
		default: throw "Shader type not set on script: " + id; 
	}

	return compileShader(source, type);
}*/

function createProgramFromAjax(vFileName, fFileName, callback) {

	var vertexShaderLoaded, 
		fragmentShaderLoaded,
		vShader,
		fShader,
		program;

	var onResourcesLoaded = function () {
		if (vertexShaderLoaded && fragmentShaderLoaded) {
			program = createProgram(vShader, fShader);
			callback(program);
		}
	};

	var getFile = function(fileName, callback) {
		var request = new XMLHttpRequest();
		request.open('POST', fileName, true);
		request.addEventListener('load', function () {
			source = request.responseText;
			callback(source);
		});
		request.send();
	};

	getFile(vFileName, function(source) { 
		vertexShaderLoaded = true; 
		vShader = compileShader(source, gl.VERTEX_SHADER);
		onResourcesLoaded();
	});
	getFile(fFileName, function(source) { 
		fragmentShaderLoaded = true; 
		fShader = compileShader(source, gl.FRAGMENT_SHADER);
		onResourcesLoaded();
	});


	
}

function createProgramFromScripts(vId, fId) {
	return createProgram(createShaderFromTag(vId), createShaderFromTag(fId));
}
