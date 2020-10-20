import requests
import json

def gov_api ():
    url = "https://data.gov.il/api/3/action/datastore_search"
    request_data = {"resource_id":"f004176c-b85f-4542-8901-7b3176f9a054",
                    "q":"פעילה",
                    "limit":1000,
                    "offset":0}
    data= requests.post(url, data= request_data).text
    unjson = json.loads(data)
    recs = unjson["result"]["records"]
    company_heb = 'שם חברה'
    company_en = 'שם באנגלית'
    my_arr = []
    for rec in recs:
        name = rec[company_heb] if (rec[company_en] == '') else (rec[company_heb] + " / " + rec[company_en])
        my_arr.append(name)
    return my_arr