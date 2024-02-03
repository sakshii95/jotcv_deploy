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

          <section class="section" id="edu">
          <!-- container -->
          <div class="container text-center">
          <div class="d-flex align-items-center justify-content-center mb-5 ">
          <h6 class="section-title mb-6">Experience</h6>
          
        
          ${expButton}
        
          </div>
          ${res?.experiences
            ?.map((data) => {
              return `
              <div class="blog-card">
               
              <div class="blog-card-body">
                  <h5 class="blog-card-title">${data?.designation}</h6>
  
                  <p class="blog-card-caption">
                      <a href="#">${data?.company_name}</a>
                      <span class="text-primary">${data?.start_date} - ${
                data?.is_current ? "Currently Studying" : data?.end_date
              }</span>
                      
                  </p>
              <p>${data?.description}</p>
  
                
              </div>
          </div>
            
                 `;
            })
            .join("")}
            <!-- end of blog wrapper -->
          </div>
      </section>
          `
          : "";

      let eduSection =
        res?.eductaions?.length !== 0
          ? `   
        
        <section class="section" id="edu">
        <!-- container -->
        <div class="container text-center">
        <div class="d-flex align-items-center justify-content-center mb-5 ">
        <h6 class="section-title mb-6">Education</h6>
        
      
        ${eduButton}
        </div>
        ${res?.eductaions
          ?.map((data) => {
            return `
            <div class="blog-card">
             
            <div class="blog-card-body">
                <h5 class="blog-card-title">${data?.course}</h6>

                <p class="blog-card-caption">
                    <a href="#">${data?.university}</a>
                    <span class="text-primary">${data?.start_date} - ${
              data?.is_current ? "Currently Studying" : data?.end_date
            }</span>
                    
                </p>
            <p>${data?.description}</p>

              
            </div>
        </div>
          
               `;
          })
          .join("")}
          <!-- end of blog wrapper -->
        </div>
    </section>            
                `
          : "";

      let skillCard =
        res?.skills?.length !== 0
          ? ` 
          <section class="section" id="skill">
          <div class="container text-center">     
          <p class="section-subtitle">Why choose me ?</p>
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
              <section class="section" id="service">
              <div class="container text-center">
                  <p class="section-subtitle">What I Did ?</p>
                  <div class="d-flex align-items-center justify-content-center mb-5 ">
                  <h6 class="section-title mb-6">Projects</h6>   
                 ${projectButton}
                  </div>
                  <!-- row -->
                  <div class="row">
                  ${res?.projects
                    ?.map((data) => {
                      return `
                      <div class="col-md-6 col-lg-3">
                      <div class="service-card">
                          <div class="body">
                              <img src="assets/imgs/responsive.svg" alt="Download free bootstrap 4 landing page, free boootstrap 4 templates, Download free bootstrap 4.1 landing page, free boootstrap 4.1.1 templates, meyawo Landing page" class="icon">
                              <h6 class="title">${data?.title}</h6>
                              <br/>
                              <a class="subheading " href=${data?.link}>Link<a>
                              <br/>
                              <span class="text-primary">${
                                data?.start_date
                              } - ${
                        data?.is_current ? "Currently Studying" : data?.end_date
                      }</span>
                              <p>${data?.description}</p>
                          </div>
                      </div>
                  </div>
                  
                         `;
                    })
                    .join("")}
                    
                  </div><!-- end of row -->
              </div>
          </section>

        `
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

      const dynamicContent = document.getElementById("dynamic");
      dynamicContent.innerHTML = `  
        <nav class="custom-navbar" data-spy="affix" data-offset-top="20">
        <div class="container">
            <a class="logo" href="#">${res?.full_name}</a>         
            <ul class="nav show">
                <li class="item active">
                    <a class="link" href="#home">Home</a>
                </li>
                <li class="item active">
                    <a class="link" href="#about">About</a>
                </li>
                <li class="item active">
                    <a class="link" href="#portfolio">Portfolio</a>
                </li>
                <li class="item active">
                    <a class="link" href="#testmonial">Testmonial</a>
                </li>
                <li class="item active">
                    <a class="link" href="#blog">Blog</a>
                </li>
               
              
            </ul>
          
        </div>          
    </nav><!-- End of Page Navbar -->

    <!-- page header -->
    <header id="home" class="header">
        <div class="overlay"></div>
        <div class="header-content container">
            <h1 class="header-title">
                <span class="up">HI!</span>
                <span class="down">I am ${res?.full_name}</span>
            </h1>
            <p class="header-subtitle">${res?.position}</p>            
        </div>              
    </header><!-- end of page header -->

    <!-- about section -->
    <section class="section pt-0" id="about">
        <!-- container -->
        <div class="container text-center">
            <!-- about wrapper -->
            <div class="about">
                <div class="about-img-holder">
                    <img src=${res?.profile_picture} class="about-img" alt="Download free bootstrap 4 landing page, free boootstrap 4 templates, Download free bootstrap 4.1 landing page, free boootstrap 4.1.1 templates, meyawo Landing page">
                </div>
                <div class="about-caption">
                    <p class="section-subtitle">Who Am I ?</p>
                    <h2 class="section-title mb-3">About Me</h2>
                    <p>
                    ${res?.summary}              
                    </p>
            
                </div>              
            </div><!-- end of about wrapper -->
        </div><!-- end of container -->
    </section> <!-- end of about section -->
${skillCard}
    <!-- service section -->
  ${projectSection}

    
    <!-- blog section -->
${eduSection}

   ${expSection}

    <!-- contact section -->
  

    <!-- footer -->
    <div class="container">
        <footer class="footer">       
            <p class="mb-0">Copyright <script>document.write(new Date().getFullYear())</script> &copy; <a href="https://www.jotcv.com/">JotCV</a></p>
            <div class="social-links text-right m-auto ml-sm-auto">
            ${socialIcon}
            </div>
        </footer>
    </div> <!-- end of page footer -->
              `;
    })
    .catch((error) => {
      console.error("API request error:", error);
    });
} else {
  // Handle the case when 'profile' parameter is not present
  console.error("Profile parameter is missing from the URL.");
}
