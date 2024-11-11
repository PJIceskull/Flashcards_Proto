// Import
import { changeRoute } from "./model.js";

// Variables

function initListeners() {}

function initURLListener() {
  $(window).on("hashchange", changeRoute);
  changeRoute();
}

$(document).ready(function () {
  initListeners();
  initURLListener();
});
