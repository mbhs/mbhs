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

def update_names():
    current_staff = get_current_staff()
    for staff in current_staff:
        staff["attributes"]["name"] = staff["attributes"]["name"].replace("\xa0", " ").replace("  ", " ").strip()

    for staff in current_staff:
        try:
            res = requests.put(f"https://strapi.mbhs.edu/api/directory/{staff['id']}", headers={
            "Authorization": f"Bearer {config('STRAPI_API_KEY')}",
            }, json={"data": {"name": staff["attributes"]["name"]}})

            print(f'Updating {staff["attributes"]["name"]}...')

            if res.status_code != 200:
                print(res.raise_for_status())
        except:
            print(f"Error updating {staff['attributes']['name']}")
            pass
    
update_names()