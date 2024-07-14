export async function getIngredients() {
  $("#Ingredients")
    .html(`<div class="Loader position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bg-black">
    <div class="loader"></div>
    </div>`);
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let result = await response.json();
  let ingredients = result.meals;
  // &console.log(ingredients);
  let cards = "";
  for (let i = 0; i < 20; i++) {
    cards += `<div class="col-12 col-sm-6 col-md-3 ingredient-card">
                <div class="w-100 d-flex flex-column justify-content-center align-items-center text-white">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3 class="mb-0 fw-bold text-center" id="${
                      ingredients[i].strIngredient
                    }">${ingredients[i].strIngredient}</h3>
                    <p class="text-center">${ingredients[i].strDescription
                      ?.split(" ")
                      .slice(0, 10)
                      .join(" ")}</p>
                </div>
              </div>`;
  }
  $("#Ingredients").html(cards);

  $(".ingredient-card").on("click", function () {
    let ingredient = $(this).find("h3").attr("id");
    $("#Ingredients").hide();
    filterIngredient(ingredient);
  });
}

async function filterIngredient(ingredient) {
  $("#cards-ingredients")
  .html(`<div class="Loader position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bg-black">
  <div class="loader"></div>
  </div>`);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  let result = await response.json();
  let filterIngredient = result.meals;
  // &console.log(filterIngredient);
  let meals = "";
  for (let i = 0; i < Math.min(20, filterIngredient.length); i++) {
    meals += `<div class="col-12 col-sm-6 col-md-3 meal-card">
                <figure class="w-100 position-relative rounded-2 overflow-hidden">
                    <img class="w-100 rounded-2" src="${filterIngredient[i].strMealThumb}" alt="meal-thumb">
                    <div class="bg-details text-black position-absolute bottom-0 start-0 end-0">
                        <div class="d-flex flex-column justify-content-center h-100 p-2">
                            <h3 class="mb-0 fw-bold">${filterIngredient[i].strMeal}</h3>
                        </div>
                    </div>
                </figure>
              </div>`;
  }
  $("#cards-ingredients").html(meals);

  $(".meal-card").on("click", async function () {
    let mealId = $(this).find("h3").text();
    $("#cards-ingredients").hide();
    await getMealDescription(mealId);
  });
}

async function getMealDescription(mealId) {
  $("#desc-meal-ingredients")
  .html(`<div class="Loader position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bg-black">
  <div class="loader"></div>
  </div>`);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealId}`
  );
  let result = await response.json();
  let meal = result.meals[0];
  // &console.log(meal);

  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    let ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      ingredientsList += `<li class="alert alert-info m-2 p-1">${ingredient}</li>`;
    }
  }

  let tagsList = "";
  if (meal.strTags) {
    tagsList = meal.strTags
      .split(",")
      .map((tag) => `<li class="alert alert-danger m-2 p-1">${tag.trim()}</li>`)
      .join("");
  }

  let desc = `<div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="meal-thumb">
                <h2>${meal.strMeal}</h2>
              </div>
              <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>

                <h3>Ingredients :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${ingredientsList}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${tagsList}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
              </div>`;

  $("#desc-meal-ingredients").html(desc);
}

// getIngredients();
