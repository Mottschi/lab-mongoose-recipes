const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
console.log('starting')
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(async () => {
    // Run your code here, after you have insured that the connection was made

    // Iteration 2
    const recipe = await Recipe.create({
      "title": "Spaghetti without anything",
      "level": "Amateur Chef",
      "ingredients": [
        "150g Spaghetti",
        "2 tea spoons salt",
        "butter"
      ],
      "cuisine": "Italian",
      "dishType": "main_course",
      "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      "duration": 15,
      "creator": "5 year old kid"
    });
    

    console.log(recipe)
    // Iteration 3
    const recipes = await Recipe.create(data);

    // console.log(recipes)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(()=>{
    // Iteration 6
    console.log('closing up')
    mongoose.connection.close();
  });
