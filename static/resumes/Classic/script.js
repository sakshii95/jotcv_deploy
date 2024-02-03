// Function to parse query parameters from URL
function getQueryParam(parameterName) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(parameterName);
}

// Get the 'profile' query parameter value
const profileId = getQueryParam("profile");

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
                    res?.full_name
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
                    ${res?.full_name} 
                    
                  </h2>
                  <p>${res?.position}</p>
                 
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
    
        <!--about start -->
        <section id="about" class="about">
          <div class="section-heading text-center">
            <h2>about me</h2>
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
                          <p>${res?.mobile_no}</p>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="single-about-add-info">
                          <h3>email</h3>
                          <p>${res?.email}</p>
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
                            <li>
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
        <section id="education" class="education">
          <div class="section-heading text-center">
            <h2>education</h2>
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
        </section>
        <!--/.education-->
        <!--education end -->
    
        <!--skills start -->
        <section id="skills" class="skills">
          <div class="skill-content">
            <div class="section-heading text-center">
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

                    `;
              })
              ?.join("")}
      
             
           
              </div>
              <!-- /.row -->
            </div>
            <!-- /.container -->
          </div>
          <!-- /.skill-content-->
        </section>
        <!--/.skills-->
        <!--skills end -->
    
        <!--experience start -->
        <section id="experience" class="experience">
          <div class="section-heading text-center">
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
                            <h2>${data?.start_date}-${data?.current?"Present":data?.end_date}</h2>
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
        </section>
        <!--/.experience-->
        <!--experience end -->
  
    
        <!--portfolio start -->
        <section id="portfolio" class="portfolio">
          <div class="portfolio-details">
            <div class="section-heading text-center">
              <h2>Projects</h2>
            </div>
            <div class="container">
              <div class="portfolio-content">
                <div class="isotope">
                  <div class="row">
                  ${res?.projects?.map((data)=>{
                    return(
                        `
                         <div class="col-sm-4">
                    
                      <!-- /.item -->
                      <div class="item">
                         <div class="card" >
                         <div class="card-body">
                         <h5 class="card-title">${data?.title}</h5>
                    
                         <p class="card-text">${data?.description}</p>
                    
                        </div>
                        </div>
                        <div class="isotope-overlay">
                          <a href=${data?.link?data?.link:"#"}> Link </a>
                        </div>
                        <!-- /.isotope-overlay -->
                      </div>
                      <!-- /.item -->
                    </div>
    
                  
                    <!-- /.col -->
                  </div>
                        `
                    )
                  })?.join("")}
                   
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
        </section>
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
