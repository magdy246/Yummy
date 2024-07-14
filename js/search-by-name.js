let nameinput = document.querySelector("#name-input");
nameinput.addEventListener("input", function () {
  getMealsByName(nameinput.value);
});

export async function getMealsByName(name) {
  try {
    $("#Search")
      .html(`<div class="Loader position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bg-black">
    <div class="loader"></div>
    </div>`);
    let response = await fetch(
      `https://themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    let result = await response.json();
    let mealsCard = result.meals;
    // &console.log(mealsCard);
    showCards(mealsCard);
  } catch (error) {
    $("#Search").html("");
  }
}

function showCards(mealsCard) {
  let meals = ``;
  for (let i = 0; i < Math.min(20, mealsCard.length); i++) {
    meals += `
    <div class="col-12 col-sm-6 col-md-3 meal-card" data-meal-id="${mealsCard[i].idMeal}">
      <figure class="w-100 position-relative rounded-4 overflow-hidden">
        <img class="w-100 rounded-4" src="${mealsCard[i].strMealThumb}" alt="cuio">
        <div class="bg-details text-black position-absolute bottom-0 start-0 end-0 click-point">
          <div class="d-flex flex-column justify-content-center h-100">
            <h3 class="ms-2 mb-0 fw-bold">${mealsCard[i].strMeal}</h3>
          </div>
        </div>
      </figure>
    </div>`;
  }
  $("#Search").html(meals);

  $(".meal-card").on("click", function () {
    let mealId = $(this).data("meal-id");
    getDesc(mealId);
    $("#searchform").addClass("d-none");
    $("#categories-section555566").removeClass("d-none");
    $("#categories-section55556").removeClass("d-none");
  });
}

async function getDesc(mealId) {
  $(".other-elements").hide();

  $("#Search").html("");
  $("#desc-meal-name")
    .html(`<div class="Loader position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bg-black">
    <div class="loader"></div>
    </div>`);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  let result = await response.json();
  let Desc = result.meals[0];

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
      .map((tag) => `<li class="alert alert-danger m-2 p-1">${tag.trim()}</li>`)
      .join("");
  }

  let desc = `<div class="row">
    <div class="col-md-4">
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
    </div>
  </div>`;

  $("#desc-meal-name").html(desc);
}
