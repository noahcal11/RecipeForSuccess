from recipe_scrapers import scrape_me
import requests
import time

link_lst = ["https://www.allrecipes.com/recipe/14385/pasta-salad/","https://www.allrecipes.com/recipe/253157/weeknight-skillet-slaw/","https://www.allrecipes.com/grilled-tomahawk-steak-recipe-7508957","https://www.allrecipes.com/chicken-bhuna-recipe-7485475","https://www.allrecipes.com/family-friendly-fish-pie-recipe-7485208","https://www.allrecipes.com/recipe/83646/corned-beef-roast/"]

print("Start Scrapping")

def scrape(link):
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
        return

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

    requests.post("http://localhost:3001/recipe/new",json={
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

    sleep= 1-(time.time()-t0)
    if sleep < 0:
        sleep = 0

    time.sleep(sleep)

for i,link in enumerate(link_lst):
    scrape(link)
    
print(str(len(link_lst))+"/"+str(len(link_lst))+" Complete, Closing Server")
requests.get("http://localhost:3001/quit")