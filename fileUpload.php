<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="./css/bootstrap.min.css">
</head>
<body>

</body>
</html>
<?php
	error_reporting(-1);
	date_default_timezone_set("Asia/Taipei");
	$nowtime = date("Y/m/d h:i:sa");
	// $file1 = $_FILES[file1];
	// $file2 = $_FILES[file2];
	// $file3 = $_FILES[file3];
	// mysql_query("SET NAMES UTF8");
	$con =  new mysqli("127.0.0.1", "root", "xu3ru04bjo4", "fileUpload");
	mysqli_set_charset($con,"utf8");
	// $sql = "INSERT INTO files(file_topic, file_time, file_doc, file_pdf, file_odt) VALUES ('John', '$nowtime', './upload/市場分析.docx', './upload/國家圖書館典藏電子全文.pdf', './upload/科普期末心得.odt')";
	// if(mysqli_query($con, $sql)){
	// 	echo "123";
	// }else {
 //    	echo mysqli_error($con);
	// }
	// $result = mysqli_query($con, "SELECT file_doc, file_pdf, file_odt FROM files");

	// while ($row = mysqli_fetch_array($result)) {
	// 	foreach ($row as $name) {
	// 		$name = pathinfo($name)['filename'];
	// 		if ($name == $file1[name] || $name == $file2[name] || $name == $file3[name]) {
	// 			trigger_error("檔案重複！");
	// 		}
	// 	}
	// }



	// $target_dir =  "./upload/";
	// $target_name1 = $target_dir . basename($file1[name]);
	// $target_name2 = $target_dir . basename($file2[name]);
	// $target_name3 = $target_dir . basename($file3[name]);

	$sql = "SELECT file_topic, file_time, file_doc, file_doc_download_times, file_pdf, file_pdf_download_times, file_odt, file_odt_download_times FROM files";
	$result = mysqli_query($con, $sql);
	echo mysqli_error($con);

	echo "<table class='table table-hover table-striped'>";
	echo "<tr>";
	echo "<th>標題</th>";
	echo "<th>上傳時間</th>";
	echo "<th>doc檔</th>";
	echo "<th>doc檔下載次數</th>";
	echo "<th>pdf檔</th>";
	echo "<th>pdf檔下載次數</th>";
	echo "<th>odt檔</th>";
	echo "<th>odt檔下載次數</th>";
	echo "</tr>";
	while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
		echo "<tr>";
		foreach ($row as $value) {
			echo "<td>$value</td>";
		}
		echo "</tr>";
	}
	echo "</table>";


?>