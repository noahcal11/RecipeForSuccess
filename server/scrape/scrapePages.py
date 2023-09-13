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
    'roast', 'roasts', 'sautee', 'sautees', 'blanch', 'blanches', 'boil', 'boils',
    'sear', 'sears', 'bake', 'bakes', 'grill', 'grills', 'steam', 'steams', 'stir-fry', 
    'stir-fries', 'simmer', 'simmers', 'poach', 'poaches', 'broil', 'broils', 'fry', 
    'fries', 'braise', 'braises', 'barbecue', 'barbecues', 'smoke', 'smokes', 'sous-vide', 
    'sous-vides', 'deglaze', 'deglazes', 'marinate', 'marinates', 'caramelize', 'caramelizes', 
    'grate', 'grates', 'puree', 'purees', 'whip', 'whips', 'knead', 'kneads', 'pickle', 
    'pickles', 'ferment', 'ferments', 'confit', 'confits', 'macerate', 'macerates', 'render', 
    'renders', 'brown', 'browns', 'reduce', 'reduces', 'clarify', 'clarifies', 'blitz', 'blitzes', 
    'glaze', 'glazes', 'infuse', 'infuses', 'baste', 'bastes', 'butterfly', 'butterflies', 
    'debone', 'debones', 'fillet', 'fillets', 'julienne', 'juliennes', 'chop', 'chops', 'dice', 
    'dices', 'mince', 'minces', 'slice', 'slices', 'shred', 'shreds', 'peel', 'peels', 'segment', 
    'segments', 'score', 'scores', 'crush', 'crushes', 'bruise', 'bruises', 'zest', 'zests', 
    'supreme', 'supremes', 'shuck', 'shucks', 'flambé', 'flambés', 'whisk', 'whisks', 'fold', 
    'folds', 'cream', 'creams', 'knead', 'kneads', 'proof', 'proofs', 'chill', 'chills', 'parboil', 
    'parboils', 'melt', 'melts', 'brown', 'browns', 'clarify', 'clarifies', 'shallow-fry', 'shallow-fries', 
    'sweat', 'sweats', 'sift', 'sifts', 'strain', 'strains', 'degas', 'degases', 'deglaze', 'deglazes', 
    'emulsify', 'emulsifies', 'coddle', 'coddles', 'jelly', 'jellies', 'pickle', 'pickles', 
    'pressure-cook', 'pressure-cooks', 'roast', 'roasts', 'steam', 'steams', 'pan-fry', 
    'pan-fries', 'stew', 'stews', 'braise', 'braises', 'pot-roast', 'pot-roasts', 'simmer', 
    'simmers', 'blanch', 'blanches', 'deep-fry', 'deep-fries', 'stir-fry', 'stir-fries', 
    'braise', 'braises', 'sous-vide', 'sous-vides', 'bake', 'bakes', 'grill', 'grills', 
    'boil', 'boils', 'smoke', 'smokes', 'poach', 'poaches', 'broil', 'broils', 'barbecue', 
    'barbecues', 'caramelize', 'caramelizes', 'glaze', 'glazes'
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
    'top', 'tops', 'layer', 'layers', 'arrange', 'arranges', 'assemble', 
    'assembles', 'decorate', 'decorates', 'sculpt', 'sculpts', 'shape', 'shapes', 
    'form', 'forms', 'cut', 'cuts', 'slice', 'slices', 'dice', 'dices', 'chop', 
    'chops', 'mince', 'minces', 'shred', 'shreds', 'julienne', 'juliennes', 
    'peel', 'peels', 'core', 'cores', 'devein', 'deveins', 'pit', 'pits', 
    'segment', 'segments', 'section', 'sections', 'carve', 'carves', 'crack', 
    'cracks', 'whip up', 'whips up', 'beat together', 'beats together', 
    'fold in', 'folds in', 'mix in', 'mixes in', 'combine with', 'combines with', 
    'incorporate into', 'incorporates into', 'knead into', 'kneads into', 
    'toss with', 'tosses with', 'shake in', 'shakes in', 'whisk in', 'whisks in', 
    'mash into', 'mashes into', 'puree with', 'purees with', 'grind into', 
    'grinds into', 'crush into', 'crushes into', 'grate into', 'grates into', 
    'sprinkle with', 'sprinkles with', 'dust with', 'dusts with', 'sprinkle over', 
    'sprinkles over', 'dredge with', 'dredges with', 'coat with', 'coats with', 
    'season with', 'seasons with', 'marinate in', 'marinates in', 'rub with', 
    'rubs with', 'massage into', 'massages into', 'glaze with', 'glazes with', 
    'baste with', 'bastes with', 'brush with', 'brushes with', 'dab with', 
    'dabs with', 'drizzle with', 'drizzles with', 'pour over', 'pours over', 
    'spray with', 'sprays with', 'garnish with', 'garnishes with', 'top with', 
    'tops with', 'layer with', 'layers with', 'arrange on', 'arranges on', 
    'assemble with', 'assembles with', 'decorate with', 'decorates with', 
    'sculpt with', 'sculpts with', 'shape into', 'shapes into', 'form into', 
    'forms into', 'cut into', 'cuts into', 'slice into', 'slices into', 
    'dice into', 'dices into', 'chop into', 'chops into', 'mince into', 
    'minces into', 'shred into', 'shreds into', 'julienne into', 'juliennes into', 
    'peel off', 'peels off', 'core out', 'cores out', 'devein with', 'deveins with', 
    'pit and remove', 'pits and removes', 'segment into', 'segments into', 
    'section into', 'sections into', 'carve into', 'carves into', 'crack open and', 
    'cracks open and'
]

