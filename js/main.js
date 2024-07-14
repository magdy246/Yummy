//^^^^^^^^^^^^^^^^^^^^^^IMPORT FUCTIONs^^^^^^^^^^^^^^^^^^^^^^
import { getCategory } from "./category.js";
import { getIngredients } from "./Ingredients.js";
import { getArea } from "./area.js";
import { getMeals } from "./meals.js";
import { getMealsByName } from "./search-by-name.js";
import { getMealsByFletter } from "./search-by-Fletter.js";
getMeals();
getMealsByFletter();
getMealsByName();

//^^^^^^^^^^^^^^^^^^^^^^SIDE BAR^^^^^^^^^^^^^^^^^^^^^^
$(".list-btn").on("click", function () {
  $("#side-bar-section .Bar").addClass("open");
  $(".close-btn, .list-ul").fadeIn(200, function () {
    $(".nav-side1,.nav-side2,.nav-side3,.nav-side4,.nav-side5").addClass("up");
  });
  $(".list-btn").fadeOut(200, function () {
    $(".list-btn").addClass("hidden");
    $(".close-btn").removeClass("hidden");
  });
});

$(".close-btn").on("click", function () {
  $("#side-bar-section .Bar").removeClass("open");
  $(".close-btn, .list-ul").fadeOut(200, function () {
    $(".nav-side1,.nav-side2,.nav-side3,.nav-side4,.nav-side5").removeClass("up");
  });
  $(".list-btn").fadeIn(200, function () {
    $(".close-btn").addClass("hidden");
    $(".list-btn").removeClass("hidden");
  });
});

//^^^^^^^^^^^^^^^^^^^^^^SIDE BAR EVENTs^^^^^^^^^^^^^^^^^^^^^^
//! search
//! categories
//! area
//! ingredients
//! contact

// ^hideAction
function hideAllSections() {
  $(".corner").addClass("d-none");
}

// ^categoriesActions
$("#categories").on("click", function () {
  hideAllSections();
  $("#categories-section1").removeClass("d-none");
  $("#categories-section55").removeClass("d-none");
  $("#categories-section2").addClass("d-none");
  $("#categories-section22").addClass("d-none");
  $("#categories-section222").addClass("d-none");
  $("#searchform").addClass("d-none");
  $("#inputs").addClass("d-none");
  $("#categories-section5").addClass("d-none");
  $("#categories-section555").addClass("d-none");
  $("#categories-section5555").addClass("d-none");
  $("#categories-section55556").addClass("d-none");
  $("#categories-section555566").addClass("d-none");
  getCategory();
});

// ^areaActions
$("#area").on("click", function () {
  hideAllSections();
  $("#categories-section6").removeClass("d-none");
  $("#categories-section222").removeClass("d-none");
  $("#categories-section5555").removeClass("d-none");
  $("#categories-section1").addClass("d-none");
  $("#categories-section2").addClass("d-none");
  $("#categories-section22").addClass("d-none");
  $("#searchform").addClass("d-none");
  $("#inputs").addClass("d-none");
  $("#categories-section5").addClass("d-none");
  $("#categories-section55").addClass("d-none");
  $("#categories-section555").addClass("d-none");
  $("#categories-section55556").addClass("d-none");
  $("#categories-section555566").addClass("d-none");
  getArea();
});

// ^ingredientsActions
$("#ingredients").on("click", function () {
  hideAllSections();
  $("#categories-section22").removeClass("d-none");
  $("#categories-section4").removeClass("d-none");
  $("#categories-section555").removeClass("d-none");
  $("#categories-section1").addClass("d-none");
  $("#categories-section2").addClass("d-none");
  $("#categories-section222").addClass("d-none");
  $("#searchform").addClass("d-none");
  $("#inputs").addClass("d-none");
  $("#categories-section5").addClass("d-none");
  $("#categories-section55").addClass("d-none");
  $("#categories-section5555").addClass("d-none");
  $("#categories-section55556").addClass("d-none");
  $("#categories-section555566").addClass("d-none");
  getIngredients();
});

