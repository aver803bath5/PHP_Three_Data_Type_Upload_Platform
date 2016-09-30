<?php
require('./connect.php');
function my_path_info($filepath) {
	$path_parts = array();
	$path_parts ['dirname'] = rtrim(substr($filepath, 0, strrpos($filepath, '/')),"/")."/";
	$path_parts ['basename'] = ltrim(substr($filepath, strrpos($filepath, '/')),"/");
	$path_parts ['extension'] = substr(strrchr($filepath, '.'), 1);
	$path_parts ['filename'] = ltrim(substr($path_parts ['basename'], 0, strrpos($path_parts ['basename'], '.')),"/");
	return $path_parts;
}
$id = $_POST[id];
$file = $_FILES[doc_file];
//檢查是否為doc檔
$file_type = pathinfo($file[name], PATHINFO_EXTENSION);
$allow = array('doc','docx');
if ($file[size]>10485760) {
	echo "oversize";
}
if (!in_array($file_type, $allow)) {
	echo "notmytype";
	exit();
}else{
	$sql = "SELECT file_doc from files WHERE file_id NOT IN ($id)";
	$result = mysqli_query($con, $sql);
	while ($row = mysqli_fetch_array($result, MYSQLI_NUM)) {
		if (my_path_info($row[0])['filename'] == my_path_info($file[name])['filename']) {
			echo "samefilename";
			exit();
		}
	}
	$target = './upload/'."$file[name]";
	$now = $_POST[now];
	$sql = "UPDATE files SET file_doc='$target', file_doc_download_times=0 , file_time='$now' WHERE file_id = $id";
	if(move_uploaded_file($file[tmp_name], $target) && mysqli_query($con, $sql)){
		echo "good";
	}
}
?>