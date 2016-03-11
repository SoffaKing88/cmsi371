/*
 * This demo script uses the Nanoshop module to apply a simple
 * filter on a canvas drawing.
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
            var ONEdmgFirstNum = "3";
            var ONEdmgSecondNum = "8";
            var TWOdmgFirstNum = "2";
            var TWOdmgSecondNum = "5";

            var drawScene = function () {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                //Background
                ctx.save();
                ctx.scale(1.8, 1.2);
                SpriteLibrary.background({
                    ctx: ctx
                });
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
                ctx.translate(100, 100);
                SpriteLibrary.dmgnums({
                    ctx: ctx,
                    opacity: numsOpacity,
                    ONEfirstNum: ONEdmgFirstNum,
                    ONEsecondNum: ONEdmgSecondNum,
                    TWOfirstNum: TWOdmgFirstNum,
                    TWOsecondNum: TWOdmgSecondNum
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

                window.requestAnimationFrame(drawScene);

            };

        window.requestAnimationFrame(drawScene);

    // Set a little event handler to apply the filter.
    $("#apply-filter-button").click(function () {
        // Filter time.
        ctx.putImageData(
            Nanoshop.applyFilter(
                ctx.getImageData(0, 0, canvas.width, canvas.height),
                Nanoshop.darkener
            ),
            0, 0
        );
    });
}());