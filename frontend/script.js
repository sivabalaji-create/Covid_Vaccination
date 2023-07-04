document.addEventListener('DOMContentLoaded', () => {
  // Get the logout button element
  const logoutButton = document.getElementById('logout-button');

  // Add a click event listener to the logout button
  logoutButton.addEventListener('click', () => {
    // Redirect to index.html
    window.location.href = 'index.html';
  });
});
const signupForm = document.getElementById('signup');

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(signupForm);
  const userData = Object.fromEntries(formData.entries());

  fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      // Handle success or display an appropriate message to the user
    })
    .catch((error) => {
      console.error(error);
      // Handle error or display an appropriate message to the user
    });
});



const loginForm = document.getElementById('login');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);
  const userData = Object.fromEntries(formData.entries());

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.role === 'user') {
        window.location.href = 'UserVaccine.html';
      } else if (result.role === 'admin') {
        window.location.href = 'AdminPanel.html';
      } else if (result.error) {
        console.log(result.error);
      } else {
        console.log('Invalid user type');
      }
    })
    .catch((error) => {
      console.error(error);
      console.log("Error in login");
    });
});
