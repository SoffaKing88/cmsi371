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
        vertexColor,

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
            color: {r: 0.0, g: 0.5, b: 0.0},
            vertices: new Shape(Shape.rectangularPrism()).toRawLineArray(),
            mode: gl.LINES,
            translate: { x: 0.0, y: 0.0, z: 2.0},
            rotate: {x: 0.1, y: 0.1, z: 0.1},
            // scale: {x: 0.5, y: 0.5, z: 0.5},
            children: [new Shape({
                color: {r: 0.5, g: 0.0, b: 0.0},
                vertices: new Shape(Shape.sphere()).toRawLineArray(),
                mode: gl.LINES,
                translate: { x: 0.0, y: 0.0, z: 1.0},
            }),
            new Shape({
                color: {r: 1.0, g: 0.0, b: 0.0},
                vertices: new Shape(Shape.pyramid()).toRawLineArray(),
                mode: gl.LINES,
                translate: { x: 0.0, y: 0.0, z: 0.0}
            })]
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
    vertexColor = gl.getAttribLocation(shaderProgram, "vertexColor");
    gl.enableVertexAttribArray(vertexColor);

    // Finally, we come to the typical setup for transformation matrices:
    // model-view and projection, managed separately.
    modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");

    rotationMatrix = gl.getUniformLocation(shaderProgram, "rotationMatrix");
    translationMatrix = gl.getUniformLocation(shaderProgram, "translationMatrix");
    scaleMatrix = gl.getUniformLocation(shaderProgram, "scaleMatrix");
    frustumMatrix = gl.getUniformLocation(shaderProgram, "frustumMatrix");
    orthoMatrix = gl.getUniformLocation(shaderProgram, "orthoMatrix");

    //Instantiate projection matrix
    // gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Float32Array(Matrix.frustum(-4, 4, -2, 2, 1, 200).toGL()));

    //Instantiate translation matrix
    // gl.uniformMatrix4fv(translationMatrix, gl.FALSE, Matrix.translate(0, 0, 0).toGL());

    //Instantiate scale matrix
    // gl.uniformMatrix4fv(scaleMatrix, gl.FALSE, Matrix.scale(1, 1, 1).toGL());

    //Instantiate rotation matrix
    // gl.uniformMatrix4fv(rotationMatrix, gl.FALSE, Matrix.rotate(0, 1, 1, 1).toGL());
    /*
     * Displays an individual object, including a transformation that now varies
     * for each object drawn.
     */
    drawObject = function (object, parentMatrix) {
        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);

        // Set up the model-view matrix, if an axis is included.  If not, we
        // specify the identity matrix.
        // gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(object.axis ?
        //         Matrix.rotate(currentRotation, object.axis.x, object.axis.y, object.axis.z).elements :
        //         new Matrix().elements
        //     ));

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
        // theMatrix = new Matrix().rotate(
        //             currentRotation, object.rx, object.ry, object.rz
        //     );
        console.log(theMatrix.toGL());
        console.log(object);
        // gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, theMatrix.toGL());

        gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(theMatrix.toGL()));

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

        // Display the objects.
        for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            drawObject(objectsToDraw[i]);
        }

        // All done.
        gl.flush();
    };

    // Because our canvas element will not change size (in this program),
    // we can set up the projection matrix once, and leave it at that.
    // Note how this finally allows us to "see" a greater coordinate range.
    // We keep the vertical range fixed, but change the horizontal range
    // according to the aspect ratio of the canvas.  We can also expand
    // the z range now.

    gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Float32Array(new Matrix().ortho(
        -2 * (canvas.width / canvas.height),
        2 * (canvas.width / canvas.height),
        -2,
        2,
        -10,
        10
    ).toGL()));

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
        currentRotation += 0.033 * progress;
        drawScene();
        if (currentRotation >= 360.0) {
            currentRotation -= 360.0;
        }

        // Request the next frame.
        previousTimestamp = timestamp;
        window.requestAnimationFrame(advanceScene);
    };

    // Draw the initial scene.
    drawScene();

    // Set up the rotation toggle: clicking on the canvas does it.
    $(canvas).click(function () {
        animationActive = !animationActive;
        if (animationActive) {
            previousTimestamp = null;
            window.requestAnimationFrame(advanceScene);
        }
    });

}(document.getElementById("my-scene")));
