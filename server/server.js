// "npm start" to start the server
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const process = require('process');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

fs.readFile("recipe-396801-55fbaba7e4c9.json", "utf8", (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    credentials = JSON.parse(data);
});
require('dotenv').config();

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://"+process.env.MDB_USERNAME+":"+process.env.MDB_PASSWORD+"@cluster0.iwfcbm2.mongodb.net/recipes").then(() => console.log("Connected")).catch(console.error())

const { Recipe,User,Keyword } = require('./model');

// Recipe Section

app.post('/'+process.env.API_TOKEN+'/recipe/get',async (req,res) => {   
    let recipes;
    const id = req.body.id;
    const ids = req.body.ids;
    const general = req.body.general;
    if (general !== undefined) {
        recipes = await Recipe.find({$or: [
            {title: new RegExp(`\\b${general}\\b`, "i")},
            {desc: new RegExp(`\\b${general}\\b`, "i")},
            {ingredients: new RegExp(`\\b${general}\\b`, "i")}
        ]});
    } else if (id !== undefined) {
        recipes = await Recipe.findById(id);
    } else if (ids !== undefined) {
        recipes = await Recipe.find({'_id': { $in: ids}});
    } else {
        const title = req.body.title;
        const desc = req.body.desc;
        const ingredients = req.body.ingredients;
        const total_time = req.body.total_time;
        const cuisine = req.body.cuisine;
        const category = req.body.category;
        const rating = req.body.rating;
        recipes = await Recipe.find({
            total_time: total_time ? {$lte: total_time} : {$lte: 65535},
            cuisine: cuisine ? new RegExp(`\\b${cuisine}\\b`, "i") : new RegExp(`.*|`, "i"),
            category: category ? new RegExp(`\\b${category}\\b`, "i") : new RegExp(`.*|`, "i"),
            title: title ? new RegExp(`\\b${title}\\b`, "i") : new RegExp(`.*|`, "i"),
            desc: desc ? new RegExp(`\\b${desc}\\b`, "i") : new RegExp(`.*|`, "i"),
            ingredients: ingredients ? new RegExp(`\\b${ingredients}\\b`, "i") : new RegExp(`.*|`, "i"),
            rating: rating ? rating : new Array(2).fill(0)
        });
    }
    res.json(recipes);
});

app.post('/'+process.env.API_TOKEN+'/recipe/get-by-allergies', async (req, res) => {
    const userAllergies = req.body.allergies;
    const total_time = req.body.total_time;
    const cuisine = req.body.cuisine;
    const category = req.body.category;
    const title = req.body.title;

    // if (!Array.isArray(userAllergies) || userAllergies.length === 0) {
    //     return res.status(400).json({ error: 'Allergies array is required and must not be empty.' });
    // }

    // Initialize the query object
    const query = {
        allergies: { $nin: userAllergies }
    };

    // Add additional filters if provided
    if (total_time) {
        query.total_time = { $lte: total_time };
    }
    if (cuisine) {
        query.cuisine = new RegExp(`\\b${cuisine}\\b`, "i");
    }
    if (category) {
        query.category = new RegExp(`\\b${category}\\b`, "i");
    }
    if (title) {
        query.title = new RegExp(`\\b${title}\\b`, "i");
    }

    // Find recipes that match the filters
    const recipes = await Recipe.find(query);

    res.json(recipes);
});

app.get('/'+process.env.API_TOKEN+'/recipe/get/all',async (req,res) => {
    const recipes = await Recipe.find({});
    res.json(recipes);
});

