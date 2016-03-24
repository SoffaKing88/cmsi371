(function () {

	window.SpriteLibrary = window.SpriteLibrary || { };
	
	var backgroundImage = new Image();
	backgroundImage.loaded = false;
	backgroundImage.addEventListener("load", function () {
		backgroundImage.loaded = true;
	}, false);
	backgroundImage.src = "background.png";

	SpriteLibrary.background = function (backgroundSpecification) {
		var ctx = backgroundSpecification.ctx || document.getElementById("canvas").getContext("2d");

		if(backgroundImage.loaded){
			ctx.drawImage(backgroundImage, 0, 0);
		};
	};
}());