from flask import Blueprint
import requests
from pymongo import MongoClient
import json
from flask import jsonify,request
from bson.json_util import dumps

c = MongoClient()
db = c.rubberducky

api = Blueprint('api', __name__)

@api.route('/hello', methods=["GET"])
def hello_world():
    return 'Hello world!'

@api.route('/requests', methods=["GET"])
def request_test():
    payload = {'current': 'true'}
    response = requests.get('https://www.govtrack.us/api/v2/role', params=payload)
    return response.content

@api.route('/legislators/current', methods=["GET"])
def current_legislators():
	legislators = dumps(db.legislators_current.find({},{"votes":0}))
	return legislators

@api.route('/legislator', methods=["GET"])
def specific_legislator():
	bioguide = request.args.get('bioguide')
	legislator = dumps(db.legislators_current.find({"id.bioguide": bioguide}))
	return legislator

@api.route('/socialmedia', methods=["GET"])
def specific_socialmedia():
	bioguide = request.args.get('bioguide')
	legislators = dumps(db.legislators_social_media.find({"id.bioguide": bioguide}))
	return legislators

@api.route('/bills/current', methods=["GET"])
def current_bills():
	bills = dumps(db.bills.find().sort("introduced_at", -1).limit(100))
	return bills

@api.route('/bill', methods=["GET"])
def specific_bill():
	bill_id = request.args.get('bill_id')
	bill = dumps(db.bills.find({"bill_id": bill_id}))
	return bill