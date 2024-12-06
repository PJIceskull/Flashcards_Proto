// Import
import { changeRoute } from "./model.js";

// Variables

function initListeners() {
  // Click on user profile on navbar to open dropdown menu
  $(".profileInfo").on("click", function () {
    console.log("Click");
    $(".dropdownMenu").toggleClass("open");
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
