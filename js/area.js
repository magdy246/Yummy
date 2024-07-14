export async function getArea() {
  $("#Area")
    .html(`<div class="Loader position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bg-black">
  <div class="loader"></div>
  </div>`);
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let result = await response.json();
  let area = result.meals;
  // &console.log(area);
  let cards = "";
  for (let i = 0; i < area.length; i++) {
    cards += `<div class="col-12 col-sm-6 col-md-3 p-3">
      <div class="w-100 d-flex flex-column justify-content-center align-items-center text-white area-card">
        <i class="fa-solid fa-house-chimney fa-4x"></i>
        <h3 class="mb-0 fw-bold text-center" id="${area[i].strArea}">${area[i].strArea}</h3>
      </div>
    </div>`;
  }
  $("#Area").html(cards);

  $(".area-card").on("click", function () {
    let selectedArea = $(this).find("h3").attr("id");
    $("#Area").hide();
    filterArea(selectedArea);
  });

  async function filterArea(area) {
    $("#cards-area")
      .html(`<div class="Loader position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bg-black">
    <div class="loader"></div>
    </div>`);
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    let result = await response.json();
    let filteredMeals = result.meals;
    // &console.log(filteredMeals);
    let meals = "";
    for (let i = 0; i < Math.min(20, filteredMeals.length); i++) {
      meals += `<div class="col-12 col-sm-6 col-md-3 meal-card" id="${filteredMeals[i].idMeal}">
        <figure class="w-100 position-relative rounded-2 overflow-hidden">
          <img class="w-100 rounded-2" src="${filteredMeals[i].strMealThumb}" alt="${filteredMeals[i].strMeal}">
          <div class="bg-details text-black position-absolute bottom-0 start-0 end-0">
            <div class="d-flex flex-column justify-content-center h-100 p-2">
              <h3 class="mb-0 fw-bold">${filteredMeals[i].strMeal}</h3>
            </div>
          </div>
        </figure>
      </div>`;
    }
    $("#cards-area").html(meals);

    $(".meal-card").on("click", function () {
      let mealId = $(this).attr("id");
      $("#cards-area").hide();
      getDesc(mealId);
    });
  }

  async function getDesc(mealId) {
    $("#desc-meal-area")
      .html(`<div class="Loader position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bg-black">
    <div class="loader"></div>
    </div>`);
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    let result = await response.json();
    let Desc = result.meals[0];
    // &console.log(Desc);
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
      let ingredient = Desc[`strIngredient${i}`];
      if (ingredient) {
        ingredientsList += `<li class="alert alert-info m-2 p-1">${ingredient}</li>`;
      }
    }

    let tagsList = "";
    if (Desc.strTags) {
      tagsList = Desc.strTags
        .split(",")
        .map(
          (tag) => `<li class="alert alert-danger m-2 p-1">${tag.trim()}</li>`
        )
        .join("");
    }

    let desc = `<div class="col-md-4">
      <img class="w-100 rounded-3" src="${Desc.strMealThumb}" alt="image">
      <h2>${Desc.strMeal}</h2>
    </div>
    <div class="col-md-8">
      <h2>Instructions</h2>
      <p>${Desc.strInstructions}</p>
      <h3><span class="fw-bolder">Area : </span>${Desc.strArea}</h3>
      <h3><span class="fw-bolder">Category : </span>${Desc.strCategory}</h3>

      <h3>Recipes :</h3>
      <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${ingredientsList}
      </ul>

      <h3>Tags :</h3>
      <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${tagsList}
      </ul>

      <a target="_blank" href="${Desc.strSource}" class="btn btn-success">Source</a>
      <a target="_blank" href="${Desc.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>`;

    $("#desc-meal-area").html(desc);
  }
}

// getArea();
