<?php

$path = $_GET['path'];

if(!str_starts_with($path, '/')) {
  $path = '/' . $path;
}

$path = '.' . $path;

mkdir($path);