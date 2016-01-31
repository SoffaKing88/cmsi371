(function () {

	window.SpriteLibrary = window.SpriteLibrary || { };

	SpriteLibrary.stickman = function () {
	
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");

		//Head
		var radius = 20;
		ctx.arc(210, 200, radius, 0, 2 * Math.PI, false);
		ctx.fill();

		//Body
		ctx.fillRect(200, 200, 15, 100);

		//Legs
		ctx.fillRect(200, 350, 15, 75);

	}
}());