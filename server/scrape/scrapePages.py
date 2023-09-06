from recipe_scrapers import scrape_me
import requests
import time
import csv
with open('scrape/links.csv', 'r') as read_obj:
  
    # Return a reader object which will
    # iterate over lines in the given csvfile
    csv_reader = csv.reader(read_obj)
  
    # convert string to list
    link_lst = list(set(list(csv_reader)[0]))

print("Start Scrapping")

for i,link in enumerate(link_lst):
    t0 = time.time()
    print(str(i)+"/"+str(len(link_lst))+" Complete")
    scraper = scrape_me(link)

    try:
        title = scraper.title()
        total_time = scraper.total_time()
        yields = scraper.yields()
        steps = scraper.instructions().split("\n")
        ingredients = scraper.ingredients()
    except:
        continue

    try:
        desc = scraper.description()
    except:
        desc = None

    try:
        image = scraper.image()
    except:
        image = "https://www.clipartmax.com/png/small/20-202096_pictures-of-spatulas-spatula-clipart-black-and-white.png"

    try:
        cuisine = scraper.cuisine()
    except:
        cuisine = None

    try:
        category = scraper.category()
    except:
        category = None

    requests.post("http://localhost:8080/recipe/new",json={
        'title':title,
        'desc':desc,
        'total_time':total_time,
        'yields':yields,
        'steps':steps,
        'ingredients':ingredients,
        'image':image,
        'cuisine':cuisine,
        'category':category,
        'link': link})

    sleep= .99-(time.time()-t0)
    if sleep < 0:
        sleep = 0

    time.sleep(sleep)
    
print(str(len(link_lst))+"/"+str(len(link_lst))+" Complete, Closing Server")
requests.get("http://localhost:8080/quit")