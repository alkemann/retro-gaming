<?php
$_SERVER['PHP_SELF'] = '/index.php';
$req = $_SERVER['REQUEST_URI'];
if ($req != '/' && file_exists('./'.$req)) {
	return false;
}
require 'index.html';