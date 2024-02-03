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
          ? `    <div class="col-md-6 col-lg-4">
<div class="card">
   <div class="card-header">
        <div class="mt-2">
        <div class="d-flex justify-content-between">
        <h4>Experience</h4>
     ${expButton}
        </div>
       
  
            <span class="line"></span>  
        </div>
    </div>
    <div class="card-body">
    ${res?.experiences
      ?.map((data) => {
        return `
          <h6 class="title text-danger">${data?.company_name}</h6>
          <h6 class="title text-danger">${data?.start_date} - ${
          data?.is_current ? "Present" : data?.end_date
        }</h6>
          <P>${data?.designation}</P>
          <P class="subtitle">${data?.description}</P>
          <hr>
            `;
      })
      .join("")}    
  
    </div>
</div>
</div>
`
          : `  <div class="col-md-6 col-lg-4">
          <div class="card">
             <div class="card-header">
                  <div class="mt-2">
                  <div class="d-flex justify-content-between">
                  <h4>Experience</h4>
               
                  </div>
                 
            
                      <span class="line"></span>  
                  </div>
              </div>
              <div class="card-body">
              <h6 class="title text-danger">Your Company</h6>
              <h6 class="title text-danger">Start Date-End Date</h6>
              <P>Your Position</P>
              <P class="subtitle">Description Here</P>
              <hr>
              </div>
          </div>
          </div>`;

      let eduCard =
        res?.eductaions?.length !== 0
          ? `   <div class="col-md-6 col-lg-4">
                        <div class="card">
                           <div class="card-header">
                                <div class="mt-2">
                                    <div class="d-flex justify-content-between">
                                    <h4>Education</h4>
                                    
                              ${eduButton}
                                    </div>
                                    <span class="line"></span>  
                                </div>
                            </div>
                            <div class="card-body">
                            ${res?.eductaions
                              ?.map((data) => {
                                return `
                                  <h6 class="title text-danger">${
                                    data?.university
                                  }</h6>

                                  <h6 class="title text-danger">${
                                    data?.start_date
                                  } - ${
                                  data?.is_current
                                    ? "Currently Studying"
                                    : data?.end_date
                                }</h6>
                                  <P>${data?.course}</P>
                                  <P class="subtitle">${data?.description}</P>
                                  <hr>
                                     `;
                              })
                              .join("")}
                         
                            </div>
                        </div>
                    </div>`
          : ` <div class="col-md-6 col-lg-4">
          <div class="card">
             <div class="card-header">
                  <div class="mt-2">
                      <div class="d-flex justify-content-between">
                      <h4>Education</h4>
                      </div>
                      <span class="line"></span>  
                  </div>
              </div>
              <div class="card-body">
              <h6 class="title text-danger">Your University</h6>

              <h6 class="title text-danger">Start Date-End Date</h6>
              <P>Your Course</P>
              <P class="subtitle">Description Here</P>
              <hr>
           
              </div>
          </div>
      </div>`;

      let skillCard =
        res?.skills?.length !== 0
          ? ` 
            <div class="col-lg-4">
          <div class="card">
             <div class="card-header">
                  <div class="pull-left">
                      <div class="d-flex justify-content-between">
                      <h4 class="mt-2">Skills</h4>
                    ${skillButton}
                      </div>
                      <span class="line"></span>  
                  </div>
              </div>
              <div class="card-body pb-2">
              ${res?.skills
                ?.map((data) => {
                  return `
                    <h6>${data?.skill}</h6>
                    <div class="progress mb-3">
                        <div class="progress-bar bg-danger" role="progressbar" style="width: 97%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" ${
                          data?.type == 1
                            ? "33%"
                            : data?.type == 2
                            ? "66%"
                            : "100%"
                        }"></div>
                    </div>
    
                        `;
                })
                ?.join("")}
               
              
              </div>
          </div>
          <!-- <div class="card">
             <div class="card-header">
                  <div class="pull-left">
                      <h4 class="mt-2">Languages</h4>
                      <span class="line"></span>  
                  </div>
              </div>
              <div class="card-body pb-2">
                 <h6>English</h6>
                  <div class="progress mb-3">
                      <div class="progress-bar bg-danger" role="progressbar" style="width: 80%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <h6>French</h6>
                  <div class="progress mb-3">
                      <div class="progress-bar bg-danger" role="progressbar" style="width: 45%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <h6>Spanish</h6>
                  <div class="progress mb-3">
                      <div class="progress-bar bg-danger" role="progressbar" style="width: 67%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
              </div>
          </div> -->
      </div>`
          : ` 
          <div class="col-lg-4">
        <div class="card">
           <div class="card-header">
                <div class="pull-left">
                    <div class="d-flex justify-content-between">
                    <h4 class="mt-2">Skills</h4>
                  
                    </div>
                    <span class="line"></span>  
                </div>
            </div>
            <div class="card-body pb-2">
            <h6>Skill</h6>
                  <div class="progress mb-3">
                      <div class="progress-bar bg-danger" role="progressbar" style="width: 97%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" ${"66%"}"></div>
                  </div>
             
            
            </div>
        </div>
       
    </div>`;

      let projectCard = res?.projects?.length
        ? `  <div class="row">
    ${res?.projects
      ?.map((data) => {
        return `
            <div class="col-md-4 ">
            <div class="card mb-5">
           
              <div class="card-body px-4 py-3">
                  <h5 class="mb-3 card-title text-dark">${data?.title}</h5>
                <a class="border-bottom border-primary text-decoration-none"href=${
                  data?.link ? data?.link : "#"
                }>Link</a>
                  
                  <P class="subtitle">${data?.description}</P>
              </div>
          </div>
          </div>
            `;
      })
      ?.join("")}

</div>`
        : ` <div class="row">
<div class="col-md-4 ">
  <div class="card mb-5">
 
    <div class="card-body px-4 py-3">
        <h5 class="mb-3 card-title text-dark">Project Name</h5>
      <a class="border-bottom border-primary text-decoration-none">Project Link</a>
        
        <P class="subtitle">Project Description</P>
    </div>
</div>
</div>

</div>`;

      const dynamicContent = document.getElementById("dynamic");
      dynamicContent.innerHTML = `  
            <header class="header">
            <div class="container">
                <ul class="social-icons pt-3">
${socialIcon}
                </ul>  
                <div class="header-content d-flex justify-content-between">
                <div>
                <h4 class="header-subtitle" >Hello, I am</h4>
                <h1 class="header-title">${
                  res?.full_name ? res?.full_name : "John Doe"
                }</h1>
                <h6 class="header-mono" >${
                  res?.position ? res?.position : "Software Developer"
                }</h6>
                </div>
                <img src=${res?.profile_picture?res?.profile_picture:"../public_html/assets/imgs/avatar.jpg"} style="width: 250px"></img>
                  
                    
                </div>
            </div>
        </header>
        <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-white" data-spy="affix" data-offset-top="510">
            <div class="container">
                <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse mt-sm-20 navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a href="#home" class="nav-link">Home</a>
                        </li>
                        <li class="nav-item">
                            <a href="#about" class="nav-link">About</a>
                        </li>
                      
                    </ul>
                    <ul class="navbar-nav brand">
                        
                        <li class="nav-item">
                            <h5 class="brand-title">${
                              res?.full_name ? res?.full_name : "John Doe"
                            }</h5>
                            <div class="brand-subtitle">${
                              res?.position
                                ? res?.position
                                : "Software Developer"
                            }</div>
                        </li>
                    </ul>
                    <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                    <a href="#resume" class="nav-link">Resume</a>
                </li>
                        <li class="nav-item">
                            <a href="#service" class="nav-link">Project</a>
                        </li>
                      
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container-fluid">
            <div id="about" class="row about-section">
                <div class="col-lg-4 about-card">
                    <h3 class="font-weight-light">Who am I ?</h3>
                    <span class="line mb-5"></span>
                    <h5 class="mb-3">A ${res?.position} Located In ${
        res?.address
      }</h5>
                    <p class="mt-20">${res?.summary}</p>
            
                </div>
                <div class="col-lg-4 about-card">
                <div class="d-flex justify-content-between">
                <h3 class="font-weight-light">Personal Info</h3>
                
              ${profileButton}
                </div>
             
                    <span class="line mb-5"></span>
                    <ul class="mt40 info list-unstyled">
                        
                        <li><span>Email</span> : ${
                          res?.email ? res?.email : "johndoe@gmail.com"
                        }</li>
                        <li><span>Phone</span> : ${
                          res?.mobile_no ? res?.mobile_no : "+1234567890"
                        }</li>
                        <li><span>Address</span> : ${
                          res?.address ? res?.address : "XYZ Street"
                        }</li>
                    </ul>
                  
                </div>
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
                <div class="col-lg-4 about-card">
                <ul class="social-icons pt-3">
${socialIcon}
            </ul> 
                  
                  
                </div>
            </div>
        </div>
    
        <!--Resume Section-->
        <section class="section" id="resume">
            <div class="container">
                <h2 class="mb-5"><span class="text-danger">My</span> Resume</h2>
                <div class="row">
                ${expCard}
                 ${eduCard}
                 ${skillCard}
                </div>
            </div>
        </section>
    
       
    
        <section class="section" id="service">
            <div class="container">
            <div class="d-flex justify-content-between">
            <h2 class="mb-5 pb-4"><span class="text-danger">My</span>Projects</h2>
         ${projectButton}
           
            </div>
              ${projectCard}
                  
                  
              
                 
                </div>
            </div>
        </section>
    
        <footer class="footer py-3">
            <div class="container">
            <p class="m-0">&copy; <a class="text-white font-weight-bold" href="#"></a>. All Rights Reserved. Designed by <a class="text-white font-weight-bold" href="https://www.jotcv.com/">JotCV</a>
  
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
