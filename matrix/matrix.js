(function () {

    window.Matrix = window.Matrix || {};
    // Define the constructor.
    Matrix = function (array, height, width) {
        this.elements = array || [
                                  1, 0, 0, 0,
                                  0, 1, 0, 0,
                                  0, 0, 1, 0,
                                  0, 0, 0, 1
                                  ];
        this.height = height || 4;
        this.width = width || 4;
        this.size = height * width || 16;
    }
        

    // Basic methods.
    Matrix.prototype.dimensions = function () {
        return this.size;
    };

    Matrix.height = function () {
        return this.height;
    }

    Matrix.width = function () {
        return this.width;
    }

    // Scalar multiplication
    Matrix.prototype.multiply = function (m) {
        var result = []

        for (var rowNum = 0, rowMax = this.dimensions(); rowNum < rowMax; rowNum += this.height) {
            var row = [];
            for (var rowIterator = rowNum, rowIteratorMax = rowNum + this.width; rowIterator < rowIteratorMax; rowIterator++) {
                row.push(this.elements[rowIterator]);
            }
            for (var colNum = 0, colNumMax = m.width; colNum < colNumMax; colNum++) {
                var col = [];
                for (var colIterator = colNum, colIteratorMax = m.dimensions(); colIterator < colIteratorMax; colIterator += this.width) {
                    col.push(this.elements[colIterator]);
                }
                result.push(this.getProduct(row, col));
            }
        }
        // console.log(result);
        var endMatrix = new Matrix(result, this.height, this.width);
        // console.log(endMatrix);
        return endMatrix;
    };

    //Supplemental function to multiply the two array's together
    Matrix.prototype.getProduct = function (row, col) {
        var result = 0;

        for (var i = 0; i < row.length; i++) {
            result = row[i] + col[i];
        }

        return result;
    };

    // Scaling
    Matrix.scale = function (sx, sy, sz) {
        var scaleX = sx || 1,
            scaleY = sy || 1,
            scaleZ = sz || 1;

        return new Matrix(
            [
                scaleX, 0, 0, 0,
                0, scaleY, 0, 0,
                0, 0, scaleZ, 0,
                0, 0, 0, 1
            ], 4, 4);
    };

    // Translating
    Matrix.translate = function (tx, ty, tz) {
        var translateX = tx || 1,
            translateY = ty || 1,
            translateZ = tz || 1;

        return new Matrix(
            [
            1, 0, 0, translateX,
            0, 1, 0, translateY,
            0, 0, 1, translateZ,
            0, 0, 0, 1
            ]
        );
    };

    // Rotating
    Matrix.rotate = function (angle, rx, ry, rz) {

        var axisLength = Math.sqrt((rx * rx) + (ry * ry) + (rz * rz)),
            sin = Math.sin(angle * Math.PI / 180),
            cos = Math.cos(angle * Math.PI / 180),
            oneMinCos = 1 - cos,

            x2,
            y2,
            z2,
            xy,
            yz,
            xz,
            xsin,
            ysin,
            zsin;
            // console.log(cos);
            // console.log(oneMinCos);

        rx /= axisLength;
        ry /= axisLength;
        rz /= axisLength;

        x2 = rx * rx;
        y2 = ry * ry;
        z2 = rz * rz;
        xy = rx * ry;
        yz = ry * rz;
        xz = rx * rz;
        xsin = rx * sin;
        ysin = ry * sin;
        zsin = rz * sin;

        // console.log(y2);
        // console.log(cos);
        // console.log(oneMinCos);
        // console.log(xsin);
        // console.log((y2 * oneMinCos) - xsin);
        return new Matrix([
            (x2 * oneMinCos) + cos, (xy * oneMinCos) - zsin, (xz * oneMinCos) + ysin, 0,
            (xy * oneMinCos) + zsin, (y2 * oneMinCos) + cos, (y2 * oneMinCos) - xsin, 0,
            (xz * oneMinCos) - ysin, (yz * oneMinCos) + xsin, (z2 * oneMinCos) + cos, 0,
            0, 0, 0, 1
            ]);
    };

    Matrix.ortho = function (left, right, bottom, top, near, far) {
        var width = right - left,
            height = top - bottom,
            depth = far - near;

        if (right === -left && top === -bottom) {
            return new Matrix([
                1.0 / right, 0.0, 0.0, 0.0,
                0.0, 1.0 / top, 0.0, 0.0,
                0.0, 0.0, -2.0 / depth, -(far + near) / depth,
                0.0, 0.0, 0.0, 1.0
                ]);
        } else {
            return new Matrix ([
                2.0 / width, 0.0, 0.0, -(right + left) / width,
                0.0, 2.0 / height, 0.0, -(top + bottom) / height,
                0.0, 0.0, -2.0 / depth, -(far + near) / depth,
                0.0, 0.0, 0.0, 1.0
            ]);
        }
    };

    Matrix.frustum = function (left, right, bottom, top, near, far) {
        var width = right - left,
            height = top - bottom,
            depth = far - near;

        if (right === -left && top === -bottom) {
            return new Matrix([
                near / right, 0, 0, 0,
                0, near / top, 0, 0,
                0, 0, -(far + near) / depth, (-2 * near * far) / depth,
                0, 0, -1, 0]
            );
        } else {
            return new Matrix([
                2 * near / width, 0, (right + left) / width,
                0, 2 * near / height, (top + bottom) / height,
                0, 0, -(far + near) / depth, (-2 * near * far) / depth,
                0, 0, -1, 0]
            );
        }
    };

    Matrix.prototype.toGL = function () {
        var result = [];

        for (var i = 0; i < 4; i++) {
            result.push(this.elements[i], this.elements[i+4], this.elements[i+8], this.elements[i+12]);
        }

        return result;
    };

    return Matrix;
}());