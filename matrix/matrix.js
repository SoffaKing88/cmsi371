var Matrix = (function () {
    // Define the constructor.
    var matrix = function (array, height, width) {
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
    matrix.prototype.dimensions = function () {
        return this.size;
    };

    matrix.prototype.height = function () {
        return this.height;
    }

    matrix.prototype.width = function () {
        return this.width;
    }

    // matrix.prototype.x = function () {
    //     return this.elements[0];
    // };

    // matrix.prototype.y = function () {
    //     return this.elements[1];
    // };

    // matrix.prototype.z = function () {
    //     return this.elements[2];
    // };

    // matrix.prototype.w = function () {
    //     return this.elements[3];
    // };

    // Scalar multiplication and division.
    matrix.prototype.multiply = function (m) {
        var result = [],
            row = [],
            col = [];

        for (var rowNum = 0; rowNum < this.height; rowNum += this.width) {
            for (var rowIterator = rowNum, rowIteratorMax = rowNum + this.width; rowIterator < rowIteratorMax; rowIterator++) {
                row.push(this.matrix[rowIterator]);
            }
            for (var colNum = 0, colNumMax = m.length; colNum < colNumMax; colNum += m.width) {
                for (var colIterator = colNum, colIteratorMax = colIterator + m.width; colIterator < colIteratorMax; colIterator++) {
                    col.push(this.matrix[colIterator]);
                }
                result.push(this.getProduct(row, col));
            }
        }
        var endMatrix = new Matrix(result, this.height, this.width);
        return endMatrix;
    };

    matrix.prototype.getProduct = function (row, col) {
        var result = [];

        for (var i = 0; i < row.length; i++) {
            result[i] = row[i] + col[i];
        }

        return result;
    }

    // Projection.
    matrix.prototype.projection = function (m) {
        var unitm;

        // Dimensionality check.
        checkDimensions(this, m);

        // Plug and chug :)
        // The projection of u onto v is u dot the unit vector of v
        // times the unit vector of v.
        unitm = m.unit();
        return unitm.multiply(this.dot(unitm));
    };

    return matrix;
})();