/* app.post('/'+process.env.API_TOKEN+'/recipe/new', async (req,res) => {
    let keywords = [];
    try {
        keywords.push(req.body.title.split(" "));
    } catch {
        // no keywords
    }
    try {
        keywords.push(req.body.cuisine.split(" "));
    } catch {
        // no keywords
    }
    try {
        keywords.push(req.body.category.split(" "));
    } catch {
        // no keywords
    }
    keywords = keywords.flat(1);

    // Initialize storage
    const storage = new Storage({
      credentials: credentials,
    })

    // Assuming the image is sent as a base64 encoded string in the request body
    // You need to convert it to a Buffer before saving it locally
    if (!req.body.image) {
        return res.status(400).json({ error: 'Image is required.' });
    }
    const base64Image = req.body.image;
    console.log(base64Image);
    const imageBuffer = Buffer.from(base64Image, 'base64');
    console.log(imageBuffer);
    //const localFilePath = path.join(__dirname, `uploads/${image_UUID}.jpeg`);

    const image_UUID = crypto.randomUUID();
    const bucketName = 'recipe-for-success-images';
    const bucket = storage.bucket(bucketName);
    const fileName = `uploads/${image_UUID}.jpeg`;
    const file = bucket.file(fileName);

    // Ensure the uploads directory exists before writing the file
    // fs.mkdirSync(path.dirname(localFilePath), { recursive: true });
    // fs.writeFileSync(localFilePath, imageBuffer);

    const writeStream = file.createWriteStream({
        metadata: {
            contentType: 'image/jpeg',
        },
    });
    writeStream.write(imageBuffer);
    writeStream.end();


    // Sending the upload request
    bucket.upload(
        imageBuffer,
        {
            metadata: { 
                contentType: 'image/jpeg',
            },
            destination: fileName,
        },
        function (err, file) {
            if (err) {
            console.error(`Error uploading image ${image_UUID}.jpeg: ${err}`)
            } else {
            console.log(`Image ${image_UUID}.jpeg uploaded to ${bucketName}.`)

                // Making file public to the internet
                file.makePublic(async function (err) {
                if (err) {
                console.error(`Error making file public: ${err}`)
                } else {
                console.log(`File ${file.name} is now public.`)
                const publicUrl = file.publicUrl()
                console.log(`Public URL for ${file.name}: ${publicUrl}`)

                    // Save the recipe with the image URL
                    const recipe = new Recipe({
                        title: req.body.title,
                        desc: req.body.desc,
                        total_time: req.body.total_time,
                        yields: req.body.yields,
                        steps: req.body.steps,
                        ingredients: req.body.ingredients,
                        image: publicUrl,
                        cuisine: req.body.cuisine,
                        category: req.body.category,
                        keywords: keywords,
                        allergies: req.body.allergies,
                    })
                    await recipe.save();
                    res.json(recipe);
                    if (req.body.email) {
                        const user = await User.findOne({ email: req.body.email });
                        console.log(recipe._id);
                        console.log(user.email);
                        user.created_recipes.push(recipe._id);
                        await user.save();
                        res.json(user);
                    }
                }
            })
        }
    })
}); */

app.post('/'+process.env.API_TOKEN+'/recipe/new', async (req, res) => {
    let keywords = [];
    try {
        keywords.push(req.body.title.split(" "));
    } catch {
        // no keywords
    }
    try {
        keywords.push(req.body.cuisine.split(" "));
    } catch {
        // no keywords
    }
    try {
        keywords.push(req.body.category.split(" "));
    } catch {
        // no keywords
    }
    keywords = keywords.flat(1);

    // Initialize storage
    const storage = new Storage({
      credentials: credentials,
    })
    
    // Extract the base64Image from the request body
    const base64Image = req.body.image;

    // Convert the base64Image back into a Buffer
    const imageBuffer = Buffer.from(base64Image, 'base64');

    // Define the file name and path
    const image_UUID = crypto.randomUUID();
    const bucketName = 'recipe-for-success-images';
    const bucket = storage.bucket(bucketName);
    const fileName = `${image_UUID}.jpeg`;

    // Create a file reference
    const file = bucket.file(fileName);

    // Create a write stream for the file
    const writeStream = file.createWriteStream({
        metadata: {
            contentType: 'image/jpeg',
        },
    });

    // Write the Buffer to the file
    writeStream.write(imageBuffer);
    writeStream.end();

    // Handle the 'finish' event to know when the upload is complete
    writeStream.on('finish', async () => {
        console.log(`Image ${fileName} uploaded to ${bucketName}.`);

        // Making file public to the internet
        await file.makePublic();
        console.log(`File ${file.name} is now public.`);
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
        console.log(`Public URL for ${file.name}: ${publicUrl}`);

        // Save the recipe with the image URL
        const recipe = new Recipe({
            title: req.body.title,
            desc: req.body.desc,
            total_time: req.body.total_time,
            yields: req.body.yields,
            steps: req.body.steps,
            ingredients: req.body.ingredients,
            image: publicUrl,
            cuisine: req.body.cuisine,
            category: req.body.category,
            keywords: keywords,
            allergies: req.body.allergies,
        });
        await recipe.save();
        res.json(recipe);
        if (req.body.email) {
            const user = await User.findOne({ email: req.body.email });
            console.log(recipe._id);
            console.log(user.email);
            user.created_recipes.push(recipe._id);
            await user.save();
            res.json(user);
        }
    });

    // Handle errors
    writeStream.on('error', (err) => {
        console.error(`Error uploading image ${fileName}: ${err}`);
        res.status(500).json({ error: 'Error uploading image.' });
    });
});

app.delete('/'+process.env.API_TOKEN+'/recipe/delete/:id', async (req, res) => {
  const recipe = await Recipe.findByIdAndDelete(req.params.id);
  res.json(recipe);
});

