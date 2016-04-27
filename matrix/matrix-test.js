$(function() {

	test( "Creation test", function() {
  		var m1 = new Matrix();

  		deepEqual(m1.elements, [
                            1, 0, 0, 0,
                            0, 1, 0, 0,
                            0, 0, 1, 0,
                            0, 0, 0, 1
                            ], "Matrix Base");

  		var m2 = new Matrix([1, 2, 3, 4, 
  							 5, 6, 7, 8,
  							 9, 1, 2, 3,
  							 4, 5, 6, 7]);

  		deepEqual(m2.elements, [1, 2, 3, 4, 
	  							5, 6, 7, 8,
	  							9, 1, 2, 3,
	  							4, 5, 6, 7])
	});

	test( "Multiply Test", function() {
		var m1 = new Matrix([2, 2, 2, 2,
							 2, 2, 2, 2,
							 2, 2, 2, 2,
							 2, 2, 2, 2]);

		var m2 = new Matrix([2, 2, 2, 2,
							 2, 2, 2, 2,
							 2, 2, 2, 2,
							 2, 2, 2, 2]);

		var answer = new Matrix([16, 16, 16, 16,
								 16, 16, 16, 16,
								 16, 16, 16, 16,
								 16, 16, 16, 16]);

		var result = m1.multiply(m2);
		deepEqual(result.elements, answer.elements, "Matrix Multiplied!");
	});

	test( "Scale Test", function() {
		var m = new Matrix();
		var result = m.scale(8, 10, 3);
		deepEqual(result.elements,
			[8, 0, 0, 0,
			 0, 10, 0, 0,
			 0, 0, 3, 0,
			 0, 0, 0, 1],
			 "Scale Matrix returned");
	});

	test( "Translate Test", function() {
		var m = new Matrix();
		var result = m.translate(8, 10, 3);
		deepEqual(result.elements,
			[1, 0, 0, 8,
			 0, 1, 0, 10,
			 0, 0, 1, 3,
			 0, 0, 0, 1],
			 "Translate Matrix returned");
	});

	test( "Rotate Test", function() {
		var m = new Matrix();
		var result = m.rotate(90, 0, 0, 1);
		deepEqual(result.elements,
			[Math.cos(Math.PI / 2), -Math.sin(Math.PI / 2), 0, 0,
			 Math.sin(Math.PI / 2),  Math.cos(Math.PI / 2), 0, 0,
			 0, 0, 1, 0,
			 0, 0, 0, 1],
			 "Rotate Test 1 returned");
	});

	test( "Ortho Test", function() {
		var m = new Matrix();
		var result = m.ortho(-2, 2, -10, 10, -5, 5);
		deepEqual(result.elements,
			[0.5, 0, 0, 0,
			 0, 0.1, 0, 0,
			 0, 0, -0.2, 0,
			 0, 0, 0, 1],
			 "Matrix Ortho Projection returned");
	});

});