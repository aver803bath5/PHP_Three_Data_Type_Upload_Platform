<?php
	require('./connect.php');
	$id = $_GET[id];
    $sql = "SELECT file_doc_download_times FROM files WHERE file_id = $id";
	$result = mysqli_query($con, $sql);
	$row = mysqli_fetch_array($result, MYSQLI_NUM);
	echo "$row[0]";
?>