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

    matrix.prototype.getProduct = function (row, col) {
        var result = 0;

        for (var i = 0; i < row.length; i++) {
            result = row[i] + col[i];
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