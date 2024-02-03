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
            <nav id="desktop-nav">
            <div class="logo">${res?.full_name}</div>
            <div>
              <ul class="nav-links">
                <li><a href="#about">About</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
          </nav>
          <nav id="hamburger-nav">
            <div class="logo">${res?.full_name}</div>
            <div class="hamburger-menu">
              <div class="hamburger-icon" onclick="toggleMenu()">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="menu-links">
                <li><a href="#about" onclick="toggleMenu()">About</a></li>
                <li><a href="#experience" onclick="toggleMenu()">Experience</a></li>
                <li><a href="#projects" onclick="toggleMenu()">Projects</a></li>
                <li><a href="#contact" onclick="toggleMenu()">Contact</a></li>
              </div>
            </div>
          </nav>
          <section id="profile">
            <div class="section__pic-container">
              <img src=${res?.profile_picture} alt="John Doe profile picture" />
            </div>
            <div class="section__text">
              <p class="section__text__p1">Hello, I'm</p>
              <h1 class="title">${res?.full_name}</h1>
              <p class="section__text__p2">${res?.position}</p>
              <div class="btn-container">
                
                <button class="btn btn-color-1" onclick="location.href='./#contact'">
                  Contact Info
                </button>
              </div>
              <div id="socials-container">
                <img
                  src="./assets/linkedin.png"
                  alt="My LinkedIn profile"
                  class="icon"
                  onclick="location.href='https://linkedin.com/'"
                />
                <img
                  src="./assets/github.png"
                  alt="My Github profile"
                  class="icon"
                  onclick="location.href='https://github.com/'"
                />
              </div>
            </div>
          </section>
          <section id="about">
            <p class="section__text__p1">Get To Know More</p>
            <h1 class="title">About Me</h1>
            <div class="section-container">
              <div class="section__pic-container">
                <img
                src=${res?.profile_picture}
                  alt="Profile picture"
                  class="about-pic"
                />
              </div>
              <div class="about-details-container">
                <div class="about-containers">
                  <div class="details-container">
                    <img
                      src="./assets/experience.png"
                      alt="Experience icon"
                      class="icon"
                    />
                    <h3>Experience</h3>
                    <p>${res?.position}</p>
                  </div>
                  <div class="details-container">
                    <img
                      src="./assets/education.png"
                      alt="Education icon"
                      class="icon"
                    />
                    <h3>Education</h3>
                    ${res?.eductaions?.map((data)=>{
                      return (
                        data?.course

                      )
                    })}
                  </div>
                </div>
                <div class="text-container">
                  <p>
                  ${res?.summary}
                  </p>
                </div>
              </div>
            </div>
           
          </section>
          <section id="experience">
            <p class="section__text__p1">Explore My</p>
            <h1 class="title">Experience</h1>
            <div class="experience-details-container">
              <div class="about-containers">
                <div class="details-container">
                  <h2 class="experience-sub-title">Frontend Development</h2>
                  <div class="article-container">
                  ${
                    res?.skills?.map((data)=>{
                      return(
                        `<article>
                        <img
                          src="./assets/checkmark.png"
                          alt="Experience icon"
                          class="icon"
                        />
                        <div>
                          <h3>${data?.skill}</h3>
                          <p>${data?.type==1?"Begginer":data?.type==2?"Intermediate":"Experienced"}</p>
                        </div>
                      </article>`
                      )
                    }).join("")
                  }
                   
                    
                  </div>
                </div>
            
         
          </section>
          <section id="projects">
            <p class="section__text__p1">Browse My Recent</p>
            <h1 class="title">Projects</h1>
            <div class="experience-details-container">
              <div class="about-containers">
            ${res?.projects?.map((data)=>{
              return(
                `   <div class="details-container color-container">
                <div class="article-container">
               
                </div>
                <h2 class="experience-sub-title project-title">${data?.title}</h2>
                <div class="btn-container">
                 
                  <button
                    class="btn btn-color-2 project-btn"
                    onclick="location.href=${data?.link}"
                  >
                    Live Demo
                  </button>
                </div>
              </div>`
              )
            }).join("")
          }
             
          
        
              </div>
            </div>
        
          </section>
          <section id="contact">
            <p class="section__text__p1">Get in Touch</p>
            <h1 class="title">Contact Me</h1>
            <div class="contact-info-upper-container">
              <div class="contact-info-container">
                <img
                  src="./assets/email.png"
                  alt="Email icon"
                  class="icon contact-icon email-icon"
                />
                <p><a href="mailto:examplemail@gmail.com">Example@gmail.com</a></p>
              </div>
              <div class="contact-info-container">
                <img
                  src="./assets/linkedin.png"
                  alt="LinkedIn icon"
                  class="icon contact-icon"
                />
                <p><a href="https://www.linkedin.com">LinkedIn</a></p>
              </div>
            </div>
          </section>
          <footer>
            <nav>
              <div class="nav-links-container">
                <ul class="nav-links">
                  <li><a href="#about">About</a></li>
                  <li><a href="#experience">Experience</a></li>
                  <li><a href="#projects">Projects</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
            </nav>
            <p>Copyright &#169; 2023 John Doe. All Rights Reserved.</p>
          </footer>`
        })
        .catch(error => {
            console.error('API request error:', error);
        });
} else {
    // Handle the case when 'profile' parameter is not present
    console.error('Profile parameter is missing from the URL.');
}
