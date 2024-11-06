function displayUserProfile() {
    const profileUserName = document.querySelector("#profileUserName");
    const profileCity = document.querySelector("#profileCity");
    const button = document.querySelector(".followBtn");
    const storedName = localStorage.getItem("name");
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('username');
    const userCity = urlParams.get('city');

    profileUserName.innerHTML = userName;
    profileCity.innerHTML = userCity;

    const followKey = `${storedName}_Follow_${userName}`;
    const isFollowing = localStorage.getItem(followKey) === "true";
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
displayUserProfile();

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