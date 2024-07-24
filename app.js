const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");

menu.addEventListener("click", () => {
  menu.classList.toggle("menu-ani");
});
menu.addEventListener("click", () => {
  nav.classList.toggle("nav-show");
});
