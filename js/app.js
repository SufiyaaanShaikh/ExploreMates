




document.addEventListener("DOMContentLoaded", function () {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirmPassword").value;
  const errors = document.querySelectorAll('.formErr');


  // Signup Form
  try {
    const signupForm = document.querySelector("#signupForm");

    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();

      validateFrom();
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
        // alert("Please fill in all fields.");
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

  // Validation 

  function clearErrors() {


    for (let item of errors) {
      item.innerHTML = "";
    }


  }



  let setErr = (idx, error) => {

    // elm = document.getElementById(id);
    // console.log(errors);
    errors[idx].innerHTML = error;
    // errors.document.getElementsByClassName('.formErr')[0].innerHTML = error;

  }

  let validateFrom = () => {

    let returnval = true;
    clearErrors();
    console.log("name",name);
    console.log("0");

    // Name 
    if (name.length == 0) {
      setErr("0", "Name is required");
      returnval = false;
    }

    if (name.length < 5) {
      setErr("0", "Length of name is too short");
      returnval = false;
    }

    // if (!isNaN(Number(name))) {
    //   setErr("0", "Name must only contain letters.");
    //   returnval = false;
    // }

    if (name.length > 15) {
      setErr("0", "Length of name is too long");
      returnval = false;
    }

    // Email 
    if (email.length > 15) {
      setErr("1", "Email length is too long");
      returnval = false;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      setErr("1", "Email is required");
      returnval = false;
    }
    else if (!emailPattern.test(email)) {
      setErr("1", "Please enter a valid email address.");

    } else {
      setErr("1", "");
    }

    // Password 
    if (password === "") {
      setErr("2", "Password is required");
      returnval = false;
    }

    if (password.length < 6) {
      setErr("2", "Password must be at least 6 characters long");
      returnval = false;
    }

    if(confirmPassword === "") {
      setErr("3", "Confirm password is required");
      returnval = false;
    }
  }


});