skills_knife_lst = [
    'chop', 'chops', 'dice', 'dices', 'mince', 'minces', 'slice', 'slices', 
    'shred', 'shreds', 'peel', 'peels', 'segment', 'segments', 'score', 'scores', 
    'crush', 'crushes', 'bruise', 'bruises', 'zest', 'zests', 'supreme', 'supremes', 
    'shuck', 'shucks', 'baste', 'bastes', 'fillet', 'fillets', 'julienne', 'juliennes', 
    'butterfly', 'butterflies', 'debone', 'debones', 'carve', 'carves', 'macerate', 
    'macerates', 'slice', 'slices', 'dice', 'dices', 'mince', 'minces', 'shred', 
    'shreds', 'grate', 'grates', 'chop', 'chops', 'julienne', 'juliennes', 'peel', 
    'peels', 'score', 'scores', 'fillet', 'fillets', 'butterfly', 'butterflies', 
    'supreme', 'supremes', 'brunoise', 'brunoises', 'chiffonade', 'chiffonades', 
    'mirepoix', 'mirepoixes', 'brunoise', 'brunoises', 'chiffonade', 'chiffonades', 
    'mirepoix', 'mirepoixes', 'tourne', 'turnes', 'parisienne', 'parisiennes', 
    'paisley', 'paisleys', 'ball', 'balls', 'lozenge', 'lozenges', 'oblique', 
    'obliques', 'tourné', 'tournés', 'allumette', 'allumettes', 'fine julienne', 
    'fine juliennes', 'large julienne', 'large juliennes', 'batonnet', 'batonnets', 
    'fine brunoise', 'fine brunoises', 'large brunoise', 'large brunoises', 
    'shave', 'shaves', 'tourné', 'tournés', 'allumette', 'allumettes', 
    'fine julienne', 'fine juliennes', 'large julienne', 'large juliennes', 
    'batonnet', 'batonnets', 'fine brunoise', 'fine brunoises', 'large brunoise', 
    'large brunoises', 'shave', 'shaves', 'trim', 'trims', 'round', 'rounds', 
    'oblique', 'obliques', 'roll cut', 'roll cuts', 'diagonal', 'diagonals', 
    'spoon', 'spoons', 'cut', 'cuts', 'tourne', 'turnes', 'paisley', 'paisleys', 
    'ball', 'balls', 'oblique', 'obliques', 'diagonal', 'diagonals', 'spoon', 
    'spoons', 'cut', 'cuts', 'trim', 'trims', 'round', 'rounds', 'roll cut', 
    'roll cuts'
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