<?php
    require __DIR__ . './vendor/autoload.php';

    use InfluxDB2\Client;
    use InfluxDB2\WriteApi;
   
    $username = 'ruuvi';
    $password = 'ruuvi';
   
    $bucket = 'ruuvi';
   
    $client = new Client([
        "url" => "http://localhost:8086",
        "token" => "$username:$password",
        "bucket" => $bucket,
        "org" => "-",
        "precision" => InfluxDB2\Model\WritePrecision::NS
    ]);
   
    $writeApi = $client->createWriteApi(); 

    $v = $_REQUEST["v"];
    $r = $_REQUEST["r"];

    $writeApi->write([
        ['name' => 'ruuvi',
         'fields' => ['rotation_counter' => $r, 'value' => $v]
        ]
    ])
?>