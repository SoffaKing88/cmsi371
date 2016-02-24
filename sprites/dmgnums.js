(function () {

	window.SpriteLibrary = window.SpriteLibrary || { };

	var numSpacing = 13;

	var drawNum = function(ctx, num, opacity) {

		ctx.fillText(num, 0, 0);
	}

	SpriteLibrary.dmgnums = function (dmgnumsSpecification) {
		var ctx = dmgnumsSpecification.ctx;

		var opacity = dmgnumsSpecification.opacity || 1;
		var firstNum = dmgnumsSpecification.firstNum || 0;
		var secondNum = dmgnumsSpecification.secondNum || 0;
		var thirdNum = dmgnumsSpecification.thirdNum || 0;
		var fourthNum = dmgnumsSpecification.fourthNum || 0;

		ctx.font = "24px Arial";
		ctx.fillStyle = "red";

		drawNum(ctx, firstNum, opacity);
		ctx.translate(numSpacing, 0);
		drawNum(ctx, secondNum, opacity);
		
	};
	
}());