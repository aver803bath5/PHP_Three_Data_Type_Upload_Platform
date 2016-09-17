$(document).ready(function(){
	var clearFile1 = $('#clearfile1');
	var clearFile2 = $('#clearfile2');
	var clearFile3 = $('#clearfile3');

	clearFile1.click(function() {
		$('input[name=file1]').val("");
	})

	clearFile2.click(function() {
		$('input[name=file2]').val("");
	})

	clearFile3.click(function() {
		$('input[name=file3]').val("");
	})


	var input1 = $('input[name=file1]');
	var input2 = $('input[name=file2]');
	var input3 = $('input[name=file3]');

	input1.on('change',  function(event) {
		var fileName1 = $('input[name=file1]').val();
		var fileName2 = $('input[name=file2]').val();
		var fileName3 = $('input[name=file3]').val();

		if (fileName2 != "") {
			if (fileName1 == fileName2) {
				alert("你選到相同檔案囉！！！");
				$('input[name=file1]').val("");
			}
		}
		if (fileName3 != "") {
			if (fileName1 == fileName3) {
				alert("你選到相同檔案囉！！！");
				$('input[name=file1]').val("");
			}
		}
	});

	input2.on('change',  function(event) {
		var fileName1 = $('input[name=file1]').val();
		var fileName2 = $('input[name=file2]').val();
		var fileName3 = $('input[name=file3]').val();

		if (fileName3 != "") {
			if (fileName1 == fileName2) {
				alert("你選到相同檔案囉！！！");
				$('input[name=file2]').val("");
			}

		}
		if (fileName1 != "") {
			if (fileName1 == fileName2) {
				alert("你選到相同檔案囉！！！");
				$('input[name=file2]').val("");
			}
		}
	});

	input3.on('change',  function(event) {
		var fileName1 = $('input[name=file1]').val();
		var fileName2 = $('input[name=file2]').val();
		var fileName3 = $('input[name=file3]').val();

		if (fileName2 != "") {
			if (fileName2 == fileName3) {
				alert("你選到相同檔案囉！！！");
				$('input[name=file3]').val("");
			}
		}
		if (fileName3 != "") {
			if (fileName1 == fileName3) {
				alert("你選到相同檔案囉！！！");
				$('input[name=file3]').val("");
			}
		}
	});

})