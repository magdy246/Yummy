export async function getMeals() {
  $("#cards")
    .html(`<div class="Loader position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bg-black z-3">
  <div class="loader"></div>
  </div>`);
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  let result = await response.json();
  let meals = result.meals;
  // &console.log(meals);
  let card = "";
  for (let i = 0; i < meals.length; i++) {
    card += `<div class="col-12 col-sm-6 col-md-3">
                        <figure class="w-100 position-relative rounded-2 overflow-hidden">
                            <img class="w-100 rounded-2" src="${meals[i].strMealThumb}" alt="cuio">
                            <div class="bg-details text-black position-absolute bottom-0 start-0 end-0 click-point">
                                <div class="d-flex flex-column justify-content-center h-100 p-2">
                                    <h3 class="mb-0 fw-bold">${meals[i].strMeal}</h3>
                                </div>
                            </div>
                        </figure>
                    </div>`;
  }
  $("#cards").html(card);

  async function getDesc(mealId) {
    $("#desc-meal")
      .html(`<div class="Loader position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bg-black">
    <div class="loader"></div>
    </div>`);
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    let result = await response.json();
    let Desc = result.meals;
    // &console.log(Desc);

    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
      let ingredient = Desc[0][`strIngredient${i}`];
      if (ingredient) {
        ingredientsList += `<li class="alert alert-info m-2 p-1">${ingredient}</li>`;
      }
    }

    let tagsList = "";
    if (Desc[0].strTags) {
      tagsList = Desc[0].strTags
        .split(",")
        .map(
          (tag) => `<li class="alert alert-danger m-2 p-1">${tag.trim()}</li>`
        )
        .join("");
    }

    let desc = `<div class="col-md-4">
                    <img class="w-100 rounded-3"
                        src="${Desc[0].strMealThumb}" alt="image">
                    <h2>${Desc[0].strMeal}</h2>
                  </div>
                  <div class="col-md-8">
                    <h2>Instructions</h2>
                    <p>${Desc[0].strInstructions}</p>
                    <h3><span class="fw-bolder">Area : </span>${Desc[0].strArea}</h3>
                    <h3><span class="fw-bolder">Category : </span>${Desc[0].strCategory}</h3>
    
                    <h3>Recipes :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                      ${ingredientsList}
                    </ul>
    
                    <h3>Tags :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                      ${tagsList}
                    </ul>
    
                    <a target="_blank" href="${Desc[0].strSource}"
                      class="btn btn-success">Source</a>
                    <a target="_blank" href="${Desc[0].strYoutube}"
                      class="btn btn-danger">Youtube</a>
                  </div>`;

    $("#desc-meal").html(desc);
  }

  $("#cards").on("click", ".col-12", function () {
    let mealIndex = $(this).index();
    let mealId = meals[mealIndex].idMeal;
    $("#cards").hide();
    getDesc(mealId);
  });
  $("#searchform").addClass("d-none");
  $("#inputs").addClass("d-none");
}

// getMeals();
