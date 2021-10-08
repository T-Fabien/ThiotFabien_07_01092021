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
   /* let itemList = [];
    let dataList;*/

  button.innerHTML = ``;
  list.forEach((item) => {
    button.innerHTML += `<p class="filter-item">${item}</p> `;
    //itemList.push(item);
  });
/*
  itemList.forEach((item) => {
    dataList += `<option class="datalist-filter">${item}</option> `;
  });;

  button.parentElement.firstElementChild.firstElementChild.innerHTML = 
  `<datalist id="items">
  ${dataList}
  </datalist>
  <i class="fas fa-search dropdown-search__icon"></i>`;*/
}

// Create Grid
function CreateGrid() {
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
}

// Add Tag under search bar
function AddTags(target, value) {
  // Get the color of the tags
  let parent_item_Classname =
    target.parentElement.parentElement.parentElement.parentElement.className;
  let parent_item_Color = parent_item_Classname.substring(parent_item_Classname.indexOf("-") + 1);

  // Check if The Tag already here
  if (
    value !== undefined &&
    tagsDiv.innerHTML.toLowerCase().includes(value.toLowerCase().toLowerCase())
  ) {
    alert("Vous recherchez déja par se tag");
  } else if (
    value == undefined &&
    tagsDiv.innerHTML.toLowerCase().includes(target.innerHTML.toLowerCase())
  ) {
    alert("Vous recherchez déja par se tag");
  } else {
    // Research manual (Specific Search bar)
    if (value !== undefined) {
      tagsDiv.innerHTML += `
        <div class="tags-item item-${parent_item_Color}">
        <p>${value}</p>
        <i class="far fa-times-circle cross"></i>
        </div>`;
    } else {
      // Research by tag
      tagsDiv.innerHTML += `
        <div class="tags-item item-${parent_item_Color}">
        <p>${target.innerHTML}</p>
        <i class="far fa-times-circle cross"></i>
        </div>`;
    }
    // Research by tags
    let divTags = document.getElementsByClassName("tags-item");

    researchtag = [];
    for (let i = 0; i < divTags.length; i++) {
      let search = [
        divTags[i].firstElementChild.textContent.toLowerCase(),
        divTags[i].className.substring(divTags[i].className.indexOf("item-") + 5),
      ];
      researchtag.push(search);
    }
    ResearchByTags(researchtag);
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
  // Remove Tag (Visual)
  target.parentElement.remove();

  // Delete the Tag from research
  let index = target.previousElementSibling.innerHTML.toLowerCase();
  let taglist = researchtag.filter(function (element) {
    return element[0] != index;
  });

  if (!document.getElementById("tags").innerHTML.toLowerCase().includes("<div")) {
    researchtag = [];
  }

  // Reset the grid
  CreateGrid();

  if (document.getElementsByClassName("tags-item").length > 0) {
    ResearchByTags(taglist);
  }
}

// Research By Tags
function ResearchByTags(researchtag) {
  // Variables
  let FilterDishList = dishList;
  let elementfiltered = [];

  // Delete Duplicate
  let stringArray = researchtag.map(JSON.stringify);
  let uniqueStringArray = new Set(stringArray);
  let uniqueTagsArray = Array.from(uniqueStringArray, JSON.parse);

  // For all Tags
  for (let i = 0; i < uniqueTagsArray.length; i++) {
    // Delete the Grid content
    dishGrid.innerHTML = ``;
    // If we search a Ingredients
    if (uniqueTagsArray[i][1] == "blue") {
      FilterDishList.forEach((element) => {
        // For all Ingredient
        for (let j = 0; j < element.ingredients.length; j++) {
          // Check if he contain the tag
          if (element.ingredients[j].ingredient.toLowerCase().includes(uniqueTagsArray[i][0])) {
            // Filter it
            elementfiltered.push(element);
            // Show it
            let dishCard = element.toGridcell();
            dishGrid.innerHTML += dishCard;
          }
        }
      });
    } // If we search a Appliance
    else if (uniqueTagsArray[i][1] == "green") {
      FilterDishList.forEach((element) => {
        if (element.appliance.toLowerCase().includes(uniqueTagsArray[i][0])) {
          elementfiltered.push(element);
          let dishCard = element.toGridcell();
          dishGrid.innerHTML += dishCard;
        }
      });
    } // If we search a ustensils
    else if (uniqueTagsArray[i][1] == "red") {
      FilterDishList.forEach((element) => {
        for (let j = 0; j < element.ustensils.length; j++) {
          if (element.ustensils[j].toLowerCase().includes(uniqueTagsArray[i][0])) {
            elementfiltered.push(element);
            let dishCard = element.toGridcell();
            dishGrid.innerHTML += dishCard;
          }
        }
      });
    }
    FilterDishList = elementfiltered;
    elementfiltered = [];
  }
  if (document.getElementsByClassName("card").length == 0) {
    dishGrid.innerHTML =
      "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc";
  } else {
    let newIngredientList = [];
    let newApplianceList = [];
    let newUstensilsList = [];

    for (let i = 0; i < FilterDishList.length; i++) {
      for (let j = 0; j < FilterDishList[i].ingredients.length; j++) {
        let ingredient =
          FilterDishList[i].ingredients[j].ingredient.charAt(0).toUpperCase() +
          FilterDishList[i].ingredients[j].ingredient.slice(1).toLowerCase();
        newIngredientList.push(ingredient);
      }
      for (let j = 0; j < FilterDishList[i].ustensils.length; j++) {
        let ustensils =
          FilterDishList[i].ustensils[j].charAt(0).toUpperCase() +
          FilterDishList[i].ustensils[j].slice(1).toLowerCase();
        newUstensilsList.push(ustensils);
      }
      let appliance =
        FilterDishList[i].appliance.toLowerCase().charAt(0).toUpperCase() +
        FilterDishList[i].appliance.slice(1).toLowerCase();
      newApplianceList.push(appliance);
    }

    // No Duplicate Lists
    let ingredientListFiltered = RemoveDuplicate(newIngredientList);
    let applianceListFiltered = RemoveDuplicate(newApplianceList);
    let ustensilsListFiltered = RemoveDuplicate(newUstensilsList);

    // Buttons
    const ingredientBtn = document.getElementById("ingredient-list");
    const applianceBtn = document.getElementById("appliance-list");
    const ustensilsBtn = document.getElementById("ustensils-list");

    //Empty Buttons
    ingredientBtn.innerHTML = ``;

    CreateFilterButton(ingredientBtn, ingredientListFiltered);
    CreateFilterButton(applianceBtn, applianceListFiltered);
    CreateFilterButton(ustensilsBtn, ustensilsListFiltered);

    const items = document.getElementsByClassName("filter-item");

    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener("click", function (event) {
        AddTags(event.target);
      });
    }
  }
}

