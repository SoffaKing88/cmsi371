

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
        this.specularColor = parameters.specularColor || {r: 1.0, g: 1.0, b: 1.0};
        this.specularColors = parameters.specularColors || null;
        this.shininess = parameters.shininess || 0;
        this.normals = parameters.normals || null;

        this.mode = parameters.mode;

        this.scale = parameters.scale || {x: 1.0, y: 1.0, z: 1.0};
        this.translate = parameters.translate || {x: 0.0, y: 0.0, z: 0.0};
        this.rotate = parameters.rotate || {x: 1.0, y: 1.0, z: 1.0};

        this.axis = parameters.axis || {x: 1.0, y: 1.0, z: 1.0};
        this.angle = parameters.angle || 180;
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
                [0, 3, 1],
                [3, 2, 1],
                [0, 1, 5],
                [5, 4, 0],
                [3, 6, 2],
                [6, 3, 7],
                [0, 4, 3],
                [3, 4, 7],
                [1, 2, 5],
                [2, 6, 5],
                [4, 5, 6],
                [4, 6, 7]
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
                [3, 4, 1]
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

                var indexPartOne = (i * (longitudeBands + 1)) + j;
                var indexPartTwo = indexPartOne + longitudeBands + 1;

                //Indices Method #2 - Lighting is upside down
                if(i != latitudeBands && j != longitudeBands){
                    // indices.push([indexPartOne, indexPartTwo, indexPartOne + 1]);
                    // indices.push([indexPartTwo, indexPartTwo + 1, indexPartOne + 1]);
                    indices.push([indexPartOne + 1, indexPartTwo, indexPartOne]);
                    indices.push([indexPartOne + 1, indexPartTwo + 1, indexPartTwo]);
                }
            }
        }

        //Indices method #1 - Lighting is checkered
        // for (var k = 0; k <= vertices.length - latitudeBands - 3; k += 1) {
        //     indices.push(
        //         [k, k + 1, k + latitudeBands + 1],
        //         [k + 1, k + latitudeBands + 1, k + latitudeBands + 2]
        //     );
        // }

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
    Shape.prototype.toRawTriangleArray = function () {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = this.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    this.vertices[
                        this.indices[i][j]
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
    Shape.prototype.toRawLineArray = function () {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = this.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    this.vertices[
                        this.indices[i][j]
                    ],

                    this.vertices[
                        this.indices[i][(j + 1) % maxj]
                    ]
                );
            }
        }

        return result;
    };

    Shape.prototype.toRawPointArray = function () {
        var result = [],
            max = this.vertices.length;

        for (i = 0; i < max; i += 1) {
            result = result.concat(this.vertices[i]);
        }

        return result;
    };

    /*
     * Utility function for computing normal vectors based on indexed vertices.
     * The secret: take the cross product of each triangle.  Note that vertex order
     * now matters---the resulting normal faces out from the side of the triangle
     * that "sees" the vertices listed counterclockwise.
     *
     * The vector computations involved here mean that the Vector module must be
     * loaded up for this function to work.
     */
    Shape.prototype.toNormalArray = function () {
        var result = [],
            i,
            j,
            maxi,
            maxj,
            p0,
            p1,
            p2,
            v0,
            v1,
            v2,
            normal;

        // console.log(this.vertices);
        // console.log(this.indices);
        // For each face...
        for (i = 0, maxi = this.indices.length; i < maxi; i += 1) {
            // We form vectors from the first and second then second and third vertices.
            p0 = this.vertices[this.indices[i][0]];
            p1 = this.vertices[this.indices[i][1]];
            p2 = this.vertices[this.indices[i][2]];

            // Technically, the first value is not a vector, but v can stand for vertex
            // anyway, so...
            // console.log(i);
            // console.log(p2[0]);
            v0 = new Vector(p0[0], p0[1], p0[2]);
            v1 = new Vector(p1[0], p1[1], p1[2]).subtract(v0);
            v2 = new Vector(p2[0], p2[1], p2[2]).subtract(v0);
            normal = v1.cross(v2).unit();

            // We then use this same normal for every vertex in this face.
            for (j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    [ normal.x(), normal.y(), normal.z() ]
                );
            }
        }

        return result;
    };

    /*
     * Another utility function for computing normals, this time just converting
     * every vertex into its unit vector version.  This works mainly for objects
     * that are centered around the origin.
     */
    Shape.prototype.toVertexNormalArray = function () {
        var result = [],
            i,
            j,
            maxi,
            maxj,
            p,
            normal;

        // For each face...
        for (i = 0, maxi = this.indices.length; i < maxi; i += 1) {
            // For each vertex in that face...
            for (j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
                p = this.vertices[this.indices[i][j]];
                normal = new Vector(p[0], p[1], p[2]).unit();
                result = result.concat(
                    [ normal.x(), normal.y(), normal.z() ]
                );
            }
        }

        return result;
    };

}());