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

@api.route('/legislators/current/sort', methods=["GET"])
def sort_legislators():
	sortby = request.args.get('sortby')
	if sortby == 'firstNameAZ':
		legislators = dumps(db.legislators_current.find({},{"votes":0}).sort('name.first',1))
		return legislators
	elif sortby == 'firstNameZA':
		legislators = dumps(db.legislators_current.find({},{"votes":0}).sort('name.first',-1))
		return legislators
	elif sortby == 'lastName':
		legislators = dumps(db.legislators_current.find({},{"votes":0}).sort('name.last',1))
		return legislators

@api.route('/legislator', methods=["GET"])
def specific_legislator():
	bioguide = request.args.get('bioguide')
	legislator = dumps(db.legislators_current.find({"id.bioguide": bioguide}))
	return legislator

@api.route('/legislators/names', methods=["GET"])
def legislators_names():
	names = dumps(db.legislators_current.find( {}, {"id.bioguide": 1,"name.official_full":1, "_id":0, "terms": {"$slice": -1} }))
	return names

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

@api.route('/committees/current', methods=["GET"])
def current_committees():
	committees = dumps(db.committees_current.find({}, {"name": 1, "thomas_id": 1, "url": 1, "_id": 0 }).sort('name', 1))
	return committees

# @api.route('/committees/current/sort', methods=["GET"])
# def sort_committees():
# 	sortby = request.args.get('sortby')
# 	if sortby == 'A-Z':
# 		committees = dumps(db.committees_current.find({}, {"name": 1, "thomas_id": 1, "url": 1, "_id": 0 }).sort('name', 1))
# 		return committees

@api.route('/committee', methods=['GET'])
def specific_committee():
	thomas_id = request.args.get('thomas_id')
	committee = dumps(db.committees_current.find({"thomas_id":thomas_id}))
	return committee

@api.route('/bill/votes', methods=["GET"])
def specific_bill_votes():
	bill_id = request.args.get('bill_id')
	votes = dumps(db.votes.find({"bill_id": bill_id}))
	return votes

@api.route('/approval/like', methods=["POST"])
def approval_like():
	bioguide = request.args.get('bioguide')
	db.legislators_current.update({"id.bioguide":bioguide},{"$inc":{"approval.up":1}})
	return dumps(db.legislators_current.find({"id.bioguide":bioguide}, {"approval":1}))

@api.route('/approval/dislike', methods=["POST"])
def approval_dislike():
	bioguide = request.args.get('bioguide')
	db.legislators_current.update({"id.bioguide":bioguide},{"$inc":{"approval.down":1}})
	return dumps(db.legislators_current.find({"id.bioguide":bioguide}, {"approval":1}))
