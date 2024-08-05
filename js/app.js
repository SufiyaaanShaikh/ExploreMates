

document.addEventListener("DOMContentLoaded", function () {
  // Signup Form
  try {
    const signupForm = document.querySelector("#signupForm");
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.querySelector("#name").value;
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      const confirmPassword = document.querySelector("#confirmPassword").value;

      if (name && email && password && confirmPassword) {
        if (password === confirmPassword) {
          localStorage.setItem("name", name);
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          alert("Form submitted successfully!");
          signupForm.reset(); // Clear the form

          window.location.href = "login.html";
        } else {
          alert("Passwords do not match.");
        }
      } else {
        alert("Please fill in all fields.");
      }
    });
  } catch (err) {
    console.log(err.message);
  }

  // Login Form
  try {
    const loginForm = document.querySelector("#loginForm");

    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const loginEmail = document.querySelector("#loginEmail").value;
      const loginPassword = document.querySelector("#loginPassword").value;

      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");

      if (loginEmail === storedEmail && loginPassword === storedPassword) {
        alert("Login Successful");

        // Redirect to a different page or perform other actions upon successful login
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("justLoggedIn", "true"); // Set the flag to prevent redirection loop
        window.location.href = "index.html"; // Change this to your desired page
      } else {
        alert("Invalid email or password.");
      }
    });
  } catch (err) {
    console.log(err.message);
  }
});
