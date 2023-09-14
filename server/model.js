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
    author: {type: String, required:false},
    skills: {type:Array, required:false}
})

const UserSchema = new Schema({
    email: {type:String, required: true, unique: true},
    username: {type:String, required: true},
    hash: {type:String, required: true}
})

const Recipe = mongoose.model("Recipe",RecipeSchema);
const User = mongoose.model("User",UserSchema);

module.exports = {Recipe,User};