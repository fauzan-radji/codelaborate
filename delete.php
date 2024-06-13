<?php

$path = '.' . $_GET['path'];

unlink($path);

echo "OK";

