<?php
require('./connect.php');
$id = $_POST[id];
$file1 = $_FILES[file1];
$file2 = $_FILES[file2];
$file3 = $_FILES[file3];
print_r($_FILES);
?>