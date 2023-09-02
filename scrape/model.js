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
    link: {type: String, required: true, unique: true}
})

const Recipe = mongoose.model("Recipe",RecipeSchema);

module.exports = Recipe;