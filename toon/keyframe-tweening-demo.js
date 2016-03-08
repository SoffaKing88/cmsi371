/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas");

    // First, a selection of "drawing functions" from which we
    // can choose.  Their common trait: they all accept a single
    // renderingContext argument.
    
    // Then, we have "easing functions" that determine how
    // intermediate frames are computed.

    // Now, to actually define the animated sprites.  Each sprite
    // has a drawing function and an array of keyframes.
    var sprites = [
        {
            draw: SpriteLibrary.background,
            keyframes: [
                {
                    frame: 0,
                    tx: 0,
                    ty: 0,
                    sx: 1.8,
                    sy: 1.5,
                    parameters: {

                    }
                },

                {
                    frame: 5000,
                    tx: 0,
                    ty: 0,
                    sx: 1.8,
                    sy: 1.5,
                    parameters: {

                    }
                }
            ]
        },

        {
            draw: SpriteLibrary.arrow,
            keyframes: [
                {
                    frame: 0,
                    tx: 100,
                    ty: 100,
                    sx: 0.5,
                    sy: 0.5,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        
                    }
                },

                {
                    frame: 100,
                    tx: 800,
                    ty: 100,
                    sx: 0.5,
                    sy: 0.5,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        
                    }
                }
            ]
        },

        {
            draw: SpriteLibrary.bow,
            keyframes: [
                {
                    frame: 0,
                    tx: 150,
                    ty: 150,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        pullPointX: 25
                    }
                },

                {
                    frame: 250,
                    tx: 200,
                    ty: 150,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        pullPointX: 80
                    }
                }
            ]
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
