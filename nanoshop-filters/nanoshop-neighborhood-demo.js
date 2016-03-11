/*
 * This demo script uses the NanoshopNeighborhood module to apply a
 * "pixel neighborhood" filter on a canvas drawing.
 */
(function () {
    var canvas = $("#picture")[0];
    var ctx = canvas.getContext("2d");

    window.SpriteLibrary = window.SpriteLibrary || { };

    // Scene created by Angela Elgar: https://github.com/aelgar
    var archerLeftUpArmAngle = Math.PI / 2;
        var archerRightArmAngle = -Math.PI / 6;

        var targetOpacity = 1;

        var bowPullPointX = -50;

        var numsOpacity = 1;
        var firstNum = "3";
        var secondNum = "8";
        var thirdNum = "2";
        var fourthNum = "5";

        //Background
        ctx.save();
        ctx.scale(1.8, 1.2);
        SpriteLibrary.background({
            ctx: ctx
        });
        ctx.restore();

        ctx.save();
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, canvas.width, canvas.height * (2/3))
        ctx.fillStyle = "green";
        ctx.fillRect(0, canvas.height * (2/3), canvas.width, canvas.height * (1/3))
        ctx.restore();

        //Archer
        ctx.save();
        ctx.translate(120, 100);
        ctx.scale(0.7, 0.7);
        SpriteLibrary.stickman({
            ctx: ctx,
            leftUpArmAngle: archerLeftUpArmAngle,
            rightArmAngle: archerRightArmAngle
        });
        ctx.restore();

        //Target
        ctx.save();
        ctx.translate(800, 70);
        ctx.scale(0.7, 0.7);
        SpriteLibrary.target({
            ctx: ctx,
            opacity: targetOpacity
        });
        ctx.restore();

        //Numbers
        ctx.save();
        ctx.translate(860, 70);
        SpriteLibrary.dmgnums({
            ctx: ctx,
            opacity: numsOpacity,
            firstNum: firstNum,
            secondNum: secondNum,
            thirdNum: thirdNum,
            fourthNum: fourthNum
        });
        ctx.restore();

        //Arrow
        ctx.save();
        ctx.translate(150, 150);
        ctx.scale(0.5, 0.5);
        SpriteLibrary.arrow({
            ctx: ctx
        });
        ctx.restore();

        //Bow
        ctx.save();
        ctx.translate(300, 100);
        ctx.scale(0.3, 0.3);
        SpriteLibrary.bow({
            ctx: ctx,
            pullPointX: bowPullPointX
        });
        ctx.restore();

    // Set a little event handler to apply the filter.
    $("#apply-filter-button").click(function () {
        // Filter time.
        ctx.putImageData(
            NanoshopNeighborhood.applyFilter(
                ctx,
                ctx.getImageData(0, 0, canvas.width, canvas.height),
                //NanoshopNeighborhood.darkener
                //NanoshopNeighborhood.averager // Convenience comment for easy switching.
                //NanoshopNeighborhood.swapper
                //NanoshopNeighborhood.basicEdgeDetector
                // NanoshopNeighborhood.grainy
                NanoshopNeighborhood.next
            ),
            0, 0
        );
    });
}());
