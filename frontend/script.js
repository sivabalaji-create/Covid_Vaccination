document.getElementById("user-login-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Perform user login validation
  // ...

  // Show user dashboard and hide login forms
  document.getElementById("user-login-form").reset();
  document.getElementById("user-login-form").classList.add("hidden");
  document.getElementById("user-dashboard").classList.remove("hidden");
});

document.getElementById("admin-login-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const adminUsername = document.getElementById("admin-username").value;
  const adminPassword = document.getElementById("admin-password").value;

  // Perform admin login validation
  // ...

  // Show admin dashboard and hide login forms
  document.getElementById("admin-login-form").reset();
  document.getElementById("admin-login-form").classList.add("hidden");
  document.getElementById("admin-dashboard").classList.remove("hidden");
});

document.getElementById("user-logout").addEventListener("click", function() {
  // Hide user dashboard and show user login form
  document.getElementById("user-dashboard").classList.add("hidden");
  document.getElementById("user-login-form").classList.remove("hidden");
});

document.getElementById("admin-logout").addEventListener("click", function() {
  // Hide admin dashboard and show admin login form
  document.getElementById("admin-dashboard").classList.add("hidden");
  document.getElementById("admin-login-form").classList.remove("hidden");
});

document.getElementById("search-centres").addEventListener("click", function() {
  // Perform search for vaccination centres
  // ...
});

document.getElementById("apply-slot").addEventListener("click", function() {
  // Apply for a vaccination slot
  // ...
});

document.getElementById("add-centres").addEventListener("click", function() {
  // Add vaccination centres
  // ...
});

document.getElementById("get-dosage").addEventListener("click", function() {
  // Get dosage details
  // ...
});

document.getElementById("remove-centres").addEventListener("click", function() {
  // Remove vaccination centres
  // ...
});
