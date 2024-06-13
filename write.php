<?php

include 'log.php';

$text = json_decode(file_get_contents('php://input'), true)['content'];
$unsafePath = $_GET['path'];
$path = str_starts_with($unsafePath, '/') ? '.' . $unsafePath : './' . $unsafePath;

file_put_contents($path, $text);

echo file_get_contents($path);
