<?php
	require('./connect.php');
	$now = $_GET[now];
	$sql = "INSERT INTO files(file_topic, file_time, file_doc, file_pdf, file_odt) VALUES 
	('', '$now', '', '', '')";
	if(mysqli_query($con, $sql)){
		$sql = "SELECT MAX(file_id) from files";
		$result = mysqli_query($con, $sql);
		$row = mysqli_fetch_array($result,MYSQLI_NUM);
		echo "$row[0]";
		exit();
	}

?>