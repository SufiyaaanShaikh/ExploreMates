
// Scroll
$(window).on("scroll load", function () {
    if ($(window).scrollTop() > 90) {
      $("header").addClass("header-active");
    } else {
      $("header").removeClass("header-active");
    }
  });
  
  // Menu
  try {
    const menu = document.querySelector(".menu");
    const nav = document.querySelector("nav");
  
    menu.addEventListener("click", () => {
      menu.classList.toggle("menu-ani");
      nav.classList.toggle("nav-show");
    });

    document.getElementById("year").innerHTML = new Date().getFullYear();
  } catch (err) {
    console.log(err.message);
  }
  
  
  
  
  
  document.addEventListener("DOMContentLoaded", function () {
    const log = document.querySelector("#log");
    const user = document.querySelector("#user");
  
    const checkUserStatus = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
  
      if (isLoggedIn) {
        if (log && user) {
          log.style.display = "none";
          user.style.display = "block";
        }
      } else {
        if (log && user) {
          log.style.display = "flex";
          user.style.display = "none";
        }
      }
    };
    checkUserStatus();
  });
  