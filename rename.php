<?php

$old_path = '.' . $_GET['old'];
$new_path = '.' . $_GET['new'];

rename($old_path, $new_path);
