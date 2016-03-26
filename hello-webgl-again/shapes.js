/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
var Shapes = {
    //Returns the vertices for a cube
    cube: function () {
        
        var x = 0.5,
            y = 0.5,
            z = 0.5;

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
    },

    pyramid: function () {
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
    },

    sphere: function () {
        var radius = 0.5,
            latitudeBands = 50,
            longitudeBands = 50,
            vertices = [],
            indices = [];

        for (var i = 0; i < latitudeBands; i += 1) {
            var theta = (i * Math.PI) / latitudeBands;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);


            for(var j = 0; j < longitudeBands; j += 1) {
                var phi = (j * 2 * Math.PI) / longitudeBands;
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi)

                var x = cosPhi * sinTheta * radius;
                var y = cosTheta * radius;
                var z = sinPhi * sinTheta * radius;

                vertices.push([x, y, z]);
            }
        }

        for (var k = 0; k <= vertices.length; k += 1) {
            indices.push(
                [k, k + 1, k + latitudeBands + 1],
                [k + 1, k + latitudeBands + 1, k + latitudeBands + 2]
            );
        }

        return {
            vertices: vertices,
            indices: indices
        }
    },

    /*
     * Returns the vertices for a small icosahedron.
     */
    icosahedron: function () {
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
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */
    toRawTriangleArray: function (indexedVertices) {
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
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
    toRawLineArray: function (indexedVertices) {
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
    },

    toRawPointArray: function (indexedVertices) {
        var result = [],
            max = indexedVertices.vertices.length;

        for (i = 0; i < max; i += 1) {
            result = result.concat(indexedVertices.vertices[i]);
        }

        return result;
    }

};
