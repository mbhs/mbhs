import json
from bs4 import BeautifulSoup
import requests
from decouple import config

# Load environment variables
# dotenv.load_dotenv()

def get_current_staff():
    current_staff = requests.get('https://strapi.mbhs.edu/api/directory').json().get('data')
    print(current_staff)
    print(f'Found {len(current_staff)} current staff members')

def parse_staff_directory_to_json(html_content, json_file_path):

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

                staffinfo_element = li.find('div', class_='staffinfo clearfix mtm')
                title = staffinfo_element.find('p').get_text(strip=True) if staffinfo_element else ''

                email_element = li.find('a', href=lambda x: x and x.startswith('mailto:'))
                email = email_element.get_text(strip=True) if email_element else ''

                # Append the information to the staff_info_json list as a dictionary
                staff_info_json.append({
                  #'Department': department_name,
                  'name': name,
                  'title': title,
                  'email': email,
                  "createdBy": "Python Web Scraping Script",
                  "updatedBy": "Python Web Scraping Script"
                })


    print(staff_info_json)
    for i in staff_info_json:
      res = requests.post('https://strapi.mbhs.edu/api/directory', headers={
        'Authorization': f'Bearer {config("STRAPI_API_KEY")}',
      }, json={'data': i})

    res.raise_for_status()
    print(res)

    # Save the extracted data to a JSON file
    # with open(json_file_path, 'w') as jsonfile:
    #     json.dump(staff_info_json, jsonfile, indent=4)

# Specify the path to the input HTML file and the output JSON file
html = requests.get('https://ww2.montgomeryschoolsmd.org/directory/directory_Boxschool.aspx?processlevel=04757').text
json_file_path = 'teachers.json'

# Execute the function to parse the HTML and save the data to JSON
parse_staff_directory_to_json(html, json_file_path)
#get_current_staff()
print(config("STRAPI_API_KEY"))