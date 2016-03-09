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
                    frame: 500,
                    tx: 800,
                    ty: 70,
                    sx: 0.7,
                    sy: 0.7,
                    parameters: {
                        opacity: 1
                    }
                }
            ]
        },

        {
            draw: SpriteLibrary.arrow,
            keyframes: [
                {
                    frame: 0,
                    tx: 105,
                    ty: 90,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: 85,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        
                    }
                },

                {
                    frame: 100,
                    tx: 105,
                    ty: 90,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: 85,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        
                    }
                },

                {
                    frame: 125,
                    tx: 100,
                    ty: 70,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: 85,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        
                    }
                },

                {
                    frame: 140,
                    tx: 145,
                    ty: 60,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: 130,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        
                    }
                },

                {
                    frame: 170,
                    tx: 120,
                    ty: 100,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: 270,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        
                    }
                },

                {
                    frame: 190,
                    tx: 125,
                    ty: 125,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: 365,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        
                    }
                },

                {
                    frame: 200,
                    tx: 125,
                    ty: 125,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: 365,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        
                    }
                },

                {
                    frame: 240,
                    tx: 75,
                    ty: 120,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: 365,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        
                    }
                },

                {
                    frame: 270,
                    tx: 75,
                    ty: 120,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: 365,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        
                    }
                },

                {
                    frame: 285,
                    tx: 800,
                    ty: 135,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: 365,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        
                    }
                },

                {
                    frame: 500,
                    tx: 800,
                    ty: 135,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: 365,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        
                    }
                }
            ]
        },

        {
            draw: SpriteLibrary.quiver,
            keyframes: [
                {
                    frame: 0,
                    tx: 95,
                    ty: 120,
                    parameters: {

                    }
                },

                {
                    frame: 400,
                    tx: 95,
                    ty: 120,
                    parameters: {

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
                    ease: KeyframeTweener.quadEaseInAndOut,
                    parameters: {
                        leftUpArmAngle: (Math.PI / 6),
                        leftForearmAngle: (11 * Math.PI / 6),
                        rightArmAngle: (-Math.PI / 5.6)
                    }
                },

                {
                    frame: 30,
                    tx: 100,
                    ty: 100,
                    sx: 0.7,
                    sy: 0.7,
                    ease: KeyframeTweener.quadEaseInAndOut,
                    parameters: {
                        leftUpArmAngle: (Math.PI / 6),
                        leftForearmAngle: (11 * Math.PI / 6),
                        rightArmAngle: (-Math.PI / 5.6)
                    }
                },

                {
                    frame: 100,
                    tx: 100,
                    ty: 100,
                    sx: 0.7,
                    sy: 0.7,
                    ease: KeyframeTweener.quadEaseInAndOut,
                    parameters: {
                        leftUpArmAngle: (-5 * Math.PI / 6),
                        leftForearmAngle: (7 * Math.PI / 6),
                        rightArmAngle: (-Math.PI / 2.2)
                    }
                },

                {
                    frame: 150,
                    tx: 100,
                    ty: 100,
                    sx: 0.7,
                    sy: 0.7,
                    ease: KeyframeTweener.quadEaseInAndOut,
                    parameters: {
                        leftUpArmAngle: (-5 * Math.PI / 6),
                        leftForearmAngle: (11 * Math.PI / 6),
                        rightArmAngle: (-Math.PI / 2.2)
                    }
                },

                {
                    frame: 160,
                    tx: 100,
                    ty: 100,
                    sx: 0.7,
                    sy: 0.7,
                    ease: KeyframeTweener.quadEaseInAndOut,
                    parameters: {
                        leftUpArmAngle: (-5 * Math.PI / 6),
                        leftForearmAngle: (11 * Math.PI / 6),
                        rightArmAngle: (-Math.PI / 2.2)
                    }
                },

                {
                    frame: 200,
                    tx: 100,
                    ty: 100,
                    sx: 0.7,
                    sy: 0.7,
                    ease: KeyframeTweener.quadEaseInAndOut,
                    parameters: {
                        leftUpArmAngle: (-1 * Math.PI / 3),
                        leftForearmAngle: (5 * Math.PI / 3),
                        rightArmAngle: (-Math.PI / 2.2)
                    }
                },

                {
                    frame: 240,
                    tx: 100,
                    ty: 100,
                    sx: 0.7,
                    sy: 0.7,
                    ease: KeyframeTweener.quadEaseInAndOut,
                    parameters: {
                        leftUpArmAngle: (Math.PI / 3),
                        leftForearmAngle: (Math.PI),
                        rightArmAngle: (-Math.PI / 2.2)
                    }
                },

                {
                    frame: 400,
                    tx: 100,
                    ty: 100,
                    sx: 0.7,
                    sy: 0.7,
                    ease: KeyframeTweener.quadEaseInAndOut,
                    parameters: {
                        leftUpArmAngle: (Math.PI / 3),
                        leftForearmAngle: (Math.PI),
                        rightArmAngle: (-Math.PI / 2.2)
                    }
                }
            ]
        },

        {
            draw: SpriteLibrary.bow,
            keyframes: [
                {
                    frame: 0,
                    tx: 168,
                    ty: 122,
                    sx: 0.3,
                    sy: 0.3,
                    rotate: 50,
                    ease: KeyframeTweener.quadEaseInAndOut,
                    parameters: {
                        pullPointX: 0
                    }
                },

                {
                    frame: 30,
                    tx: 168,
                    ty: 122,
                    sx: 0.3,
                    sy: 0.3,
                    rotate: 50,
                    ease: KeyframeTweener.quadEaseInAndOut,
                    parameters: {
                        pullPointX: 0
                    }
                },

                {
                    frame: 100,
                    tx: 150,
                    ty: 75,
                    sx: 0.3,
                    sy: 0.3,
                    rotate: 3,
                    ease: KeyframeTweener.quadEaseInAndOut,
                    parameters: {
                        pullPointX: 0
                    }
                },

                {
                    frame: 200,
                    tx: 150,
                    ty: 75,
                    sx: 0.3,
                    sy: 0.3,
                    rotate: 3,
                    ease: KeyframeTweener.quadEaseInAndOut,
                    parameters: {
                        pullPointX: 0
                    }
                },

                {
                    frame: 240,
                    tx: 150,
                    ty: 75,
                    sx: 0.3,
                    sy: 0.3,
                    rotate: 3,
                    ease: KeyframeTweener.quadEaseInAndOut,
                    parameters: {
                        pullPointX: -130
                    }
                },

                {
                    frame: 270,
                    tx: 150,
                    ty: 75,
                    sx: 0.3,
                    sy: 0.3,
                    rotate: 3,
                    ease: KeyframeTweener.easeOutElastic,
                    parameters: {
                        pullPointX: -130
                    }
                },

                {
                    frame: 275,
                    tx: 150,
                    ty: 75,
                    sx: 0.3,
                    sy: 0.3,
                    rotate: 3,
                    ease: KeyframeTweener.easeOutElastic,
                    parameters: {
                        pullPointX: 0
                    }
                },

                {
                    frame: 400,
                    tx: 150,
                    ty: 75,
                    sx: 0.3,
                    sy: 0.3,
                    rotate: 3,
                    ease: KeyframeTweener.easeOutElastic,
                    parameters: {
                        pullPointX: 0
                    }
                }
            ]
        },

        {
            draw: SpriteLibrary.dmgnums,
            keyframes: [
                {
                    frame: 285,
                    tx: 860,
                    ty: 60,
                    ease: KeyframeTweener.easeOutBounce,
                    parameters: {
                        opacity: 0,
                        ONEfirstNum: 3,
                        ONEsecondNum: 8
                    }
                },

                {
                    frame: 325,
                    tx: 860,
                    ty: 70,
                    ease: KeyframeTweener.easeOutBounce,
                    parameters: {
                        opacity: 1,
                        ONEfirstNum: 3,
                        ONEsecondNum: 8
                    }
                },

                {
                    frame: 365,
                    tx: 860,
                    ty: 70,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        opacity: 1,
                        ONEfirstNum: 3,
                        ONEsecondNum: 8
                    }
                },

                {
                    frame: 445,
                    tx: 860,
                    ty: 70,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        opacity: 0,
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
