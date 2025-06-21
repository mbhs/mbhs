import re
from bs4 import BeautifulSoup
import requests
from dotenv import load_dotenv
from decouple import config
from datetime import datetime, timedelta
import json

# Load environment variables
load_dotenv()

format_string = "%Y-%m-%d"

def get_departments():
  department_to_id = {}

def get_current_days():
    start_date = datetime.strptime(requests.get('https://strapi.mbhs.edu/api/evenodd').json().get('data')["attributes"]["startDate"], format_string)
    current_days = requests.get(f"https://strapi.mbhs.edu/api/events?filters[startDate][$gte]={start_date.date()}&pagination[limit]=1000").json().get('data')
    return current_days

def clean_text(text):
  return text.replace("\xa0", " ").replace("  ", " ").strip().title()

def dates_to_str(dates):
  dates = [datetime.strptime(i, format_string) for i in dates]
  dates = list(dict.fromkeys([f"{i.month}/{i.day}" for i in dates]))
  return ", ".join([f"and {dates[i]}." if i==len(dates)-1 else dates[i] for i in range(len(dates))])

def parse_months(html_content, start_month, start_year):
  month, year = start_month, start_year
  # Parse the HTML using BeautifulSoup
  soup = BeautifulSoup(html_content, 'html.parser')

  #store a dictionary of days, month {days}, days {}
  calendar_json = {}

  # go through all the calendar tables
  for calendar in soup.find_all("table", class_="calendarEvent"):
    for week in calendar.find_all("tr", class_="weekDay"): #go thru each week
      for td in week.find_all("td"): #go thru each box in the week
          for p in td.find_all("p", string=re.compile(r"^\d+$")): #go thru all the boxes that are actually days
            day = datetime.strptime(f"{year}-{month}-{p.text}", format_string) #grab the date
            calendar_json[str(day.date())] = {"isWeekend":None, "events":[]} #day properties
            calendar_json[str(day.date())]["isWeekend"] = (True if "weekend" == td.get("class")[0].lower() else False) #whether or not it is a weekend / weekday
            for div in p.find_next_siblings("div", class_="singleEvent"): #go thru all the events on that day
              if "arcola es school only" not in div.text.lower(): #filter out arcola es school only events
                event = (div.find("h4").text.split("\u2014") if "\u2014" in div.text else div.find("h4").text.split(";")) #events are either split via em dash or ;
                event = [clean_text(i) for i in event] #clean up text
                event = {"title":event[0], "description":(" ".join(event[1::]) if len(event) > 1 else "")} #event to dictionary
                calendar_json[str(day.date())]["events"].append(event) #add event to json
    month = 12 if (month+1) % 12 == 0 else (month+1) % 12 # update month & year
    year = start_year+1 if month < start_month else start_year

  # with open("scripts/calendar", 'w') as jsonfile:
  #     json.dump(calendar_json, jsonfile, indent=4)
  return calendar_json

def clean_json(calendar_json):
  event_json = []
  chain = {}
  for day in calendar_json:
    if chain: # if there is a chain...
      added = False
      for desc in [desc for desc in list(chain) if isinstance(chain[desc], list)]: #for all the possible descriptions in the chain
        for event in calendar_json[day]["events"]: #for each event in the current day
          if event["description"].lower() == desc.lower():  #if the descriptions match, add the day to the chain
            chain[desc].append(day)
            value = chain["desc_to_title"][desc].pop(event["title"], 0)+1
            chain["desc_to_title"][desc][event["title"]] = value
            if not calendar_json[day]["isWeekend"]: chain["endDate"] = day 
            added = True
            for other_event in [i for i in calendar_json[day]["events"] if event != i]:
              if other_event["description"] in chain: chain[other_event["description"]].append(day)
              else: chain[other_event["description"]] = [day]
              if other_event["description"] not in chain["desc_to_title"]: chain["desc_to_title"][other_event["description"]] = {other_event["description"]:{}}
              value = chain["desc_to_title"][desc].pop(other_event["title"],0)+1
              chain["desc_to_title"][desc][event["title"]] = value
            continue
      if calendar_json[day]["isWeekend"]: added = True
      if added: continue
      #nothing added means chain is over, build event for strapi
      descs = [desc for desc in chain if isinstance(chain[desc],list)]
      description = [max(descs, key=lambda k: len(chain[k]))] #find most common desc in the chain
      title = max(chain["desc_to_title"][description[0]], key=chain["desc_to_title"][description[0]].get) #find most common title of the most common desc
      [description.append(f"{desc} {dates_to_str(chain[desc])}") for desc in descs if desc != description[0]] #add all chained descriptions together
      if "early release" in title.lower() and chain.get("endDate"): #if early release, separate the chain into individual days
        startDate = datetime.strptime(chain["startDate"], format_string)
        endDate = datetime.strptime(chain["endDate"], format_string)
        for i in range((endDate-startDate).days+1):
          event_json.append({
            "title": title,
            "description": "; ".join(description),
            "startDate": str((startDate+timedelta(days=i)).date()),
            "endDate": None,
            "important": True,
            "createdBy": "Python Web Scraping Script",
            "updatedBy": "Python Web Scraping Script"
          })
      else: #otherwise just add the chain to the json normally
        event_json.append({ 
          "title": f"{title} Break" if "thanksgiving" in title.lower() and "break" not in title.lower() else title, #edit thanksgiving to have break in it lol
          "description": "; ".join(description),
          "startDate": chain["startDate"],
          "endDate" : chain.get("endDate"),
          "important": True,
          "createdBy": "Python Web Scraping Script",
          "updatedBy": "Python Web Scraping Script"
        })
      chain = {}
    #if nothing was added to chain/there is no chain... then make a chain
    if not calendar_json[day]["isWeekend"] and calendar_json[day]["events"]: 
      chain = {event["description"]:[day] for event in calendar_json[day]["events"]}
      chain["desc_to_title"] = {event["description"]:{event["title"]:1} for event in calendar_json[day]["events"]}
      chain["startDate"] = day
  # print(json.dumps(events, indent=4))
  # with open("scripts/events", 'w') as jsonfile:
  #     json.dump(events_json, jsonfile, indent=4)
  return event_json

#dummy proofed strapi upload w/ input
def strapi_request(event_json, current_days):
  strapi = event_json.copy()
  #filter out events already up
  [[strapi.remove(i) for j in current_days if i["startDate"] == j["attributes"]["startDate"] and i["title"] == j["attributes"]["title"]] for i in event_json]
  # print(json.dumps(strapi, indent=4))
  for i in strapi:
    print(json.dumps(i, indent=4))
    if input("enter nothing to post this to strapi. all other responses mean no: ") == "":
      try:
        res = requests.post('https://strapi.mbhs.edu/api/events', headers={
            'Authorization': f'Bearer {config("STRAPI_API_KEY")}',
        }, json={'data': i})
        print(f"successfully added {i["title"]} starting at {i["startDate"]}")
      except:
        print(f'Failed to add {i["title"]} for {i["startDate"]}')
        print("Manual intervention required: conflict detected ")
        pass
    else: print("skipping event... \n")

start_year = 2025 
start_month = 8
num_months = 12
html = requests.get(f"https://ww2.montgomeryschoolsmd.org/calendar/index.aspx?calendarViewType=month&calendarDate={start_month}/1/{start_year}&filters=37&isAll=n&langId=1033&monthShows={num_months}").text
strapi_request(clean_json(parse_months(html, start_month, start_year)), get_current_days())