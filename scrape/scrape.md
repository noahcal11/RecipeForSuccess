<h1>Scrape</h1>
This folder contains everything that is needed for:

- Web Scraping Recipe Websites
- API endpoints
- Getting scraped data into MongoDB

<h3>run.sh</h3>
This is a bash script that will open the server, scrape the links from scrapeLinks.py, and then close the server. This will be the main way that we scrape websites.

<h3>server.js</h3>
This is where the express server and the api endpoints are housed. The express server runs on port 3001. The current API endpoints are 

- http://localhost:3001/recipe which is the base endpoint
- /new which allows new recipes to added to the database
- /delete which allows recipes to be deleted from the database
- /quit which closes the server

If this is a little confusing, check test.rest, it has some examples.

<h3>model.js</h3>
This is where the schema for the api is. It is pretty self explanitory so I won't go over it here.

<h3>scrapPages.py</h3>
This is where the scraping of the webpages happens, currently there is a 1 second delay between each page so that we do no overload the people we are scraping from.

<h3>scrapLinks.py</h3>
This is where we will acquire the actual links to web scrap. This is still work in progress.

<h3>.env</h3>
There are 2 envirmonetal variables as of right now:

- MDB_USERNAME
- MDB_PASSWORD
