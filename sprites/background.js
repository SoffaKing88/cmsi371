(function () {

	window.SpriteLibrary = window.SpriteLibrary || { };
	
	var backgroundImage = new Image();
	backgroundImage.addEventListener("load", function () {
	}, false);
	backgroundImage.src = "background.png";

	SpriteLibrary.background = function (backgroundSpecification) {
		var ctx = backgroundSpecification.ctx || document.getElementById("canvas").getContext("2d");

		ctx.drawImage(backgroundImage, 0, 0);
	};
}());