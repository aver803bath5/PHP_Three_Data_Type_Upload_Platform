<?php
	require('./connect.php');
	$id = $_POST[id];
	$new_value = $_POST[new_value];
	$now = $_POST[now];
	$sql = "SELECT file_topic FROM files WHERE file_id NOT IN ($id)";
	$result = mysqli_query($con, $sql);
	while($row = mysqli_fetch_array($result, MYSQLI_NUM)){
		if ($new_value == $row[0]) {
			echo "sametopicname";
			exit();
		}
	}

	$sql = "UPDATE files SET file_topic='$new_value', file_time='$now' WHERE file_id = $id";
	if(mysqli_query($con, $sql)){
		echo "success";
	}else{
		echo "87";
	}
?>