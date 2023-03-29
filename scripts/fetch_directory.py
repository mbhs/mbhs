import json
import requests
from bs4 import BeautifulSoup

def parse_staff_directory_to_strapi(html_file_path, strapi_api_url):
    # Read the HTML file
    with open(html_file_path, 'r') as file:
        html_content = file.read()

    # Parse the HTML using BeautifulSoup
    soup = BeautifulSoup(html_content, 'html.parser')

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

                # Check if the staff member already exists in the Strapi database
                response = requests.get(strapi_api_url, params={'email': email})
                if response.status_code == 200 and response.json():
                    print(f"Staff member {name} already exists in the database.")
                    continue

                # Prepare staff member data for POST request
                staff_data = {
                    'Department': department_name,
                    'Name': name,
                    'Title': title,
                    'Email': email
                }

                # POST request to add the staff member to the Strapi database
                response = requests.post(strapi_api_url, json=staff_data)
                if response.status_code == 201:
                    print(f"Staff member {name} has been successfully added to the database.")
                else:
                    print(f"Failed to add staff member {name} to the database. Response code: {response.status_code}")

# Specify the path to the input HTML file and the Strapi API URL
html_file_path = 'Staff Directory - Montgomery County Public Schools, Rockville, MD.html'
strapi_api_url = 'https://strapi.mbhs.edu/api/directory'

# Execute the function to parse the HTML and add the staff data to the Strapi database
parse_staff_directory_to_strapi(html_file_path, strapi_api_url)
