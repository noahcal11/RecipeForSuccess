// "npm start" to start the server
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const process = require('process');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://"+process.env.MDB_USERNAME+":"+process.env.MDB_PASSWORD+"@cluster0.iwfcbm2.mongodb.net/recipes").then(() => console.log("Connected")).catch(console.error())

const { Recipe,User } = require('./model');

// Recipe Section

app.get('/'+process.env.API_TOKEN+'/recipe/get',async (req,res) => {   
    const general = req.query.general;
    if (general != null) {
        const recipes = await Recipe.find({$or: [
            {title: new RegExp(`\\b${general}\\b`, "i")},
            {desc: new RegExp(`\\b${general}\\b`, "i")},
            {ingredients: new RegExp(`\\b${general}\\b`, "i")}
        ]},['yields','title']);
        res.json(recipes);
    } else {
        const title = req.query.title;
        const desc = req.query.desc;
        const ingredients = req.query.ingredients;
        const total_time = req.query.total_time;
        // const yields = parseInt(req.query.yields.split(" servings")[0]);
        const cuisine = req.query.cuisine;
        const category = req.query.category;
        const recipes = await Recipe.find({
            total_time: total_time ? {$lte: total_time} : {$lte: 65535},
            cuisine: cuisine ? new RegExp(`\\b${cuisine}\\b`, "i") : new RegExp(`.*|`, "i"),
            // yields: {$gte: yields},
            $or: [
                {title: new RegExp(`\\b${title}\\b`, "i")},
                {desc: new RegExp(`\\b${desc}\\b`, "i")},
                {ingredients: new RegExp(`\\b${ingredients}\\b`, "i")}
            ]
        });
        res.json(recipes);
    }
});

app.get('/'+process.env.API_TOKEN+'/recipe/get/all',async (req,res) => {
    const recipes = await Recipe.find({});
    res.json(recipes);
});

app.post('/'+process.env.API_TOKEN+'/recipe/new', (req,res) => {
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

app.delete('/'+process.env.API_TOKEN+'/recipe/delete/:id', async (req, res) => {
  const recipe = await Recipe.findByIdAndDelete(req.params.id);
  res.json(recipe);
});

// User Section
app.get('/'+process.env.API_TOKEN+'/user/get/:email',async (req,res) => {
    const users = await User.find({email:req.params.email});
    res.json(users);
});

app.post('/'+process.env.API_TOKEN+'/user/new', (req,res) => {
    const password = req.body.password;
    
    // Encryption of the string password
    bcrypt.genSalt(10, function (err, Salt) {
    
        // The bcrypt is used for encrypting password.
        bcrypt.hash(password, Salt, function (err, hash) {
    
            if (err) {
                return console.log('Cannot encrypt');
            }
    
            const user = new User({
                email: req.body.email,
                username: req.body.username,
                hash: hash
            })
            user.save();
            res.json(user);
        });
    });
});  

app.delete('/'+process.env.API_TOKEN+'/user/delete/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.json(user);
});


// Other Section
app.get('/'+process.env.API_TOKEN+'/quit',async (req,res) => {
    res.send("closing...");
    process.exit(0);
});

app.listen(PORT, () => console.log("Server started on port 8080"));