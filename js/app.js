




// document.addEventListener("DOMContentLoaded", function () {
//   const name = document.querySelector("#name").value;
//   const email = document.querySelector("#email").value;
//   const password = document.querySelector("#password").value;
//   const confirmPassword = document.querySelector("#confirmPassword").value;
//   const errors = document.querySelectorAll('.formErr');


//   // Signup Form
//   try {
//     const signupForm = document.querySelector("#signupForm");

//     signupForm.addEventListener("submit", (event) => {
//       event.preventDefault();

//       validateFrom();
//       if (name && email && password && confirmPassword) {
//         if (password === confirmPassword) {
//           localStorage.setItem("name", name);
//           localStorage.setItem("email", email);
//           localStorage.setItem("password", password);
//           alert("Form submitted successfully!");
//           signupForm.reset(); // Clear the form

//           window.location.href = "login.html";
//         } else {
//           alert("Passwords do not match.");
//         }
//       } else {
//         // alert("Please fill in all fields.");
//       }
//     });
//   } catch (err) {
//     console.log(err.message);
//   }



//   // Validation 

//   function clearErrors() {


//     for (let item of errors) {
//       item.innerHTML = "";
//     }


//   }



//   let setErr = (idx, error) => {

//     // elm = document.getElementById(id);
//     // console.log(errors);
//     errors[idx].innerHTML = error;
//     // errors.document.getElementsByClassName('.formErr')[0].innerHTML = error;

//   }

//   let validateFrom = () => {

//     let returnval = true;
//     clearErrors();
//     console.log("name",name);
//     console.log("0");

//     // Name 
//     if (name.length == 0) {
//       setErr("0", "Name is required");
//       returnval = false;
//     }

//     if (name.length < 5) {
//       setErr("0", "Length of name is too short");
//       returnval = false;
//     }

//     // if (!isNaN(Number(name))) {
//     //   setErr("0", "Name must only contain letters.");
//     //   returnval = false;
//     // }

//     if (name.length > 15) {
//       setErr("0", "Length of name is too long");
//       returnval = false;
//     }

//     // Email 
//     if (email.length > 15) {
//       setErr("1", "Email length is too long");
//       returnval = false;
//     }

//     let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (email === "") {
//       setErr("1", "Email is required");
//       returnval = false;
//     }
//     else if (!emailPattern.test(email)) {
//       setErr("1", "Please enter a valid email address.");

//     } else {
//       setErr("1", "");
//     }

//     // Password 
//     if (password === "") {
//       setErr("2", "Password is required");
//       returnval = false;
//     }

//     if (password.length < 6) {
//       setErr("2", "Password must be at least 6 characters long");
//       returnval = false;
//     }

//     if(confirmPassword === "") {
//       setErr("3", "Confirm password is required");
//       returnval = false;
//     }
//   }


// });




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

      const isValid = validateForm(name, email, password, confirmPassword);

      if (isValid) {
        if (password === confirmPassword) {
          localStorage.setItem("name", name);
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          alert("Form submitted successfully!");
          signupForm.reset(); // Clear the form
          window.location.href = "login.html";
        } else {
          setErr(3, "Passwords do not match.");
        }
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
    let returnVal = true;
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
      returnVal = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr(1, "Please enter a valid email address.");
      returnVal = false;
    }

    // Password Validation
    if (password.length === 0) {
      setErr(2, "Password is required.");
      returnVal = false;
    } else if (password.length < 6) {
      setErr(2, "Password must be at least 6 characters long.");
      returnVal = false;
    }

    // Confirm Password Validation
    if (confirmPassword.length === 0) {
      setErr(3, "Confirm password is required.");
      returnVal = false;
    }

    return returnVal;
  }


  // Login Form
  try {
    const loginForm = document.querySelector("#loginForm");

    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const loginEmail = document.querySelector("#loginEmail").value.trim();
      const loginPassword = document.querySelector("#loginPassword").value.trim();

      if (validateLoginForm(loginEmail, loginPassword)) {
        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");

        if (loginEmail !== storedEmail) {
          setErr(4, "Email does not match our records.");
        }

        if (loginPassword !== storedPassword) {
          setErr(5, "Password does not match our records.");
        }

        if (loginEmail === storedEmail && loginPassword === storedPassword) {
          alert("Login Successful");
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("justLoggedIn", "true");
          window.location.href = "index.html";
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
      setErr(4, "Email is required.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr(4, "Please enter a valid email address.");
      isValid = false;
    }

    // Password Validation
    if (password.length === 0) {
      setErr(5, "Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setErr(5, "Password must be at least 6 characters long.");
      isValid = false;
    }

    return isValid;
  }
});


























