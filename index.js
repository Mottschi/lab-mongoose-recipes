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

    try {
      // Iteration 2
    const {title} = await Recipe.create({
      "title": "Spaghetti without anything",
      "level": "Easy Peasy",
      "ingredients": [
        "150g Spaghetti",
        "2 tea spoons salt",
        "some spoons of butter to taste"
      ],
      "cuisine": "Italian",
      "dishType": "main_course",
      "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      "duration": 15,
      "creator": "some 5 year old kid"
    });
    
    console.log("Iteration 2:", title);

    // Iteration 3
    const recipes = await Recipe.create(data);
    console.log('Iteration 3:');
    recipes.forEach(recipe => console.log(recipe.title));


    // Iteration 4
    const updatedRecipe = await Recipe.findOneAndUpdate({title: "Rigatoni2 alla Genovese"}, {duration: 100});

    console.log(`Iteration 4: Recipe for ${updatedRecipe.title} has been successfully updated from duration: ${updatedRecipe.duration} to duration: 100`);


    // Iteration 5
    await Recipe.deleteOne({title: 'Carrot Cake'});
    console.log("Iteration 5: The cake was a lie");

    } catch (error) {
      console.log(error)
    }

    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(()=>{
    // Iteration 6
    console.log('Iteration 6: closing up')
    mongoose.connection.close();
  });
