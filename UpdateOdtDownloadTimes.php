<?php
	require('./connect.php');
	$id = $_POST[id];
	$sql = "SELECT file_odt_download_times FROM files WHERE file_id = $id";
	$result = mysqli_query($con, $sql);
	$row = mysqli_fetch_array($result, MYSQLI_NUM);
	$new_times = (int)$row[0]+1;
	$sql = "UPDATE files SET file_odt_download_times='$new_times' WHERE file_id = $id";
	if(mysqli_query($con, $sql)){
		echo "$new_times";
	}
?>