// Scroll Event to Toggle Header Class
$(window).on("scroll load", function () {
  if ($(window).scrollTop() > 90) {
    $("header").addClass("header-active");
    $("nav").addClass("nav-bgchange");
  } else {
    $("header").removeClass("header-active");
    $("nav").removeClass("nav-bgchange");
  }
});

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  const authDrop = document.querySelector("#auth-dropdown");
  const profileDrop = document.querySelector("#profile-dropdown");
  const profileMenu = document.querySelector("#profile-menu");

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
    if (profileMenu.checked) {
      authDrop.classList.add("drop-checked");
      profileDrop.classList.add("drop-checked");
    } else {
      authDrop.classList.remove("drop-checked");
      profileDrop.classList.remove("drop-checked");
    }
  };

  // Event listener for the checkbox to toggle the dropdown based on user status
  profileMenu.addEventListener("change", () => {
    const nav = document.querySelector("nav");
    if (profileMenu.checked) {
      burger.checked = false; // Uncheck burger when profile-menu is checked
      nav.classList.remove("nav-active");
    }
    checkUserStatus();
  });

  // Menu Toggle Functionality
  function setupMenuToggle() {

    const nav = document.querySelector("nav");
    const burger = document.querySelector("#burger");


    burger.addEventListener("change", () => {
      if (burger.checked) {
        nav.classList.add("nav-active");
        profileMenu.checked = false; // Uncheck profile-menu when burger is checked
        toggleDropdown();
      } else {
        nav.classList.remove("nav-active");
      }
    });
  }
  try {
    document.getElementById("year").innerHTML = new Date().getFullYear();

  }
  catch (error) {
    console.error(error);
  }


  setupMenuToggle();
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
    setTimeout(() => {
      localStorage.clear();
      window.location.reload();
    }, 2000);
      createSnackbar(`Goodbye! You’ve been logged out.`, shouldFollow = true);


  });
}
// setTimeout(setUpLogout(), 3000);
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
        createSnackbar(`Please create an account to follow.`, shouldFollow = true);
        // alert("Please create an account to follow.");
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
function createSnackbar(message, shouldFollow) {
  const snackbar = document.createElement("div");
  snackbar.classList.add("snackbar");

  const msg = document.createElement("p");
  msg.textContent = message;
  msg.classList.add("msg");
  if (shouldFollow) {
    snackbar.style.backgroundColor = " rgb(255, 73, 66)";
    msg.style.color = " #fff";

  }
  snackbar.appendChild(msg);
  document.body.appendChild(snackbar);

  setTimeout(() => {
    snackbar.remove();
  }, 3000); // Snackbar disappears after 3 seconds
}
