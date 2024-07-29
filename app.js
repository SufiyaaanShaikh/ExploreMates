$(window).on("scroll load", function () {
  if ($(window).scrollTop() > 90) {
    $("header").addClass("header-active");
  } else {
    $("header").removeClass("header-active");
  }
});

const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");

menu.addEventListener("click", () => {
  menu.classList.toggle("menu-ani");
});

menu.addEventListener("click", () => {
  nav.classList.toggle("nav-show");
});
