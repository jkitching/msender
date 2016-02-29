#!/usr/bin/env php
<?php
if(PHP_SAPI !== 'cli') exit; // cli only

if(empty($argv[1])) {
    echo "Doit avoir 1 argument : csv_path (csv utf8 séparateur ,) \n";
    echo "Ex : $argv[0] donnees-deputes/deputes.csv\n";
    exit(1);
}
$csvPath = $argv[1];

/* Lecture et formation du tableau $deps */
$csv = array_map('str_getcsv', file($csvPath));
$csvIndex =  array_search('num_deptmt', $csv[0]);
$csvHeader = $csv[0];
$deps = Array();

// print_r($csv);

/* CSV 2 JSON */
foreach ($csv as $i => $row) {
    // echo "$i<br>";
    $rowIndexed = Array();
    $dep = $row[$csvIndex];
    foreach ($row as $colIndex => $col) {
        $col = trim($col, ' |');
        if($csvHeader[$colIndex] == 'emails') {
            $col = explode('|', str_replace(' ', '', $col));
        }
        $rowIndexed[$csvHeader[$colIndex]] = $col;
    }
    $deps[$dep]['depus'][]   = $rowIndexed;
    $deps[$dep]['nom_circo'] = $rowIndexed['nom_circo'];
    $deps[$dep]['du_des_de_la'] = $rowIndexed['du_des_de_la'];
    
}
unset($deps['num_deptmt']);
/* $depsJson = str_replace("'", "\'", json_encode($deps)); */
$depsJson = json_encode($deps);

$jsonPath = dirname($csvPath) .'/'. basename($csvPath, '.csv') .'.json';
file_put_contents($jsonPath, $depsJson);
