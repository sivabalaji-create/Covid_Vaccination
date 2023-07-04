const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', () => {
  // Redirect to the login or signup page
  window.location.href = 'login.html'; // Replace 'login.html' with the desired URL of the login or signup page
});