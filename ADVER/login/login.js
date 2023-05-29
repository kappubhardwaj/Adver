function validateLogin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Retrieve the stored login details from localStorage
  var storedUsername = localStorage.getItem("username");
  var storedPassword = localStorage.getItem("password");

  // Check if the stored login details exist
  if (storedUsername && storedPassword) {
    // Perform the login validation using the retrieved details
    if (username === storedUsername && password === storedPassword) {
      // Successful login
      window.location.href = "kapil.html";
    } else {
      // Invalid login
      alert("Invalid username or password. Please try again.");
    }
  } else {
    // No stored login details found
    alert("No account found. Please create an account.");
  }

  return false; // Prevent form submission
}

function createAccount() {
  var newUsername = document.getElementById("newUsername").value;
  var newPassword = document.getElementById("newPassword").value;

  // Validate the new account details

  // Validate username (email or 10-digit phone number)
  var usernameRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/; // Email regex
  var phoneRegex = /^\d{10}$/; // 10-digit phone number regex

  if (!(usernameRegex.test(newUsername) || phoneRegex.test(newUsername))) {
    alert(
      "Invalid username. Please enter a valid email or a 10-digit phone number."
    );
    return false;
  }

  // Validate password (8-15 characters, at least one lowercase letter, one uppercase letter, one number, and one special character)
  var passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,15}$/;

  if (!passwordRegex.test(newPassword)) {
    alert(
      "Invalid password. Please enter a password between 8 and 15 characters with at least one lowercase letter, one uppercase letter, one number, and one special character."
    );
    return false;
  }

  // Save the login details in localStorage
  localStorage.setItem("username", newUsername);
  localStorage.setItem("password", newPassword);

  // Redirect the user to another page
  window.location.href = "index.html";

  return false; // Prevent form submission
}
