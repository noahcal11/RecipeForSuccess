<h1>Scrape</h1>
This folder contains everything that is needed for:

- Web Scraping Recipe Websites
- Getting scraped data into MongoDB

<h3>scrapPages.py</h3>
This is where the scraping of the webpages happens, currently there is a 1 second delay between each page so that we do no overload the people we are scraping from.

<h3>scrapLinks.py</h3>
This is where we will acquire the actual links to web scrap. This is still work in progress.

<h3>.env</h3>
There are 2 envirmonetal variables as of right now:

- MDB_USERNAME
- MDB_PASSWORD
