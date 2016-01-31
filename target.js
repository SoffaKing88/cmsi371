(function () {
	
	window.SpriteLibrary = window.SpriteLibrary || { };

	SpriteLibrary.target = function (targetSpecification) {
		var ctx = targetSpecification.ctx;

		//Drawing Legs
		

		//Drawing each circle of the target
		for(i = 2; i <= 6; i++){
			ctx.beginPath();
			ctx.ellipse(100, 100, 80 / i, 250 / i, -Math.PI / 1.05, 0, 2 * Math.PI);
			if(i % 2 == 0){
				ctx.fillStyle = "white";
			} else {
				ctx.fillStyle = "red";
			}
			ctx.fill();
			ctx.closePath();
		}

		//Drawing Bulls eye
		ctx.beginPath();
		ctx.ellipse(100, 100, 8, 25, -Math.PI / 1.05, 0, 2 * Math.PI);
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.closePath();

		//Back of Target
		ctx.beginPath();
		ctx.moveTo(110, 18);
		ctx.lineTo(140, 18);
		ctx.stroke();
		ctx.moveTo(85, 185);
		ctx.lineTo(115, 185);
		ctx.stroke();

		ctx.closePath();
	};
}());