// Rating Section
app.post('/'+process.env.API_TOKEN+'/recipe/update-rating/:id', async (req,res) => {
    const recipe = await Recipe.findById(req.params.id).limit(1);
    // rating[0] contains the aggregated rating, rating[1] contains how many ratings there are
    recipe.rating[0] = (recipe.rating[0] + req.body.rating) / (recipe.rating[1] + 1);
    recipe.rating[1]++;
    recipe.save();
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
    bcrypt.genSalt(5, function (err, Salt) {
    
        // The bcrypt is used for encrypting password.
        bcrypt.hash(password, Salt, async function (err, hash) {
    
            if (err) {
                return console.log('Cannot encrypt');
            }

            const allergies = []; // Use existing allergies if provided, otherwise start with an empty array
            allergies.push('Test');
    
            const user = new User({
                email: req.body.email,
                username: req.body.username,
                hash: hash,
                allergies: allergies
            })
            await user.save();
            res.json(user);
        });
    });
});  

app.post('/'+process.env.API_TOKEN+'/user/update-user' , async (req,res) => {
    const user = await User.findOne({ email: req.body.oldEmail });
    user.email = req.body.newEmail;
    user.username = req.body.username;
    user.allergies = req.body.allergies;
    user.save();
    res.json(user);
});

app.post('/'+process.env.API_TOKEN+'/user/update-user-allergies' , async (req,res) => {
    const user = await User.findOne({ email: req.body.email });
    user.allergies = req.body.allergies;
    user.save();
    res.json(user);
});

app.post('/'+process.env.API_TOKEN+'/user/update-password' , async (req,res) => {
    const user = await User.findOne({ email: req.body.email });
    bcrypt.compare(req.body.oldPassword, user.hash,
        async function (err, isMatch) {
            // Comparing the original password to
            // encrypted password
            if (isMatch) {
                bcrypt.genSalt(5, function (err, Salt) {
                    // The bcrypt is used for encrypting password.
                    bcrypt.hash(req.body.newPassword, Salt, function (err, hash) {
                        if (err) {
                            return res.json('Cannot encrypt');
                        }
                        user.hash = hash
                        user.save();
                        res.json(user);
                    });
                });
            }
            if (!isMatch) {
                res.json("No match");
            }
      });
});

app.post('/'+process.env.API_TOKEN+'/user/update-skills/:email', async (req,res) => {
    const user = await User.findOne({ email: req.params.email })
    let updated = []
    for (let i = 0;i < Object.keys(req.body).length; i++) {
        if (user.skill_levels[i]+Object.values(req.body)[i] > 0) {
            updated[i] = user.skill_levels[i]+Object.values(req.body)[i]
        } else {
            updated[i] = 0
        }
        console.log(user.skill_levels[i]);
    } 
    user.skill_levels = updated
    user.save();
    res.json(user);
})

app.post('/'+process.env.API_TOKEN+'/user/update-completed/:email', async (req, res) => {
    const user = await User.findOne({ email: req.params.email })
    if (user.completed_recipes.includes(req.body.recipe)) {
        user.completed_recipes.splice(user.favorited_recipes.indexOf(req.body.recipe),1);
    } else {
        user.completed_recipes.push(req.body.recipe);
    }

    user.save();
    res.json(user);
})

app.post('/'+process.env.API_TOKEN+'/user/update-favorite/', async (req,res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user.favorited_recipes.includes(req.body.id)) {
        user.favorited_recipes.splice(user.favorited_recipes.indexOf(req.body.id),1);
    } else {
        user.favorited_recipes.push(req.body.id);
    }

    user.save();
    res.json(user);
})

app.post('/'+process.env.API_TOKEN+'/user/update-widgets/:email', async (req,res) => {
    const user = await User.findOne({ email: req.params.email })
    user.widgets = req.body.widgets;
    user.save()
    res.json(user);
})

app.delete('/'+process.env.API_TOKEN+'/user/delete/:email', async (req, res) => {
  const user = await User.findOneAndDelete({ email: req.params.email });
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
            console.error(process.env.GMAIL_PASSWORD)
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

// Keyword Section
app.get('/'+process.env.API_TOKEN+'/keyword/get-all', async (req,res) => {
    const keywords = await Keyword.find({});
    res.json(keywords);
});

app.post('/'+process.env.API_TOKEN+'/keyword/get', async (req,res) => {
    const keyword = await Keyword.findOne({suffixes: new RegExp(`^${req.body.key}$`, 'i')});
    res.json(keyword);
});

// Other Section
app.get('/'+process.env.API_TOKEN+'/quit',async (req,res) => {
    res.send("closing...");
    process.exit(0);
});

app.listen(PORT, () => console.log("Server started on port 8080"));