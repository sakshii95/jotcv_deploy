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
      let educationSection =
        res?.eductaions?.length !== 0
          ? ` <section id="education" class="education">
      <div class="section-heading text-center">
      ${eduButton}
    <div class="d-flex justify-content-center">
    <h2 class="me-3 mb-1">eudcation</h2>  
    
    </div>
    
      </div>
      <div class="container">
        <div class="education-horizontal-timeline">
          <div class="row">
          ${res?.eductaions
            ?.map((data) => {
              return `  <div class="col-sm-4">
              <div class="single-horizontal-timeline">  
                <div class="experience-time">
                  <h2>${data?.start_date} - ${
                data?.is_current ? "Currently Studying" : data?.end_date
              }</h2>
                  <h3>${data?.course}</h3>
                </div>
                <!--/.experience-time-->
                <div class="timeline-horizontal-border">
                  <i class="fa fa-circle" aria-hidden="true"></i>
                  <span class="single-timeline-horizontal"></span>
                </div>
                <div class="timeline">
                  <div class="timeline-content">
                    <h4 class="title">${data?.university}</h4>
                  
                    <p class="description">
                     ${data?.description}
                    </p>
                  </div>
                  <!--/.timeline-content-->
                </div>
                <!--/.timeline-->
              </div>
            </div>`;
            })
            ?.join("")}
           
           
          </div>
        </div>
      </div>
    </section>`
          : "";

      let skillSection =
        res?.skills?.length !== 0
          ? `<section id="skills" class="skills">
    <div class="skill-content">
      <div class="section-heading text-center">
      ${skillButton}
        <h2>skills</h2>
      </div>
      <div class="container">
        <div class="row">
        
      ${res?.skills
        ?.map((data) => {
          return `
          <div class="col-md-6">
          <div class="barWrapper">
          <span class="progressText">${data?.skill}</span>
           <div class="single-progress-txt">
           <div class="progress">
             <div
               class="progress-bar"
               role="progressbar"
               aria-valuenow="90"
               aria-valuemin="10"
               aria-valuemax="100"
               style="width: ${
                 data?.type == 1 ? "33%" : data?.type == 2 ? "66%" : "100%"
               }"
             ></div>
           </div>
            
         </div>
       </div>
       
      
     
       </div>

              `;
        })
        ?.join("")}

       
     
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container -->
    </div>
    <!-- /.skill-content-->
  </section>`
          : "";

      const expSection =
        res?.experiences?.length !== 0
          ? `   <section id="experience" class="experience">
  <div class="section-heading text-center">
  ${expButton}
    <h2>experience</h2>
  </div>
  <div class="container">
    <div class="experience-content">
      <div class="main-timeline">
        <ul>
        ${res?.experiences
          ?.map((data) => {
            return `
            <li>
            <div class="single-timeline-box fix">
              <div class="row">
                <div class="col-md-5">
                  <div class="experience-time text-right">
                    <h2>${data?.start_date}-${
              data?.current ? "Present" : data?.end_date
            }</h2>
                    <h3>${data?.designation}</h3>
                  </div>
                  <!--/.experience-time-->
                </div>
                <!--/.col-->
                <div class="col-md-offset-1 col-md-5">
                  <div class="timeline">
                    <div class="timeline-content">
                      <h4 class="title">
                        <span
                          ><i class="fa fa-circle" aria-hidden="true"></i
                        ></span>
                        ${data?.company_name}
                      </h4>
                    
                      <p class="description">
                       ${data?.description}
                      </p>
                    </div>
                    <!--/.timeline-content-->
                  </div>
                  <!--/.timeline-->
                </div>
                <!--/.col-->
              </div>
            </div>
            <!--/.single-timeline-box-->
          </li>
              `;
          })
          .join("")}
       
        </ul>
      </div>
      <!--.main-timeline-->
    </div>
    <!--.experience-content-->
  </div>
</section>`
          : "";

      let projectSection =
        res?.projects?.length !== 0
          ? `     <section id="portfolio" class="portfolio">
<div class="portfolio-details">
  <div class="section-heading text-center">
  ${projectButton}
    <h2>Projects</h2>
  </div>
  <div class="container">
    <div class="portfolio-content">
      <div class="isotope">
        <div class="row">
        ${res?.projects
          ?.map((data) => {
            return `
               <div class="col-sm-4">
                 <div class="item">
                 <div class="card" >
                  <div class="card-body">
                   <h5 class="card-title">${data?.title}</h5>
          
                   <p class="card-text">${data?.description}</p>
          
                  </div>
                   </div>
                 <div class="isotope-overlay">
                <a href=${data?.link ? data?.link : "#"}> Link </a>
                 </div>
          
            </div>
            
          </div>

        
      
      
              `;
          })
          ?.join("")}
         
          <!-- /.col -->

         
        <!-- /.row -->
      </div>
      <!--/.isotope-->
    </div>
    <!--/.gallery-content-->
  </div>
  <!--/.container-->
</div>
<!--/.portfolio-details-->
</section>`
          : "";
      const dynamicContent = document.getElementById("dynamic-content");
      dynamicContent.innerHTML = `     
        <!-- top-area Start -->
        <header class="top-area">
          <div class="header-area">
            <!-- Start Navigation -->
            <nav
              class="navbar navbar-default bootsnav navbar-fixed dark no-background"
            >
              <div class="container">
                <!-- Start Header Navigation -->
                <div class="navbar-header">
                  <button
                    type="button"
                    class="navbar-toggle"
                    data-toggle="collapse"
                    data-target="#navbar-menu"
                  >
                    <i class="fa fa-bars"></i>
                  </button>
                  <a class="navbar-brand" href="index.html"> ${
                    res?.full_name ? res?.full_name : "John Doe"
                  }</a>
                </div>
                <!--/.navbar-header-->
                <!-- End Header Navigation -->
    
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div
                  class="collapse navbar-collapse menu-ui-design"
                  id="navbar-menu"
                >
                  <ul
                    class="nav navbar-nav navbar-right"
                    data-in="fadeInDown"
                    data-out="fadeOutUp"
                  >
                    <li class="smooth-menu active"></li>
                    <li class="smooth-menu"><a href="#education">education</a></li>
                    <li class="smooth-menu"><a href="#skills">skills</a></li>
                    <li class="smooth-menu">
                      <a href="#experience">experience</a>
                    </li>
                 
                    <li class="smooth-menu"><a href="#portfolio">projects</a></li>
              
                  </ul>
                  <!--/.nav -->
                </div>
                <!-- /.navbar-collapse -->
              </div>
              <!--/.container-->
            </nav>
            <!--/nav-->
            <!-- End Navigation -->
          </div>
          <!--/.header-area-->
    
          <div class="clearfix"></div>
        </header>
        <!-- /.top-area-->
        <!-- top-area End -->
    
        <!--welcome-hero start -->
        <section id="welcome-hero" class="welcome-hero">
          <div class="container">
            <div class="row">
              <div class="col-md-12 text-center">
                <div class="header-text">
                  <h2>
                    hi <span>,</span> i am <br />
                    ${res?.full_name ? res?.full_name : "John Doe"} 
                    
                  </h2>
                  <p>${res?.position ? res?.position : "Software Developer"}</p>
                 
                </div>
                <!--/.header-text-->
              </div>
              <!--/.col-->
            </div>
            <!-- /.row-->
          </div>
          <!-- /.container-->
        </section>
        <!--/.welcome-hero-->
        <!--welcome-hero end -->
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
        <!--about start -->
        <section id="about" class="about">
        <div class="section-heading text-center">
        ${profileButton}

        <h2 class="me-3">About Me</h2>
 
        </div>
        
          <div class="container">
            <div class="about-content">

              <div class="row">
                <div class="col-sm-6">
                  <div class="single-about-txt">
                    <h3>
                    ${res?.summary}
                    </h3>
                    <p>
                    
                    </p>
                    <div class="row">
                      <div class="col-sm-4">
                        <div class="single-about-add-info">
                          <h3>phone</h3>
                          <p>${
                            res?.mobile_no ? res?.mobile_no : "+1234567890"
                          }</p>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="single-about-add-info">
                          <h3>email</h3>
                          <p>${
                            res?.email ? res?.email : "johndoe@gmail.com"
                          }</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-offset-1 col-sm-5">
                  <div class="single-about-img">
                    <img
                      src=${res?.profile_picture}
                      alt="profile_image"
                    />
                    <div class="about-list-icon">
                      <ul>
                      ${res?.social_links
                        ?.map((data) => {
                          return `
                            <li class="me-3">
                            <a href=${data?.link}>
                              ${data?.name}
                            </a>
                          </li>
                            `;
                        })
                        ?.join("")}
                       
                       
                      </ul>
                      <!-- / ul -->
                    </div>
                    <!-- /.about-list-icon -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!--/.about-->
        <!--about end -->
    
        <!--education start -->
       ${educationSection}
        <!--/.education-->
        <!--education end -->
    
        <!--skills start -->
 ${skillSection}
        <!--/.skills-->
        <!--skills end -->
    
        <!--experience start -->
     ${expSection}
        <!--/.experience-->
        <!--experience end -->
  
    
        <!--portfolio start -->
   ${projectSection}
        <!--/.portfolio-->
        <!--portfolio end -->
        <footer id="footer-copyright" class="footer-copyright">
        <div class="container">
          <div class="hm-footer-copyright text-center">
            <p>
              &copy; copyright JotCV.
            </p>
            <!--/p-->
          </div>
          <!--/.text-center-->
        </div>
        <!--/.container-->
  
       
        <!--/.scroll-Top-->
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
