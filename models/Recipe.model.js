const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: [String],
  cuisine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ["breakfast", "main_course", "soup", "snack", "drink", "dessert", "other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: String,
  created: {
    type: Date,
    // default: Date('2023-02-10')
    // as today can be different, setting it to literally the today of the day the code was written is not ideal
    // some alternative takes that I like better then just manually setting the date to today:
    // default: Date.now()
    // default: ()=> Date.now()
    default: Date.now // simplified version of the one right above, as Date.now is already a function, don't need to create arrow function
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
