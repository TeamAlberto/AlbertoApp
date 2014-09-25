<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
require ('vendor/autoload.php');
require ('WebfleetConnect.php');
 
$orderparams = array(
	"objectno" 		=> "1", 
	"orderid" 		=> "Alberto ".time(), 
	"ordertext" 	=> isset($_POST['order'])		? $_POST['order'] 			: "Alberto order"		,
	"ordertype" 	=> "3",
	"contact"		=> isset($_POST['customer'])	? $_POST['customer'] 		: "Justin Halsall"		,
	"contacttel"	=> isset($_POST['phone']) 		? $_POST['phone']  			: "06-12345678"    		,
	"latitude"		=> isset($_POST['lat']) 		? intval($_POST['lat'] * 1000000)   : intval(52.3778803* 1000000) 	,
	"longitude"		=> isset($_POST['lng']) 		? intval($_POST['lng'] * 1000000)   : intval(4.9163712 * 1000000)   ,
	"city"			=> isset($_POST['city']) 		? $_POST['city'] 			: "Pietheinkade 55"		,
	"street"		=> isset($_POST['address']) 	? $_POST['address'] 		: "Amsterdam"    
);
$wf = new WebfleetConnect("TTTDEMO-NL", "ddbgroup", "puntNL","5eda59c2-091d-4816-a848-3c09c9f5626b");
$response = $wf->request("sendDestinationOrderExtern", "get", $orderparams);
print_r(count($response) == 0 ? "place order success" : $response);
print_r($_POST);
?>