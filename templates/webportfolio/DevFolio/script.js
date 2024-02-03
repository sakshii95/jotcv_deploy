// Function to parse query parameters from URL
function getQueryParam(parameterName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameterName);
  }
  
  // Get the 'profile' query parameter value
  
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
        document.title = res?.full_name;
  
        const filteredVideo1 = res?.video_questions?.filter(
          (video) => video.question?.id == 25
        );
        const educationVideo = res?.video_questions?.filter(
          (video) => video.question?.id == 6
        );
        const expVideo = res?.video_questions?.filter(
          (video) => video.question?.id == 12
        );
        const skillVideo = res?.video_questions?.filter(
          (video) => video.question?.id == 7
        );
        const projectVideo = res?.video_questions?.filter(
          (video) => video.question?.id == 16
        );
  
        let projectButton = projectVideo?.video
          ? ` <button type="button" class="btn-play" data-toggle="modal"
                                data-src=${projectVideo[0]?.video} data-target="#proModal">
                                <span></span>
                            </button>`
          : "";
  
        let profileButton = filteredVideo1[0]?.video
          ? `  <button type="button" class="btn-play" data-toggle="modal"
                            data-src=${filteredVideo1[0]?.video} data-target="#videoModal">
                            <span></span>
                        </button>`
          : "";
  
        let expButton = expVideo[0]?.video
          ? `   <button type="button" class="btn-play" data-toggle="modal"
                        data-src=${expVideo[0]?.video} data-target="#expModal">
                        <span></span>
                    </button>`
          : "";
  
        let eduButton = educationVideo[0]?.video
          ? `      <button type="button" class="btn-play" data-toggle="modal"
                    data-src=${educationVideo[0]?.video} data-target="#eduModal">
                    <span></span>
                    </button>`
          : "";
  
        let skillButton = skillVideo[0]?.video
          ? `<button type="button" class="btn-play" data-toggle="modal"
                    data-src=${skillVideo[0]?.video} data-target="#skillModal">
                    <span></span>
                    </button>`
          : "";
  
        let expSection =
          res?.experiences?.length !== 0
            ? `

            <div class="experience" id="experience">
            <div class="container">
             <header
               class="section-header text-center wow zoomIn"
               data-wow-delay="0.1s"
             >
               <p>My Resume</p>
               <div class="d-flex align-items-center justify-content-center mb-5 ">
               <h2>Working Experience</h2>
               
               
             
               ${expButton}
             
               </div>
             </header>
             <div class="timeline">
             ${res?.experiences
                ?.map((data) => {
                  return `
                  <div class="timeline-item left wow slideInLeft" data-wow-delay="0.1s">
                  <div class="timeline-text">
                    <div class="timeline-date">${data?.start_date} - ${
                        data?.is_current ? "Currently Studying" : data?.end_date
                    }</div>
                    <h2>${data?.designation}</h2>
                    <h4>${data?.company_name}</h4>
                    <p>
                    ${data?.description}
                    </p>
                  </div>
                </div>
               
                
                     `;
                })
                .join("")}
             
         
              
            
           
            
             </div>
            </div>
         </div>
            
            `
            : "";
  
        let eduSection =
          res?.eductaions?.length !== 0
            ? `   
          
         <div class="experience" id="edu">
            <div class="container">
             <header
               class="section-header text-center wow zoomIn"
               data-wow-delay="0.1s"
             >
               <div class="d-flex align-items-center justify-content-center mb-5 ">
               <h2>Education</h2>
               ${eduButton}
               </div>
             </header>
             <div class="timeline">
             ${res?.eductaions
                ?.map((data) => {
                  return `
                  <div class="timeline-item right wow slideInRight" data-wow-delay="0.1s">
                  <div class="timeline-text">
                    <div class="timeline-date">${data?.start_date} - ${
                        data?.is_current ? "Currently Studying" : data?.end_date
                    }</div>
                    <h2>${data?.course}</h2>
                    <h4>${data?.university}</h4>
                    <p>
                    ${data?.description}
                    </p>
                  </div>
                </div>
               
                
                     `;
                })
                .join("")}
             
         
              
            
           
            
             </div>
            </div>
         </div>`
            : "";
  
        let skillCard =
          res?.skills?.length !== 0
            ? ` 
            <section class="section" id="skill">
            <div class="container text-center">     
            <div class="d-flex justify-content-center mt-4">
            <h6 class="section-title mb-6">Skills</h6>
            
            
            ${skillButton}
            </div>
    
                <div class="row text-left">
                ${res?.skills
                  ?.map((data) => {
                    return `
                    <div class="col-sm-6">
                    <h6 class="mb-3 mt-3">${data?.skill}</h6>
                    <div class="progress">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: 97%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" ${
                          data?.type == 1
                            ? "33%"
                            : data?.type == 2
                            ? "66%"
                            : "100%"
                        }" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                    
                     
      
                          `;
                  })
                  ?.join("")}
                   
                   
                  
                  
                </div>  
            </div>
        </section>
          
  
  
        `
            : "";
  
        let projectSection =
          res?.projects?.length !== 0
            ? `     

            <div class="blog" id="project">
            <div class="container">
              <div
                class="section-header text-center wow zoomIn"
                data-wow-delay="0.1s"
              >
              <div class="d-flex align-items-center justify-content-center mb-5 ">
              <h2>Projects</h2>
                 
             ${projectButton}
              </div>
              </div>
              <div class="row">
              ${res?.projects
                ?.map((data) => {
                  return `
                  <div class="col-lg-6">
                  <div class="blog-item wow fadeInUp" data-wow-delay="0.1s">
                   
                    <div class="blog-text">
                      <h2>${data?.title}</h2>
                      <div class="blog-meta">
                    
                      <a class="subheading " href=${data?.link}>Link<a>
                        
                        <p><i class="far fa-calendar-alt"></i>${
                            data?.start_date
                          } - ${
                    data?.is_current ? "Currently Studying" : data?.end_date
                  }</p>
        
                      </div>
                      <p>
                      ${data?.description}
                      </p>
                    
                    </div>
                  </div>
                </div>
              
              
                     `;
                })
                .join("")}
             
                
              </div>
            </div>
          </div>
           
  
          `
            : "";
  
        let socialIcon = "";
        res?.social_links.forEach((item) => {
          if (item?.name === "LinkedIn") {
            socialIcon += `
        
              <a  href=${item?.link}><i class="fab fa-linkedin-in"></i></a>
  
        
              `;
          }
          if (item?.name === "Twitter") {
            socialIcon += `
              <a  href=${item?.link}><i class="fab fa-twitter"></i></a>
              `;
          }
          if (item?.name === "GitHub") {
            socialIcon += `
              <a  href=${item?.link}><i class="fab fa-github"></i></a>
              `;
          }
        });
  
        const dynamicContent = document.getElementById("dynamic");
        dynamicContent.innerHTML = `  
        <div class="navbar navbar-expand-lg bg-light navbar-light">
        <div class="container-fluid">
          <a href="#" class="navbar-brand">${res?.full_name}</a>
          <button
            type="button"
            class="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
  
          <div
            class="collapse navbar-collapse justify-content-between"
            id="navbarCollapse"
          >
            <div class="navbar-nav ml-auto">
              <a href="#home" class="nav-item nav-link active">Home</a>
              <a href="#about" class="nav-item nav-link">About</a>
              <a href="#experience" class="nav-item nav-link">Experience</a>
              <a href="#edu" class="nav-item nav-link">Education</a>
              <a href="#project" class="nav-item nav-link">Project</a>


           
            </div>
          </div>
        </div>
      </div>
      <!-- Nav Bar End -->
  
      <!-- Hero Start -->
      <div class="hero" id="home">
        <div class="container-fluid">
          <div class="row align-items-center">
            <div class="col-sm-12 col-md-6">
              <div class="hero-content">
                <div class="hero-text">
                  <p>I'm</p>
                  <div class="d-flex">
                  <h1>${res?.full_name}</h1>
                  ${profileButton}
                  </div>
                  <h2>
                  ${res?.position}
                  
                  </h2>
                
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 d-none d-md-block">
              <div class="hero-image">
                <img src=${res?.profile_picture} alt="Hero Image" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Hero End -->
  
      <!-- About Start -->
      <div class="about wow fadeInUp" data-wow-delay="0.1s" id="about">
        <div class="container-fluid">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="about-content">
                <div class="section-header text-left mt-3">
                  <p>Learn About Me</p>
                </div>
                <div class="about-text">
                  <p>
                ${res?.summary}
                  </p>
                </div>
                <div class="skills">
                ${skillCard}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- About End -->
  
      <!-- Experience Start -->
    ${expSection}
     ${eduSection}
      <!-- Job Experience End -->
  
  
  
      <!-- Blog Start -->
 ${projectSection}
      <!-- Blog End -->

      <div class="modal fade" id="videoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
         <div class="modal-content">
             <div class="modal-body">
                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                 </button>        
                 <!-- 16:9 aspect ratio -->
                 <div class="embed-responsive embed-responsive-16by9">
                     <iframe class="embed-responsive-item" src=${
                       filteredVideo1[0]?.video
                     } id="video"  allowscriptaccess="always"  ></iframe>
                 </div>
             </div>
         </div>
     </div>
  </div>
  <div class="modal fade" id="eduModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
     <div class="modal-content">
         <div class="modal-body">
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
             </button>        
             <!-- 16:9 aspect ratio -->
             <div class="embed-responsive embed-responsive-16by9">
                 <iframe class="embed-responsive-item" src=${
                   educationVideo[0]?.video
                 } id="video"  allowscriptaccess="always"  ></iframe>
             </div>
         </div>
     </div>
  </div>
  </div>
  <div class="modal fade" id="expModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
  <div class="modal-content">
     <div class="modal-body">
         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
             <span aria-hidden="true">&times;</span>
         </button>        
         <!-- 16:9 aspect ratio -->
         <div class="embed-responsive embed-responsive-16by9">
             <iframe class="embed-responsive-item" src=${
               expVideo[0]?.video
             } id="video"  allowscriptaccess="always"  ></iframe>
         </div>
     </div>
  </div>
  </div>
  </div>
  <div class="modal fade" id="proModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
  <div class="modal-content">
  <div class="modal-body">
     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
         <span aria-hidden="true">&times;</span>
     </button>        
     <!-- 16:9 aspect ratio -->
     <div class="embed-responsive embed-responsive-16by9">
         <iframe class="embed-responsive-item" src=${
           projectVideo[0]?.video
         } id="video"  allowscriptaccess="always"  ></iframe>
     </div>
  </div>
  </div>
  </div>
  </div>
  <div class="modal fade" id="skillModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
  <div class="modal-content">
  <div class="modal-body">
  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
     <span aria-hidden="true">&times;</span>
  </button>        
  <!-- 16:9 aspect ratio -->
  <div class="embed-responsive embed-responsive-16by9">
     <iframe class="embed-responsive-item" src=${
       skillVideo[0]?.video
     } id="video"  allowscriptaccess="always"  ></iframe>
  </div>
  </div>
  </div>
  </div>
  </div>
  
      <!-- Footer Start -->
      <div class="footer wow fadeIn" data-wow-delay="0.3s">
        <div class="container-fluid">
          <div class="container">
            <div class="footer-info">
              <h2>${res?.full_name}</h2>
              <h3>${res?.address}</h3>
              <div class="footer-menu">
                <p>${res?.mobile_no}</p>
                <p>${res?.email}</p>
              </div>
              <div class="footer-social">
               ${socialIcon}
              </div>
            </div>
          </div>
          <div class="container copyright">
            <p>
              &copy; <a href="https://www.jotcv.com">JotCV</a>, All Right Reserved 
            </p>
          </div>
        </div>
      </div>
      <!-- Footer End -->
          `;
      })
      .catch((error) => {
        console.error("API request error:", error);
      });
  } else {
    // Handle the case when 'profile' parameter is not present
    console.error("Profile parameter is missing from the URL.");
  }
  