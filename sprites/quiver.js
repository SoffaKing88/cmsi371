(function () {

	window.SpriteLibrary = window.SpriteLibrary || { };

	var length = 80;
	var width = 20;
	var rotation = 10;

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