(function () {

	window.SpriteLibrary = window.SpriteLibrary || { };

	var HEAD_RADIUS = 20;
	var BODY_WIDTH = 10;
	var BODY_LENGTH = 100;
	var LEG_WIDTH = BODY_WIDTH;
	var LEG_LENGTH = 85;
	var ARM_WIDTH = BODY_WIDTH;
	var ARM_LENGTH = 80;

	SpriteLibrary.stickman = function (stickmanSpecification) {
	
		var ctx = stickmanSpecification.ctx;

		//Head
		ctx.arc(10, 0, HEAD_RADIUS, 0, 2 * Math.PI, false);
		ctx.fill();

		//Body
		ctx.fillRect(0, 0, BODY_WIDTH, BODY_LENGTH);

		//Legs
		var leftLegAngle = Math.PI / 15;
		var rightLegAngle = -Math.PI / 15;

		//Left Leg
		ctx.save();
		ctx.translate(BODY_WIDTH - 5, BODY_LENGTH);
		ctx.rotate(leftLegAngle);
		ctx.fillRect(-LEG_WIDTH / 2, 0, LEG_WIDTH, LEG_LENGTH);
		ctx.restore();

		//Right Leg
		ctx.save();
		ctx.translate(BODY_WIDTH / 2.2, BODY_LENGTH);
		ctx.rotate(rightLegAngle);
		ctx.fillRect(-LEG_WIDTH / 2, 0, LEG_WIDTH, LEG_LENGTH);
		ctx.restore();

		//Arms
		var rightArmAngle = -Math.PI / 6;
		var leftArmAngle = Math.PI / 6;

		//Left Arm
			//Upper Arm
		ctx.save();
		ctx.translate(BODY_WIDTH - 5, BODY_LENGTH / 3);
		ctx.rotate(leftArmAngle);
		ctx.fillRect(-ARM_WIDTH / 2, 0, ARM_WIDTH, ARM_LENGTH / 2);
			//Fore Arm
		ctx.translate(0, ARM_LENGTH / 2);
		ctx.rotate(-leftArmAngle * 3);
		ctx.fillRect(-ARM_WIDTH / 2, 0, ARM_WIDTH, ARM_LENGTH / 2);
		ctx.restore();

		//Right Arm
		ctx.save();
		ctx.translate(BODY_WIDTH / 2.2, BODY_LENGTH / 3);
		ctx.rotate(rightArmAngle);
		ctx.fillRect(-ARM_WIDTH / 2, 0, ARM_WIDTH, ARM_LENGTH);
		ctx.restore();
	}
}());