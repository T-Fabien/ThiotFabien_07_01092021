class Dish {
  constructor(
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils
  ) {
    this.id = id;
    this.name = name;
    this.servings = servings;
    this.ingredients = ingredients;
    this.time = time;
    this.description = description;
    this.appliance = appliance;
    this.ustensils = ustensils;
  }
  toGridcell() {
    let ingredientList = ``; // empty the list of ingredient
    this.ingredients.forEach((element) => {
      // For each ingredient create html list

      console.log(element);
      let ingredient_name = element.ingredient;
      let ingredient_quantity;
      let ingredient_unit;

      // check quantity
      if (element.quantity !== undefined) {
        // quantity is define
        ingredient_quantity = " : " + element.quantity;
      } else if (element.quantite !== undefined) {
        // quantity is not define
        ingredient_quantity = " : " + element.quantite;
      } else {
        // quantity has not been filled in
        ingredient_quantity = "";
      }

      // check unit
      if (element.unit !== undefined) {
        // unit is define
        ingredient_unit = element.unit;
      }
        else {
        // unit is not define
        ingredient_unit = "";
      }

      ingredientList += ` <li class="card__recipes-item">
      <p class="card__recipes-item-title">${ingredient_name}\u00A0\</p>
      <p>${ingredient_quantity} ${ingredient_unit}</p>
    </li>`;
    });

    // return all the HTML CARD
    return `<article class="card">
        <img src="" alt="" class="card__picture" />
        <div class="card__title">
          <p class="card__title-text">${this.name}</p>
          <div class="card__time">
            <i class="card__time-icons far fa-clock"></i>
            <p>\u00A0\ ${this.time} Min</p>
          </div>
        </div>
        <div class="card__description">
          <ul class="card__recipes-list">
          ${ingredientList}
          </ul>
          <div class="card__description-tutorial">
            <p>
              ${this.description}
            </p>
          </div>
        </div>
      </article>`;
  }
}

export default Dish;
