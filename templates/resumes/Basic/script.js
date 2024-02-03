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
const profileId = getQueryParam("profile");

// Check if the 'profile' parameter is present in the URL
if (profileId) {
  // Construct the API URL with the profileId
  const apiUrl = `https://api.jotcv.com/api/candidate/web-profile/${profileId}`;

  // Make an API request (assuming you are using fetch)
  fetch(apiUrl)
    .then((response) => response.json())
    .then((item) => {
      // Update the HTML with the dynamic content
      let res = item?.data;
      const dynamicContent = document.getElementById("dynamic-content");
      dynamicContent.innerHTML = `     
              <header>
              <a href="#">${res?.full_name}</a>
              <div class="hamburger">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#experience">Experience</a></li>
              </ul>
            </header>
            <!-- Navbar Section End -->
            <!-- Home Section Start -->
            <section id="home">
              <img decoding="async"  alt="" />
              <h1>Hello,I am ${res?.full_name}</h1>
              <h2>${res?.position}</h2>
              <p>
            ${res?.summary}
              </p>
            
            </section>
            <!-- Home Section End -->
            <!-- About Section Start -->
            <section id="about">
              <div>
                <h2>About Me</h2>
                <p>
${res?.summary}
                </p>
              </div>
              <div>
                <img src=${res?.profile_picture} width="200px" alt="" />
              </div>
            </section>
            <!-- About Section End -->
            <!-- Skills Section Start -->
            <section id="skills">
              <h2>Skills</h2>
              <div class="skill-set">
              ${res?.skills
                ?.map((data) => {
                  return `
                  <h3> ${data?.skill}</h3>
                  `;
                })
                .join("")}
        
              </div>
            </section>
            <!-- Skills Section End -->
            <!-- Services Section Start -->
            <section id="experience">
              <h2>Experience</h2>
              <div class="timeline">
              ${res?.experiences?.map((data) => {
                return `
<div class="event">
<h4>${data?.designation}</h4>
<p>${data?.company_name}</p>
<p>${data?.start_date} - ${data?.end_date}</p>
</div>
`;
              })?.join("")}
             
              
                <!-- Add more events here -->
              </div>
            </section>
        
            <section class="section" id="edu">
              <h2>Education</h2>
              <div class="timeline">
              ${res?.eductaions?.map((data) => {
                return `
                <div class="event education">
                <h4 class="degree">${data?.course}</h4>
                <p>${data?.university}</p>
                <p>${data?.start_date} -${data?.is_current?"Currently Studying":data?.end_date}</p>
              </div>

`;
              })?.join("")}
              
                <!-- Add more events here -->
              </div>
            </section>
            <!-- Contact Section End -->
            <footer>
              <h2>Contact Us</h2>
              <a href="#"></a>
              <a href="#"></a>
              <a href="#"></a>
              <a href="#"></a>
              <p>${res?.email} | ${res?.mobile_no} | ${res?.address}</p>
            </footer>
            `;
    })
    .catch((error) => {
      console.error("API request error:", error);
    });
} else {
  // Handle the case when 'profile' parameter is not present
  console.error("Profile parameter is missing from the URL.");
}
