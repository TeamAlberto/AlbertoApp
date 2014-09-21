<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
require ('vendor/autoload.php');

$client = new GuzzleHttp\Client();
$response = $client->get("https://maps.googleapis.com/maps/api/directions/json", [
    'query' =>  $_GET
]);
		
//print_r($response->json());
echo $response->getBody();
?>