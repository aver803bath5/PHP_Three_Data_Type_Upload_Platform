$(document).ready(function(){
	
//動態改標題
	var check = 0;
	var a = new Date();
	var now = a.getFullYear() + '/' + parseInt(a.getMonth()+1) + '/' + a.getDate() + ' ' + a.getHours()+ 
	':' + a.getMinutes() + ':' +a.getSeconds();

	$('.topic').on('dblclick', $('.topic'), function(event) {
		event.preventDefault();
		if ($(event.target).is('input') || check == 1) {
			return false;
		}else{
			old_value = $(this).html();
			$(this).html("<input type='text' class='topic_change' value=" + old_value + ">");
			$('.topic_change[value='+old_value+']').focus();
			check = 1;
		}
	});

	$('.topic').on('keyup',$('.topic_change'), function(event) {
		var id = $(this).data('id');
		var new_value = $(this).children('.topic_change').val();
		if (event.keyCode == 13) {
			if (old_value==new_value) {
				alert('你幹嘛要用一樣的名字，87');
				$('.topic[data-id='+id+']').html(old_value);
				check = 0;
				return false;
			}
			$.post('./ChangeTopic.php', {id: id, new_value: new_value, now: now}, function(data, textStatus, xhr) {
				if (data == "sametopicname") {
					alert('標題重複了，87！');
					$('.topic[data-id='+id+']').html(old_value);
					check = 0;
				}
				if (data == "success") {
					$('.topic[data-id='+id+']').html(new_value);
					$('.time[data-id='+id+']').html(now);
					check = 0;
				}
			});
		}

		if (event.keyCode == 27) {
			$('.topic[data-id='+id+']').html(old_value);
			check = 0;
		}
	});
//動態改標題FIN

//動態改檔案
//Word File Dynamic Change
	var old_link = null;
	$('.doc_file').dblclick(function(event) {
		var id = $(this).data('id');
		if ($(event.target).is('input') || check == 1) {
			return false;
		}else{
			old_value = $(this).find('a').attr('href').split('/');
			old_value = old_value[old_value.length-1];
			old_link = $(this).html();
			$(this).html("<input type='file' name='doc_file' class='doc_file_change' data-id="+id+" accept='.doc,.docx'><br>"+"<p>原檔案：" + old_link + "</p>");
			$('.doc_file_change[data-id='+id+']').click();
			check = 1;
		}
	});

	$('.doc_file').on('change',$('.doc_file_change'), function(event) {
		event.preventDefault();
		var id = $(this).data('id');
		var new_value = $(this).children('.doc_file_change').val().split('\\');
		new_value = new_value[new_value.length-1];
		if (old_value == new_value) {
			alert('你好像上傳一樣的檔案囉87');
			$('.doc_file_change').val('');
			$(this).html(old_link);
			check = 0;
			return false;
		}
		var data = $('.doc_file_change')[0].files[0];
		var form_data = new FormData($('.doc_file_change'));
       	form_data.append("doc_file", data);
       	form_data.append('id',id);
       	form_data.append('now',now);
		$.ajax({
		    url: 'ChangeDocFile.php',
		    data: form_data,
		    cache: false,
		    contentType: false,
		    processData: false,
		    type: 'POST',
		    success: function(data){
		    	if (data == "good") {
		    		$('.doc_file[data-id='+id+']').html("<a href='./upload/" + new_value + "'download>"+ new_value.split('.')[0] +"</a>");
					$('.doc_download_times[data-id='+id+']').html(0);
					$('.time[data-id='+id+']').html(now);
					check = 0;
		    	}
		    	if (data == 'notmytype') {
		    		alert('Only WORD FILE 87');
		    		$('.doc_file[data-id='+id+']').html(old_link);
		    		check = 0;
		    	}
		    	if (data == 'samefilename') {
		    		alert('有同檔名的檔案存在了87');
		    		$('.doc_file[data-id='+id+']').html(old_link);
		    		check = 0;
		    	}
			}
		});
	});

	$('body').on('keyup', $('.doc_file_change'), function(event) {
		event.preventDefault();
		var id = $('.doc_file_change').data('id');
		if (event.keyCode == 27) {
			$('.doc_file[data-id='+id+']').html(old_link);
			check = 0;
		}
	});

//Pdf File Dynamic Change
	$('.pdf_file').dblclick(function(event) {
		var id = $(this).data('id');
		if ($(event.target).is('input') || check == 1) {
			return false;
		}else{
			old_value = $(this).find('a').attr('href').split('/');
			old_value = old_value[old_value.length-1];
			old_link = $(this).html();
			$(this).html("<input type='file' name='doc_file' class='pdf_file_change' data-id="+id+" accept='.pdf'><br>"+"<p>原檔案：" + old_link + "</p>");
			$('.pdf_file_change[data-id='+id+']').click();
			check = 1;
		}
	});

	$('.pdf_file').on('change',$('.pdf_file_change'), function(event) {
		event.preventDefault();
		var id = $(this).data('id');
		var new_value = $(this).children('.pdf_file_change').val().split('\\');
		new_value = new_value[new_value.length-1];
		if (old_value == new_value) {
			alert('你好像上傳一樣的檔案囉87');
			$('.pdf_file_change').val('');
			$(this).html(old_link);
			check = 0;
			return false;
		}
		var data = $('.pdf_file_change')[0].files[0];
		var form_data = new FormData($('.pdf_file_change'));
       	form_data.append("pdf_file", data);
       	form_data.append('id',id);
       	form_data.append('now',now);
		$.ajax({
		    url: 'ChangePdfFile.php',
		    data: form_data,
		    cache: false,
		    contentType: false,
		    processData: false,
		    type: 'POST',
		    success: function(data){
		    	if (data == "good") {
		    		$('.pdf_file[data-id='+id+']').html("<a href='./upload/" + new_value + "'download>"+ new_value.split('.')[0] +"</a>");
					$('.pdf_download_times[data-id='+id+']').html(0);
					$('.time[data-id='+id+']').html(now);
					check = 0;
		    	}
		    	if (data == 'notmytype') {
		    		alert('Only PDF FILE 87');
		    		$('.pdf_file[data-id='+id+']').html(old_link);
		    		check = 0;
		    	}
		    	if (data == 'samefilename') {
		    		alert('有同檔名的檔案存在了87');
		    		$('.pdf_file[data-id='+id+']').html(old_link);
		    		check = 0;
		    	}
			}
		});
	});

	$('body').on('keyup', $('.pdf_file_change'), function(event) {
		event.preventDefault();
		var id = $('.pdf_file_change').data('id');
		if (event.keyCode == 27) {
			$('.pdf_file[data-id='+id+']').html(old_link);
			check = 0;
		}
	});

//Odt File Dynamic Change
	$('.odt_file').dblclick(function(event) {
		var id = $(this).data('id');
		if ($(event.target).is('input') || check == 1) {
			return false;
		}else{
			old_value = $(this).find('a').attr('href').split('/');
			old_value = old_value[old_value.length-1];
			old_link = $(this).html();
			$(this).html("<input type='file' name='odt_file' class='odt_file_change' data-id="+id+" accept='.odt'><br>"+"<p>原檔案：" + old_link + "</p>");
			$('.odt_file_change[data-id='+id+']').click();
			check = 1;
		}
	});

	$('.odt_file').on('change',$('.odt_file_change'), function(event) {
		event.preventDefault();
		var id = $(this).data('id');
		var new_value = $(this).children('.odt_file_change').val().split('\\');
		new_value = new_value[new_value.length-1];
		if (old_value == new_value) {
			alert('你好像上傳一樣的檔案囉87');
			$('.odt_file_change').val('');
			$(this).html(old_link);
			check = 0;
			return false;
		}
		var data = $('.odt_file_change')[0].files[0];
		var form_data = new FormData($('.odt_file_change'));
       	form_data.append("odt_file", data);
       	form_data.append('id',id);
       	form_data.append('now',now);
		$.ajax({
		    url: 'ChangeOdtFile.php',
		    data: form_data,
		    cache: false,
		    contentType: false,
		    processData: false,
		    type: 'POST',
		    success: function(data){
		    	if (data == "good") {
		    		$('.odt_file[data-id='+id+']').html("<a href='./upload/" + new_value + "'download>"+ new_value.split('.')[0] +"</a>");
					$('.odt_download_times[data-id='+id+']').html(0);
					$('.time[data-id='+id+']').html(now);
					check = 0;
		    	}
		    	if (data == 'notmytype') {
		    		alert('Only PDF FILE 87');
		    		$('.odt_file[data-id='+id+']').html(old_link);
		    		check = 0;
		    	}
		    	if (data == 'samefilename') {
		    		alert('有同檔名的檔案存在了87');
		    		$('.odt_file[data-id='+id+']').html(old_link);
		    		check = 0;
		    	}
			}
		});
	});

	$('body').on('keyup', $('.odt_file_change'), function(event) {
		event.preventDefault();
		var id = $('.odt_file_change').data('id');
		if (event.keyCode == 27) {
			$('.odt_file[data-id='+id+']').html(old_link);
			check = 0;
		}
	});

//新增檔案
	$('.add').click(function(event) {
		var id = null;
		$.get('./Insert.php?now='+now, function(data) {
			id = data;
			$('tbody').append("\
				<tr>\
				<td data-id= " + id + " class='topic'></td>\
				<td data-id= " + id + " class='time'>"+ now +"</td>\
				<td data-id= " + id + " class='doc_file'></td>\
				<td data-id= " + id + " class='doc_download_times'></td>\
				<td data-id= " + id + " class='pdf_file'></td>\
				<td data-id= " + id + " class='pdf_download_times'></td>\
				<td data-id= " + id + " class='odt_file'></td>\
				<td data-id= " + id + " class='odt_download_times'></td>\
				<td><a href='delete.php?id=$id' class='btn btn-danger'>刪除</a></td>\
				</tr>");
		});
	});

})