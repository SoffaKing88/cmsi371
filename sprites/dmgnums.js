(function () {

	window.SpriteLibrary = window.SpriteLibrary || { };
	
	var numSpacing = 13;

	var drawNum = function(ctx, num, opacity) {

		ctx.fillText(num, 0, 0);
		ctx.translate(numSpacing, 0);
	}

	SpriteLibrary.dmgnums = function (dmgnumsSpecification) {
		var ctx = dmgnumsSpecification.ctx || document.getElementById("canvas").getContext("2d");

		var opacity = dmgnumsSpecification.opacity || 1;
		var firstNum = dmgnumsSpecification.ONEfirstNum || 0;
		var secondNum = dmgnumsSpecification.ONEsecondNum || 0;
		var thirdNum = dmgnumsSpecification.TWOfirstNum || 0;
		var fourthNum = dmgnumsSpecification.TWOsecondNum || 0;

		ctx.font = "24px Arial";
		ctx.fillStyle = "red";

		drawNum(ctx, firstNum, opacity);
		drawNum(ctx, secondNum, opacity);
		
	};
	
}());