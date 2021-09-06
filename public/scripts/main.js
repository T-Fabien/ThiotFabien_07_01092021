import { recipes } from "../json/recipes.js";
import Dish from "./dish.js";

/*
for(let i =0; i < recipes.length; i++)
{
    let dish = new Dish(recipes[i].id,recipes[i].name,recipes[i].servings,recipes[i].ingredients)
    dish.ingredients.forEach(element => {
        //console.log(element.ingredient)
        
    });

    console.log(dish.toGridcell());
}*/

// Create cards for each dish

const dishGrid = document.getElementById("grid"); // found the grid
dishGrid.innerHTML = ""; // empty the grid

for (
  let i = 0;
  i < recipes.length;
  i++ // For each recipes
) {
  // create a dish
  let dish = new Dish(
    recipes[i].id,
    recipes[i].name,
    recipes[i].servings,
    recipes[i].ingredients,
    recipes[i].time,
    recipes[i].description,
    recipes[i].appliance,
    recipes[i].ustensils
  );
  // create the card of the dish
  let dishCard = dish.toGridcell();
  dishGrid.innerHTML += dishCard;
}
