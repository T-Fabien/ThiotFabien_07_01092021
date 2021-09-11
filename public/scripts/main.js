import { recipes } from "../json/recipes.js";
import Dish from "./dish.js";

// - - - - - FUNCTIONS - - - - -

// Remove all Duplicate in a array
function RemoveDuplicate(list) {
  let arrayFilter = new Set(list);
  list.filter((item, index) => list.indexOf(item) === index);

  return arrayFilter;
}

// Create the HTML of Filter Button
function CreateFilterButton(button, list) {
  button.innerHTML = ``;
  list.forEach((item) => {
    button.innerHTML += `<p class="filter-item">${item}</p> `;
  });
}

// Add Tag under search bar
function AddTags(target, value) {
  let parent_item_Classname =
    target.parentElement.parentElement.parentElement.parentElement.className;
  let parent_item_Color = parent_item_Classname.substring(
    parent_item_Classname.indexOf("-") + 1
  );

  if (value !== undefined) {
    tagsDiv.innerHTML += `
    <div class="tags-item item-${parent_item_Color}">
    <p>${value}</p>
    <i class="far fa-times-circle cross"></i>
    </div>`;
  }else
  {
    tagsDiv.innerHTML += `
    <div class="tags-item item-${parent_item_Color}">
    <p>${target.innerHTML}</p>
    <i class="far fa-times-circle cross"></i>
    </div>`;
  }
  // Delete tags under search bar

  const tag = document.getElementsByClassName("cross");
  for (let i = 0; i < tag.length; i++) {
    tag[i].addEventListener("click", function (eventArgs) {
      let target = eventArgs.target;
      DeleteTags(target);
    });
  }
}

// Delete Tag under search bar

function DeleteTags(target) {
  let parent_item_Classname = target.parentElement.remove();
}

// - - - - - CODE - - - - -

// Create cards for each dish
const dishGrid = document.getElementById("grid"); // found the grid
dishGrid.innerHTML = ""; // empty the grid

let ingredientList = []; // List all of Ingredient
let applianceList = []; // List all of Appliance
let ustensilsList = []; // List all of Ustensils

for (let i = 0; i < recipes.length; i++) {
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

  // List of all Ingredient
  dish.ingredients.forEach((item) => {
    ingredientList.push(item.ingredient.toLowerCase());
  });

  // List of all Appliance
  applianceList.push(dish.appliance.toLowerCase());

  // List of all Ustensils
  dish.ustensils.forEach((item) => {
    ustensilsList.push(item.toLowerCase());
  });
}

// No Duplicate Lists
let ingredientListFiltered = RemoveDuplicate(ingredientList);
let applianceListFiltered = RemoveDuplicate(applianceList);
let ustensilsListFiltered = RemoveDuplicate(ustensilsList);

// Buttons
const ingredientBtn = document.getElementById("ingredient-list");
const applianceBtn = document.getElementById("appliance-list");
const ustensilsBtn = document.getElementById("ustensils-list");

CreateFilterButton(ingredientBtn, ingredientListFiltered);
CreateFilterButton(applianceBtn, applianceListFiltered);
CreateFilterButton(ustensilsBtn, ustensilsListFiltered);

// Tag management

// By click on the item

const tagsDiv = document.getElementById("tags");
const items = document.getElementsByClassName("filter-item");

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener("click", function (event) {
    let target = event.target;
    AddTags(target);
  });
}

// By Specific search bar

const specific_searchbar = document.getElementsByClassName(
  "dropdown-search__input"
);
for (let i = 0; i < specific_searchbar.length; i++) {
  specific_searchbar[i].addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      AddTags(event.target, specific_searchbar[i].value);
    }
  });
}
