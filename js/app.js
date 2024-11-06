




document.addEventListener("DOMContentLoaded", function () {
  const errors = document.querySelectorAll('.formErr');

  // Signup Form
  try {
    const signupForm = document.querySelector("#signupForm");

    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();
      const password = document.querySelector("#password").value.trim();
      const confirmPassword = document.querySelector("#confirmPassword").value.trim();
      const isLoggedIn = localStorage.getItem("isLoggedIn");

      const isValid = validateForm(name, email, password, confirmPassword);

      if (isLoggedIn) {
        createSnackbar(`You already have an account`,  true);
        return;
      }
      else if (isValid) {
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        // alert("Form submitted successfully!");
        createSnackbar(`Form submitted successfully!`);
        setTimeout(() => {
          signupForm.reset(); // Clear the form
          window.location.href = "login.html";
        }, 2000);
      }

    });
  } catch (err) {
    console.log(err.message);
  }


  // Clear all errors
  function clearErrors() {
    for (let item of errors) {
      item.innerHTML = "";
    }
  }

  // Set specific error message
  function setErr(idx, error) {
    errors[idx].innerHTML = error;
  }

  // Sign-Up Form Validation
  function validateForm(name, email, password, confirmPassword) {
    let isValid = true;
    clearErrors();

    // Name Validation
    const namePattern = /^[A-Za-z\s]+$/;
    if (name.length === 0) {
      setErr(0, "Name is required.");
      isValid = false;
    } else if (name.length < 5) {
      setErr(0, "Length of name is too short.");
      isValid = false;
    } else if (name.length > 15) {
      setErr(0, "Length of name is too long.");
      isValid = false;
    } else if (!namePattern.test(name)) {
      setErr(0, "Name must contain only letters and spaces.");
      isValid = false;
    }

    // Email Validation
    if (email.length === 0) {
      setErr(1, "Email is required.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr(1, "Please enter a valid email address.");
      isValid = false;
    }

    // Password Validation
    if (password.length === 0) {
      setErr(2, "Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setErr(2, "Password must be at least 6 characters long.");
      isValid = false;
    }

    // Confirm Password Validation
    if (confirmPassword.length === 0) {
      setErr(3, "Confirm password is required.");
      isValid = false;
    }
    if (password !== confirmPassword) {
      setErr(3, "Passwords do not match.");
      isValid = false;
    }

    return isValid;
  }


  // Login Form
  try {
    const loginForm = document.querySelector("#loginForm");
    const username = document.querySelector("#username")
    const storedName = localStorage.getItem("name");

    if (storedName) {
      username.innerText = `Welcome Back, ${storedName}`;

    }

    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const loginEmail = document.querySelector("#loginEmail").value.trim();
      const loginPassword = document.querySelector("#loginPassword").value.trim();

      if (validateLoginForm(loginEmail, loginPassword)) {
        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");

        if (loginEmail !== storedEmail) {
          setErr(0, "Email does not match our records.");
        } else if (loginPassword !== storedPassword) {
          setErr(1, "Password does not match our records.");
        }

        if (loginEmail === storedEmail && loginPassword === storedPassword) {
          // alert("Login Successful");
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("justLoggedIn", "true");
          createSnackbar(`Login Successful`);
          setTimeout(() => {
            window.location.href = "index.html";
          }, 2000);
        } else {
          // alert("SignUp first");
          createSnackbar(`SignUp first`, true);
        }
      }
    });
  } catch (err) {
    console.log(err.message);
  }

  // Login Form Validation
  function validateLoginForm(email, password) {
    let isValid = true;
    clearErrors();

    // Email Validation
    if (email.length === 0) {
      setErr(0, "Email is required.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr(0, "Please enter a valid email address.");
      isValid = false;
    }

    // Password Validation
    if (password.length === 0) {
      setErr(1, "Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setErr(1, "Password must be at least 6 characters long.");
      isValid = false;
    }

    return isValid;
  }
});





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




















