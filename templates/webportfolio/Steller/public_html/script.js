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
          ? ` 
           <button type="button" class="btn-play" data-toggle="modal"
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
            <a class="social-item" href=${item?.link}><i class="ti-linkedin"></i></a>

      
            `;
          }
          if (item?.name === "Twitter") {
            socialIcon += `
            <a class="social-item" href=${item?.link}><i class="ti-twitter"></i></a>
            `;
          }
          if (item?.name === "GitHub") {
            socialIcon += `
            <a class="social-item" href=${item?.link}><i class="ti-github"></i></a>
            `;
          }
        });
  
        let expCard =
          res?.experiences?.length !== 0
            ? ` 
            <section id="exp" class="section">
            <div class="container text-center">
            <div class="d-flex">
            <h4>My Experiences</h4>
            ${expButton}
            </div>
                  <div class="row text-left">
                ${res?.experiences
                  ?.map((data) => {
                    return `
                    <div class="col-md-4">

                    <div class="card border mb-4">
                    
                        <div class="card-body">
                            <h5 class="card-title">${data?.designation}</h5>
                            <p class="text-primary mb-1">${data?.start_date} - ${
                              data?.is_current ? "Present" : data?.end_date
                            }</p>
                            <h6 class="mb-0">${data?.company_name}</h6>
                            <p>${data?.description}</p>
                          
                        </div>
                    </div>
                </div>
                 
                      
                        `;
                  })
                  .join("")} 
                 
                  
                </div>
            </div>
        </section>
            
           `:"";
  
        let eduCard =
          res?.eductaions?.length !== 0
            ? ` 
            <section id="edu" class="section">
            <div class="container text-center">
            <div class="d-flex">
            <h4 >My Educations</h4>
            ${eduButton}
            </div>
                <div class="row text-left">
                ${res?.eductaions
                  ?.map((data) => {
                    return `
                    <div class="col-md-4">
                    <div class="card border mb-4">
                    
                        <div class="card-body">
                            <h5 class="card-title">${data?.course}</h5>
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
                    </div>
                </div>
                
                     
                         `;
                  })
                  .join("")} 
                  
                  
                </div>
            </div>
        </section>`:""
            
           
  
        let skillCard =
          res?.skills?.length !== 0
            ? ` 
            <section class="section" id="skill">
            <div class="container text-center">
            <div class="d-flex mt-4">
            <h6 class="subtitle">Skills</h6>
            
            ${skillButton}
            </div>
                <h6 class="section-title mb-4">Why Choose me</h6>
    
                <div class="row text-left">
                ${res?.skills
                  ?.map((data) => {
                    return `
                    <div class="col-sm-6">
                    <h6 class="mb-3">${data?.skill}</h6>
                    <div class="progress">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: 97%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" ${
                          data?.type == 1 ? "33%" : data?.type == 2 ? "66%" : "100%"
                        }" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"><span>89%</span></div>
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
  
        let projectCard = res?.projects?.length
          ? `  
          <section id="pro" class="section">
          <div class="container text-center">
          <div class="col-lg-6 d-flex">
          <h4 >My Projects</h4>
          
          ${projectButton}
      </div>
  
  
  
              <div class="row text-left">
              ${res?.projects
                ?.map((data) => {
                  return `
                  <div class="col-md-4">
                  <div class="card border mb-4">
                  
                      <div class="card-body">
                          <h5 class="card-title">${data?.title}</h5>
                          <div class="post-details">
                          <a class="border-bottom border-primary text-decoration-none"href=${
                            data?.link ? data?.link : "#"
                          }>Link</a> 
                             
                          </div>
                          <p>${data?.description}</p>
                        
                      </div>
                  </div>
              </div>
              
                   
                      `;
                })
                ?.join("")}
                
                
              </div>
          </div>
      </section>
          <div class="container-fluid bg-light my-5 py-6" id="project">
          <div class="container">
              <div class="row g-5 mb-5 wow fadeInUp" data-wow-delay="0.1s">
               
                 
              </div>
              <div class="row g-4">
            
              
             
                
              </div>
          </div>
      </div>
    `
          :"";
  
        const dynamicContent = document.getElementById("home");
        dynamicContent.innerHTML = `    <!-- Page navigation -->
        <nav class="navbar navbar-expand-lg navbar-light fixed-top" data-spy="affix" data-offset-top="0">
            <div class="container">
                <a class="navbar-brand" href="#">${res?.full_name}</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
    
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto align-items-center">
                        <li class="nav-item">
                            <a class="nav-link" href="#home">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#about">About</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#skill">Skills</a>
                    </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#edu">Education</a>
                        </li>                   
                        <li class="nav-item">
                            <a class="nav-link" href="#exp">Experiences</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#pro">Projects</a>
                    </li>

                    
                    </ul>
                </div>
            </div>          
        </nav>
        <!-- End of page navibation -->
    
        <!-- Page Header -->
        <header class="header" id="home">
            <div class="container">
                <div class="infos">
                    <h6 class="subtitle">hello,I'm</h6>
                    <h6 class="title">${res?.full_name}</h6>
                    <p>${res?.position}</p>
    
                       
    
                    <div class="socials mt-4">
                     ${socialIcon}
                    </div>
                </div>              
                <div class="img-holder">
                    <img src=${res?.profile_picture} alt="" style="widht:"70%"">
                </div>      
            </div>  
    
            <!-- Header-widget -->
           
        </header>
        <!-- End of Page Header -->
        
        <!-- About section -->
        <section id="about" class="section mt-3">
            <div class="container mt-5">
                <div class="row text-center text-md-left">
                    <div class="col-md-3">
                        <img src=${res?.profile_picture} alt="" class="img-thumbnail mb-4">
                    </div>
                    <div class="pl-md-4 col-md-9">
                    <div class="d-flex">
                    <h6 class="title mt-3">${res?.full_name}</h6>
                    ${profileButton}
                    </div>
                        <p class="subtitle">${res?.position}</p>
                        <p>${res?.summary}</p>
                      
                                           
                    </div>
                </div>
            </div>
        </section>
    
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
    
        <!-- Skills section -->
       ${skillCard}
        <!-- End of Skills sections -->
    
     ${eduCard}
       ${expCard}
        <!-- Blog Section -->
${projectCard}
        <!-- Page Footer -->
        <footer class="page-footer">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-sm-6">
                        <p>Copyright <script>document.write(new Date().getFullYear())</script> &copy; <a href="https://www.jotcv.com/" target="_blank">JotCV</a></p>
                    </div>
                    <div class="col-sm-6">
                        <div class="socials">
                          ${socialIcon}
                        </div>
                    </div>
                </div>
            </div>
        </footer> 
        <!-- End of page footer --> `;
      })
      .catch((error) => {
        console.error("API request error:", error);
      });
  } else {
    // Handle the case when 'profile' parameter is not present
    console.error("Profile parameter is missing from the URL.");
  }
  