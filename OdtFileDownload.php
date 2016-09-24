<?php
	require('./connect.php');
	$file = $_GET[file];
	$id = $_GET[id];
	$sql = "SELECT file_odt_download_times FROM files WHERE file_id = $id";
	$result = mysqli_query($con, $sql);
	$row = mysqli_fetch_array($result, MYSQLI_NUM);
	$new_times = (int)$row[0]+1;
	$sql = "UPDATE files SET file_odt_download_times='$new_times' WHERE file_id = $id";
	function get_basename($filename){
    	return preg_replace('/^.+[\\\\\\/]/', '', $filename);
	}
	mysqli_query($con, $sql);
	if (file_exists($file)) {
		header('Content-Description: File Transfer');
	    header('Content-Type: application/octet-stream');
	    header('Content-Disposition: attachment; filename="'.get_basename($file).'"');
	    header('Expires: 0');
	    header('Cache-Control: must-revalidate');
	    header('Pragma: public');
	    header('Content-Length: ' . filesize($file));
	    readfile($file);
	    exit;
	}
?>