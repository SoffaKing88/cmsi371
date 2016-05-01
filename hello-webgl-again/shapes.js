

/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
(function() {
    window.Shape = window.Shape || {};

    Shape = function (parameters) {
        this.x = parameters.x || 0;
        this.y = parameters.y || 0;
        this.z = parameters.z || 0;
        this.children = parameters.children || [];
        this.color = parameters.color || {r: 0.0, g: 0.0, b: 0.0};
        this.colors = parameters.colors || null;
        this.mode = parameters.mode;
        this.axis = parameters.axis || {x: 0.0, y: 0.0, z: 0.0};
        this.sx = parameters.sx || 1;
        this.sy = parameters.sy || 1;
        this.sz = parameters.sz || 1;
        this.tx = parameters.tx || 0;
        this.ty = parameters.ty || 0;
        this.tz = parameters.tz || 0;
        this.angle = parameters.angle || 0;
        this.rx = parameters.rx || 1;
        this.ry = parameters.ry || 1;
        this.rz = parameters.rz || 1;
        this.vertices = parameters.vertices || [];
        this.indices = parameters.indices || [];
    };

    //Returns the vertices for a cube
    Shape.rectangularPrism = function (length, height, depth) {
        
        var x = length || 0.5,
            y = height || 0.5,
            z = depth || 0.5;

        return {
            vertices: [
                [x, y, z],
                [x, -y, z],
                [-x,-y, z],
                [-x, y, z],
                [x, y, -z],
                [x, -y, -z],
                [-x, -y, -z],
                [-x, y, -z]
            ],

            indices: [
                [0, 1, 3],
                [3, 1, 2],
                [0, 5, 1],
                [5, 0, 4],
                [3, 2, 6],
                [6, 7, 3],
                [0, 3, 4],
                [3, 7, 4],
                [1, 5, 2],
                [2, 5, 6],
                [4, 6, 5],
                [4, 7, 6]
            ]
        };
    };

    Shape.pyramid = function () {
        return {
            vertices: [
                [0, 1, 0],
                [1, 0, 0],
                [0, 0, -1],
                [-1, 0, 0],
                [0, 0, 1]
            ],

            indices: [
                [0, 4, 1],
                [0, 1, 2],
                [0, 2, 3],
                [0, 3, 4],
                [1, 2, 3],
                [2, 3, 1]
            ]
        };
    };

    /* 


    http://stackoverflow.com/questions/20353339/having-trouble-rendering-a-sphere-in-webgl

    */
    Shape.sphere = function (radius, resolution) {
        var radius = radius || 0.5
            //Higher the number the more detailed the sphere, but longer loading time
            latitudeBands = resolution || 20,
            longitudeBands = latitudeBands,

            vertices = [],
            indices = [];

        for (var i = 0; i <= latitudeBands; i += 1) {
            var theta = (i * Math.PI) / latitudeBands;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);


            for(var j = 0; j <= longitudeBands; j += 1) {
                var phi = (j * 2 * Math.PI) / longitudeBands;
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi)

                var x = cosPhi * sinTheta * radius;
                var y = cosTheta * radius;
                var z = sinPhi * sinTheta * radius;

                vertices.push([x, y, z]);
            }
        }

        for (var k = 0; k <= vertices.length - latitudeBands - 2; k += 1) {
            indices.push(
                [k, k + 1, k + latitudeBands + 1],
                [k + 1, k + latitudeBands + 1, k + latitudeBands + 2]
            );
        }

        return {
            vertices: vertices,
            indices: indices
        }
    };

    /*
     * Returns the vertices for a small icosahedron.
     */
    Shape.icosahedron = function () {
        // These variables are actually "constants" for icosahedron coordinates.
        var X = 0.525731112119133606,
            Z = 0.850650808352039932;

        return {
            vertices: [
                [ -X, 0.0, Z ],
                [ X, 0.0, Z ],
                [ -X, 0.0, -Z ],
                [ X, 0.0, -Z ],
                [ 0.0, Z, X ],
                [ 0.0, Z, -X ],
                [ 0.0, -Z, X ],
                [ 0.0, -Z, -X ],
                [ Z, X, 0.0 ],
                [ -Z, X, 0.0 ],
                [ Z, -X, 0.0 ],
                [ -Z, -X, 0.0 ]
            ],

            indices: [
                [ 1, 4, 0 ],
                [ 4, 9, 0 ],
                [ 4, 5, 9 ],
                [ 8, 5, 4 ],
                [ 1, 8, 4 ],
                [ 1, 10, 8 ],
                [ 10, 3, 8 ],
                [ 8, 3, 5 ],
                [ 3, 2, 5 ],
                [ 3, 7, 2 ],
                [ 3, 10, 7 ],
                [ 10, 6, 7 ],
                [ 6, 11, 7 ],
                [ 6, 0, 11 ],
                [ 6, 1, 0 ],
                [ 10, 1, 6 ],
                [ 11, 0, 9 ],
                [ 2, 11, 9 ],
                [ 5, 2, 9 ],
                [ 11, 2, 7 ]
            ]
        };
    };

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */
    Shape.prototype.toRawTriangleArray = function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ]
                );
            }
        }

        return result;
    };

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
    Shape.prototype.toRawLineArray = function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ],

                    indexedVertices.vertices[
                        indexedVertices.indices[i][(j + 1) % maxj]
                    ]
                );
            }
        }

        return result;
    };

    Shape.prototype.toRawPointArray = function (indexedVertices) {
        var result = [],
            max = indexedVertices.vertices.length;

        for (i = 0; i < max; i += 1) {
            result = result.concat(indexedVertices.vertices[i]);
        }

        return result;
    };
}());