<?php

function get_scandir($root)
{
  $children = scandir($root);
  $json = [];

  foreach ($children as $child) {
    if (str_starts_with($child, '.')) continue;

    $path = $root . $child;
    $isDir = is_dir($path);

    $data =
      [
        "name" => $child,
        "path" => str_starts_with($path, ".") ? substr($path, 1) : $path,
        "type" => $isDir ? 'directory' : 'file',
      ];

    if ($isDir) {
      $data["children"] = get_scandir($path . "/");
    }

    $json[] = $data;
  }

  return $json;
}

echo json_encode(get_scandir("./"));

// [
//   {
//     name: "folder"
//     path: "/folder"
//     type: directory | file,
//   },
// ]