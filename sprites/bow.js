(function () {
	
	window.SpriteLibrary = window.SpriteLibrary || { };

	var drawBow = function (ctx, x1, y1, x2, y2, x3, y3, bowLineWidth) {
		//Top half
		ctx.save();
		ctx.beginPath();
		ctx.strokeStyle = "brown";
		ctx.moveTo(0, 0);
		ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
		ctx.lineWidth = bowLineWidth;
		ctx.stroke();
		ctx.closePath();
		ctx.restore();

		// Bottom Half
	  	ctx.save();
		ctx.beginPath();
		ctx.scale(1, -1);
		ctx.translate(0, -360);
		ctx.strokeStyle = "brown";
		ctx.moveTo(0, 0);
		ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
		ctx.lineWidth = bowLineWidth;
		ctx.stroke();
		ctx.closePath();
		ctx.restore();

		// Handle
		ctx.fillStyle = "black";
		ctx.fillRect(x3 - 4, y3 - 10, 10, 40);
	}

	var drawString = function (ctx, pullPointX, pullPointY) {

		//Top Half
		ctx.save();
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.moveTo(0, 0);
		ctx.lineTo(pullPointX, pullPointY);
		ctx.stroke();
		ctx.closePath();
		ctx.restore();

		//Bottom Half
		ctx.save();
		ctx.beginPath();
		ctx.scale(1, -1);
		ctx.translate(0,-360);
		ctx.moveTo(0, 0);
		ctx.lineTo(pullPointX, pullPointY);
		ctx.lineWidth = 1;
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}

	SpriteLibrary.bow = function (bowSpecification) {
		var ctx = bowSpecification.ctx;

		var x1 = 0;
		var y1 = 80;
		var x2 = 100;
		var y2 = 25;
		var x3 = 50;
		var y3 = 170;
		var bowLineWidth = 10;

		var stringLineWidth = 1;
		var pullPointX = bowSpecification.pullPointX || 0;
		var pullPointY = y3 + 10;

		drawBow(ctx, x1, y1, x2, y2, x3, y3, bowLineWidth);

		drawString(ctx, pullPointX, pullPointY);

	};
}());