<?php

define("HOST",'csv.business.tomtom.com');
define("PATH",'extern');

class WebfleetConnect {
	
	private $account;
	private $user;
	private $password;
	private $apikey;
	private $session;
	 
	public function __construct($account, $user, $password, $apikey) {
		$this->account 	= $account;
		$this->user	   	= $user;
		$this->password	= $password;
		$this->apikey	= $apikey;
		$this->session 	= null;
	}
	
	private function _authentication_params() {
		if($this->session!=null) {
			return array("sessiontoken" => $this->session['sessiontoken']);
		}
		else {
			return array(
				'account'  => $this->account,
                'username' => $this->user,
                'password' => $this->password,
                "apikey"   => $this->apikey
			);
		}
	}
	
	public function request($function, $method="get", $params = array()) {
		$default_params = array(
			
			"lang" 			=> "en",
			"action"		=> $function,
			"outputformat"	=> "json"
		);
		
		$default_params = array_merge($default_params, $this->_authentication_params(), $params);
		
		$request_url = sprintf ('https://%s/%s/%s', HOST, PATH, $function);
		
		$client = new GuzzleHttp\Client();
		$response = $client->get($request_url, [
		    'query' =>  $default_params
		]);
		if($this->_is_error($response)) {
			$json = $response->json();
			echo $response->getBody();
			die();
			//throw new WebfleetExceptionBuilder($response, $json['errorCode'], $json['errorMsg']);
		}
		else {
			return $response->json();
		}
		echo $res->getStatusCode();           // 200
		echo $res->getHeader('content-type'); // 'application/json; charset=utf8'
		echo $res->getBody();                 // {"type":"User"...'
		var_export($res->json());             // Outputs the JSON decoded data
	}
	
	private function _is_error($requests_response) {
		$json = $requests_response->json();
		return isset($json['errorCode']) && isset($json['errorMsg']);
	}
	
                
}

?>