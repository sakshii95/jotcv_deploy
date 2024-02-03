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
        ? ` <button type="button" class="btn-play" data-bs-toggle="modal"
                                data-src=${projectVideo[0]?.video} data-bs-target="#proModal">
                                <span></span>
                            </button>`
        : "";

      let profileButton = filteredVideo1[0]?.video
        ? `  <button type="button" class="btn-play" data-bs-toggle="modal"
                            data-src=${filteredVideo1[0]?.video} data-bs-target="#videoModal">
                            <span></span>
                        </button>`
        : "";

      let expButton = expVideo[0]?.video
        ? `   <button type="button" class="btn-play" data-bs-toggle="modal"
                        data-src=${expVideo[0]?.video} data-bs-target="#expModal">
                        <span></span>
                    </button>`
        : "";

      let eduButton = educationVideo[0]?.video
        ? `      <button type="button" class="btn-play" data-bs-toggle="modal"
                    data-src=${educationVideo[0]?.video} data-bs-target="#eduModal">
                    <span></span>
                    </button>`
        : "";

      let skillButton = skillVideo[0]?.video
        ? `<button type="button" class="btn-play" data-bs-toggle="modal"
                    data-src=${skillVideo[0]?.video} data-bs-target="#skillModal">
                    <span></span>
                    </button>`
        : "";

      let expSection =
        res?.experiences?.length !== 0
          ? `
          <div class="row resume-timeline">
          <div class="col-twelve resume-header">
          <div class="d-flex justify-content-center mt-4">
          <h2>Work Experience</h2>
          
          ${expButton}
          </div>
           </div>
          <!-- /resume-header -->
  
          <div class="col-twelve">
          ${res?.experiences
            ?.map((data) => {
              return `
              <div class="timeline-wrap">
             
            
              <!-- /timeline-block -->
  
              <div class="timeline-block">
                <div class="timeline-ico">
                  <i class="fa fa-graduation-cap"></i>
                </div>
  
                <div class="timeline-header">
                  <h3>${data?.designation}</h3>
                  <p>${data?.start_date} - ${
                    data?.is_current ? "Currently Studying" : data?.end_date
                  }</p>
                </div>
  
                <div class="timeline-content">
                  <h4>${data?.company_name}</h4>
                  <p>
                  ${data?.description}
                  </p>
                </div>
              </div>
              <!-- /timeline-block -->
            </div>
          
            
                 `;
            })
            .join("")}
          
          
          </div>
          <!-- /col-twelve -->
        </div>
      
            `
          : "";

      let eduSection =
        res?.eductaions?.length !== 0
        ? `
        <div class="row resume-timeline">
        <div class="col-twelve resume-header">
        <div class="d-flex justify-content-center mt-4">
        <h2>Education</h2>
        ${eduButton}
        </div>
         </div>
        <!-- /resume-header -->

        <div class="col-twelve">
        ${res?.eductaions
          ?.map((data) => {
            return `
            <div class="timeline-wrap">
           
          
            <!-- /timeline-block -->

            <div class="timeline-block">
              <div class="timeline-ico">
                <i class="fa fa-graduation-cap"></i>
              </div>

              <div class="timeline-header">
                <h3>${data?.course}</h3>
                <p>${data?.start_date} - ${
                  data?.is_current ? "Currently Studying" : data?.end_date
                }</p>
              </div>

              <div class="timeline-content">
                <h4>${data?.university}</h4>
                <p>
                ${data?.description}
                </p>
              </div>
            </div>
            <!-- /timeline-block -->
          </div>
        
          
               `;
          })
          .join("")}
        
        
        </div>
        <!-- /col-twelve -->
      </div>
    
          `
          : "";

      let skillCard =
        res?.skills?.length !== 0
          ? ` 
          <div class="col-six tab-full">
          <div class="d-flex justify-content-center mt-4">
          <h3>Skills</h3>
          ${skillButton}
          </div>

          <ul class="skill-bars">
          ${res?.skills
            ?.map((data) => {
              return `
              <li>
              <div class="progress percent${  data?.type == 1
                ? "40"
                : data?.type == 2
                ? "80"
                : "100"}"></div>
              <strong>${data?.skill}</strong>
            </li>
             
              
               

                    `;
            })
            ?.join("")}
       
          </ul>
         
       </div>
  
        `
          : "";

      let projectSection =
        res?.projects?.length !== 0
          ? ` 
          <section id="resume" class="grey-section">
          <div class="row section-intro">
           
          </div>
          <!-- /section-intro-->
    
          <div class="row resume-timeline">
            <div class="col-twelve resume-header">
            <div class="d-flex align-items-center justify-content-center mb-5 ">
            <h2>Projects</h2>
           ${projectButton}
            </div>
            </div>
            <!-- /resume-header -->
    
            <div class="col-twelve">
            ${res?.projects
              ?.map((data) => {
                return `

                <div class="timeline-wrap">
               
              
                <!-- /timeline-block -->
    
                <div class="timeline-block">
                  <div class="timeline-ico">
                    <i class="fa fa-graduation-cap"></i>
                  </div>
    
                  <div class="timeline-header">
                    <h3>${data?.title}</h3>
                    <p>${
                      data?.start_date
                    } - ${
              data?.is_current
                ? "Currently Studying"
                : data?.end_date
            }</p>
                  </div>
    
                  <div class="timeline-content">
                  <a class="subheading " href=${
                    data?.link
                  }>Link<a>
                    <p>
                     ${data?.description}
                    </p>
                  </div>
                </div>
                <!-- /timeline-block -->
              </div>
           
            
                   `;
              })
              .join("")}
         
              <!-- /timeline-wrap -->
            </div>
            <!-- /col-twelve -->
          </div>
          <!-- /resume-timeline -->
    
    
          <!-- /resume-timeline -->
        </section>    
          `
          : "";

      let socialIcon = "";
      res?.social_links.forEach((item) => {
        if (item?.name === "LinkedIn") {
          socialIcon += `
              <a class="social-item" href=${item?.link}><i class="fa fa-linkedIn"></i></a>
              `;
        }
        if (item?.name === "Twitter") {
          socialIcon += `
              <a class="social-item" href=${item?.link}><i class="fa fa-twitter"></i></a>
              `;
        }
        if (item?.name === "GitHub") {
          socialIcon += `
              <a class="social-item" href=${item?.link}><i class="fa fa-github"></i></a>
              `;
        }
      });

      const dynamicContent = document.getElementById("top");
      dynamicContent.innerHTML = `  
        <header>
        <div class="row">
          <div class="top-bar">

  
          
  
            <nav id="main-nav-wrap">
            <ul class="main-navigation">
              <li class="current">
                <a class="smoothscroll" href="#intro" title="">Home</a>
              </li>
              <li><a class="smoothscroll" href="#about" title="">About</a></li>
              <li>
              <a class="smoothscroll" href="#exp" title="">Experience</a>
            </li>
              <li>
                <a class="smoothscroll" href="#edu" title="">Education</a>
              </li>
              <li>
                <a class="smoothscroll" href="#Project" title="">Portfolio</a>
              </li>
            
            </ul>
          </nav>
          </div>
          <!-- /top-bar -->
        </div>
        <!-- /row -->
      </header>
      <!-- /header -->
  
      <!-- intro section
     ================================================== -->
      <section id="intro">
        <div class="intro-overlay"></div>
  
        <div class="intro-content">
          <div class="row">
            <div class="col-twelve">
              <h5>Hello, World.</h5>
              <h1>I'm ${res?.full_name}.</h1>
  
              <p class="intro-position">
                <span>${res?.position}</span>
            
              </p>
  
              <a class="button stroke smoothscroll" href="#about" title=""
                >More About Me</a
              >
            </div>
          </div>
        </div>
        <!-- /intro-content -->
  
        <ul class="intro-social">
       ${socialIcon}
        </ul>
        <!-- /intro-social -->
      </section>
      <!-- /intro -->
  
      <!-- about section
     ================================================== -->
      <section id="about">
        <div class="row section-intro">
          <div class="col-twelve">
            <h5>About</h5>

            <h1>Let me introduce myself.</h1>
  ${profileButton}
            <div class="intro-info">
              <img src=${res?.profile_picture} alt="Profile Picture" />
  
              <p class="lead">
               ${res?.summary}
              </p>
            </div>
          </div>
        </div>
        <!-- /section-intro -->
  
        <div class="row about-content">
          <div class="col-six tab-full">
            <h3>Profile</h3>
  
            <ul class="info-list">
              <li>
                <strong>Fullname:</strong>
                <span>${res?.full_name}</span>
              </li>
              <li>
                <strong>Email:</strong>
                <span>${res?.email}</span>
              </li>
            </ul>
            <!-- /info-list -->
          </div>
  
     ${skillCard}
        </div>
      </section>
      <!-- /process-->
  
      <!-- resume Section
     ================================================== -->
      <section id="resume" class="grey-section">
        <div class="row section-intro">
          <div class="col-twelve">
            <h5>Resume</h5>
          </div>
        </div>
        <!-- /section-intro-->
  
        ${expSection}
        <!-- /resume-timeline -->
  
       ${eduSection}
        <!-- /resume-timeline -->
      </section>
      <!-- /features -->

     ${projectSection}
    <!-- /features -->
    <div class="modal fade" id="videoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
       <div class="modal-content">
           <div class="modal-body">
               <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
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
           <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
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
       <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
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
   <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
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
<button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
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
  
      <!-- footer
     ================================================== -->
  
      <footer>
        <div class="row">
          <div class="col-six tab-full pull-right social">
            <ul class="footer-social">
       ${socialIcon}
            </ul>
          </div>
  
          <div class="col-six tab-full">
            <div class="copyright">
              <span>© Copyright JotCV.</span>
           
            </div>
          </div>
  
          <div id="go-top">
            <a class="smoothscroll" title="Back to Top" href="#top"
              ><i class="fa fa-long-arrow-up"></i
            ></a>
          </div>
        </div>
        <!-- /row -->
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
