(function () {

	window.SpriteLibrary = window.SpriteLibrary || { };
	
	var HEAD_RADIUS = 20;
	var BODY_WIDTH = 10;
	var BODY_LENGTH = 100;
	var LEG_WIDTH = BODY_WIDTH;
	var LEG_LENGTH = 85;
	var ARM_WIDTH = BODY_WIDTH;
	var ARM_LENGTH = 80;

	var drawLeg = function (ctx, legOffset, legAngle) {
		ctx.save();
		ctx.translate(legOffset, BODY_LENGTH);
		ctx.rotate(legAngle);
		ctx.fillRect(-LEG_WIDTH / 2, 0, LEG_WIDTH, LEG_LENGTH);
		ctx.restore();
	}

	var drawStraightArm = function(ctx, armOffset, armAngle) {
		ctx.save();
		ctx.translate(armOffset, BODY_LENGTH / 3);
		ctx.rotate(armAngle);
		ctx.fillRect(-ARM_WIDTH / 2, 0, ARM_WIDTH, ARM_LENGTH);
		ctx.restore();
	}

	var drawBentArm = function(ctx, upArmOffset, upArmAngle, forearmAngle) {
			//Upper Arm
		ctx.save();
		ctx.translate(upArmOffset, BODY_LENGTH / 3);
		ctx.rotate(upArmAngle);
		ctx.fillRect(-ARM_WIDTH / 2, 0, ARM_WIDTH, ARM_LENGTH / 2);
			//Elbow
		ctx.beginPath();
		ctx.translate(0, ARM_LENGTH / 2);
		ctx.arc(0, 0, ARM_WIDTH / 2, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();
			//Fore Arm
		ctx.rotate(forearmAngle);
		ctx.fillRect(-ARM_WIDTH / 2, 0, ARM_WIDTH, ARM_LENGTH / 2);
		ctx.restore();
	}

	SpriteLibrary.stickman = function (stickmanSpecification) {
		var ctx = stickmanSpecification.ctx || document.getElementById("canvas").getContext("2d");

		var leftLegAngle = stickmanSpecification.leftLegAngle || (Math.PI / 15);
		var rightLegAngle = stickmanSpecification.rightLegAngle || (-Math.PI / 15);

		var leftUpArmAngle = stickmanSpecification.leftUpArmAngle || (Math.PI / 6);
		var leftForearmAngle = stickmanSpecification.leftForearmAngle || (-Math.PI / 2);
		var rightArmAngle = stickmanSpecification.rightArmAngle || (-Math.PI / 6);

		//Head
		ctx.beginPath();
		ctx.arc(15, 0, HEAD_RADIUS, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();

		//Body
		ctx.fillRect(5, 0, BODY_WIDTH, BODY_LENGTH);

		//Legs
		drawLeg(ctx, BODY_WIDTH, leftLegAngle);
		drawLeg(ctx, BODY_WIDTH, rightLegAngle);

		//Arms


		//Left Arm
		drawBentArm(ctx, BODY_WIDTH, leftUpArmAngle, leftForearmAngle);

		//Right Arm
		drawStraightArm(ctx, BODY_WIDTH, rightArmAngle);
	}
}());