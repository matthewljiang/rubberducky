from pymongo import MongoClient
import json
import os


def startup():

	c = MongoClient()
	db = c.rubberducky


	#create or update social media
	print("creating legislators_social_media table")
	legislators_social_media = db['legislators_social_media']
	with open('db/congress-legislators/legislators-social-media.json') as file:
		legislators_social_media_json = json.load(file)
		for item in legislators_social_media_json:
			legislators_social_media.update_one({"id.bioguide":item["id"]["bioguide"]},{"$set":item},upsert=True)

	print("finished legislators_social_media table")
	print("creating legislators_current table")
	#create or update legislators
	legislators_current = db['legislators_current']
	with open('db/congress-legislators/legislators-current.json') as file:
		legislators_current_json = json.load(file)
		for item in legislators_current_json:
			bioguide = item["id"]["bioguide"]
			soc = legislators_social_media.find_one({"id.bioguide":bioguide})
			if soc is not None:
				item["social"] = soc["social"]
			item["votes"] = []
			item["committees"] = []
			leg = legislators_current.find_one({"id.bioguide":item["id"]["bioguide"]})
			if leg == None or "approval" not in leg:
				item["approval"] = {
					"up":0,
					"down":0
				}
			else:
				item["approval"] = leg["approval"]

			legislators_current.update_one({"id.bioguide":item["id"]["bioguide"]},{"$set":item},upsert=True)

	print("finished legislators_current table")
	print("creating committees_current table")

	#create or update committees
	committees_current = db['committees_current']
	with open('db/congress-legislators/committees-current.json') as file:
		committees_current_json = json.load(file)
		for item in committees_current_json:
			committees_current.update_one({"thomas_id":item["thomas_id"]},{"$set":item},upsert=True)

	print("finished committees_current table")
	print("creating committee_membership_current table")

	#create or update committee member lists
	committee_membership_current = db['committee_membership_current']
	with open('db/congress-legislators/committee-membership-current.json') as file:
		committee_membership_current_json = json.load(file)
		for item in committee_membership_current_json:
			if len(str(item)) == 4:
				com = {}
				com['thomas_id']=item
				com['members']=committee_membership_current_json[item]


				for memb in com['members']:
					com_info = committees_current.find_one({"thomas_id":com["thomas_id"]})
					com_info_short = {
						"committee_type":"main",
						"thomas_id":com_info["thomas_id"],
						"type":com_info["type"],
						"name":com_info["name"],
						"url":com_info["url"]
					}
					legislators_current.update_one({"id.bioguide":memb["bioguide"]}, {"$push":{"committees":com_info_short}})




				com['subcommittees'] = []
				for item_sub in committee_membership_current_json:
					if len(str(item_sub))!= 4 and item in item_sub:
						sub_thomas_id = str(item_sub)[4:]
						sub_com = {
										"thomas_id":sub_thomas_id,
										"members":committee_membership_current_json[item_sub]
								  }
						com['subcommittees'].append(sub_com)
						for memb in sub_com['members']:
							com_info = committees_current.find_one({"thomas_id":com["thomas_id"]})
							sub_com_info = {
								"committee_type":"sub",
								"thomas_id":item_sub
							}
							for subcommittee in com_info["subcommittees"]:
								if subcommittee["thomas_id"] == sub_thomas_id:
									sub_com_info["name"] = subcommittee["name"]
							legislators_current.update_one({"id.bioguide":memb["bioguide"]}, {"$push":{"committees":sub_com_info}})
				committee_membership_current.update_one({"thomas_id":com["thomas_id"]},{"$set":com},upsert=True)
				
	print("finished committee-membership-current table")
	print("creating votes table")

	#create or update votes
	votes = db['votes']
	rootdir = "db/congress/data/115/votes/2017"
	for subdir, dirs, files in os.walk(rootdir):
		for f in files:
			if f.endswith('.json'):
				with open(os.path.join(subdir, f)) as file:
					votes_json = json.load(file)
					if not "bill" in votes_json:
						votes_json["bill"] = None
						votes_json["bill_id"] = None
					else:
						votes_json["bill_id"] = "{0}{1}-{2}".format(votes_json["bill"]["type"],votes_json["bill"]["number"],votes_json["bill"]["congress"])
					for vote_type in votes_json["votes"]:
						for v in votes_json["votes"][vote_type]:
							if votes_json["chamber"] == 'h':
								legislators_current.update_one({"id.bioguide":v["id"]},
															   {"$push":{"votes":{
															   		"bill":votes_json["bill"],
															   		"chamber":votes_json["chamber"],
															   		"congress":votes_json["congress"],
															   		"number":votes_json["number"],
															   		"date":votes_json["date"],
															   		"vote":vote_type
								}}})
							else:
								if not isinstance(v, str): 
								    legislators_current.update_one({"id.lis":v["id"]},
															   {"$push":{"votes":{
															   		"bill":votes_json["bill"],
															   		"chamber":votes_json["chamber"],
															   		"congress":votes_json["congress"],
															   		"number":votes_json["number"],
															   		"date":votes_json["date"],
															   		"vote":vote_type
									}}})
					votes.update_one({"chamber":votes_json["chamber"],"number":votes_json["number"]},{"$set":votes_json},upsert=True)

	print("finished votes table")
	print("creating bills table")

	#create or update bills
	rootdir = "db/congress/data/115/bills"
	bills = db['bills']
	for subdir, dirs, files in os.walk(rootdir):
		for f in files:
			if f.endswith('.json'):
				with open(os.path.join(subdir, f)) as file:
					bills_json = json.load(file)
					bills.update_one({"bill_id":bills_json["bill_id"]},{"$set":bills_json},upsert=True)

	print("finished bills table")
