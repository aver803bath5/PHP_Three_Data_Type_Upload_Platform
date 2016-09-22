<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>update</title>
	<link rel="stylesheet" href="./css/bootstrap.min.css">
	<script src="./js/jquery-1.12.3.min.js"></script>
	<script src="./js/bootstrap.min.js"></script>
	<script src="./js/all.js"></script>
</head>
<?php
	require('./connect.php');
	$id = $_GET[id];
	$sql = "SELECT * FROM files WHERE file_id = $id";
	$result = mysqli_query($con, $sql);
	while($row=mysqli_fetch_array($result,MYSQLI_ASSOC)){
		$topic = $row[file_topic];
		$file1 = $row[file_doc];
		$file2 = $row[file_pdf];
		$file3 = $row[file_odt];
	}
	function my_path_info($filepath) {
		$path_parts = array();
		$path_parts ['dirname'] = rtrim(substr($filepath, 0, strrpos($filepath, '/')),"/")."/";
		$path_parts ['basename'] = ltrim(substr($filepath, strrpos($filepath, '/')),"/");
		$path_parts ['extension'] = substr(strrchr($filepath, '.'), 1);
		$path_parts ['filename'] = ltrim(substr($path_parts ['basename'], 0, strrpos($path_parts ['basename'], '.')),"/");
		return $path_parts;
	}
?>
<form action="doUpdate.php" method="POST" enctype="multipart/form-data" class="form-inline">
		<span style="margin-left:1rem">主題：</span>
		<input type="text" name="topic" class="form-control" value=<?php echo "$topic"; ?>><br>
		<?php 
		echo "DOC檔原本的檔案是：" . my_path_info($file1)['basename'];
		 ?>
		<input type="file" name="file1" class="form-control">
		<button id="clearfile1" type="button" class="btn btn-danger">清除</button><br>
		<?php 
		echo "PDF檔原本的檔案是：" . my_path_info($file2)['basename'];
		 ?>
		<input type="file" name="file2" class="form-control">
		<button id="clearfile2" type="button" class="btn btn-danger">清除</button><br>
		<?php 
		echo "ODT檔原本的檔案是：" . my_path_info($file3)['basename'];
		 ?>
		<input type="file" name="file3" class="form-control">
		<button id="clearfile3" type="button" class="btn btn-danger">清除</button><br>
		<input type="text" name="id" value=<?php echo "$id";?> style="display: none;">
		<input type="submit" class="btn btn-success" style="margin-left:1rem;margin-top:1rem">
		<input type="reset" value="reset" class="btn btn-warning"  style="margin-top:1rem">
		<a href='table.php' class="btn btn-info" style="margin-top:1rem">檢視</a>
</form>