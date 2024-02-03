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
                <section class="resume-section p-3 p-lg-5 d-flex flex-column" id="experience">
                  <div class="my-auto">
                  <div class="d-flex align-items-center justify-content-start mb-5 ">
                  <h2 >Experience</h2>
                  ${expButton}
                  </div>
                    ${res?.experiences
                      ?.map((data) => {
                        return `
                        <div class="resume-item d-flex flex-column flex-md-row mb-5">
                        <div class="resume-content mr-auto">
                          <h3 class="mb-0">${data?.designation}</h3>
                          <div class="subheading mb-3">${
                            data?.company_name
                          }</div>
                          <p>${data?.description}</p>
                        </div>
                        <div class="resume-date text-md-right">
                          <span class="text-primary">${data?.start_date} - ${
                          data?.is_current ? "Present" : data?.end_date
                        }</span>
                        </div>
                      </div>
                          `;
                      })
                      .join("")}      
          
                  </div>
          
                </section>`
          : "";

      let eduSection = res?.eductaions?.length!==0 ?  `    <section class="resume-section p-3 p-lg-5 d-flex flex-column" id="education">
                <div class="my-auto">
                  <div class="d-flex align-items-center justify-content-start mb-5 ">
                  <h2 >Education</h2>
                
                  ${eduButton}
                  </div>
                  ${res?.eductaions
                    ?.map((data) => {
                      return `
                      <div class="resume-item d-flex flex-column flex-md-row mb-5">
                    <div class="resume-content mr-auto">
                      <h3 class="mb-0">${data?.university}</h3>
                      <div class="subheading mb-3">${data?.course}</div>
                      <div>${data?.description}</div>
                    
                    </div>
                    <div class="resume-date text-md-right">
                      <span class="text-primary">${data?.start_date} - ${
                        data?.is_current ? "Currently Studying" : data?.end_date
                      }</span>
                    </div>
                  </div>
                         `;
                    })
                    .join("")}
                 
        
                 
        
                </div>
              </section>`:""

              let skillSection= res?.skills?.length!==0? `   <section class="resume-section p-3 p-lg-5 d-flex flex-column" id="skills">
              <div class="my-auto">
                <div class="d-flex align-items-center justify-content-start mb-5 ">
                <h2 >Skills</h2>
                ${skillButton}
                </div>
                <ul class="list-inline list-icons">
                ${res?.skills
                  ?.map((data) => {
                    return `
                    <li class="list-inline-item">
                    ${data?.skill}
                  </li>
    
                        `;
                  })
                  ?.join("")}
                 
                </ul>
      
             
            </section>`:""

            let projectSection= res?.projects?.length!==0? `         <section class="resume-section p-3 p-lg-5 d-flex flex-column" id="projects">
            <div class="my-auto">
              <div class="d-flex align-items-center justify-content-start mb-5 ">
              <h2>Projects</h2>    
             ${projectButton}
              </div>
              ${res?.projects
                ?.map((data) => {
                  return `
                  <div class="resume-item d-flex flex-column flex-md-row mb-5">
                <div class="resume-content mr-auto">
                  <h3 class="mb-0">${data?.title}</h3>
                  <a class="subheading mb-3" href=${data?.link}>${
                    data?.link
                  }<a>
                  <div>${data?.description}</div>
                
                </div>
                <div class="resume-date text-md-right">
                  <span class="text-primary">${data?.start_date} - ${
                    data?.is_current ? "Currently Studying" : data?.end_date
                  }</span>
                </div>
              </div>
                     `;
                })
                .join("")}
             
    
             
    
            </div>
          </section>`:""

          let socialIcon = "";
          res?.social_links.forEach((item) => {
            if (item?.name === "LinkedIn") {
              socialIcon += `
              <li class="list-inline-item">
              <a href=${item?.link}>
                <span class="fa-stack fa-lg">
                  <i class="fa fa-circle fa-stack-2x"></i>
                  <i class="fa fa-linkedin fa-stack-1x fa-inverse"></i>
                  
                </span>
              </a>
            </li>
            `;
            }
            if (item?.name === "Twitter") {
              socialIcon += `
              <li class="list-inline-item">
              <a href=${item?.link}>
                <span class="fa-stack fa-lg">
                  <i class="fa fa-circle fa-stack-2x"></i>
                  <i class="fa fa-twitter fa-stack-1x fa-inverse"></i>
                  
                </span>
              </a>
            </li>
            `;
            }
            if (item?.name === "GitHub") {
              socialIcon += `
              <li class="list-inline-item">
              <a href=${item?.link}>
                <span class="fa-stack fa-lg">
                  <i class="fa fa-circle fa-stack-2x"></i>
                  <i class="fa fa-github fa-stack-1x fa-inverse"></i>
                  
                </span>
              </a>
            </li>
            `;
            }
          });

      const dynamicContent = document.getElementById("page-top");
      dynamicContent.innerHTML = `  
              <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
              <a class="navbar-brand js-scroll-trigger" href="#page-top">
                <span class="d-block d-lg-none">${res?.full_name}  </span>
                <span class="d-none d-lg-block">
                  <img class="img-fluid img-profile rounded-circle mx-auto mb-2" src=${
                    res?.profile_picture
                  } alt="">
                </span>
              </a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a class="nav-link js-scroll-trigger" href="#about">About</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link js-scroll-trigger" href="#experience">Experience</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link js-scroll-trigger" href="#education">Education</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link js-scroll-trigger" href="#skills">Skills</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link js-scroll-trigger" href="#projects">Projects</a>
                  </li>
                
                </ul>
              </div>
            </nav>
        
            <div class="container-fluid p-0">
        
              <section class="resume-section p-3 p-lg-5 d-flex d-column" id="about">
                <div class="my-auto">
                
                  <div class="d-flex align-items-center justify-content-between ">
                  <h1 class="mb-0">
                  ${res?.full_name}   
                  </h1>
              ${profileButton}
                  </div>
                  <div class="subheading mb-5">${res?.address}·
                    <a href="mailto:name@email.com">${res?.email}</a>
                  </div>
                  <p class="mb-5">${res?.summary}</p>
                  <ul class="list-inline list-social-icons mb-0">
                   
             ${socialIcon}
                  </ul>
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
              <!-- Video Modal End -->
        ${expSection}
        
          ${eduSection}
        
           ${skillSection}
     
     ${projectSection}     
     
           
        
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
