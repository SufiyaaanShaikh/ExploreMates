const feedContainer = document.querySelector("#feedContainer");
const mainFeedContainer = document.querySelector(".main-feedContainer");

const storedName = localStorage.getItem("name");
const isLoggedIn = localStorage.getItem("isLoggedIn");

const urlParams = new URLSearchParams(window.location.search);
const destinationQuery = urlParams.get('q');

const fetchingData = async () => {
    try {
        const response = await fetch('../Data/usersData.json');
        const data = await response.json();

        const filteredData = destinationQuery
            ? data.filter(user => user.address.city.toLowerCase() === destinationQuery.toLowerCase())
            : data;

        // If the filtered data is empty, display a "No User Found" message
        if (filteredData.length === 0 && destinationQuery) {
            feedContainer.style.display = "flex"
            let notFound = document.createElement("p");
            notFound.classList.add('notFound', 'f-16', 'text-center', 'fw-500');
            notFound.style.marginInline = "auto"
            notFound.textContent = "No Users Found in this City";
            feedContainer.appendChild(notFound);

            // feedContainer.innerHTML = `<p>No User Found</p>`
            // feedContainer.innerHTML = "No Users Found in this City";
        } else if (mainFeedContainer) {
            filteredData.slice(0, 4).forEach(user => userCards(user));
        } else {
            filteredData.forEach(user => userCards(user));
        }

        // Set initial follow button state for all cards
        setInitialFollowButtonState(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

window.onload = fetchingData;

const viewProfile = (userName, cityName) => {
    const profileUrl = `UserProfile.html?username=${encodeURIComponent(userName)}&city=${encodeURIComponent(cityName)}`;
    window.location.href = profileUrl;
};

const userCards = (user) => {
    const card = document.createElement('div');
    card.classList.add('card', 'grid');

    card.innerHTML = `
        <div class="head-block flex items-center">
            <div class="img-block">
                <img src="images/user.png" alt="user-img" class="w-100 h-100">
            </div>
            <button class="followBtn" id="followBtn-${user.id}" onclick="followBtn('${user.name}', this)">Follow</button>
        </div>
        <div class="content">
            <div class="title">
                <h3 id="username" class="fw-500">${user.name}</h3>
            </div>
            <div class="detail flex items-center">
                <img src="images/destiniaion.svg" alt="locals" class="">
                <p id="city" class="para-c para-f">${user.address.city}</p>
            </div>
            <div class="detail flex items-center">
                <img src="images/calendar.svg" alt="calendar" class="">
                <p class="para-c para-f">2 days ago</p>
            </div>
            <div class="detail flex items-center">
                <img src="images/group.svg" alt="group" class="">
                <p class="para-c para-f">Duo</p>
            </div>
            <div class="view">
                <button id="viewProfileBtn" class="flex items-center justify-content" onclick="viewProfile('${user.name}', '${user.address.city}')">View Profile</button>
            </div>
        </div>
    `;
    feedContainer.appendChild(card);
};

function displayFeedHeading() {
    const feedHeading = document.querySelector(".feedHeading");
    const feedSearch = document.querySelector("#feedSearch");

    feedSearch.addEventListener("keypress", (evt) => {
        if (evt.key === "Enter") {
          const searchQuery = feedSearch.value.trim();
          if (searchQuery.length === 0) {
            window.location.href = `feed.html`;
          } else if (searchQuery.length > 25) {
            createSnackbar("Search query is too long.", true);
          } else {
            window.location.href = `feed.html?q=${encodeURIComponent(searchQuery)}`;
          }
        }
      });

    if (destinationQuery) {
        feedHeading.innerHTML = `Feed for '${destinationQuery.charAt(0).toUpperCase() + destinationQuery.slice(1)}'`;
        feedSearch.setAttribute("value", destinationQuery.charAt(0).toUpperCase() + destinationQuery.slice(1));
    } else {
        feedHeading.innerHTML = "Travel Feed";
        feedSearch.setAttribute("value", "");
    }
}
displayFeedHeading();

const followBtn = (userName, button) => {
    const followKey = `${storedName}_Follow_${userName}`;
    const isFollowing = localStorage.getItem(followKey) === "true";
    updateButtonState(button, isFollowing);

    if (isLoggedIn) {
        const currentState = button.innerHTML === "Following";
        const newState = !currentState;

        if (newState) {
            localStorage.setItem(followKey, "true");
            createSnackbar(`You are now following ${userName}`);
        } else {
            localStorage.removeItem(followKey);
            createSnackbar(`You have unfollowed ${userName}`);
        }

        updateButtonState(button, newState);
    } else {
        createSnackbar("Please create an account to follow.", true);
    }
};

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

function setInitialFollowButtonState(data) {
    data.forEach(user => {
        const followKey = `${storedName}_Follow_${user.name}`;
        const button = document.querySelector(`#followBtn-${user.id}`);
        const isFollowing = localStorage.getItem(followKey) === "true";
        updateButtonState(button, isFollowing);
    });
}

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
