import re, json

with open("arq-son-EVO.json","r") as f:
    content = f.readlines()

content = [x.strip() for x in content]

dataDict = {}

dataDict["musicas"] = [json.loads(x) for x in content]

for i,data in enumerate(dataDict["musicas"]):
    data["id"] = i+1

with open("arq-son.json","w") as f:
    f.write(json.dumps(dataDict, indent=4))

