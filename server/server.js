// "npm start" to start the server
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const process = require('process');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto')
require('dotenv').config();

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://"+process.env.MDB_USERNAME+":"+process.env.MDB_PASSWORD+"@cluster0.iwfcbm2.mongodb.net/recipes").then(() => console.log("Connected")).catch(console.error())

const { Recipe,User } = require('./model');

// Recipe Section

app.get('/'+process.env.API_TOKEN+'/recipe/get',async (req,res) => {   
    const id = req.query.id;
    const general = req.query.general;
    if (general != null) {
        const recipes = await Recipe.find({$or: [
            {title: new RegExp(`\\b${general}\\b`, "i")},
            {desc: new RegExp(`\\b${general}\\b`, "i")},
            {ingredients: new RegExp(`\\b${general}\\b`, "i")}
        ]});
        res.json(recipes);
    } if (id !== undefined) {
        const recipes = await Recipe.findById(id)
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
            category: category ? new RegExp(`\\b${category}\\b`, "i") : new RegExp(`.*|`, "i"),
            // yields: {$gte: yields},
            title: title ? new RegExp(`\\b${title}\\b`, "i") : new RegExp(`.*|`, "i"),
            desc: desc ? new RegExp(`\\b${desc}\\b`, "i") : new RegExp(`.*|`, "i"),
            ingredients: ingredients ? new RegExp(`\\b${ingredients}\\b`, "i") : new RegExp(`.*|`, "i")
        });
        res.json(recipes);
    }
});

app.get('/'+process.env.API_TOKEN+'/recipe/get/all',async (req,res) => {
    const recipes = await Recipe.find({});
    res.json(recipes);
});

app.post('/'+process.env.API_TOKEN+'/recipe/new', (req,res) => {
    let keywords = [];
    keywords.push(req.body.title.split(" "));
    keywords.push(req.body.cuisine.split(" "));
    keywords.push(req.body.category.split(" "));

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
        link: req.body.link,
        keywords: keywords
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

app.post('/'+process.env.API_TOKEN+'/user/forgot-password/:email', async (req, res) => {
    // Generate a 6-digit code
    const code = crypto.randomBytes(3).toString('hex');

    // Find the user by email
    const user = await User.findOne({ email: req.params.email })
    if (!user) {
        return res.status(400).send('No account with that email address exists.');
    }

    // Set the password reset fields on the user document
    user.reset_password_token = code;
    user.reset_password_expires = Date.now() + 15*60*1000; // 15 minutes

    // Save the user document
    user.save()
    // Set up email data
    let mailOptions = {
        to: user.email,
        from: 'jeffsinsel@gmail.com',
        subject: 'Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please enter the following code to complete the process:\n\n' +
        code + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };

    // Send the email
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'jeffsinsel@gmail.com',
            pass: process.env.GMAIL_PASSWORD
        }
    });

    transporter.sendMail(mailOptions, (err) => {
        res.send('An e-mail has been sent to ' + user.email + ' with further instructions.');
        if (err) {
            console.error(err);
        }
    });
});

app.post('/'+process.env.API_TOKEN+'/user/reset-password/', async (req, res) => {
    // Find the user by the reset code and make sure it hasn't expired
    user = await User.findOne({ reset_password_token: req.body.code, email:req.body.email, reset_password_expires: { $gt: Date.now() } });
    if (!user) {
        return res.status(400).send('Password reset code is invalid or has expired.');
    }

    // Encryption of the string password
    bcrypt.genSalt(10, function (err, Salt) {
    
        // The bcrypt is used for encrypting password.
        bcrypt.hash(req.body.password, Salt, function (err, hash) {
        user.hash = hash;
        user.save()
        });
    });

    // Update the user's password
    user.reset_password_token = "";
    user.reset_password_expires = "";

    // Save the updated user document
    user.save()
    res.send('Password has been reset.');
});

// Other Section
app.get('/'+process.env.API_TOKEN+'/quit',async (req,res) => {
    res.send("closing...");
    process.exit(0);
});

app.listen(PORT, () => console.log("Server started on port 8080"));