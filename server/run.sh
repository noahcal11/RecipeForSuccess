netstat -ano | findstr :8080 # sees if the port is open
node server.js & # tries to connect to the port
sleep 3 # wait for port connections
python scrape/scrapePages.py # runs the scraper
