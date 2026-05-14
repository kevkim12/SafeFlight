from flask import Flask, jsonify, request
import api
import mongoDB
import bson.json_util as json_util
import json

app = Flask(__name__)


def get_or_create_collection(name):
    if name not in mongoDB.mydb.list_collection_names():
        return mongoDB.createCollection(name)
    return mongoDB.getCollection(name)


def serialize_documents(cursor):
    return json.loads(json_util.dumps(list(cursor)))


@app.route('/')
def hello_world():
    return jsonify({"status": "Safe Flight API is running"})


@app.route('/countriesDB', methods=["GET", "POST"])
def countriesDB():
    countries = get_or_create_collection("countries")
    should_refresh = False

    if request.method == 'POST':
        request_body = request.get_json(silent=True) or {}
        should_refresh = bool(request_body.get('data'))
        if should_refresh:
            countries.drop()
            countries = mongoDB.createCollection("countries")

    if not should_refresh and countries.count_documents({}) > 0:
        return jsonify({"data": serialize_documents(countries.find({}))})

    api_result = api.getCountriesDB()
    if api_result:
        countries.insert_many(json.loads(json_util.dumps(api_result)))

    return jsonify({"data": serialize_documents(countries.find({}))})


@app.route("/addFavourites", methods=["POST"])
def addFavourites():
    request_body = request.get_json(silent=True) or {}
    request_data = request_body.get("request_data", {})
    country_payload = request_data.get('data', {})
    country_data = json.loads(country_payload) if isinstance(country_payload, str) else country_payload
    is_checked = bool(request_data.get("isChecked"))

    if not country_data or "_id" not in country_data:
        return jsonify({"ok": False, "error": "Missing country data"}), 400

    favourites = get_or_create_collection("favourites")

    if is_checked:
        favourites.update_one({"_id": country_data["_id"]}, {"$set": country_data}, upsert=True)
    else:
        favourites.delete_one({"_id": country_data["_id"]})

    countries = mongoDB.getCollection("countries")
    if countries is not None:
        marker_update = {"$set": {"inFavourites": True}} if is_checked else {"$unset": {"inFavourites": ""}}
        countries.update_one({"_id": country_data["_id"]}, marker_update)

    return jsonify({"ok": True})


@app.route("/resetFavourites", methods=["POST"])
def resetFavourites():
    if "favourites" in mongoDB.mydb.list_collection_names():
        mongoDB.getCollection("favourites").drop()

    countries = mongoDB.getCollection("countries")
    if countries is not None:
        countries.update_many({"inFavourites": True}, {"$unset": {"inFavourites": ""}})

    return jsonify({"ok": True})


@app.route("/favouritesDB")
def favouritesDB():
    if "favourites" not in mongoDB.mydb.list_collection_names():
        return jsonify({"data": []})

    favourites = mongoDB.getCollection("favourites")
    return jsonify({"data": serialize_documents(favourites.find({}))})


if __name__ == '__main__':
    app.run(debug=True)
