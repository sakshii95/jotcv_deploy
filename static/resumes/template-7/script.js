function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
  
  
  // Function to parse query parameters from URL
  function getQueryParam(parameterName) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(parameterName);
  }
  
  // Get the 'profile' query parameter value
  const profileId = getQueryParam('profile');
  
  // Check if the 'profile' parameter is present in the URL
  if (profileId) {
      // Construct the API URL with the profileId
      const apiUrl = `https://api.jotcv.com/api/candidate/web-profile/${profileId}`;
  
      // Make an API request (assuming you are using fetch)
      fetch(apiUrl)
          .then(response => response.json())
          .then(item => {
            
              // Update the HTML with the dynamic content
              let res=item?.data
              const dynamicContent = document.getElementById('dynamic-content');
              dynamicContent.innerHTML = `

            
`

          })
          .catch(error => {
              console.error('API request error:', error);
          });
  } else {
      // Handle the case when 'profile' parameter is not present
      console.error('Profile parameter is missing from the URL.');
  }
  
  