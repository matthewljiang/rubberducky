import yaml, json, sys

infile = sys.argv[1]
outfile = infile[:-4] + 'json'

#legislators_current = None

with open(infile, 'r') as stream:
    try:
        legislators_current = yaml.load(stream)
    except yaml.YAMLError as exc:
        print(exc)

with open(outfile, 'w') as outfile:
    json.dump(legislators_current, outfile, indent=2)