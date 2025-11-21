from time import sleep
from bs4 import BeautifulSoup
import requests
from decouple import config

# Load environment variables
# dotenv.load_dotenv()

# TODO: implement fuzzy string matching so people don't get randomly removed from the site when their name changes
# implement a substitution for the occasional non length breaking space that pops up

def get_departments():
  department_to_id = {}

def get_current_staff():
    current_staff = requests.get('https://strapi.mbhs.edu/api/directory?pagination[limit]=1000').json().get('data')
    staff_to_id = {}
    for i in current_staff:
      # create name without honorific to ignore honorific differences
      honorific = i["attributes"]["name"].split(".",1)[0][::-1].split(" ",1)[0][::-1]+"."
      i["attributes"]["name"] = i['attributes']['name'].replace(honorific, "").replace("  ", " ").strip()
      #pair name to id
      try:
        if(staff_to_id[i['attributes']['name']]):
          print("Dupe!")
      except:
         pass
      staff_to_id[i['attributes']['name']] = i['id']
    current_staff = [i['attributes']['name'] for i in current_staff]
    print(staff_to_id)
    print(f'Found {len(current_staff)} current staff members')
    return current_staff, staff_to_id

def parse_staff_directory_to_json(html_content, current_staff, staff_to_id):
  # Parse the HTML using BeautifulSoup
  soup = BeautifulSoup(html_content, 'html.parser')

  # Create a list to store the extracted staff information as dictionaries
  staff_info_json = []

  # Find all department headers and iterate through them
  for department_header in soup.find_all('h5', class_='bg-cyan dark-gray-text py-2 pl-2'):
    department_name = department_header.get_text(strip=True)

    # Find the sibling unordered lists for each department header
    for ul in department_header.find_next_siblings('ul', class_='box-one-light'):
      for li in ul.find_all('li'):
        # Extract staff name, title, and email
        name = li.find('span', class_='dark-gray-border').get_text(strip=True) if li.find('span', class_='dark-gray-border') else ''
        # properly format spaces
        name = name.replace("\xa0", " ")
        
        staffinfo_element = li.find('div', class_='staffinfo clearfix mtm')
        title = staffinfo_element.find('p').get_text(strip=True) if staffinfo_element else ''

        email_element = li.find('a', href=lambda x: x and x.startswith('mailto:'))
        email = email_element.get_text(strip=True) if email_element else ''

        # Append the information to the staff_info_json list as a dictionary
        staff_info_json.append({
          'Department': department_name,
          'name': str(name),
          'title': str(title),
          'email': str(email),
          "createdBy": "Python Web Scraping Script",
          "updatedBy": "Python Web Scraping Script"
        })
  
  print(staff_info_json)

  new_staff = []
  lost_staff = current_staff.copy()
  for i in staff_info_json:
    # create temp name to ignore honorific differences
    honorific = i["name"].split(".",1)[0][::-1].split(" ",1)[0][::-1]+"."
    # preferred_name = i["name"].split(")", 1)[0][::-1].split("(", 1)[0][::-1]
    # first_name = i["name"].split(")", 1)[0].split(" ", 3)[2]
    temp_name = i["name"].replace(honorific, "").replace("  ", " ").strip()
    #print(i["name"].replace(honorific, "").replace(first_name, preferred_name).replace("  ", " ").strip(), preferred_name, first_name)
    # filtering staff based off of new/lost/current
    if temp_name in current_staff:
      try:
        # if the name is in strapi, remove it from lost list
        lost_staff.remove(temp_name)
        # will overwrite data in strapi with mcps directory
        # res = requests.put(f'https://strapi.mbhs.edu/api/directory/{staff_to_id[temp_name]}', headers={
        #    'Authorization': f'Bearer: {config("STRAPI_API_KEY")}',
        # }, json={'data': i})

        # if res.status_code != 200:
        #   print(res.raise_for_status())
        # print(f'Updating {i["name"]}...')
      except:
          # print(f'Failed to update {i["name"]} Error Code: {res.status_code}')
          pass
    else:
      # if name is not in strapi, add it to new list
      new_staff.append(i['name'])
      try:
        res = requests.post('https://strapi.mbhs.edu/api/directory', headers={
          'Authorization': f'Bearer: {config("STRAPI_API_KEY")}',
        }, json={'data': i})
        print(i)

        if res.status_code != 200:
            print(res.raise_for_status())
            print(f'Adding {i["name"]}...')
      except:
        print(f'Failed to add {i["name"]}')
        print(f"Manual intervention required: conflict detected. Error code {res.status_code}", res.reason)
        print(i)
        pass
  
  for i in range(len(lost_staff)):
    # get the id of the lost staff
    id = staff_to_id[lost_staff[i]]
    try:
      res = requests.put(f"https://strapi.mbhs.edu/api/directory/{id}", headers={
        "Authorization": f'Bearer: {config("STRAPI_API_KEY")}',
        }, json={"data": {"publishedAt": None}})
      
      print(f'Unpublishing {lost_staff[i]}...')

      if res.status_code != 200:
        print(res.raise_for_status())
    except:
      print(f"Error unpublishing {lost_staff[i]}: Error code {res.status_code}", res.reason)
      pass

  # print the staff in current staff not found in mcps
  print("The following staff are no longer found in the MCPS Directory and have been automatically unpublished:")
  for i in range(len(lost_staff)):
    print(f'{i+1}: {lost_staff[i]}')

  # print the staff in mcps not found in current staff
  print("The following staff are new to the MCPS Directory and have been added to the MBHS directory:")
  for i in range(len(new_staff)):
    print(f'{i+1}: {new_staff[i]}')

  # Save the extracted data to a JSON file
  # with open(json_file_path, 'w') as jsonfile:
  #     json.dump(staff_info_json, jsonfile, indent=4)

# Specify the path to the input HTML file and the output JSON file
html = requests.get('https://ww2.montgomeryschoolsmd.org/directory/directory_Boxschool.aspx?processlevel=04757').text

# # Execute the function to parse the HTML and save the data to JSON
current_staff, staff_to_id = get_current_staff()
parse_staff_directory_to_json(html, current_staff, staff_to_id)

# test_data = {
#   'name': "test",
#   'title': "test",
#   'email': "test",
#   "createdBy": "Python Web Scraping Script",
#   "updatedBy": "Python Web Scraping Script",
#   "departments" : {
#     "connect": [16]
#   }
#   }

# try:
#   res = requests.post('https://strapi.mbhs.edu/api/directory', headers={
#     'Authorization': f'Bearer: {config("STRAPI_API_KEY")}',
#   }, json={'data': test_data})

#   if res.status_code != 200:
#       print(res.raise_for_status())
#       print(f'Adding {test_data["name"]}...')
# except:
#   print(f'Failed to add {test_data["name"]}')
#   print("Manual intervention required: conflict detected ")
#   pass