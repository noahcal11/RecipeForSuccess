const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: {type: String, required: true},
    desc: {type: String},
    total_time: {type: Number, required: true},
    yields: {type: String, required: true},
    steps: {type:Array, required: true},
    ingredients: {type:Array, required: true},
    image: {type:String},
    cuisine: {type: String},
    category: {type: String},
    link: {type: String, required: true, unique: true},
    author: {type: String},
    skills: {type:Array},
    preferences: {type:Array},
    keywords: {type:Array},
    allergies: {type:Array}, 
})

const UserSchema = new Schema({
    email: {type:String, required: true, unique: true},
    username: {type:String, required: true},
    hash: {type:String, required: true},
    skill_levels: {type:Array, default: [0,0,0,0]},
    reset_password_token: {type:String, default: ""},
    reset_password_expires: {type:String, default: ""},
    completed_recipes: {type:Array, default: []},
    favorited_recipes: {type:Array, default: []},
    created_recipes: {type:Array, default: []}
})

const Recipe = mongoose.model("Recipe",RecipeSchema);
const User = mongoose.model("User",UserSchema);

module.exports = {Recipe,User};