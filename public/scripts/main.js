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
  let parent_item_Color = parent_item_Classname.substring(parent_item_Classname.indexOf("-") + 1);

  if (value !== undefined) {
    tagsDiv.innerHTML += `
    <div class="tags-item item-${parent_item_Color}">
    <p>${value}</p>
    <i class="far fa-times-circle cross"></i>
    </div>`;
  } else {
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
      console.log(`${value}`);
      DeleteTags(target, value);
    });
  }

  // Research by tags
  let search = [target.innerHTML.toLowerCase(), parent_item_Color];
  researchtag.push(search);
  ResearchByTags(researchtag);
}

// Delete Tag under search bar
function DeleteTags(target, value) {
  target.parentElement.remove();
  console.log(researchtag[0]);
  console.log(value);
  researchtag.splice(target);
  console.log(researchtag);
  dishGrid.innerHTML = ``;
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
  }
  if (document.getElementsByClassName('tags-item').length > 0) {
      console.log(researchtag);
    ResearchByTags(researchtag);
  }
}

// Research By Tags
/*
function ResearchByTags(researchtag) {
  let FilterDishList = dishList;
  let elementfiltered = [];

  for (let i = 0; i < researchtag.length; i++) {
    dishGrid.innerHTML = ``;
    if (researchtag[i][1] == "blue") {
      FilterDishList.forEach((element) => {
        for (let j = 0; j < element.ingredients.length; j++) {
          if (element.ingredients[j].ingredient.toLowerCase().includes(researchtag[i][0])) {
            elementfiltered.push(element);
            let dishCard = element.toGridcell();
            dishGrid.innerHTML += dishCard;
          }
        }
      });
    } else if (researchtag[i][1] == "green") {
      FilterDishList.forEach((element) => {
        if (element.appliance.toLowerCase().includes(researchtag[i][0])) {
          FilterDishList.push(element);
          let dishCard = element.toGridcell();
          dishGrid.innerHTML += dishCard;
        }
      });
    } else if (researchtag[i][1] == "red") {
      FilterDishList.forEach((element) => {
        for (let j = 0; j < element.ustensils.length; j++) {
          if (element.ustensils[j].toLowerCase().includes(researchtag[i][0])) {
            FilterDishList.push(element);
            let dishCard = element.toGridcell();
            dishGrid.innerHTML += dishCard;
          }
        }
      });
    }
    FilterDishList = elementfiltered;
  }
}*/

// Test Algo
/*
function Algo01(value) {
  dishGrid.innerHTML = ``;
  value = value.toLowerCase();

  for (let i = 0; i < dishList.length; i++) {
    if (
      dishList[i].name.toLowerCase().includes(value) ||
      dishList[i].ingredients.includes(value) ||
      dishList[i].description.toLowerCase().includes(value) ||
      dishList[i].appliance.includes(value) ||
      dishList[i].ustensils.includes(value)
    ) {
      let dishCard = dishList[i].toGridcell();
      dishGrid.innerHTML += dishCard;
    }
  }
}*/

function Algo02(value) {
  dishGrid.innerHTML = ``;
  dishList.forEach((element) => {
    if (
      element.name.toLowerCase().includes(value) ||
      element.ingredients.includes(value) ||
      element.description.toLowerCase().includes(value) ||
      element.appliance.includes(value) ||
      element.ustensils.includes(value)
    ) {
      let dishCard = element.toGridcell();
      dishGrid.innerHTML += dishCard;
    }
  });
}

// - - - - - CODE - - - - -

// Vars
var researchtag = [];

// Create cards for each dish
const dishGrid = document.getElementById("grid"); // found the grid
dishGrid.innerHTML = ""; // empty the grid

let dishList = []; // List all of recipe
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

  // List of all dish
  dishList.push(dish);

  // List of all Ingredient
  dish.ingredients.forEach((item) => {
    ingredientList.push(item.ingredient);
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
    AddTags(event.target);
  });
}

// By Specific search bar
const specific_searchbar = document.getElementsByClassName("dropdown-search__input");
const specific_search_icon = document.getElementsByClassName("dropdown-search__icon");

// Click on search icon
for (let i = 0; i < specific_search_icon.length; i++) {
  specific_search_icon[i].addEventListener("click", function (event) {
    AddTags(event.target, specific_searchbar[i].value);
    specific_searchbar[i].value = "";
  });
}

// Press enter
for (let i = 0; i < specific_searchbar.length; i++) {
  specific_searchbar[i].addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      AddTags(event.target, specific_searchbar[i].value);
      specific_searchbar[i].value = "";
    }
  });
}

// Research Bar (press Enter)
const searchbar = document.getElementById("researchbar");
const search_icon = document.getElementById("researchbar_icon");

searchbar.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    Algo01(searchbar.value, dishList);
  }
});

// Research Bar (click on icon)
search_icon.addEventListener("click", function (event) {
  Algo02(searchbar.value, dishList);
});
