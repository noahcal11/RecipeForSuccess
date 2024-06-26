const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: {type: String, required: true},
    desc: {type: String, required: true},
    total_time: {type: Number, required: true},
    yields: {type: String, required: true},
    steps: {type:Array, required: true},
    ingredients: {type:Array, required: true},
    image: {type:String},
    cuisine: {type: String},
    category: {type: String},
    link: {type: String},
    author: {type: String},
    skills: {type:Array},
    preferences: {type:Array},
    keywords: {type:Array},
    allergies: {type:Array}, 
    rating: {type:Array, default: [0, 0]},
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
    created_recipes: {type:Array, default: []},
    widgets: {type:Array, default:[true, true, true, true, true, true, true, true, true, true, true, true]},
    allergies: {type:Array, default: ["Test"]}
})

const keywords = new Schema({
    keyword: {type:String, required: true, unique: true},
    definition: {type:String, required: true},
    suffixes: {type:Array, required: true},
    skill: {type:String, required: true},
})

const Recipe = mongoose.model("Recipe",RecipeSchema);
const User = mongoose.model("User",UserSchema);
const Keyword = mongoose.model("Keyword", keywords);

module.exports = {Recipe,User,Keyword};
