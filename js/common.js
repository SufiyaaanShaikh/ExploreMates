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

$(window).on("scroll load", function () {
  $('.tab-link').click(function () {
    var tabID = $(this).attr('data-tab');
    $(this).addClass('active').siblings().removeClass('active');
    $('#tab-' + tabID).addClass('active').siblings().removeClass('active');
  });

  $(".v-tab_content").hide();
  $(".v-tab_content:first").show();

  $(".v-tab_tab-head li").click(function () {
    $(".v-tab_content").hide();
    var activeTab = $(this).attr("rel");
    $("#" + activeTab).fadeIn();
    $(".v-tab_tab-head li").removeClass("active");
    $(this).addClass("active");
  });
});

// script.js

// Wait for the entire page to load (including images, CSS, etc.)
window.addEventListener('load', () => {
    // Hide the loader
    const loader = document.getElementById('loader');
    loader.style.display = 'none';

    // Show the main content
    const content = document.getElementById('content');
    content.style.display = 'block';
});



// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  const authDrop = document.querySelector("#auth-dropdown");
  const profileDrop = document.querySelector("#profile-dropdown");
  const profileMenu = document.querySelector("#profile-menu");
  const searchInput = document.querySelector("#searchInput");

  const checkUserStatus = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn) {
      profileDrop.style.display = "flex";
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

  profileMenu.addEventListener("change", () => {
    const nav = document.querySelector("nav");
    if (profileMenu.checked) {
      document.querySelector("#burger").checked = false;
      nav.classList.remove("nav-active");
    }
    checkUserStatus();
  });

  function setupMenuToggle() {
    const nav = document.querySelector("nav");
    const burger = document.querySelector("#burger");

    burger.addEventListener("change", () => {
      if (burger.checked) {
        nav.classList.add("nav-active");
        profileMenu.checked = false;
        toggleDropdown();
      } else {
        nav.classList.remove("nav-active");
      }
    });
  }

  try {
    document.getElementById("year").innerHTML = new Date().getFullYear();
  } catch (error) {
    console.error(error);
  }

  try {
    searchInput.addEventListener("keypress", (evt) => {
      if (evt.key === "Enter") {
        const searchQuery = searchInput.value.trim();
        if (searchQuery.length === 0) {
          return;
        } else if (searchQuery.length > 25) {
          createSnackbar("Search query is too long.", true);
        } else {
          window.location.href = `feed.html?q=${encodeURIComponent(searchQuery)}`;
        }
      }
    });
  } catch (error) {
    console.error(error);
  }

  setupMenuToggle();
  checkUserStatus();
  initializeFollowButtons();
});

// Initialize Follow Buttons
function initializeFollowButtons() {
  const storedName = localStorage.getItem("name");
  // const followButtons = document.querySelectorAll("#followBtn");
  // const isLoggedIn = localStorage.getItem("isLoggedIn");
  // const userElements = document.querySelectorAll("#username");
  // const cityElements = document.querySelectorAll("#city");

  const fetchingData = async () => {
    try {
      const response = await fetch('../Data/usersData.json');
      const data = await response.json();
      const usernames = data.map(user => user.name);
      const cities = data.map(user => user.address.city);
      // displayUsernames(userElements, usernames);
      // displayUsernames(cityElements, cities);

      // followButtons.forEach((button, index) => {
      //   const singleUserName = usernames[index];
      //   const followKey = `${storedName}_Follow_${singleUserName}`;
      //   const isFollowing = localStorage.getItem(followKey) === "true";

      //   updateButtonState(button, isFollowing);

      //   button.addEventListener("click", () => {
      //     if (isLoggedIn) {
      //       const currentState = button.innerHTML === "Following";
      //       const newState = !currentState;

      //       if (newState) {
      //         localStorage.setItem(followKey, "true");
      //         createSnackbar(`You are now following ${singleUserName}`);
      //       } else {
      //         localStorage.removeItem(followKey);
      //         createSnackbar(`You have unfollowed ${singleUserName}`);
      //       }

      //       updateButtonState(button, newState);
      //     } else {
      //       createSnackbar("Please create an account to follow.", true);
      //     }
      //   });
      // });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchingData();
  showName(storedName);
}


try {
  document.querySelector('#editBtn').addEventListener('click', function () {
    window.location.href = 'editProfile.html';
  });

} catch (error) {
  console.error(error);
}

// Display User's Name
function showName(storedName) {
  const nameElement = document.querySelector("#name");
  const myUserName = document.querySelector("#myUserName");

  nameElement.innerHTML = `<span class="fw-500">${storedName}</span> `;
  myUserName.innerText = `${storedName}`;
}

// Set Up Logout Button
function setUpLogout() {
  const logoutButton = document.querySelector("#logout");

  logoutButton.addEventListener("click", () => {
    localStorage.clear();
    createSnackbar("Goodbye! You’ve been logged out.", true);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  });
}

// Display Usernames
function displayUsernames(elements, array) {
  elements.forEach((element, index) => {
    element.innerHTML = array[index];
  });
}

// Update Button State Based on Follow Status
// function updateButtonState(button, isFollowing) {
//   if (isFollowing) {
//     button.innerHTML = "Following";
//     button.style.backgroundColor = "transparent";
//     button.style.color = "#000";
//   } else {
//     button.innerHTML = "Follow";
//     button.style.backgroundColor = "#000";
//     button.style.color = "#fff";
//   }
// }

// Create Snackbar Notification

function createSnackbar(message, shouldFollow) {
  const snackbar = document.createElement("div");
  snackbar.classList.add("snackbar");

  const msg = document.createElement("p");
  msg.textContent = message;
  msg.classList.add("msg");

  if (shouldFollow) {
    snackbar.style.backgroundColor = "rgb(255, 73, 66)";
    msg.style.color = "#fff";
  }

  snackbar.appendChild(msg);
  document.body.appendChild(snackbar);

  setTimeout(() => {
    snackbar.remove();
  }, 3000);
}
