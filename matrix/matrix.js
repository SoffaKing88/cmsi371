var Matrix = (function () {
    // Define the constructor.
    var matrix = function () {
        this.elements = [].slice.call(arguments);
    },
    
        // A private method for checking dimensions,
        // throwing an exception when different.
        checkDimensions = function (m1, m2) {
            if (m1.dimensions() !== m2.dimensions()) {
                throw "Matrices have different dimensions";
            }
        };

    // Basic methods.
    matrix.prototype.dimensions = function () {
        return this.elements.length;
    };

    matrix.prototype.x = function () {
        return this.elements[0];
    };

    matrix.prototype.y = function () {
        return this.elements[1];
    };

    matrix.prototype.z = function () {
        return this.elements[2];
    };

    matrix.prototype.w = function () {
        return this.elements[3];
    };

    // Addition and subtraction.
    matrix.prototype.add = function (m) {
        var result = new Matrix(),
            i,
            max;

        // Dimensionality check.
        checkDimensions(this, m);

        for (i = 0, max = this.dimensions(); i < max; i += 1) {
            result.elements[i] = this.elements[i] + m.elements[i];
        }

        return result;
    };

    matrix.prototype.subtract = function (m) {
        var result = new Matrix(),
            i,
            max;

        // Dimensionality check.
        checkDimensions(this, m);

        for (i = 0, max = this.dimensions(); i < max; i += 1) {
            result.elements[i] = this.elements[i] - m.elements[i];
        }

        return result;
    };

    // Scalar multiplication and division.
    matrix.prototype.multiply = function (s) {
        var result = new Matrix(),
            i,
            max;

        for (i = 0, max = this.dimensions(); i < max; i += 1) {
            result.elements[i] = this.elements[i] * s;
        }

        return result;
    };

    matrix.prototype.divide = function (s) {
        var result = new Matrix(),
            i,
            max;

        for (i = 0, max = this.dimensions(); i < max; i += 1) {
            result.elements[i] = this.elements[i] / s;
        }

        return result;
    };

    // Dot product.
    matrix.prototype.dot = function (m) {
        var result = 0,
            i,
            max;

        // Dimensionality check.
        checkDimensions(this, m);

        for (i = 0, max = this.dimensions(); i < max; i += 1) {
            result += this.elements[i] * m.elements[i];
        }

        return result;
    };

    // Cross product.
    matrix.prototype.cross = function (m) {
        // This method is for 3D vectors only.
        if (this.dimensions() !== 3 || m.dimensions() !== 3) {
            throw "Cross product is for 3D matrices only.";
        }

        // With 3D vectors, we can just return the result directly.
        return new Matrix(
            (this.y() * m.z()) - (this.z() * m.y()),
            (this.z() * m.x()) - (this.x() * m.z()),
            (this.x() * m.y()) - (this.y() * m.x())
        );
    };

    // Magnitude and unit vector.
    matrix.prototype.magnitude = function () {
        // Make use of the dot product.
        return Math.sqrt(this.dot(this));
    };

    matrix.prototype.unit = function () {
        // At this point, we can leverage our more "primitive" methods.
        return this.divide(this.magnitude());
    };

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