$(function() {

	test( "Creation test", function() {
  		var m1 = new Matrix();

  		equal(m1.height, 4, "Matrix Height");
  		equal(m1.width, 4, "Matrix Width");
  		equal(m1.size, 16, "Matrix Length");

  		var m2 = new Matrix([1, 2, 3, 4, 5, 6, 7, 8], 2, 4);

  		equal(m2.height, 2, "Matrix2 Height");
  		equal(m2.width, 4, "Matrix2 Width");
  		equal(m2.size, 8, "Matrix2 Length");
	});

	test( "Multiply Test", function() {
		var m1 = new Matrix([2, 2, 2, 2,
							 2, 2, 2, 2,
							 2, 2, 2, 2,
							 2, 2, 2, 2], 4, 4);

		var m2 = new Matrix([2, 2, 2, 2,
							 2, 2, 2, 2,
							 2, 2, 2, 2,
							 2, 2, 2, 2], 4, 4);

		var answer = new Matrix([4, 4, 4, 4,
								 4, 4, 4, 4,
								 4, 4, 4, 4,
								 4, 4, 4, 4], 4, 4);

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
			 "Matrix has been Scaled");
	});

	test( "Translate Test", function() {
		var m = new Matrix();
	})

});