// Import
import { changeRoute, logIn, logOut, createAccount } from "./model.js";

// Variables

// Form Listeners
export function addFormListeners() {
  // Sign Up
  $(".createForm #signUp").on("click", function (e) {
    e.preventDefault();
    // console.log("Sign In");
    createAccount();
  });
  // Log In
  $(".signUpForm #logIn").on("click", function (e) {
    e.preventDefault();
    logIn();
  });
}

function initListeners() {
  // Click on user profile on navbar to open dropdown menu
  $(".profileInfo").on("click", function () {
    $(".dropdownMenu").toggleClass("open");
  });
  // Remove Dropdown menu when URL changes
  $(window).on("hashchange", function () {
    $(".dropdownMenu").removeClass("open");
  });
  // Signing out
  $(".dropdownMenu .signOutLink").on("click", function (e) {
    e.preventDefault();
    logOut();
  });
}

function initURLListener() {
  $(window).on("hashchange", changeRoute);
  changeRoute();
}

$(document).ready(function () {
  initListeners();
  initURLListener();
});
