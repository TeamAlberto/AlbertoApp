<?php
header('Content-Type: text/html; charset=utf-8');
require ('vendor/autoload.php');
require ('WebfleetConnect.php');

require("config.php");

function dms_to_deg($degrees, $minutes, $seconds )
{
    //Decimal degrees = 
    //   whole number of degrees, 
    //   plus minutes divided by 60, 
    //   plus seconds divided by 3600

    return $degrees + ($minutes/60) + ($seconds/3600);
}

function deg_to_dms ($deg) {
   $d = floor($deg);
   $minfloat = ($deg-$d)*60;
   $m = floor($minfloat);
   $secfloat = ($minfloat-$m)*60;
   $s = round($secfloat);
   // After rounding, the seconds might become 60. These two
   // if-tests are not necessary if no rounding is done.
   if ($s==60) {
     $m++;
     $s=0;
   }
   if ($m==60) {
     $d++;
     $m=0;
   }
   return array($d, $m, $s);
}


$wf = new WebfleetConnect("schiphol", "DOH05", "dutchopenhackathon2014","5eda59c2-091d-4816-a848-3c09c9f5626b");
$vehicles = $wf->request("showNearestVehicles", "get", array("latitude" => intval($_REQUEST['lat'] * 1000000), "longitude" => intval($_REQUEST['lng'] * 1000000)));
$couriers = array();
foreach($vehicles as $vehicle) {
	
	$courier = new stdclass;	
	
	$courier->details = $_GLOBALS['COURIERS'][$vehicle['objectno']];
	$courier->lat =$vehicle['latitude']/1000000;
	$courier->lng =$vehicle['longitude']/1000000;
	$courier->routetime = $vehicle['routetime'];
	
	$couriers[$vehicle['routetime']] = $courier;
}
ksort($couriers);
$i =0; 
foreach($couriers as $courier) {
	$courier->fastest = ($i++ == 0);
}

echo json_encode($couriers);
