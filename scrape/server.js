const  express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const process = require('process');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://"+process.env.MDB_USERNAME+":"+process.env.MDB_PASSWORD+"@cluster0.iwfcbm2.mongodb.net/recipes").then(() => console.log("Connected")).catch(console.error)

const Recipe = require('./model');

app.get('/recipe',async (req,res) => {
    const recipes = await Recipe.find();
    res.json(recipes);
});

app.get('/quit',async (req,res) => {
    res.send("closing...");
    process.exit(0);
});


app.post('/recipe/new', (req,res) => {
    const recipe = new Recipe({
        title: req.body.title,
        desc: req.body.desc,
        total_time: req.body.total_time,
        yields: req.body.yields,
        steps: req.body.steps,
        ingredients: req.body.ingredients,
        image: req.body.image,
        cuisine: req.body.cuisine,
        category: req.body.category,
        link: req.body.link
    })
    recipe.save();

    res.json(recipe);
});  


app.delete('/recipe/delete/:id', async (req, res) => {
  const recipe = await Recipe.findByIdAndDelete(req.params.id);
  res.json(recipe);
});


app.listen(3001, () => console.log("Server started on port 3001"));