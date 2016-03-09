(function () {

	window.SpriteLibrary = window.SpriteLibrary || { };

	var length = 50;
	var width = 15;
	var rotation = -5 * Math.PI / 180;

	SpriteLibrary.quiver = function (quiverSpecification) {
		var ctx = quiverSpecification.ctx || document.getElementById("canvas").getContext("2d");

		//draw Simple Quiver
		ctx.save();
		ctx.fillStyle = "brown";
		ctx.rotate(rotation);
		ctx.fillRect(0, 0, width, length);
		ctx.restore();
	};
}());