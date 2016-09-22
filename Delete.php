<?php 
	$id = $_POST[id];
	require('./connect.php');
	$sql = "DELETE FROM files WHERE file_id = $id";
	mysqli_query($con, $sql);
 ?>