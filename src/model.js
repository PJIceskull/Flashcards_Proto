export function changeRoute() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");
  console.log(hashTag + " " + pageID);

  // Scroll to Top of the Page
  scroll(0, 0);

  if (pageID != "") {
    $.get(`pages/${pageID}.html`, function (data) {
      // console.log("data " + data);
      $("#app").html(data);
    });
  } else {
    $.get(`pages/home.html`, function (data) {
      console.log("data " + data);
      $("#app").html(data);
    });
  }
}
