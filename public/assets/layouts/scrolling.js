//Prevents inside clicking closing
$(".dropdown").click(function (e) {
  e.stopPropagation();
});
// Closes when outside clicked
$(document).ready(function () {
  $(document).click(function (event) {
    var click = $(event.target);
    var _open = $(".collapse").hasClass("show");
    if (_open === true && !click.hasClass("header-btn-collapse-nav")) {
      $(".header-btn-collapse-nav").click();
    }
  });
});
//Closes by scrolling
$(document).ready(function () {
  $(document).scroll(function (event) {
    var click = $(event.target);
    var _open = $(".collapse").hasClass("show");
    if (_open === true && !click.hasClass("header-btn-collapse-nav")) {
      $(".header-btn-collapse-nav").click();
    }
  });
});
console.log("linked");
