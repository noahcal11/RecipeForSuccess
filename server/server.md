<h1>Server</h1>

This is where all the api endpoints can be setup as well as the different schema for different databases. 

<h3>run.sh</h3>
This is a bash script that will open the server, scrape the links from scrapeLinks.py, and then close the server. This will be the main way that we scrape websites.

<h3>server.js</h3>
This is where the express server and the api endpoints are housed. The express server runs on port 8080. The current API endpoints are 

- http://localhost:8080/recipe which is the base endpoint for recipes
- /get gets all records from the database
- /new which allows new recipes to added to the database
- /delete which allows recipes to be deleted from the database
---
-  http://localhost:8080/user which is the base endpoint for users
- /get gets all records from the database
- /new which allows new users to added to the database
- /delete which allows users to be deleted from the database
---
- http://localhost:8080/quit closes the server

If this is a little confusing, check test.rest, it has some examples.

<h3>model.js</h3>
This is where the schema for the api is. The first schema is for recipes, and the second is for users. The user schema currently does not have any enycrption so be careful using actual passwords.