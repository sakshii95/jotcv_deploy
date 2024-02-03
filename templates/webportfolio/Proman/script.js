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

      let socialIcon = "";
      res?.social_links.forEach((item) => {
        if (item?.name === "LinkedIn") {
          socialIcon += `
            <li class="social-item"><a  class="social-link" href=${item?.link}><i class="ti-linkedin"></i></a></li>
          `;
        }
        if (item?.name === "Twitter") {
          socialIcon += `
            <li class="social-item"><a  class="social-link" href=${item?.link}><i class="ti-twitter"></i></a></li>
          `;
        }
        if (item?.name === "GitHub") {
          socialIcon += `
            <li class="social-item"><a  class="social-link" href=${item?.link}><i class="ti-github"></i></a></li>
          `;
        }
      });

      let expCard =
        res?.experiences?.length !== 0
          ? `  ${res?.experiences
            ?.map((data) => {
              return `
              <div class="col-sm-6">
              <h5>${data?.designation}</h5>
              <hr class="text-primary my-2">
              <p class="text-primary mb-1">${data?.start_date} - ${
                data?.is_current ? "Present" : data?.end_date
              }</p>
              <h6 class="mb-0">${data?.company_name}</h6>
          </div>
                
                  `;
            })
            .join("")}  `:"";

      let eduCard =
        res?.eductaions?.length !== 0
          ? `  ${res?.eductaions
            ?.map((data) => {
              return `
              <div class="col-sm-6">
              <h5>${data?.course}</h5>
              <hr class="text-primary my-2">
              <p class="text-primary mb-1">${
                data?.start_date
              } - ${
              data?.is_current
                ? "Currently Studying"
                : data?.end_date
            }</p>
              <h6 class="mb-0">${
                data?.university
              }</h6>
          </div>
               
                   `;
            })
            .join("")} `:"";

      let skillCard =
        res?.skills?.length !== 0
          ? ` 
            <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            <h1 class="display-5 mb-5">Skills & Experience</h1>
            <h3 class="mb-4">My Skills</h3>
            <div class="row align-items-center">
            ${res?.skills
              ?.map((data) => {
                return `
                <div class="col-md-6">
                <div class="skill mb-4">
                  <div class="d-flex justify-content-between">
                   <h6 class="font-weight-bold">${data?.skill}</h6>
                  
                  </div>
                <div class="progress">
                   <div class="progress-bar bg-primary" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100" style="width: 97%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" ${
                     data?.type == 1 ? "33%" : data?.type == 2 ? "66%" : "100%"
                   }"></div>
                 </div>
                </div>
               </div>
                 
  
                      `;
              })
              ?.join("")}
              
            
            </div>
        </div>


      `
          : "";

      let projectCard = res?.projects?.length
        ? `  
        <div class="container-fluid bg-light my-5 py-6" id="service">
        <div class="container">
            <div class="row g-5 mb-5 wow fadeInUp" data-wow-delay="0.1s">
                <div class="col-lg-6">
                    <h1 class="display-5 mb-0">My Projects</h1>
                </div>
               
            </div>
            <div class="row g-4">
          
            
            ${res?.projects
              ?.map((data) => {
                return `
                <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                <div class="service-item d-flex flex-column flex-sm-row bg-white rounded h-100 p-4 p-lg-5">
                    <div class="bg-icon flex-shrink-0 mb-3">
                        <i class="fa fa-laptop-code fa-2x text-dark"></i>
                    </div>
                    <div class="ms-sm-4">
                        <h4 class="mb-3">${data?.title}</h4>
                        <a class="border-bottom border-primary text-decoration-none"href=${
                          data?.link ? data?.link : "#"
                        }>Link</a>
                        <br/>
                        <span>${data?.description}</span>
                    
                    </div>
                </div>
            </div>
                 
                    `;
              })
              ?.join("")}
              
            </div>
        </div>
    </div>
  `
        :"";

      const dynamicContent = document.getElementById("dynamic");
      dynamicContent.innerHTML = `  
   


    <!-- Navbar Start -->
    <nav class="navbar navbar-expand-lg bg-white navbar-light fixed-top shadow py-lg-0 px-4 px-lg-5 wow fadeIn" data-wow-delay="0.1s">
        <a href="index.html" class="navbar-brand d-block d-lg-none">
            <h1 class="text-primary fw-bold m-0">${res?.full_name}</h1>
        </a>
        <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-between py-4 py-lg-0" id="navbarCollapse">
            <div class="navbar-nav ms-auto py-0">
                <a href="#home" class="nav-item nav-link active">Home</a>
                <a href="#about" class="nav-item nav-link">About</a>
                <a href="#skill" class="nav-item nav-link">Skills</a>
                
            </div>
            <a href="index.html" class="navbar-brand bg-secondary py-3 px-4 mx-3 d-none d-lg-block">
                <h1 class="text-primary fw-bold m-0">ProMan</h1>
            </a>
            <div class="navbar-nav me-auto py-0">
                <a href="#skill" class="nav-item nav-link">Experience</a>
                <a href="#project" class="nav-item nav-link">Projects</a>
             
            </div>
        </div>
    </nav>
    <!-- Navbar End -->


    <!-- Header Start -->
    <div class="container-fluid bg-light my-6 mt-0" id="home">
        <div class="container">
            <div class="row g-5 align-items-center">
                <div class="col-lg-6 py-6 pb-0 pt-lg-0">
                    <h3 class="text-primary mb-3">I'm</h3>
                    <h1 class="display-3 mb-3">${res?.full_name}</h1>
                    <h2 class="typed-text-output d-inline">${res?.position}</h2>
                    <div class="typed-text ">${res?.summary}</div>
                    <div class="d-flex align-items-center pt-5">
                        
                        <button type="button" class="btn-play" data-bs-toggle="modal"
                            data-src="https://www.youtube.com/embed/DWRcNpR6Kdc" data-bs-target="#videoModal">
                            <span></span>
                        </button>
                        <h5 class="ms-4 mb-0 d-none d-sm-block">Play Video</h5>
                    </div>
                </div>
                <div class="col-lg-6">
                    <img class="img-fluid" src=${res?.profile_picture} alt="">
                </div>
            </div>
        </div>
    </div>
    <!-- Header End -->


    <!-- Video Modal Start -->
    <div class="modal modal-video fade" id="videoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content rounded-0">
                <div class="modal-header">
                    <h3 class="modal-title" id="exampleModalLabel">Youtube Video</h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- 16:9 aspect ratio -->
                    <div class="ratio ratio-16x9">
                        <iframe class="embed-responsive-item" src="" id="video" allowfullscreen allowscriptaccess="always"
                             ></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Video Modal End -->


  


    <!-- Expertise Start -->
    <div class="container-xxl py-6 pb-5" id="skill">
        <div class="container">
            <div class="row g-5">
              ${skillCard}
                <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                    <ul class="nav nav-pills rounded border border-2 border-primary mb-5">
                        <li class="nav-item w-50">
                            <button class="nav-link w-100 py-3 fs-5 active" data-bs-toggle="pill" href="#tab-1">Experience</button>
                        </li>
                        <li class="nav-item w-50">
                            <button class="nav-link w-100 py-3 fs-5" data-bs-toggle="pill" href="#tab-2">Education</button>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div id="tab-1" class="tab-pane fade show p-0 active">
                            <div class="row gy-5 gx-4">
                               ${expCard}
                            </div>
                        </div>
                        <div id="tab-2" class="tab-pane fade show p-0">
                            <div class="row gy-5 gx-4">
                              ${eduCard}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Expertise End -->


    <!-- Service Start -->
   ${projectCard}
    <!-- Service End -->


 


  


 


    


  


    <!-- Copyright Start -->
    <div class="container-fluid bg-dark text-white py-4">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        &copy; <a class="border-bottom text-secondary" href="#">ResumeBuid</a>, All Right Reserved.
                    </div>
                 
                </div>
            </div>
        </div>
    </div>
    <!-- Copyright End -->


    <!-- Back to Top -->
            `;
    })
    .catch((error) => {
      console.error("API request error:", error);
    });
} else {
  // Handle the case when 'profile' parameter is not present
  console.error("Profile parameter is missing from the URL.");
}
