// admin.js

// Wait for the page to load
document.addEventListener('DOMContentLoaded', () => {
    // Get the logout button element
    const logoutButton = document.getElementById('logout-button');
  
    // Add a click event listener to the logout button
    logoutButton.addEventListener('click', () => {
      // Redirect to index.html
      window.location.href = 'index.html';
    });
  });
 
// Include the necessary client-side logic

// Function to send an HTTP request to the server
async function sendRequest(url, method, data) {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  
    const responseData = await response.json();
    return responseData;
  }
  
  // Function to handle the form submission for adding a vaccination centre
  async function addCentreHandler(event) {
    event.preventDefault();
  
    const centreName = document.getElementById('centreName').value;
    const location = document.getElementById('location').value;
    const capacity = parseInt(document.getElementById('capacity').value);
  
    // Send the centre details to the server
    try {
      const response = await sendRequest('/addCentre', 'POST', {
        centreName: centreName,
        location: location,
        capacity: capacity,
      });
  
      // Handle the response from the server
      console.log(response);
      // You can display a success message or perform additional actions here
    } catch (error) {
      console.error(error);
      // Handle the error condition
      // You can display an error message or perform additional actions here
    }
  }
  
  // Function to handle the form submission for removing a vaccination centre
  async function removeCentreHandler(event) {
    event.preventDefault();
  
    const centreId = document.getElementById('centreId').value;
  
    // Send the centre ID to the server for removal
    try {
      const response = await sendRequest('/removeCentre', 'POST', {
        centreId: centreId,
      });
  
      // Handle the response from the server
      console.log(response);
      // You can display a success message or perform additional actions here
    } catch (error) {
      console.error(error);
      // Handle the error condition
      // You can display an error message or perform additional actions here
    }
  }
  
  // Add event listeners to the forms
  const addCentreForm = document.getElementById('addCentreForm');
  addCentreForm.addEventListener('submit', addCentreHandler);
  
  const removeCentreForm = document.getElementById('removeCentreForm');
  removeCentreForm.addEventListener('submit', removeCentreHandler);
  