
// // Scroll
// $(window).on("scroll load", function () {
//   if ($(window).scrollTop() > 90) {
//     $("header").addClass("header-active");
//   } else {
//     $("header").removeClass("header-active");
//   }
// });

// // Menu
// try {
//   const menu = document.querySelector(".menu");
//   const nav = document.querySelector("nav");

//   menu.addEventListener("click", () => {
//     menu.classList.toggle("menu-ani");
//     nav.classList.toggle("nav-show");
//   });

//   document.getElementById("year").innerHTML = new Date().getFullYear();
// } catch (err) {
//   console.log(err.message);
// }





// document.addEventListener("DOMContentLoaded", function () {
//   const log = document.querySelector("#log");
//   const user = document.querySelector("#user");

//   const checkUserStatus = () => {
//     const isLoggedIn = localStorage.getItem("isLoggedIn");

//     if (isLoggedIn) {
//       if (log && user) {
//         log.style.display = "none";
//         user.style.display = "block";
//         LogOut();
//       }
//     } else {
//       if (log && user) {
//         log.style.display = "flex";
//         user.style.display = "none";
//       }
//     }
//   };
//   checkUserStatus();
//   following();
// });


// // Show Name 
// function showName(storedName) {

//   let showname = document.querySelector("#name");
//   showname.innerHTML = `<span class="fw-500">Name:</span> <br> ${storedName}`;

// }


// // LogOut 
// function LogOut() {
//   let logoutbtn = document.querySelector("#logout");
//   logoutbtn.addEventListener("click", () => {
//     localStorage.clear();
//     window.location.reload();
//   });
// }


// // Users Name 
// function userName(username, nameArr) {

//   nameArr.forEach((val, idx, arr) => {
//     username[idx].innerHTML = val;
//   });

// }


// function following() {
//   const storedName = localStorage.getItem("name");
//   const followBtn = document.querySelectorAll("#followBtn");
//   const isLoggedIn = localStorage.getItem("isLoggedIn");
//   const username = document.querySelectorAll("#username");
//   const nameArr = ["Pikachu", "Danger", "Badheeerr", "Saud"];

//   userName(username, nameArr);
//   showName(storedName);

//   followBtn.forEach((btn, idx) => {

//     btn.addEventListener("click", () => {

//       if (isLoggedIn) {

//         const singleUserName = username[idx].innerHTML;
//         const storeFollowing = `${storedName}, Follow ${singleUserName}`;
//         localStorage.setItem(storeFollowing, "true");
//         const isFollow = localStorage.getItem(storeFollowing);

//         if (isFollow === "true") {

//           if (btn.innerHTML == "Follow") {

//             console.log(`${storedName}, Now Your Unfollowing ${singleUserName}`);
//             btn.innerHTML = "Following";
//             btn.style.backgroundColor = "transparent";
//             btn.style.color = "#000";

//             createSnackbar(singleUserName, btn);

//           } else {
//             console.log(`${storedName}, Now Your Following ${singleUserName}`);
//             // localStorage.setItem(storeFollowing, "false");
//             localStorage.removeItem(storeFollowing);

//             btn.innerHTML = "Follow";
//             btn.style.backgroundColor = "#000";
//             btn.style.color = "#fff";
//             createSnackbar(singleUserName, btn);
//           }
//         }
//       } else {
//         alert("Create account");
//         window.location.href = "singup.html";
//       }

//     });

//   });
// }






// function createSnackbar(singleUserName, btn) {
//   // Creating SnackBar 
//   const snackbar = document.createElement("div");
//   snackbar.classList.add("snackbar");
//   document.body.appendChild(snackbar);

//   // msg 
//   const msg = document.createElement("p");
//   if (btn.innerHTML == "Follow") {
//     msg.textContent = `Now your unfollowing ${singleUserName}`

//   } else {
//     msg.textContent = `Now your following ${singleUserName}`;
//   }
//   msg.classList.add("msg");
//   snackbar.appendChild(msg);

//   setTimeout(() => {
//     snackbar.remove();
//   }, 3000); // Snackbar disappears after 3 seconds
// }





// Scroll Event to Toggle Header Class
// 
























