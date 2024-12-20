// Import
import { app } from "./firebaseConfig.js";
import { addFormListeners, initListeners } from "./index.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Variable
const auth = getAuth(app);
// Time
let oneSecond = 1000; // One Second is 1000
let oneMinute = 1000 * 60;

// Change href routing with #
export function changeRoute() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");
  // let pathName = window.location.pathname;
  console.log(hashTag + " " + pageID);

  // Scroll to Top of the Page
  scroll(0, 0);

  if (pageID != "") {
    $.get(`pages/${pageID}.html`, function (data) {
      // console.log("data " + data);
      $("#app").html(data);
      // console.log(pathName + pageID);
      // console.log(window.location.href.replace("#", ""));
      initListeners();
    });
    if (pageID == "login" || pageID == "signup") {
      $.get(`pages/${pageID}.html`, function (data) {
        $("#app").html(data);
        addFormListeners();
      });
    }
  } else {
    $.get(`pages/home.html`, function (data) {
      // console.log("data " + data);
      $("#app").html(data);
    });
  }
}

function changePage(pageName) {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");
  let webURL = window.location.href;
  console.log(pageID);

  if (pageName != "") {
    $.get(`pages/${pageName}.html`, function (data) {
      // Scroll to Top of the Page
      scroll(0, 0);
      console.log(webURL);
      console.log(webURL.replace(hashTag, `#${pageName}`));
      // URL is glitchy as it **preserve** the #hashtag from the previous page.
      // If the user tries to back to another page
      // Want the # in the webpage URL to change but the url stays the same.
      webURL = webURL.replace(hashTag, `#${pageName}`);
      $("#app").html(data);
    });
  }
}

function initURLListener() {
  $(window).on("hashchange", changeRoute);
  changeRoute();
}

$(document).ready(function () {
  initURLListener();
});

// Check if User is signed in.
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    // const uid = user.uid;
    // ...
    console.log("User is signed in.");
    // If User is Sign in
    // Show User Profile and hide Login Button
    $("nav .loginBTN").css("display", "none");
    $("nav .profileInfo").css("display", "block");
  } else {
    // User is signed out
    // ...
    console.log("No user is signed in.");
    // Show Login Button
    $("nav .loginBTN").css("display", "block");
    // Hide User Profile
    $("nav .profileInfo").css("display", "none");
  }
});

// Form Event Listeners
export function createAccount() {
  // creating an account
  console.log("Sign In");

  // User Values
  let fName = $("#fName").val(); // First Name
  let lName = $("#lName").val(); // Last Name
  let email = $("#eMail").val(); // Email
  let password = $("#pWord").val(); // Password

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      // ...
      console.log(user);
      console.log("You have created an account");
      // Change Page to show Success Screen
      changePage("signin_success");
      // Then change page to user profile page
      setTimeout(function () {
        changePage("profile");
      }, oneSecond * 2.5);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorMessage);
    });
  console.log("User: " + fName + " " + lName);
}
export function logIn() {
  console.log("Log In");

  let email = $("#eMail").val(); // Email
  let password = $("#pWord").val(); // Password

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      console.log(user);
      console.log("You've logged in");
      changePage("home"); // Link User to Home Page
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorMessage);
    });
}
export function logOut() {
  // let hashTag = window.location.hash;
  // let pageID = hashTag.replace("#", "");

  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("Sign-out successful.");
      changePage("login"); // Sent User back to Login Screen
    })
    .catch((error) => {
      // An error happened.
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}
