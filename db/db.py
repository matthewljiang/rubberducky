from pymongo import MongoClient
import json

c = MongoClient()
db = c.rubberducky

#create or update legislators
legislators_current = db['legislators_current']
with open('congress-legislators/legislators-current.json') as file:
	legislators_current_json = json.load(file)
	for item in legislators_current_json:
		legislators_current.update_one({"id.bioguide":item["id"]["bioguide"]},{"$set":item},upsert=True)

#create or update social media
legislators_social_media = db['legislators_social_media']
with open('congress-legislators/legislators-social-media.json') as file:
	legislators_social_media_json = json.load(file)
	for item in legislators_social_media_json:
		legislators_social_media.update_one({"id.bioguide":item["id"]["bioguide"]},{"$set":item},upsert=True)

#create or update committees
committees_current = db['committees_current']
with open('congress-legislators/committees-current.json') as file:
	committees_current_json = json.load(file)
	for item in committees_current_json:
		committees_current.update_one({"thomas_id":item["thomas_id"]},{"$set":item},upsert=True)

#create or update committee member lists
committee_membership_current = db['committee_membership_current']
with open('congress-legislators/committee-membership-current.json') as file:
	committee_membership_current_json = json.load(file)
	for item in committee_membership_current_json:
		com = {}
		com['thomas_id']=item
		com['members']=committee_membership_current_json[item]
		committee_membership_current.update_one({"thomas_id":com["thomas_id"]},{"$set":com},upsert=True)