<?php 
	$id = $_GET[id];
	require('./connect.php');
	$sql = "DELETE FROM files WHERE file_id = $id";
	mysqli_query($con, $sql);
	
	header("Refresh: 0; url=table.php");
 ?>