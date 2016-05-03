/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
(function (canvas) {

    // Because many of these variables are best initialized then immediately
    // used in context, we merely name them here.  Read on to see how they
    // are used.
    var gl, // The WebGL context.

        // This variable stores 3D model information.
        objectsToDraw,

        // The shader program to use.
        shaderProgram,

        // Utility variable indicating whether some fatal has occurred.
        abort = false,

        // Important state variables.
        animationActive = false,
        currentRotation = 0.0,
        currentInterval,
        modelViewMatrix,
        projectionMatrix,
        vertexPosition,
        vertexDiffuseColor,
        vertexSpecularColor,
        shininess,

        //Lighting Variables
        normalVector,
        lightPosition,
        lightDiffuse,
        lightSpecular,

        // An individual "draw object" function.
        drawObject,

        // The big "draw scene" function.
        drawScene,

        // State and function for performing animation.
        previousTimestamp,
        advanceScene,

        // Reusable loop variables.
        i,
        maxi,
        j,
        maxj,

        //Camera Movement Variables
        camPosX = 0,
        camPosZ = 0,

        keyW = false,
        keyA = false,
        keyS = false,
        keyD = false;

    // Keystrokes commands
    keystrokes = function(event) {
        canvas = document.getElementById('my-scene');

        document.addEventListener('mousedown', function(event) {
            lastDownTarget = event.target;
            // alert('mousedown');
        }, false);

        document.addEventListener('keydown', function(event) {
            if(lastDownTarget == canvas) {
                // alert('keydown');

                var keyCode = event.keyCode;
                switch (keyCode) {
                case 68: //d
                  keyD = true;
                  console.log("D down");
                  break;
                case 83: //s
                  keyS = true;
                  console.log("S down");
                  break;
                case 65: //as
                  keyA = true;
                  console.log("A down");
                  break;
                case 87: //w
                  keyW = true;
                  console.log("W down");
                  break;
                }
            }
        }, false);

        document.addEventListener('keyup', function(event) {
            if(lastDownTarget == canvas) {

                var keyCode = event.keyCode;
                switch (keyCode) {
                case 68: //d
                  keyD = false;
                    console.log("D up");
                  break;
                case 83: //s
                  keyS = false;
                    console.log("S up");
                  break;
                case 65: //a
                  keyA = false;
                    console.log("A up");
                  break;
                case 87: //w
                  keyW = false;
                    console.log("W up");
                  break;
                }
            }
        })
    };

    // Grab the WebGL rendering context.
    gl = GLSLUtilities.getGL(canvas);
    if (!gl) {
        alert("No WebGL context found...sorry.");

        // No WebGL, no use going on...
        return;
    }

    // Set up settings that will not change.  This is not "canned" into a
    // utility function because these settings really can vary from program
    // to program.
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Build the objects to display.  Note how each object may come with a
    // rotation axis now.
    objectsToDraw = [

        new Shape ({
            color: {r: 1.0, g: 0.0, b: 0.0},
            specularColor: {r: 1.0, g: 1.0, b: 1.0 },
            shininess: 16,

            vertices: new Shape(Shape.rectangularPrism()).toRawTriangleArray(),
            normals: new Shape(Shape.rectangularPrism()).toNormalArray(),
            mode: gl.TRIANGLES,
            translate: { x: 0.0, y: 0.0, z: -10.0},
            // rotate: {x: 0.1, y: 0.1, z: 0.1},
            scale: {x: 0.5, y: 0.5, z: 0.5},
            children: [
                new Shape({
                    color: {r: 0.0, g: 1.0, b: 0.0},
                    specularColor: {r: 1.0, g: 1.0, b: 1.0 },
                    shininess: 16,

                    vertices: new Shape(Shape.sphere()).toRawTriangleArray(),
                    normals: new Shape(Shape.sphere()).toNormalArray(),
                    mode: gl.TRIANGLES,
                    translate: { x: 3.0, y: 0.0, z: 0.0},
                    axis: {x: 1.0, y: 0.0, z: 0.0}
                }),

                new Shape({
                    color: {r: 0.0, g: 0.0, b: 1.0},
                    specularColor: {r: 1.0, g: 1.0, b: 1.0 },
                    shininess: 16,

                    vertices: new Shape(Shape.pyramid()).toRawTriangleArray(),
                    normals: new Shape(Shape.pyramid()).toNormalArray(),
                    mode: gl.TRIANGLES,
                    translate: { x: -3.0, y: 0.0, z: 0.0}
                })
            ]
        })
    ];

    // Pass the vertices to WebGL.
    var vertexing = function (objectsToDraw) {
        for (var i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            objectsToDraw[i].buffer = GLSLUtilities.initVertexBuffer(gl,
                    objectsToDraw[i].vertices);

            if (!objectsToDraw[i].colors) {
                // If we have a single color, we expand that into an array
                // of the same color over and over.
                objectsToDraw[i].colors = [];
                for (j = 0, maxj = objectsToDraw[i].vertices.length / 3;
                        j < maxj; j += 1) {
                    objectsToDraw[i].colors = objectsToDraw[i].colors.concat(
                        objectsToDraw[i].color.r,
                        objectsToDraw[i].color.g,
                        objectsToDraw[i].color.b
                    );
                }
            }
            objectsToDraw[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                objectsToDraw[i].colors);

            if (!objectsToDraw[i].specularColors) {
            // Future refactor: helper function to convert a single value or
            // array into an array of copies of itself.
                objectsToDraw[i].specularColors = [];
                for (j = 0, maxj = objectsToDraw[i].vertices.length / 3;
                       j < maxj; j += 1) {
                    objectsToDraw[i].specularColors = objectsToDraw[i].specularColors.concat(
                        objectsToDraw[i].specularColor.r,
                        objectsToDraw[i].specularColor.g,
                        objectsToDraw[i].specularColor.b
                    );
                }
            }
            objectsToDraw[i].specularBuffer = GLSLUtilities.initVertexBuffer(gl,
                    objectsToDraw[i].specularColors);

            // One more buffer: normals.
            objectsToDraw[i].normalBuffer = GLSLUtilities.initVertexBuffer(gl,
                    objectsToDraw[i].normals);

            if ((objectsToDraw[i].children.length > 0) && objectsToDraw[i].colorBuffer) {
                vertexing(objectsToDraw[i].children);
            }
        }
    },

    // Initialize the shaders.
    shaderProgram = GLSLUtilities.initSimpleShaderProgram(
        gl,
        $("#vertex-shader").text(),
        $("#fragment-shader").text(),

        // Very cursory error-checking here...
        function (shader) {
            abort = true;
            alert("Shader problem: " + gl.getShaderInfoLog(shader));
        },

        // Another simplistic error check: we don't even access the faulty
        // shader program.
        function (shaderProgram) {
            abort = true;
            alert("Could not link shaders...sorry.");
        }
    );

    // If the abort variable is true here, we can't continue.
    if (abort) {
        alert("Fatal errors encountered; we cannot continue.");
        return;
    }

    // All done --- tell WebGL to use the shader program from now on.
    gl.useProgram(shaderProgram);

    // Hold on to the important variables within the shaders.
    vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);
    vertexDiffuseColor = gl.getAttribLocation(shaderProgram, "vertexDiffuseColor");
    gl.enableVertexAttribArray(vertexDiffuseColor);
    vertexSpecularColor = gl.getAttribLocation(shaderProgram, "vertexSpecularColor");
    gl.enableVertexAttribArray(vertexSpecularColor);
    normalVector = gl.getAttribLocation(shaderProgram, "normalVector");
    gl.enableVertexAttribArray(normalVector);

    // Matrices to see the scene
    modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    cameraMatrix = gl.getUniformLocation(shaderProgram, "cameraMatrix");

    // Matrix functions
    // rotationMatrix = gl.getUniformLocation(shaderProgram, "rotationMatrix");
    translationMatrix = gl.getUniformLocation(shaderProgram, "translationMatrix");
    scaleMatrix = gl.getUniformLocation(shaderProgram, "scaleMatrix");

    // Perspective view or orthographic view
    frustumMatrix = gl.getUniformLocation(shaderProgram, "frustumMatrix");
    orthoMatrix = gl.getUniformLocation(shaderProgram, "orthoMatrix");

    // Lighting stuff
    lightPosition = gl.getUniformLocation(shaderProgram, "lightPosition");
    lightDiffuse = gl.getUniformLocation(shaderProgram, "lightDiffuse");
    lightSpecular = gl.getUniformLocation(shaderProgram, "lightSpecular");
    shininess = gl.getUniformLocation(shaderProgram, "shininess");

    /*
     * Displays an individual object, including a transformation that now varies
     * for each object drawn.
     */
    drawObject = function (object, parentMatrix) {
        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexDiffuseColor, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, object.specularBuffer);
        gl.vertexAttribPointer(vertexSpecularColor, 3, gl.FLOAT, false, 0, 0);

        gl.uniform1f(shininess, object.shininess);

        var theMatrix = new Matrix()

        theMatrix = theMatrix.multiply(

            new Matrix().translate(
                object.translate.x, object.translate.y, object.translate.z
            )).multiply(
                new Matrix().scale(
                    object.scale.x, object.scale.y, object.scale.z
            )).multiply(
                new Matrix().rotate(
                    currentRotation, object.rotate.x, object.rotate.y, object.rotate.z
            ));

        if(parentMatrix){
            theMatrix = parentMatrix.multiply(theMatrix);
        }
        // console.log(theMatrix.toGL());
        // console.log(object);

        gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(theMatrix.toGL()));

        //Set the varying normal vectors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.normalBuffer);
        gl.vertexAttribPointer(normalVector, 3, gl.FLOAT, false, 0, 0);

        // Set the varying vertex coordinates.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(object.mode, 0, object.vertices.length / 3);

        if (object.children.length > 0) {
            for(var i = 0; i < object.children.length; i++){
                drawObject(object.children[i], theMatrix);
            }
        }
    };

    /*
     * Displays the scene.
     */

    drawScene = function () {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //Attempting to change CamPosX and Z Values for cameraMatrix to move
        if(keyD == true){
            camPosX += 0.1;
        }
        if(keyS == true){
            camPosZ += 0.1;
        }
        if(keyA == true){
            camPosX -= 0.1;
        }
        if(keyW == true){
            camPosZ -= 0.1;
        }

        gl.uniformMatrix4fv(cameraMatrix, gl.FALSE, new Matrix().cameraMatrix(camPosX, 0, -camPosZ, 0, 0, -1 - camPosZ, 0, 1, 0).toGL());
        console.log(camPosX);
        console.log(camPosZ);

        //Orthographic View
        // gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Float32Array(new Matrix().ortho(
        //     -2 * (canvas.width / canvas.height),
        //     2 * (canvas.width / canvas.height),
        //     -2,
        //     2,
        //     -10,
        //     10
        // ).toGL()));

        //Perspective View
        gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Float32Array(new Matrix().frustum(
            -2 * (canvas.width / canvas.height),
            2 * (canvas.width / canvas.height),
            -2,
            2,
            5,
            2000
        ).toGL()));

        // Display the objects.
        for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            drawObject(objectsToDraw[i]);
        }

        // All done.
        gl.flush();
    },

    //Lighting Values
    gl.uniform4fv(lightPosition, [500.0, 1000.0, 100.0, 1.0]);
    gl.uniform3fv(lightDiffuse, [1.0, 1.0, 1.0]);
    gl.uniform3fv(lightSpecular, [1.0, 1.0, 1.0]);

    vertexing(objectsToDraw);

    // Animation initialization/support.
    previousTimestamp = null;
    advanceScene = function (timestamp) {
        // Check if the user has turned things off.
        if (!animationActive) {
            return;
        }

        // Initialize the timestamp.
        if (!previousTimestamp) {
            previousTimestamp = timestamp;
            window.requestAnimationFrame(advanceScene);
            return;
        }

        // Check if it's time to advance.
        var progress = timestamp - previousTimestamp;
        if (progress < 30) {
            // Do nothing if it's too soon.
            window.requestAnimationFrame(advanceScene);
            return;
        }

        // All clear.
        // currentRotation += 0.001 * progress;
        drawScene();
        keystrokes();
        // if (currentRotation >= 360.0) {
        //     currentRotation -= 360.0;
        // }

        // Request the next frame.
        previousTimestamp = timestamp;
        window.requestAnimationFrame(advanceScene);
    };

    // Draw the initial scene.
    drawScene();
    keystrokes();

    // Set up the rotation toggle: clicking on the canvas does it.
    $(canvas).click(function () {
        animationActive = !animationActive;
        if (animationActive) {
            previousTimestamp = null;
            window.requestAnimationFrame(advanceScene);
        }
    });

}(document.getElementById("my-scene")));
