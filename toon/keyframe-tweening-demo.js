/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas");

    // First, a selection of "drawing functions" from which we
    // can choose.  Their common trait: they all accept a single
    // renderingContext argument.
    var square = function (renderingContext) {
        renderingContext.fillStyle = "blue";
        renderingContext.fillRect(-20, -20, 40, 40);
    };

    var circle = function (renderingContext) {
        renderingContext.strokeStyle = "red";
        renderingContext.beginPath();
        renderingContext.arc(0, 0, 50, 0, Math.PI * 2);
        renderingContext.stroke();
    };

    var arrow = function (parameters) {
        renderingContext = parameters.renderingContext,
        length = parameters.length
    }

    // Then, we have "easing functions" that determine how
    // intermediate frames are computed.

    // Now, to actually define the animated sprites.  Each sprite
    // has a drawing function and an array of keyframes.
    var sprites = [
        {
            draw: arrow,
            keyframes: [
                {
                    frame: 0,
                    tx: 100,
                    ty: 100,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        length: 50,
                        height: 10
                    }
                },

                {
                    frame: 20,
                    tx: 150,
                    ty: 100,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        length: 100,
                        height: 10
                    }
                }
            ]
        },

        {
            draw: background,
            keyframes: [
                {
                    frame: 0,
                    tx: 0,
                    ty: 0
                },

                {
                    frame: 5000,
                    tx: 0,
                    ty: 0
                }
            ]
        },

        {
            draw: bow,
            keyframes: [
                {
                    frame: 0,
                    tx: 150,
                    ty: 150,
                    ease: KeyframeTweener.linear,
                    parameters: {

                    }
                }]
        }
    ];

    // Finally, we initialize the engine.  Mainly, it needs
    // to know the rendering context to use.  And the animations
    // to display, of course.
    KeyframeTweener.initialize({
        renderingContext: canvas.getContext("2d"),
        width: canvas.width,
        height: canvas.height,
        sprites: sprites
    });
}());
