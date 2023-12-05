# RecipeForSuccess
## Project Description
Recipe for Success is an all-use kitchen app for both new and experienced chefs. The app has a large database of recipes searchable by time, difficulty, cuisine, and more. Users can track their skills in different culinary techniques and level up as they complete recipes involving those skills.

Within recipes, keywords are linked to a definition or video so users can quickly understand unfamiliar terms. The experience will be both accepting to new chefs without being tedious or patronizing for more experienced chefs.
### Tech Stack
#### "MERN" Stack
MongoDB\
Express\
React\
Node.js

## How to get started
   1. Fork the repository
   2. Install dependencies

**To run server (for testing)**
   1. cd into server
   2. Run "npm start"
   3. The API is now callable from localhost:8080

**To run app**
   1. cd into app
   2. Run "npm start" to test the app
   3. To test it on your personal devices, we use Expo Go

**Building a page**
   1. Views go in the views folder and are camelCase
   2. To make sure the view can be routed to, make sure the view is in the App.js router with and approiate name.
   3. Be sure to make use of already existing components

**Building a component**
   1. Components are commonly reused pieces of code (Ex. Banner and Footer)
   2. Components are in the component folder and are PascalCase

**Adding an API call**
   1. All the API calls are housed in server/server.js
   2. We are currently running using moongose and express in server.js
   3. Make sure any preprocessing the data needs to go through happens during the call
   4. Ensure error handling is done properly as well

**Icons**  

If you need to add an icon, make sure it is an svg and place it in the svg folder. Icons are camelCase. 

