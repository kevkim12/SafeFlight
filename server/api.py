import requests
from decouple import config

AIRLABS = config("AIRLABS", default='')
AIRLABS_BASE = config("AIRLABS_BASE", default='')
TA_BASE = config('TA_BASE', default='')
REQUEST_TIMEOUT = 15


def getStatus(current_advisory):
    score = current_advisory.get('advisory', {}).get('score')
    if score is None:
        return 'Unknown'
    if score < 2.5:
        return 'Low Risk'
    if score < 3.5:
        return 'Medium Risk'
    if score < 4.5:
        return 'High Risk'
    return 'Extreme Warning'


def get_airlabs_response(endpoint, params=None):
    if not AIRLABS_BASE:
        return []

    try:
        response = requests.get(
            f"{AIRLABS_BASE}{endpoint}",
            {**(params or {}), 'api_key': AIRLABS},
            timeout=REQUEST_TIMEOUT,
        )
        response.raise_for_status()
        return response.json().get("response", [])
    except requests.RequestException:
        return []


def getCountriesDB():
    """
    Returns country risk documents suitable for MongoDB insertion.
    """
    countries = get_airlabs_response('countries')
    advisory_cache = {}
    returned_list = []

    for country_elem in countries:
        country_code = country_elem.get("code")
        country_name = country_elem.get("name")
        if not country_code or not country_name:
            continue

        if country_code not in advisory_cache:
            current_advisory = getWarningLevel(country_code)
            advisory_cache[country_code] = getStatus(current_advisory) if current_advisory else "Unknown"

        returned_list.append({
            "country_name": country_name,
            "_id": country_code,
            "country_status": advisory_cache[country_code],
        })

    return returned_list


def getAirportsDB():
    """
    Returns airports enriched with country names and country risk status.
    """
    airports = get_airlabs_response('airports')
    country_cache = {}
    returned_list = []

    for airport_elem in airports:
        country_code = airport_elem.get("country_code")
        if country_code not in country_cache:
            advisory = getWarningLevel(country_code)
            country_cache[country_code] = {
                "name": advisory.get("name") if advisory else getCountryName(country_code),
                "status": getStatus(advisory) if advisory else "Unknown",
            }

        country_info = country_cache[country_code]
        returned_list.append({
            "airport": airport_elem.get("name"),
            "iata_code": airport_elem.get('iata_code'),
            "country": country_info["name"],
            "status": country_info["status"],
        })

    return returned_list


def getCountryName(country_code):
    countries = get_airlabs_response('countries', {'code': country_code})
    if not countries:
        return "Unknown"
    return countries[0].get("name", "Unknown")


def getWarningLevel(country_code):
    if not country_code or not TA_BASE:
        return {}

    try:
        result = requests.get(TA_BASE, params={'countrycode': country_code}, timeout=REQUEST_TIMEOUT)
        if result.status_code != 200:
            return {}
        return result.json().get("data", {}).get(country_code, {})
    except requests.RequestException:
        return {}
