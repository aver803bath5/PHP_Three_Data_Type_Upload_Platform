<?php 
	require('./connect.php');
	
	$id = $_POST[id];
	$sql = "SELECT file_doc, file_pdf, file_odt FROM files WHERE file_id = $id";
	$result = mysqli_query($con, $sql);
	$row = mysqli_fetch_array($result, MYSQLI_NUM);
	for ($i=0; $i < 3; $i++) { 
		if (file_exists($row[$i])) {
			unlink($row[$i]);
		}
	}
	$sql = "DELETE FROM files WHERE file_id = $id";
	mysqli_query($con, $sql);

 ?>