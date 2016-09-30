$(document).ready(function(){
	
//動態改標題
	var check = 0;
	
	var old_value = null;

	function getTime(){
		var a = new Date();
		var now = a.getFullYear() + '/' + parseInt(a.getMonth()+1) + '/' + a.getDate() + ' ' + a.getHours()+ 
		':' + a.getMinutes() + ':' +a.getSeconds();
		return now;
	}

	$('tbody').on('keyup',$('.topic_change'), function(event) {
		var id = $(event.target).data('id');
		if (event.keyCode == 13) {
			var new_value = $(event.target).val();
			if (old_value==new_value) {
				alert('取到跟以前一樣的名字囉！');
				$('.topic[data-id='+id+']').html(old_value);
				check = 0;
				return false;
			}
			$.post('./ChangeTopic.php', {id: id, new_value: new_value, now: getTime()}, function(data, textStatus, xhr) {
				if (data == "sametopicname") {
					alert('標題重複了啦XD');
					$('.topic[data-id='+id+']').html(old_value);
					check = 0;
				}
				if (data == "success") {
					$('.topic[data-id='+id+']').html(new_value);
					$('.time[data-id='+id+']').html(getTime());
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
	$('tbody').on('dblclick', function(event) {
		event.preventDefault();
		var id = $(event.target).data('id');
		var target = $(event.target);
		if ($(event.target).is('input') || check == 1) {
			return false;
		}

		if (target.hasClass('topic')) {
			old_value = $(".topic[data-id="+id+"]").html();
			$('.topic[data-id='+id+']').html("<input type='text' class='topic_change' data-id="+id+" value='" + old_value + "'>");
			$('.topic_change[data-id='+id+']').focus();
			check = 1;
		}

		if (target.hasClass('doc_file')) {
			old_value = $(event.target).find('a').attr('href').split('/');
			old_value = old_value[old_value.length-1];
			old_link = $('.doc_file[data-id='+id+']').html();
			$('.doc_file[data-id='+id+']').html("<input type='file' name='doc_file' class='doc_file_change' data-id="+id+" accept='.doc,.docx'><br>"+"<p>原檔案：" + old_link + "</p>");
			$('.doc_file_change[data-id='+id+']').click();
			check = 1;
		}

		if (target.hasClass('pdf_file')) {
			old_value = $(event.target).find('a').attr('href').split('/');
			old_value = old_value[old_value.length-1];
			old_link = $('.pdf_file[data-id='+id+']').html();
			$('.pdf_file[data-id='+id+']').html("<input type='file' name='pdf_file' class='pdf_file_change' data-id="+id+" accept='.pdf'><br>"+"<p>原檔案：" + old_link + "</p>");
			$('.pdf_file_change[data-id='+id+']').click();
			check = 1;
		}

		if (target.hasClass('odt_file')) {
			old_value = $(event.target).find('a').attr('href').split('/');
			old_value = old_value[old_value.length-1];
			old_link = $('.odt_file[data-id='+id+']').html();
			$('.odt_file[data-id='+id+']').html("<input type='file' name='odt_file' class='odt_file_change' data-id="+id+" accept='.odt'><br>"+"<p>原檔案：" + old_link + "</p>");
			$('.odt_file_change[data-id='+id+']').click();
			check = 1;
		}
	});

	$('tbody').on('change', function(event) {
		event.preventDefault();
		var target = $(event.target);
		var id = target.data('id');
		var new_value = target.val().split('\\');
		new_value = new_value[new_value.length-1];

		if (target.hasClass('doc_file_change')) {
			if (old_value == new_value) {
				alert('你好像上傳一樣的檔案囉！');
				$('.doc_file_change[data-id='+id+']').val('');
				$('.doc_file[data-id='+id+']').html(old_link);
				check = 0;
				return false;
			}
			var data = $('.doc_file_change')[0].files[0];
			var form_data = new FormData($('.doc_file_change'));
	       	form_data.append("doc_file", data);
	       	form_data.append('id',id);
	       	form_data.append('now',getTime());
			$.ajax({
			    url: 'ChangeDocFile.php',
			    data: form_data,
			    cache: false,
			    contentType: false,
			    processData: false,
			    type: 'POST',
			    success: function(data){
			    	if (data == "good") {
			    		$('.doc_file[data-id='+id+']').html("<a href='./DocFileDownload.php?file=./upload/" + new_value + "&id=" + id + "' data-id="+id+" class='doc_file_link' target='_blank'>"+ new_value.split('.')[0] +"</a>");
						$('.doc_download_times[data-id='+id+']').html(0);
						$('.time[data-id='+id+']').html(getTime());
						check = 0;
			    	}
			    	if (data == 'notmytype') {
			    		alert('這格只能傳word檔唷！');
			    		$('.doc_file[data-id='+id+']').html(old_link);
			    		check = 0;
			    	}
			    	if (data == 'samefilename') {
			    		alert('有同檔名的檔案存在囉！');
			    		$('.doc_file[data-id='+id+']').html(old_link);
			    		check = 0;
			    	}
			    	if (data == 'oversize') {
			    		alert('最大檔案大小為10MB');
			    		$('.doc_file[data-id='+id+']').html(old_link);
			    		check = 0;
			    	}
				}
			});
		}

		if (target.hasClass('pdf_file_change')) {
			if (old_value == new_value) {
				alert('你好像上傳一樣的檔案囉！');
				$('.pdf_file_change').val('');
				$('.pdf_file[data-id='+id+']').html(old_link);
				check = 0;
				return false;
			}
			var data = $('.pdf_file_change')[0].files[0];
			var form_data = new FormData($('.pdf_file_change'));
	       	form_data.append("pdf_file", data);
	       	form_data.append('id',id);
	       	form_data.append('now',getTime());
			$.ajax({
			    url: 'ChangePdfFile.php',
			    data: form_data,
			    cache: false,
			    contentType: false,
			    processData: false,
			    type: 'POST',
			    success: function(data){
			    	if (data == "good") {
			    		$('.pdf_file[data-id='+id+']').html("<a href='./PdfFileDownload.php?file=./upload/" + new_value + "&id=" + id + "' data-id="+id+" class='pdf_file_link' target='_blank'>"+ new_value.split('.')[0] +"</a>");
						$('.pdf_download_times[data-id='+id+']').html(0);
						$('.time[data-id='+id+']').html(getTime());
						check = 0;
			    	}
			    	if (data == 'notmytype') {
			    		alert('這格只能傳pdf檔唷！');
			    		$('.pdf_file[data-id='+id+']').html(old_link);
			    		check = 0;
			    	}
			    	if (data == 'samefilename') {
			    		alert('有同檔名的檔案存在囉！');
			    		$('.pdf_file[data-id='+id+']').html(old_link);
			    		check = 0;
			    	}
			    	if (data == 'oversize') {
			    		alert('最大檔案大小為10MB');
			    		$('.pdf_file[data-id='+id+']').html(old_link);
			    		check = 0;
			    	}
				}
			});
		}

		if (target.hasClass('odt_file_change')) {
			if (old_value == new_value) {
				alert('你好像上傳一樣的檔案囉！');
				$('.odt_file_change').val('');
				$('.doc_file[data-id='+id+']').html(old_link);
				check = 0;
				return false;
			}
			var data = $('.odt_file_change')[0].files[0];
			var form_data = new FormData($('.odt_file_change'));
	       	form_data.append("odt_file", data);
	       	form_data.append('id',id);
	       	form_data.append('now',getTime());
			$.ajax({
			    url: 'ChangeOdtFile.php',
			    data: form_data,
			    cache: false,
			    contentType: false,
			    processData: false,
			    type: 'POST',
			    success: function(data){
			    	if (data == "good") {
			    		$('.odt_file[data-id='+id+']').html("<a href='./OdtFileDownload.php?file=./upload/" + new_value + "&id=" + id + "' data-id="+id+" class='odt_file_link' target='_blank'>"+ new_value.split('.')[0] +"</a>");
						$('.odt_download_times[data-id='+id+']').html(0);
						$('.time[data-id='+id+']').html(getTime());
						check = 0;
			    	}
			    	if (data == 'notmytype') {
			    		alert('這格只能傳odt檔唷！');
			    		$('.odt_file[data-id='+id+']').html(old_link);
			    		check = 0;
			    	}
			    	if (data == 'samefilename') {
			    		alert('有同檔名的檔案存在囉！');
			    		$('.odt_file[data-id='+id+']').html(old_link);
			    		check = 0;
			    	}
			    	if (data == 'oversize') {
			    		alert('最大檔案大小為10MB');
			    		$('.dot_file[data-id='+id+']').html(old_link);
			    		check = 0;
			    	}
				}
			});
		}
	});

//Cancel File Change
	$('body').on('keyup', $('.doc_file_change'), function(event) {
		event.preventDefault();
		var id = $('.doc_file_change').data('id');
		if (event.keyCode == 27) {
			$('.doc_file[data-id='+id+']').html(old_link);
			check = 0;
		}
	});

	$('body').on('keyup', $('.pdf_file_change'), function(event) {
		event.preventDefault();
		var id = $('.pdf_file_change').data('id');
		if (event.keyCode == 27) {
			$('.pdf_file[data-id='+id+']').html(old_link);
			check = 0;
		}
	});

	$('body').on('keyup', $('.odt_file_change'), function(event) {
		event.preventDefault();
		var id = $('.odt_file_change').data('id');
		if (event.keyCode == 27) {
			$('.odt_file[data-id='+id+']').html(old_link);
			check = 0;
		}
	});

//新增Row
	$('.add').on('click', function(event) {
		event.preventDefault();
		var id = null;
		if (check == 1) {
	 		return false;
		}

		$.ajax({
			url: './Insert.php',
			type: 'GET',
			data: {now: getTime()},
		})
		.done(function(data) {
			id = data;
			$('tbody').append("\
				<tr data-id= " + id + ">\
				<td data-id= " + id + " class='topic'>雙擊我來新增標題</td>\
				<td data-id= " + id + " class='time'>"+ getTime() +"</td>\
				<td data-id= " + id + " class='doc_file'><a href=''></a>雙擊我新增檔案</td>\
				<td data-id= " + id + " class='doc_download_times'>0</td>\
				<td data-id= " + id + " class='pdf_file'><a href=''></a>雙擊我新增檔案</td>\
				<td data-id= " + id + " class='pdf_download_times'>0</td>\
				<td data-id= " + id + " class='odt_file'><a href=''></a>雙擊我新增檔案</td>\
				<td data-id= " + id + " class='odt_download_times'>0</td>\
				<td data-id= " + id + " class='delete_button'><button type='button' data-id= " + id + " class='btn btn-danger delete'>刪除</button></td>\
				</tr>");
			$('.topic_change[data-id='+id+']').focus();
		});
	});
//Delete event
	$('tbody').on('click', function(event) {
		var target = $(event.target);
		if (target.hasClass('delete')) {
			if (confirm('確定要刪除嗎？')) {
				var id = target.data('id');
				$.post('./Delete.php', {id: id}, function(data, textStatus, xhr) {
					$('td[data-id='+id+']').remove();
				});
			}
		}
		//下載次數
		if (target.hasClass('doc_file_link')) {
			var id = $(event.target).data('id');
			var file = $(event.target).attr('href');
			setTimeout(function() {
				$.get('./UpdateDocDownloadTimes.php', {id: id}, function(data, textStatus, xhr) {
					$('.doc_download_times[data-id='+id+']').html(data);
				});	
			}, 500);
		}

		if (target.hasClass('pdf_file_link')) {
			var id = $(event.target).data('id');
			setTimeout(function() {
				$.get('./UpdatePdfDownloadTimes.php', {id: id}, function(data, textStatus, xhr) {
					$('.pdf_download_times[data-id='+id+']').html(data);
				});	
			}, 500);
		}

		if (target.hasClass('odt_file_link')) {
			var id = $(event.target).data('id');
			setTimeout(function() {
				$.get('./UpdateOdtDownloadTimes.php', {id: id}, function(data, textStatus, xhr) {
					$('.odt_download_times[data-id='+id+']').html(data);
				});	
			}, 500);
		}
	});
})