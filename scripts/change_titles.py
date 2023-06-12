import json
from bs4 import BeautifulSoup
import requests
from decouple import config

# Load environment variables
# dotenv.load_dotenv()

def get_current_staff():
    current_staff = requests.get("https://strapi.mbhs.edu/api/directory?populate[departments][fields]=name&populate=image&pagination[limit]=1000&sort[0]=rank:ASC&sort[1]=name:ASC&fields[0]=name&fields[1]=email&fields[2]=title").json().get("data")
    print(f"Found {len(current_staff)} current staff members")
    return current_staff

def update_titles():
    current_staff = get_current_staff()
    for staff in current_staff:
        if staff["attributes"]["title"].lower() == "principal asst high":
            staff["attributes"]["title"] = "Assistant Principal"
        if staff["attributes"]["title"].lower() == "classroom teacher high":
            staff["attributes"]["title"] = "Teacher"
        if staff["attributes"]["title"].lower() == "teacher resource":
            staff["attributes"]["title"] = "Resource Teacher"
        if "paraeducator" in staff["attributes"]["title"].lower():
            staff["attributes"]["title"] = "Paraeducator"
        staff["attributes"]["title"] += " "
        staff["attributes"]["title"] = staff["attributes"]["title"].replace("Asst", "Assistant").replace(" VI ", " ").replace(" IV ", " ").replace(" II ", " ").replace(" I ", " ").replace(" V ", " ").replace("Sh 1", "").replace("Sh 2", "").replace("10 month", "").replace("10 mo", "").replace("10 Month", "").replace("11 Mo", "").replace("12 Month", "").replace("12 month", "")
        staff['attributes']['title'] = staff['attributes']['title'].replace("  ", " ").strip()

    for staff in current_staff:
        print(staff["attributes"]["title"])
    for staff in current_staff:
         print(staff)
    for staff in current_staff:
        res = requests.put(f"https://strapi.mbhs.edu/api/directory/{staff['id']}", headers={
          "Authorization": f"Bearer {config('STRAPI_API_KEY')}",
        }, json={"data": {"title": staff["attributes"]["title"]}})
    
    res.raise_for_status()
    print(res)

    
update_titles()