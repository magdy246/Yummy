//! beef
//! chicken
//! dessert
//! lamb
//! miscellaneous
//! pasta
//! pork
//! seafood
//! side
//! starter
//! vegan
//! vegetarian
//! breakfast
//! gout

export async function getCategory() {
  $("#meals")
    .html(`<div class="Loader position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bg-black">
    <div class="loader"></div>
    </div>`);
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let result = await response.json();
  let categories = result.categories;
  // &console.log(categories);

  let categoryCards = "";
  for (let i = 0; i < categories.length; i++) {
    categoryCards += `<div class="col-12 col-sm-6 col-md-3 category-card" id="${
      categories[i].strCategory
    }">
                        <figure class="w-100 position-relative rounded-4 overflow-hidden">
                            <img class="w-100 rounded-4" src="${
                              categories[i].strCategoryThumb
                            }" alt="${categories[i].strCategory}">
                            <div class="bg-details text-black position-absolute bottom-0 start-0 end-0 click-point">
                                <div class="h-100">
                                    <h3 class="mb-2 fw-bold text-center">${
                                      categories[i].strCategory
                                    }</h3>
                                    <p class="text-center">${categories[
                                      i
                                    ].strCategoryDescription
                                      .split(" ")
                                      .slice(0, 20)
                                      .join(" ")}</p>
                                </div>
                            </div>
                        </figure>
                      </div>`;
  }

  $("#meals").html(categoryCards);

  $(".category-card").on("click", function () {
    let categoryId = $(this).attr("id");
    filterCategory(categoryId);
  });

  async function filterCategory(categoryId) {
    $("#meals")
    .html(`<div class="Loader position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bg-black">
    <div class="loader"></div>
    </div>`);
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryId}`
    );
    let result = await response.json();
    let meals = result.meals;
    // &console.log(meals);

    let mealCards = "";
    for (let i = 0; i < Math.min(20, meals.length); i++) {
      mealCards += `<div class="col-12 col-sm-6 col-md-3 meal-card" id="${meals[i].idMeal}">
                      <figure class="w-100 position-relative rounded-2 overflow-hidden">
                          <img class="w-100 rounded-2" src="${meals[i].strMealThumb}" alt="${meals[i].strMeal}">
                          <div class="bg-details text-black position-absolute bottom-0 start-0 end-0 click-point">
                              <div class="d-flex flex-column justify-content-center h-100 p-2">
                                  <h3 class="mb-0 fw-bold">${meals[i].strMeal}</h3>
                              </div>
                          </div>
                      </figure>
                    </div>`;
    }

    $("#meals").html(mealCards);

    $(".meal-card").on("click", function () {
      let mealId = $(this).attr("id");
      $("#meals").hide();
      getMealDescription(mealId);
    });
  }

  async function getMealDescription(mealId) {
    $("#desc-meal-category")
    .html(`<div class="Loader position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bg-black">
    <div class="loader"></div>
    </div>`);
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
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
        .map(
          (tag) => `<li class="alert alert-danger m-2 p-1">${tag.trim()}</li>`
        )
        .join("");
    }

    let desc = `<div class="col-md-4">
                    <img class="w-100 rounded-3"
                        src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h2>${meal.strMeal}</h2>
                  </div>
                  <div class="col-md-8">
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions}</p>
                    <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                    <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>

                    <h3>Recipes :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                      ${ingredientsList}
                    </ul>

                    <h3>Tags :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                      ${tagsList}
                    </ul>

                    <a target="_blank" href="${meal.strSource}"
                      class="btn btn-success">Source</a>
                    <a target="_blank" href="${meal.strYoutube}"
                      class="btn btn-danger">Youtube</a>
                  </div>`;

    $("#desc-meal-category").html(desc);
  }
}

// getCategory();