// Global Search Function
function GlobalSearch(value) {
  dishGrid.innerHTML = ``;
  value = value.toLowerCase();

  for (let i = 0; i < dishList.length; i++) {
    if (
      dishList[i].name.toLowerCase().includes(value) ||
      dishList[i].description.toLowerCase().includes(value)
    ) {
      let dishCard = dishList[i].toGridcell();
      dishGrid.innerHTML += dishCard;
    } else {
      for (let j = 0; j < dishList[i].ingredients.length; j++) {
        if (dishList[i].ingredients[j].ingredient.toLowerCase().includes(value)) {
          let dishCard = dishList[i].toGridcell();
          dishGrid.innerHTML += dishCard;
        }
      }
      for (let j = 0; j < dishList[i].ustensils.length; j++) {
        if (dishList[i].ustensils[j].toLowerCase().includes(value)) {
          let dishCard = dishList[i].toGridcell();
          dishGrid.innerHTML += dishCard;
        }
      }
      for (let j = 0; j < dishList[i].appliance[j].length; j++) {
        if (dishList[i].appliance[j].toLowerCase().includes(value)) {
          let dishCard = dishList[i].toGridcell();
          dishGrid.innerHTML += dishCard;
        }
      }
    }
  }
  if (document.getElementsByClassName("card").length == 0) {
    dishGrid.innerHTML =
      "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc";
  }
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
    let ingredient =
      item.ingredient.charAt(0).toUpperCase() + item.ingredient.slice(1).toLowerCase();
    ingredientList.push(ingredient);
  });

  // List of all Appliance
  applianceList.push(
    dish.appliance.toLowerCase().charAt(0).toUpperCase() + dish.appliance.slice(1).toLowerCase()
  );

  // List of all Ustensils
  dish.ustensils.forEach((item) => {
    ustensilsList.push(item.charAt(0).toUpperCase() + item.slice(1).toLowerCase());
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
    GlobalSearch(searchbar.value);
  }
});

// Research Bar (click on icon)
search_icon.addEventListener("click", function (event) {
  GlobalSearch(searchbar.value);
});
