(function () {

	window.SpriteLibrary = window.SpriteLibrary || { };
	
	var numSpacing = 13;

	var drawNum = function(ctx, num, opacity) {

		ctx.fillStyle = "rgba(255, 0, 0, " + opacity + ")";
		ctx.fillText(num, 0, 0);
		ctx.translate(numSpacing, 0);
		
	}

	SpriteLibrary.dmgnums = function (dmgnumsSpecification) {
		var ctx = dmgnumsSpecification.ctx || document.getElementById("canvas").getContext("2d");

		var opacity = dmgnumsSpecification.opacity || 1;
		var firstNum = dmgnumsSpecification.firstNum || 0;
		var secondNum = dmgnumsSpecification.secondNum || 0;
		var thirdNum = dmgnumsSpecification.thirdNum || 0;
		var fourthNum = dmgnumsSpecification.fourthNum || 0;

		ctx.font = "24px Arial";

		if (firstNum != 0) {
			drawNum(ctx, firstNum, opacity);
		}
		if (secondNum != 0) {
			drawNum(ctx, secondNum, opacity);
		}
		if (thirdNum != 0) {
			drawNum(ctx, thirdNum, opacity);
		}
		if (fourthNum != 0) {
			drawNum(ctx, fourthNum, opacity);
		}
		
	};
	
}());