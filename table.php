<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>review</title>
	<link rel="stylesheet" href="./css/bootstrap.min.css">
	<script src="./js/jquery-1.12.3.min.js"></script>
	<script src="./js/all.js"></script>
</head>
<body>

<?php 
	require('./connect.php');
	$sql = "SELECT * FROM files";
	$result = mysqli_query($con, $sql);
	echo mysqli_error($con);
	function my_path_info($filepath) {
		$path_parts = array();
		$path_parts ['dirname'] = rtrim(substr($filepath, 0, strrpos($filepath, '/')),"/")."/";
		$path_parts ['basename'] = ltrim(substr($filepath, strrpos($filepath, '/')),"/");
		$path_parts ['extension'] = substr(strrchr($filepath, '.'), 1);
		$path_parts ['filename'] = ltrim(substr($path_parts ['basename'], 0, strrpos($path_parts ['basename'], '.')),"/");
		return $path_parts;
	}
	echo "<button type='button' class='btn btn-primary add'>新增</button>";
	echo "<table class='table table-hover table-striped'>";
	echo "<tr>";
	echo "<th>標題</th>";
	echo "<th>最新修改時間</th>";
	echo "<th>doc檔</th>";
	echo "<th>doc檔下載次數</th>";
	echo "<th>pdf檔</th>";
	echo "<th>pdf檔下載次數</th>";
	echo "<th>odt檔</th>";
	echo "<th>odt檔下載次數</th>";
	echo "<th>刪除</th>";
	echo "</tr>";

	
	while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
		$i = 0;
		echo "<tr data-id='$id'>";
		$id = $row[file_id];
		echo "<td data-id='$id' class='topic'>$row[file_topic]</td>";
		echo "<td data-id='$id' class='time'>$row[file_time]</td>";
		echo "<td data-id='$id' class='doc_file'>"."<a href='./DocFileDownload.php?file=$row[file_doc]&id=$row[file_id]' data-id='$id' class='doc_file_link' target='_blank'>".my_path_info($row[file_doc])['filename']."</a>"."</td>";
		echo "<td data-id='$id' class='doc_download_times'>$row[file_doc_download_times]</td>";
		echo "<td data-id='$id' class='pdf_file'>"."<a href='./PdfFileDownload.php?file=$row[file_pdf]&id=$row[file_id]' data-id='$id' class='pdf_file_link'  target='_blank'>".my_path_info($row[file_pdf])['filename']."</a>"."</td>";
		echo "<td data-id='$id' class='pdf_download_times'>$row[file_pdf_download_times]</td>";
		echo "<td data-id='$id' class='odt_file'>"."<a href='./OdtFileDownload.php?file=$row[file_odt]&id=$row[file_id]' data-id='$id' class='odt_file_link' target='_blank'>".my_path_info($row[file_odt])['filename']."</a>"."</td>";
		echo "<td data-id='$id' class='odt_download_times'>$row[file_odt_download_times]</td>";
		echo "<td data-id='$id' class='delete_button'><button data-id='$id' type='button' class='btn btn-danger delete'>刪除</button></td>";
		echo "</tr>";
	}
	echo "</table>";
 ?>
</body>
</html>