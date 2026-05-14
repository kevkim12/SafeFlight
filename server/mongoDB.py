import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["mydatabase"]


def createCollection(name):
    return mydb[name]


def getCollection(name):
    if name in mydb.list_collection_names():
        return mydb[name]
    return None
