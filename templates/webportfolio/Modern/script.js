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
// const profileId = getQueryParam("profile");

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

      let projectSection =
        res?.projects?.length !== 0
          ? `<section class="feature_area p_120" id="project">
<div class="container">
    <div class="main_title">
    <div class="d-flex justify-content-center">
    <h2 class="me-3 mt-2">Projects</h2>
    ${projectButton}
    </div>
    </div>
    <div class="feature_inner row">
    ${res?.projects
      ?.map((data) => {
        return `
            <div class="col-lg-4 col-md-4 col-sm-6 brand manipul design print" >
            <div class="h_gallery_item">
                <div class="g_img_item">
                    <div class="feature_item">

                    
                        <h4>${data?.title}</h4>
                        <p>${data?.description}</p>
                    </div>
                    <a class="light" href=${
                      data?.link ? data?.link : "#"
                    }>Link</a>
                </div>
            
            </div>
        </div>
            `;
      })
      ?.join("")}
       
        
    </div>
</div>
</section>`
          : "";

      const skillSection =
        res?.skills?.length !== 0
          ? `   <section class="feature_area p_120" id="contact">
<div class="container">
    <div class="welcome_text">
    <div class="d-flex justify-content-center">
    <h2 class="me-3 mt-2">Skills</h2>
    ${skillButton}
    </div>
        
    </div>
    <div class="row welcome_inner mt-4">
    ${res?.skills
      ?.map((data) => {
        return `
          <div class="col-lg-6 mt-3">
            
          <div class="tools_expert">
              <div class="skill_main">
                  <div class="skill_item">
                      <h4>${data?.skill}
                      <div class="progress_br">
                          <div class="progress">
                              <div class="progress-bar" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"
                              style="width: ${
                                data?.type == 1
                                  ? "33%"
                                  : data?.type == 2
                                  ? "66%"
                                  : "100%"
                              }"
                              ></div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

              `;
      })
      ?.join("")}
      
    </div>
</div>
</section>`
          : "";

      let expSection =
        res?.experiences?.length !== 0
          ? `  <div class="col-lg-6 col-12 ">
      <div class="d-flex">
      <h2 class="mb-4">Experiences</h2>

${expButton}
</div>
${res?.experiences
  ?.map((data) => {
    return `
    <div class="timeline">
    <div class="timeline-wrapper">
         <div class="timeline-yr">
              <span>${data?.start_date}</span>
         </div>
         <div class="timeline-info">
              <h3><span>${data?.designation}</span><small>${data?.company_name}</small></h3>
              <p>${data?.description}</p>
         </div>
    </div>

      `;
  })
  .join("")}  
  </div>
</div>`
          : "";

      let eduSection =
        res?.eductaions?.length !== 0
          ? `   <div class="col-lg-6 col-12">
<div class="d-flex">
<h2 class="mb-4 mobile-mt-2">Educations</h2>
${eduButton}
</div>

  <div class="timeline">
  ${res?.eductaions
    ?.map((data) => {
      return `
      <div class="timeline-wrapper">
      <div class="timeline-yr">
           <span>${data?.start_date}</span>
      </div>
      <div class="timeline-info">
           <h3><span>${data?.course}</span><small>${data?.university}</small></h3>
           <p>${data?.description}</p>
      </div>
 </div>

         `;
    })
    .join("")}
  


  </div>
</div>`
          : "";
      const dynamicContent = document.getElementById("dynamic-content");
      dynamicContent.innerHTML = `  
            <!-- MENU -->
            <nav class="navbar navbar-expand-sm navbar-light">
            <div class="container">
                <a class="navbar-brand" href="#"><i class='uil uil-user'></i>${
                  res?.full_name
                }</a>
    
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    <span class="navbar-toggler-icon"></span>
                    <span class="navbar-toggler-icon"></span>
                </button>
    
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item">
                            <a href="#about" class="nav-link"><span data-hover="About">About</span></a>
                        </li>
                        <li class="nav-item">
                            <a href="#project" class="nav-link"><span data-hover="Projects">Projects</span></a>
                        </li>
                        <li class="nav-item">
                        <a href="#contact" class="nav-link"><span data-hover="Skills">Skills</span></a>
                    </li>
                        <li class="nav-item">
                            <a href="#resume" class="nav-link"><span data-hover="Resume">Resume</span></a>
                        </li>
                      
                    </ul>
                </div>
            </div>
        </nav>
    
        <!-- ABOUT -->
        <section class="about full-screen d-lg-flex justify-content-center align-items-center" id="about">
            <div class="container">
                <div class="row">
                    
                    <div class="col-lg-7 col-md-12 col-12 d-flex align-items-center">
                        <div class="about-text">
                            <small class="small-text">Welcome to <span class="mobile-block">my portfolio website!</span></small>
                            <h1 class="animated animated-text">
                                <span class="mr-2">Hey folks, I'm</span>
                                    <div class="animated-info">
                                        <span class="animated-item">${
                                          res?.full_name
                                        }</span>
                                        <span class="animated-item">${
                                          res?.position
                                        }</span>
                                      
                                    </div>
                            </h1>
    
                            <p class="mt-4">${res?.summary}</p>
                            
                            <div class="custom-btn-group mt-4">
                             ${profileButton}
                            </div>
                        </div>
                    </div>
    
                    <div class="col-lg-5 col-md-12 col-12">
                        <div class="about-image svg">
                            <img src=${
                              res?.profile_picture
                                ? res?.profile_picture
                                : "images/undraw/undraw_software_engineer_lvl5.svg"
                            } class="img-fluid" alt="svg image">
                        </div>
                    </div>
    
                </div>
            </div>
        </section>
    
        <!-- PROJECTS -->
       ${projectSection}
       ${skillSection}

    
        <!-- FEATURES -->
        <section class="resume py-5 d-lg-flex justify-content-center align-items-center" id="resume">
            <div class="container">
                <div class="row">
    
                  ${expSection}
    
                 ${eduSection}
                    
                </div>
            </div>
        </section>
    
        <!-- Video Modal Start -->
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
      
    
        <!-- FOOTER -->
         <footer class="footer py-5">
              <div class="container">
                   <div class="row">
    
                        <div class="col-lg-12 col-12">                                
                            <p class="copyright-text text-center">Copyright &copy; JotCV . All rights reserved</p>
                          
                        </div>
                        
                   </div>
              </div>
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
