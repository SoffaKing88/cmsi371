(function () {
	
	window.SpriteLibrary = window.SpriteLibrary || { };
	
	var drawRightLeg = function (ctx, legAngle, opacity) {

		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = "rgba(165, 42, 42, " + opacity + ")";
		ctx.rotate(legAngle);
		ctx.translate(0, 150);
		ctx.fillRect(0, 0, 15, 125);
		ctx.closePath();
		ctx.restore();

	}

	var drawLeftLeg = function (ctx, legAngle, opacity) {

		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = "rgba(165, 42, 42, " + opacity + ")";
		ctx.rotate(legAngle);
		ctx.translate(145, 80);
		ctx.fillRect(0, 0, 15, 80);
		ctx.closePath();
		ctx.restore();

	}

	var drawTarget = function (ctx, radiusX, radiusY, rotation, opacity) {

		//Draws each circle of the target besides the bullseye, outside circle first
		for(i = 3; i <= 6; i++){
			ctx.beginPath();
			ctx.ellipse(100, 100, radiusX / i, radiusY / i, rotation, 0, 2 * Math.PI);
			if(i % 2 == 0){
				ctx.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
			} else {
				ctx.fillStyle = "rgba(255, 0, 0, " + opacity + ")";
			}
			ctx.fill();
			ctx.strokeStyle = "rgba(0, 0, 0, " + opacity + ")";
			ctx.stroke();
			ctx.closePath();
		}
	}

	var drawBullseye = function(ctx, radiusX, radiusY, rotation, opacity) {

		ctx.beginPath();
		ctx.ellipse(100, 100, radiusX / 10, radiusY / 10, rotation, 0, 2 * Math.PI);
		ctx.fillStyle = "rgba(255, 0, 0, " + opacity + ")";
		ctx.fill();
		ctx.strokeStyle = "rgba(0, 0, 0, " + opacity + ")";
		ctx.stroke();
		ctx.closePath();

	}

	SpriteLibrary.target = function (targetSpecification) {
		var ctx = targetSpecification.ctx || document.getElementById("canvas").getContext("2d");

		var opacity = targetSpecification.opacity || 1;

		var rightStandAngle = targetSpecification.rightStandAngle || (-Math.PI / 4);
		var leftStandAngle = (Math.PI / 10);


		var circleRadiusX = 80;
		var circleRadiusY = 250;
		var circleRotation = -Math.PI / 1.05;

		drawRightLeg(ctx, rightStandAngle, opacity);
		drawLeftLeg(ctx, leftStandAngle, opacity);

		drawTarget(ctx, circleRadiusX, circleRadiusY, circleRotation, opacity);

		drawBullseye(ctx, circleRadiusX, circleRadiusY, circleRotation, opacity);

	};
}());