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
          ? ` <div class="vg-page page-service" id="project">
        <div class="container">
        <div class="d-flex justify-content-center">
        <h1 class="fw-normal text-center wow fadeInUp mt-3">Projects</h1>
        ${projectButton}
        </div>
          <div class="row mt-5">
          ${res?.projects
            ?.map((data) => {
              return `
                <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="card card-service wow fadeInUp">
                  <div class="icon">
                    <span class="ti-desktop"></span>
                  </div>
                  <div class="caption">
                    <h4 class="fg-theme">${data?.title}
                    
                    </h4>
                    <a class="light" href=${
                      data?.link ? data?.link : "#"
                    }>Link</a>

                    <p>${data?.description}</p>
                  </div>
                </div>
              </div>
                
          
                `;
            })
            ?.join("")}
           
            
        </div>
          
         
            
          </div>
        </div>
      </div>`
          : "";

      let expSection =
        res?.experiences?.length !== 0
          ? `   <div class="col-md-6 wow fadeInRight" data-wow-delay="200ms">
      <div class="d-flex justify-content-start">
      <h2 class="fw-normal mt-2">Experience</h2>
      
      ${expButton}
      </div>
      <ul class="timeline mt-4 pr-md-5">
      ${res?.experiences
        ?.map((data) => {
          return `
          <li>
          <div class="title">
          ${data?.start_date} - ${data?.is_current ? "Present" : data?.end_date}
          
          </div>
          <div class="details">
            <h5>${data?.designation}</h5>
            <small class="fg-theme">${data?.company_name}</small>
            <p>${data?.description} </p>

          </div>
        </li>
            `;
        })
        .join("")}
      
      
       
      </ul>
    </div>`
          : "";

      let eduSection =
        res?.eductaions?.length !== 0
          ? `<div class="col-md-6 wow fadeInRight">
    <div class="d-flex justify-content-start">
    <h2 class="fw-normal mt-2">Education</h2>
    ${eduButton}
    </div>
    <ul class="timeline mt-4 pr-md-5">
    ${res?.eductaions
      ?.map((data) => {
        return `  
        <li>
        <div class="title"><p>${data?.start_date} - ${
          data?.is_current ? "Currently Studying" : data?.end_date
        }</p></div>
        <div class="details">
          <h5>${data?.course}</h5>
          <small class="fg-theme">${data?.university}</small>
          <p>${data?.description} </p>
        </div>
      </li>
      `;
      })
      ?.join("")}
    
    </ul>
  </div>`
          : "";

      let skillSection =
        res?.skills?.length !== 0
          ? `  <div class="container py-5" id="skill">
  <div class="d-flex justify-content-center">
   <h1 class="text-center fw-normal wow fadeIn">My Skills</h1>

   ${skillButton}
  </div>
  <div class="row py-3">
  ${res?.skills
    ?.map((data) => {
      return `

      <div class="col-md-6">
      <div class="px-lg-3">
        <div class="progress-wrapper wow fadeInUp">
          <span class="caption">${data?.skill}</span>
          <div class="progress">
            <div class="progress-bar" role="progressbar"    style="width: ${
              data?.type == 1 ? "33%" : data?.type == 2 ? "66%" : "100%"
            }" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      
     
      
      </div>
    </div>
   

            `;
    })
    ?.join("")}
  
 
  </div>
</div>`
          : "";

      let resumeSection =
        res?.eductaions?.length !== 0 || res?.experiences?.length !== 0
          ? ` <div class="container pt-5" id="portfolio">
<div class="row">
  ${eduSection}
${expSection}
</div>
</div>`
          : "";
      const dynamicContent = document.getElementById("dynamic-content");
      dynamicContent.innerHTML = `     
        <div class="vg-page page-home" id="home" style="background-image: url(https://api.jotcv.com/static/webportfolio/Creative/assets/img/bg_image_1.jpg)">
        <!-- Navbar -->
        <div class="navbar navbar-expand-lg navbar-dark sticky" data-offset="500">
          <div class="container">
            <a href="" class="navbar-brand">${res?.full_name}</a>
            <button class="navbar-toggler" data-toggle="collapse" data-target="#main-navbar" aria-expanded="true">
              <span class="ti-menu"></span>
            </button>
            <div class="collapse navbar-collapse" id="main-navbar">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                  <a href="#home" class="nav-link" data-animate="scrolling">Home</a>
                </li>
                <li class="nav-item">
                  <a href="#about" class="nav-link" data-animate="scrolling">About</a>
                </li>
                <li class="nav-item">
                  <a href="#portfolio" class="nav-link" data-animate="scrolling">Resume</a>
                </li>
                <li class="nav-item">
                <a href="#skill" class="nav-link" data-animate="scrolling">Skill</a>
              </li>
                <li class="nav-item">
                  <a href="#project" class="nav-link" data-animate="scrolling">Project</a>
                </li>
              
              </ul>
            </div>
          </div>
        </div> <!-- End Navbar -->
        <!-- Caption header -->
        <div class="caption-header text-center wow zoomInDown">
          <h5 class="fw-normal">Welcome</h5>

          <h1 class="fw-light mb-4">I'm <b class="fg-theme">${
            res?.full_name
          }</h1>
          <div class="badge">${res?.position}</div>
        </div> <!-- End Caption header -->
        <div class="floating-button"><span class="ti-mouse"></span></div>
      </div>
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
      <!-- Video Modal End -->
      <div class="vg-page page-about" id="about">
        <div class="container py-5">
          <div class="row">
            <div class="col-lg-4 py-3">
              <div class="img-place wow fadeInUp">
                <img src=${res?.profile_picture} alt="">
              </div>
            </div>
            <div class="col-lg-6 offset-lg-1 wow fadeInRight">
            <div class="d-flex">
            <h1 class="fw-light me-3">${res?.full_name}</h1>
            ${profileButton}
            </div>
              <h5 class="fg-theme mb-3">${res?.position}</h5>
              <p class="text-muted">${res?.summary}</p>
             
            </div>
          </div>
        </div>
      ${skillSection}
       ${resumeSection}
      </div>
      
     ${projectSection}
      <div class="vg-footer">
        <h1 class="text-center">Virtual Folio</h1>
        <div class="container">
          <div class="row">
            <div class="col-lg-4 py-3">
              <div class="footer-info">
                <p>Where to find me</p>
                <hr class="divider">
                <p class="fs-large fg-white">${res?.address}</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3 py-3">
              <div class="float-lg-right">
                <p>Follow me</p>
                <hr class="divider">
                <ul class="list-unstyled">
                ${res?.social_links
                  ?.map((item) => {
                    return `

<li><a href=${item?.link}>${item?.name}</a></li>

`;
                  })
                  .join("")}
                 
                </ul>
              </div>
            </div>
            <div class="col-md-6 col-lg-3 py-3">
              <div class="float-lg-right">
                <p>Contact me</p>
                <hr class="divider">
                <ul class="list-unstyled">
                  <li>${res?.email}</li>
                  
                  
                </ul>
              </div>
            </div>
          </div>  
        </div>
      </div> 
              `;
    })
    .catch((error) => {
      console.error("API request error:", error);
    });
} else {
  // Handle the case when 'profile' parameter is not present
  console.error("Profile parameter is missing from the URL.");
}
