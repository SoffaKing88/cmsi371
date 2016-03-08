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
            draw: SpriteLibrary.bow,
            keyframes: [
                {
                    frame: 0,
                    tx: 150,
                    ty: 150,
                    sx: 0.3,
                    sy: 0.3,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        pullPointX: 0
                    }
                },

                {
                    frame: 250,
                    tx: 200,
                    ty: 150,
                    sx: 0.3,
                    sy: 0.3,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        pullPointX: 500
                    }
                }
            ]
        },

        {
            draw: SpriteLibrary.stickman,
            keyframes: [
                {
                    frame: 0,
                    tx: 100,
                    ty: 100,
                    sx: 0.7,
                    sy: 0.7,
                    parameters: {

                    }
                },

                {
                    frame: 250,
                    tx: 100,
                    ty: 100,
                    sx: 0.7,
                    sy: 0.7,
                    parameters: {

                    }
                }
            ]
        },

        {
            draw: SpriteLibrary.target,
            keyframes: [
                {
                    frame: 0,
                    tx: 800,
                    ty: 70,
                    sx: 0.7,
                    sy: 0.7,
                    parameters: {
                        opacity: 1
                    }
                },

                {
                    frame: 250,
                    tx: 800,
                    ty: 70,
                    sx: 0.7,
                    sy: 0.7,
                    parameters: {
                        opacity: 0.1
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
                    ty: 110,
                    sx: 0.5,
                    sy: 0.5,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        
                    }
                },

                {
                    frame: 100,
                    tx: 820,
                    ty: 110,
                    sx: 0.5,
                    sy: 0.5,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        
                    }
                }
            ]
        },

        {
            draw: SpriteLibrary.dmgnums,
            keyframes: [
                {
                    frame: 100,
                    tx: 860,
                    ty: 60,
                    ease: KeyframeTweener.easeOutBounce,
                    parameters: {
                        opacity: 0.2,
                        ONEfirstNum: 3,
                        ONEsecondNum: 8
                    }
                },

                {
                    frame: 140,
                    tx: 860,
                    ty: 70,
                    ease: KeyframeTweener.easeOutBounce,
                    parameters: {
                        opacity: 0.2,
                        ONEfirstNum: 3,
                        ONEsecondNum: 8
                    }
                },

                {
                    frame: 200,
                    tx: 860,
                    ty: 70,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        opacity: 0.2,
                        ONEfirstNum: 3,
                        ONEsecondNum: 8
                    }
                },

                {
                    frame: 280,
                    tx: 860,
                    ty: 70,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        opacity: 0.2,
                        ONEfirstNum: 3,
                        ONEsecondNum: 8
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
