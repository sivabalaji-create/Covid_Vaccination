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
    const response = await fetch(url,{
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    //if (!response.ok) {
      //const errorMessage = await response.text();
      //throw new Error(errorMessage);
    //}
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(`Request failed with status ${response.status}: ${errorMessage}`);
      throw new Error(`Request failed with status ${response.status}`);
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
  const startTime = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;

  // Send the centre details to the server
  try {
    const response = await sendRequest('http://localhost:3000/addCentre', 'POST', {
      centreName: centreName,
      location: location,
      capacity: capacity,
      startTime: startTime,
      endTime: endTime
    });

    // Handle the response from the server
    if (response.error) {
      console.error(response.error);
      // Handle the error condition
      // You can display an error message or perform additional actions here
    } else {
      console.log('Centre added successfully');
      alert("Centre added successfully");
    }
  } catch (error) {
    console.error(error);
  }
}
// Function to handle the form submission for removing a vaccination centre
async function removeCentreHandler(event) {
  event.preventDefault();

  const centreId = document.getElementById('centreId').value;
  try {
    const response = await sendRequest('http://localhost:3000/removeCentre', 'POST', {
      centreId: centreId
    });
    if (response.error) {
      console.error(response.error);
    } else {
      console.log('Centre removed successfully');
    }
  } catch (error) {
    console.error(error);
  }
}


  
  // Add event listeners to the forms
  const addCentreForm = document.getElementById('addCentreForm');
  addCentreForm.addEventListener('submit', addCentreHandler);
  
  const removeCentreForm = document.getElementById('removeCentreForm');
  removeCentreForm.addEventListener('submit', removeCentreHandler);
  