// ^contactActions
$("#contact").on("click", function () {
  hideAllSections();
  $("#inputs").removeClass("d-none");
  $("#categories-section1").addClass("d-none");
  $("#searchform").addClass("d-none");
  $("#categories-section2").addClass("d-none");
  $("#categories-section22").addClass("d-none");
  $("#categories-section222").addClass("d-none");
  $("#categories-section5").addClass("d-none");
  $("#categories-section55").addClass("d-none");
  $("#categories-section555").addClass("d-none");
  $("#categories-section5555").addClass("d-none");
  $("#categories-section55556").addClass("d-none");
  $("#categories-section555566").addClass("d-none");
});

// ^searchActions
$("#search").on("click", function () {
  hideAllSections();
  $("#searchform").removeClass("d-none");
  $("#categories-section555566").removeClass("d-none");
  $("#categories-section55556").removeClass("d-none");
  $("#categories-section1").addClass("d-none");
  $("#inputs").addClass("d-none");
  $("#categories-section2").addClass("d-none");
  $("#categories-section22").addClass("d-block");
  $("#categories-section222").addClass("d-block");
  $("#categories-section5").addClass("d-none");
  $("#categories-section55").addClass("d-none");
  $("#categories-section555").addClass("d-none");
  $("#categories-section5555").addClass("d-none");
});

//^^^^^^^^^^^^^^^^^^^^^^INPUTs^^^^^^^^^^^^^^^^^^^^^^
// ^Inputs
let nameInput = document.querySelector("#name");
let phoneInput = document.querySelector("#phone");
let passwordInput = document.querySelector("#password");
let emailInput = document.querySelector("#email");
let ageInput = document.querySelector("#age");
let repasswordInput = document.querySelector("#repassword");
// ^btnSubmit
let submitBtn = document.querySelector("#submit-btn");
// ^alert message
let nameAlert = document.querySelector(".name");
let phoneAlert = document.querySelector(".phone");
let passwordAlert = document.querySelector(".password");
let emailAlert = document.querySelector(".email");
let ageAlert = document.querySelector(".age");
let repasswordAlert = document.querySelector(".repassword");
// ^name
function validateName() {
  let regex = /^[a-zA-Z0-9_-]{3,15}$/;
  if (regex.test(nameInput.value)) {
    nameAlert.classList.add("d-none");
    return true;
  } else {
    nameAlert.classList.remove("d-none");
    return false;
  }
}
// ^phone
function validatePhone() {
  let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (regex.test(phoneInput.value)) {
    phoneAlert.classList.add("d-none");
    return true;
  } else {
    phoneAlert.classList.remove("d-none");
    return false;
  }
}
// ^password
function validatePassword() {
  let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  if (regex.test(passwordInput.value)) {
    passwordAlert.classList.add("d-none");
    return true;
  } else {
    passwordAlert.classList.remove("d-none");
    return false;
  }
}
// ^email
function validateEmail() {
  let regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  if (regex.test(emailInput.value)) {
    emailAlert.classList.add("d-none");
    return true;
  } else {
    emailAlert.classList.remove("d-none");
    return false;
  }
}
// ^age
function validateAge() {
  let regex = /^(0?[1-9]|[1-9][0-9]|100)$/;
  if (regex.test(ageInput.value)) {
    ageAlert.classList.add("d-none");
    return true;
  } else {
    ageAlert.classList.remove("d-none");
    return false;
  }
}
// ^repassword
function validateRepassword() {
  if ((repasswordInput.value = passwordInput.value)) {
    repasswordAlert.classList.add("d-none");
    return true;
  } else {
    repasswordAlert.classList.remove("d-none");
    return false;
  }
}
// ^btnSubmit
function btnAction() {
  let isNameValid = validateName();
  let isPhoneValid = validatePhone();
  let isPasswordValid = validatePassword();
  let isEmailValid = validateEmail();
  let isAgeValid = validateAge();
  let isRepasswordValid = validateRepassword();

  // ^abilityBtn
  if (
    isNameValid &&
    isPhoneValid &&
    isPasswordValid &&
    isEmailValid &&
    isAgeValid &&
    isRepasswordValid
  ) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}
// ^events on Inputs
nameInput.addEventListener("input", btnAction);
phoneInput.addEventListener("input", btnAction);
passwordInput.addEventListener("input", btnAction);
emailInput.addEventListener("input", btnAction);
ageInput.addEventListener("input", btnAction);
repasswordInput.addEventListener("input", btnAction);
