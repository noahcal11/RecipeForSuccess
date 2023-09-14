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

skills_cooking_lst = [
    'roast', 'roasts', 'sautee', 'sautees', 'blanch', 'blanches',
    'sear', 'sears', 'bake', 'bakes', 'grill', 'grills', 'steam', 'steams', 'stir-fry', 
    'stir-fries', 'simmer', 'simmers', 'poach', 'poaches', 'broil', 'broils', 'fry', 
    'fries', 'braise', 'braises', 'barbecue', 'barbecues', 'smoke', 'smokes', 'sous-vide', 
    'sous-vides', 'deglaze', 'deglazes', 'marinate', 'marinates', 'caramelize', 'caramelizes', 
    'pickle', 'pickles', 'ferment', 'ferments', 'macerate', 'macerates', 'render', 
    'renders', 'brown', 'browns', 'reduce', 'reduces', 'blitz', 'blitzes', 
    'infuse', 'infuses', 'baste', 'bastes', 'butterfly', 'butterflies', 
    'debone', 'debones', 'fillet', 'fillets', 'flambé', 'flambés', 'parboil', 
    'parboils', 'melt', 'melts', 'shallow-fry', 'shallow-fries', 'sweat', 'sweats', 'coddle', 
    'coddles', 'pressure-cook', 'pressure-cooks', 'stew', 'stews', 'pot-roast', 'pot-roasts', 'deep-fry', 'deep-fries',  
]

skills_ingredients_lst = [
    'emulsify', 'emulsifies', 'whip', 'whips', 'stir', 'stirs', 'beat', 'beats', 
    'blend', 'blends', 'bind', 'binds', 'cream', 'creams', 'fold', 'folds', 
    'mix', 'mixes', 'combine', 'combines', 'incorporate', 'incorporates', 
    'knead', 'kneads', 'toss', 'tosses', 'shake', 'shakes', 'whisk', 'whisks', 
    'mash', 'mashes', 'puree', 'purees', 'grind', 'grinds', 'crush', 'crushes', 
    'grate', 'grates', 'sprinkle', 'sprinkles', 'dust', 'dusts', 'sprinkle', 
    'sprinkles', 'dredge', 'dredges', 'coat', 'coats', 'season', 'seasons', 
    'marinate', 'marinates', 'rub', 'rubs', 'massage', 'massages', 'glaze', 
    'glazes', 'baste', 'bastes', 'brush', 'brushes', 'dab', 'dabs', 'drizzle', 
    'drizzles', 'pour', 'pours', 'spray', 'sprays', 'garnish', 'garnishes', 
    'layer', 'layers', 'sculpt', 'sculpts', 'shape', 'shapes', 'form', 'forms',
    'cut', 'cuts', 'slice', 'slices', 'dice', 'dices', 'chop', 'chops', 'mince', 
    'minces', 'shred', 'shreds', 'peel', 'peels', 'core', 'cores', 'devein', 
    'deveins', 'pit', 'pits', 'segment', 'segments', 'section', 'sections', 
    'carve', 'carves', 'crack', 'cracks', 'fold', 'folds', 'mash', 'mashes'
]

skills_knife_lst = [
    'chop', 'chops', 'dice', 'dices', 'mince', 'minces', 'slice', 'slices', 
    'segment', 'segments', 'score', 'scores', 'crush', 'crushes', 'bruise', 'bruises', 
    'zest', 'zests', 'shuck', 'shucks', 'baste', 'bastes', 'fillet', 'fillets', 
    'julienne', 'juliennes', 'butterfly', 'butterflies', 'debone', 'debones', 'carve', 
    'carves', 'macerate', 'macerates', 'shred', 'shreds', 'grate', 'grates', 'peel', 'peels', 
    'supreme', 'supremes', 'brunoise', 'brunoises', 'chiffonade', 'chiffonades', 
    'mirepoix', 'mirepoixes', 'tourne', 'turnes', 'parisienne', 'parisiennes', 
    'paisley', 'paisleys', 'lozenge', 'lozenges', 'oblique', 'obliques', 'batonnet', 'batonnets', 
    'shave', 'shaves', 'allumette', 'allumettes',  'trim', 'trims', 'round', 'rounds', 'roll cut', 
    'roll cuts', 'spoon', 'spoons', 'ball', 'balls', 'diagonal', 'diagonals'
]

for i,link in enumerate(link_lst):
    if i == 2:
        break
    t0 = time.time()
    print(str(i)+"/"+str(len(link_lst))+" Complete")
    scraper = scrape_me(link)

    title = scraper.title()
    total_time = scraper.total_time()
    yields = scraper.yields()
    steps = scraper.instructions().split("\n")

    skills = []
    for step in steps:
        words = step.split(" ")
        for word in words:
            if word.lower() in skills_knife_lst:
                skills.append(word.lower())
            if word.lower() in skills_cooking_lst:
                skills.append(word.lower())
            if word.lower() in skills_ingredients_lst:
                skills.append(word.lower())
        skills = list(set(skills))
    print(list(set(skills)), steps, link)
    ingredients = scraper.ingredients()

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
        'link': link,
        'skills':skills
        })

    
    sleep= .99-(time.time()-t0)
    if sleep < 0:
        sleep = 0

    time.sleep(sleep)
    
print(str(len(link_lst))+"/"+str(len(link_lst))+" Complete, Closing Server")
requests.get("http://localhost:8080/quit")