(function () {
	
	window.SpriteLibrary = window.SpriteLibrary || { };

	SpriteLibrary.target = function (targetSpecification) {
		var ctx = targetSpecification.ctx;

		//Drawing Legs
		var rightStandAngle = -Math.PI / 4;
		var leftStandAngle = Math.PI / 10;

		//Right Leg
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = "brown";
		ctx.rotate(rightStandAngle);
		ctx.translate(0, 150);
		ctx.fillRect(0, 0, 15, 125);
		ctx.closePath();
		ctx.restore();

		//Left Leg
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = "brown";
		ctx.rotate(leftStandAngle);
		ctx.translate(145, 80);
		ctx.fillRect(0, 0, 15, 80);
		ctx.closePath();
		ctx.restore();

		//Drawing each circle of the target
		for(i = 3; i <= 6; i++){
			ctx.beginPath();
			ctx.ellipse(100, 100, 80 / i, 250 / i, -Math.PI / 1.05, 0, 2 * Math.PI);
			if(i % 2 == 0){
				ctx.fillStyle = "white";
			} else {
				ctx.fillStyle = "red";
			}
			ctx.fill();
			ctx.stroke();
			ctx.closePath();
		}

		//Drawing Bulls eye
		ctx.beginPath();
		ctx.ellipse(100, 100, 8, 25, -Math.PI / 1.05, 0, 2 * Math.PI);
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.closePath();

	};
}());