// Scroll Event to Toggle Header Class
$(window).on("scroll load", function () {
  if ($(window).scrollTop() > 90) {
    $("header").addClass("header-active");
  } else {
    $("header").removeClass("header-active");
  }
});

// Menu Toggle Functionality
try {
  // const menu = document.querySelector(".menu");
  const burger = document.querySelector("#burger");
  const nav = document.querySelector("nav");

  burger.addEventListener("change", () => {
    if (burger.checked) {
      nav.classList.add("nav-active");
    } else {
      nav.classList.remove("nav-active");
    }
  });

  // menu.addEventListener("click", () => {
  //   menu.classList.toggle("menu-ani");
  //   nav.classList.toggle("nav-show");
  // });

  document.getElementById("year").innerHTML = new Date().getFullYear();
} catch (err) {
  console.log(err.message);
}

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {


  const authDrop = document.querySelector("#auth-dropdown");
  const profileDrop = document.querySelector("#profile-dropdown");
  const checkBox = document.querySelector("#profile-menu");

  const checkUserStatus = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn) {
      profileDrop.style.display = "block";
      authDrop.style.display = "none";
      setUpLogout();
    } else {
      profileDrop.style.display = "none";
      authDrop.style.display = "flex";
    }

    toggleDropdown();
  };

  const toggleDropdown = () => {
    if (checkBox.checked) {
      authDrop.classList.add("drop-checked");
      profileDrop.classList.add("drop-checked");
    } else {
      authDrop.classList.remove("drop-checked");
      profileDrop.classList.remove("drop-checked");
    }
  };

  

  // Event listener for the checkbox to toggle the dropdown based on user status
  checkBox.addEventListener("change", checkUserStatus);

  // Initial check on page load
  checkUserStatus();

  initializeFollowButtons();
});

// Display User's Name
function showName(storedName) {
  const nameElement = document.querySelector("#name");
  nameElement.innerHTML = `<span class="fw-500">Name:</span> <br> ${storedName}`;
}

// Set Up Logout Button
function setUpLogout() {
  const logoutButton = document.querySelector("#logout");
  logoutButton.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
  });
}

// Display Usernames
function displayUsernames(userElements, nameArray) {
  userElements.forEach((element, index) => {
    element.innerHTML = nameArray[index];
  });
}

// Initialize Follow Buttons
function initializeFollowButtons() {
  const storedName = localStorage.getItem("name");
  const followButtons = document.querySelectorAll("#followBtn");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userElements = document.querySelectorAll("#username");
  const nameArray = ["Rahul", "Shaina", "Alfiyaa", "Mamta"];

  displayUsernames(userElements, nameArray);
  showName(storedName);

  followButtons.forEach((button, index) => {
    const singleUserName = userElements[index].innerHTML;
    const followKey = `${storedName}_Follow_${singleUserName}`;
    const isFollowing = localStorage.getItem(followKey) === "true";

    updateButtonState(button, isFollowing);

    button.addEventListener("click", () => {
      if (isLoggedIn) {
        const currentState = button.innerHTML === "Following";
        const newState = !currentState;

        if (newState) {
          localStorage.setItem(followKey, "true");
          createSnackbar(`You are now following ${singleUserName}`);
        } else {
          localStorage.removeItem(followKey);
          createSnackbar(`You have unfollowed ${singleUserName}`);
        }

        updateButtonState(button, newState);
      } else {
        alert("Please create an account to follow.");
        // window.location.href = "signup.html";
      }
    });
  });
}

// Update Button State Based on Follow Status
function updateButtonState(button, isFollowing) {
  if (isFollowing) {
    button.innerHTML = "Following";
    button.style.backgroundColor = "transparent";
    button.style.color = "#000";
  } else {
    button.innerHTML = "Follow";
    button.style.backgroundColor = "#000";
    button.style.color = "#fff";
  }
}

// Create Snackbar Notification
function createSnackbar(message) {
  const snackbar = document.createElement("div");
  snackbar.classList.add("snackbar");

  const msg = document.createElement("p");
  msg.textContent = message;
  msg.classList.add("msg");

  snackbar.appendChild(msg);
  document.body.appendChild(snackbar);

  setTimeout(() => {
    snackbar.remove();
  }, 3000); // Snackbar disappears after 3 seconds
}
