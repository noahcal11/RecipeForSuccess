netstat -ano | findstr :3001 # sees if the port is open
node server.js & # tries to the port
sleep 3 # wait for port connections
python scrapPages.py # runs the scraper
