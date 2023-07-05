// user.js
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      // Get the location input value
      const locationInput = searchForm.elements.location;
      const location = locationInput.value;
  
      // Clear the input field
      locationInput.value = '';
  
      // Perform the search
      searchCenters(location);
    });
  
    // Fetch and display the vaccination centers on page load
    fetchCenters();
  });
  
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
      console.error(`Request failed with status ${response.status}: ${errorMessage}`);
      throw new Error(`Request failed with status ${response.status}`);
    }
  
    const responseData = await response.json();
    return responseData;
  }
  fetchCenters();
  // Function to fetch and display the vaccination centers
  async function fetchCenters() {
    try {
      const response = await fetch('http://localhost:3000/centers');
      const centers = await response.json();
      displayCenters(centers);
    } catch (error) {
      console.error(error);
    }
  }
// Function to display vaccination centers in the page
function displayCenters(centers) {
    const centersSection = document.getElementById('centers-section');
  
    centers.forEach((center) => {
      const centerCard = document.createElement('div');
      centerCard.classList.add('center-card');
  
      const centerName = document.createElement('h3');
      centerName.textContent = center.centreName;
      centerCard.appendChild(centerName);
  
      const location = document.createElement('p');
      location.textContent = `Location: ${center.location}`;
      centerCard.appendChild(location);
  
      const workingHours = document.createElement('p');
      workingHours.textContent = `Working Hours: ${center.startTime} - ${center.endTime}`;
      centerCard.appendChild(workingHours);
  
      const bookButton = document.createElement('button');
      bookButton.classList.add('book-button');
      bookButton.textContent = 'Book Slot';
      centerCard.appendChild(bookButton);
  
      centersSection.appendChild(centerCard);
  
      // Add event listener to the book button
      bookButton.addEventListener('click', async () => {
        const centreId = center._id;
        try {
          const response = await sendRequest('http://localhost:3000/bookSlot', 'POST', { centreId });
          if (response.error) {
            console.error(response.error);
          } else {
            console.log('Slot booked successfully');
            alert("slot booked successfully");
          }
        } catch (error) {
          console.error(error);
        }
      });
    });
  }
  

  // Function to search vaccination centers by location
  async function searchCenters(location) {
    try {
      const centersSection = document.getElementById('centers-section');
  
      // Clear the existing centers
      centersSection.innerHTML = '';
  
      // Send the search request to the server
      const response = await sendRequest('http://localhost:3000/searchCenters', 'POST', { location });
  
      // Display the search results in the DOM
      response.centers.forEach((center) => {
        const centerCard = createCenterCard(center);
        centersSection.appendChild(centerCard);
      });
    } catch (error) {
      console.error(error);
    }
  }
  