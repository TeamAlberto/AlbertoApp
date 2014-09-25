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

$wf = new WebfleetConnect("TTTDEMO-NL", "ddbgroup", "puntNL","5eda59c2-091d-4816-a848-3c09c9f5626b");
$vehicles = $wf->request("showObjectReportExtern");
$couriers = array();
foreach($vehicles as $vehicle) {
	
	$courier = new stdclass;	
	
	$courier->details = $_GLOBALS['COURIERS'][$vehicle['objectno']];
	
	preg_match_all("/[0-9\.]+/", $vehicle['latitude'], $matches);
	$courier->lat =dms_to_deg($matches[0][0], $matches[0][1],$matches[0][2]);
	
	preg_match_all("/[0-9\.]+/", $vehicle['longitude'], $matches);
	$courier->lng =dms_to_deg($matches[0][0], $matches[0][1],$matches[0][2]);
	
	$couriers[] = $courier;
}
echo json_encode($couriers);

//Apikey=5eda59c2-091d-4816-a848-3c09c9f5626b
/*
#!/usr/bin/env python

import sys
import os
import re
from pprint import pprint
import logging
from time import sleep
import smtplib
import uuid

import requests
from lxml import etree


logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


class WebfleetError(Exception):
    def __init__(self, response, code, msg):
        self.response = response
        self.code = code
        self.msg = msg

    def __str__(self):
        return '%s: %s' % (self.code, self.msg)


class WebfleetAccessDeniedError(WebfleetError):
    pass


class WebfleetAuthenticationError(WebfleetError):
    pass


class WebfleetSessionError(WebfleetError):
    pass


class WebfleetRateLimitError(WebfleetError):
    pass


# Make error handling a bit simpler :)
class WebfleetExceptionBuilder(object):
    CODE_TO_EXCEPTION = {
        45: WebfleetAccessDeniedError,
        1100: WebfleetAuthenticationError,
        1100: WebfleetAuthenticationError,
        1101: WebfleetAuthenticationError,
        1105: WebfleetAuthenticationError,
        1106: WebfleetAuthenticationError,
        1112: WebfleetAuthenticationError,
        1114: WebfleetAuthenticationError,
        1115: WebfleetAuthenticationError,
        1123: WebfleetAuthenticationError,
        1124: WebfleetAuthenticationError,
        1125: WebfleetAuthenticationError,
        1126: WebfleetAuthenticationError,
        1127: WebfleetAuthenticationError,
        1128: WebfleetAuthenticationError,
        1129: WebfleetAuthenticationError,
        1130: WebfleetAuthenticationError,
        1132: WebfleetAuthenticationError,
        1140: WebfleetAuthenticationError,
        1144: WebfleetSessionError,
        8011: WebfleetRateLimitError
    }

    @classmethod
    def exception(self, response, code, msg):
        if self.CODE_TO_EXCEPTION.has_key(code):
            raise self.CODE_TO_EXCEPTION[code](
                response, code, msg
            )
        else:
            raise WebfleetError(
                response, code, msg
            )


class WebfleetConnect(object):
    HOST = 'csv.business.tomtom.com'
    PATH = 'extern'

    FUNCTION_CREATE_SESSION = 'createSession'

    def __getattr__(self, attr_name):
        return lambda params={}: self._request(
            attr_name, params=params
        ).json()

    # this is a separate implementation to catch the session token
    def createSession(self, params={}):
        self.session = self._request(
            self.FUNCTION_CREATE_SESSION, params=params
        ).json()[0]
        return [self.session]

if __name__ == '__main__':
    wf = WebfleetConnect(
        os.getenv('WF_ACCOUNT'),
        os.getenv('WF_USER'),
        os.getenv('WF_PASSWORD')
    )

    try:

        #try:
        #    wf.createQueueExtern({'msgclass': 2})
        #except ValueError, e:
        #    pass

        #pprint(wf.createSession())
        #geocoded = wf.geocodeAddress({
        #    'freetext': 'De Ruijterkade 153',
        #    'provider': 2
        #})
        #pprint(wf.showObjectReportExtern({}))

        car_object = wf.showObjectReportExtern({})[0]

        order_id = u'243b7690-2844-4cde'  # str(uuid.uuid4())[:18]
        #pprint(wf.sendOrderExtern({
        #    'objectuid': car_object[u'objectuid'],
        #    'orderid': '123-456-7890',
        #    'ordertext': 'Dit is een demo order'
        #}))
        #pprint(wf.sendDestinationOrderExtern({
        #    'objectuid': car_object[u'objectuid'],
        #    'orderid': order_id,
        #    'ordertext': 'Dit is een demo order',
        #    'longitude': geocoded[0]['longitude'],
        #    'latitude': geocoded[0]['latitude']
        #}))

        # sleep for a while because creating the order is async
        #sleep(10)

        order = wf.showOrderReportExtern({
            'objectno': car_object[u'objectno'],
            'orderid': order_id
        })[0]
        pprint(order)

        messages = wf.popQueueMessagesExtern({'msgclass': 2})
        etas = [
            m['eta'] for m in messages if m.has_key('eta') and
            m.has_key('orderno') and m['orderno'] == order_id
        ]
        # pprint(messages)
        #sys.exit(0)

        # get the drivers, group by vehicle
        drivers_list = wf.showDriverReportExtern({})
        drivers = {}
        for driver in drivers_list:
            if driver.has_key(u'objectno'):
                drivers[driver[u'objectno']] = driver

        # get the driver for our order
        driver = drivers[order[u'objectno']]
        pprint(driver)
        # do some stuff

        fromaddr = os.getenv('GMAIL_USER')
        toaddrs = 'no-reply@dutchackathon.com' # this should be the email address of a client
        msg = ("From: %s\r\nTo: %s\r\n\r\n" % (fromaddr, toaddrs))
        msg = msg + 'Dear client, the order %s has been dispatched. The estimated arrival time is : %s' % (
            str(order_id),
            str(etas[-1])
        )
        print msg
        sys.exit(0)
        # Credentials (if needed)
        username = os.getenv('GMAIL_USER')
        password = os.getenv('GMAIL_PASSWORD')

        # The actual mail send
        server = smtplib.SMTP('smtp.gmail.com:587')
        server.starttls()
        server.login(username, password)
        server.sendmail(fromaddr, toaddrs, msg)
        server.quit()
    except WebfleetError as e:
        print e
*/