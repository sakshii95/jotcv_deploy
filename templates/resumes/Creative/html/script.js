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
        <div class="vg-page page-home" id="home" style="background-image: url(../assets/img/bg_image_1.jpg)">
        <!-- Navbar -->
        <div class="navbar navbar-expand-lg navbar-dark sticky" data-offset="500">
          <div class="container">
            <a href="" class="navbar-brand">V-Folio</a>
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
                  <a href="#portfolio" class="nav-link" data-animate="scrolling">Portfolio</a>
                </li>
                <li class="nav-item">
                  <a href="#blog" class="nav-link" data-animate="scrolling">Blog</a>
                </li>
                <li class="nav-item">
                  <a href="#contact" class="nav-link" data-animate="scrolling">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div> <!-- End Navbar -->
        <!-- Caption header -->
        <div class="caption-header text-center wow zoomInDown">
          <h5 class="fw-normal">Welcome</h5>
          <h1 class="fw-light mb-4">I'm <b class="fg-theme">Stephen</b> Doe</h1>
          <div class="badge">UI/UX & Web Designer</div>
        </div> <!-- End Caption header -->
        <div class="floating-button"><span class="ti-mouse"></span></div>
      </div>
      
      <div class="vg-page page-about" id="about">
        <div class="container py-5">
          <div class="row">
            <div class="col-lg-4 py-3">
              <div class="img-place wow fadeInUp">
                <img src="../assets/img/person.jpg" alt="">
              </div>
            </div>
            <div class="col-lg-6 offset-lg-1 wow fadeInRight">
              <h1 class="fw-light">Stephen Doe</h1>
              <h5 class="fg-theme mb-3">UI/UX & Web Designer</h5>
              <p class="text-muted">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form but the majority have suffered alteration in some</p>
              <ul class="theme-list">
                <li><b>From:</b> Texas, US</li>
                <li><b>Lives In:</b> Texas, US</li>
                <li><b>Age:</b> 25</li>
                <li><b>Gender:</b> Male</li>
              </ul>
              <button class="btn btn-theme-outline">Download CV</button>
            </div>
          </div>
        </div>
        <div class="container py-5">
          <h1 class="text-center fw-normal wow fadeIn">My Skills</h1>
          <div class="row py-3">
            <div class="col-md-6">
              <div class="px-lg-3">
                <h4 class="wow fadeInUp">Coding skills</h4>
                <div class="progress-wrapper wow fadeInUp">
                  <span class="caption">JavaScript</span>
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 86%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">86%</div>
                  </div>
                </div>
                <div class="progress-wrapper wow fadeInUp">
                  <span class="caption">PHP</span>
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 80%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">80%</div>
                  </div>
                </div>
                <div class="progress-wrapper wow fadeInUp">
                  <span class="caption">HTML + CSS</span>
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 100%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">100%</div>
                  </div>
                </div>
                <div class="progress-wrapper wow fadeInUp">
                  <span class="caption">Phyton</span>
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 90%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">90%</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="px-lg-3">
                <h4 class="wow fadeInUp">Design Skills</h4>
                <div class="progress-wrapper wow fadeInUp">
                  <span class="caption">UI / UX Design</span>
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 92%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">92%</div>
                  </div>
                </div>
                <div class="progress-wrapper wow fadeInUp">
                  <span class="caption">Web Design</span>
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 99%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">99%</div>
                  </div>
                </div>
                <div class="progress-wrapper wow fadeInUp">
                  <span class="caption">Logo Design</span>
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 79%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">79%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container pt-5">
          <div class="row">
            <div class="col-md-6 wow fadeInRight">
              <h2 class="fw-normal">Education</h2>
              <ul class="timeline mt-4 pr-md-5">
                <li>
                  <div class="title">2010</div>
                  <div class="details">
                    <h5>Specialize of course</h5>
                    <small class="fg-theme">University of Study</small>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered</p>
                  </div>
                </li>
                <li>
                  <div class="title">2009</div>
                  <div class="details">
                    <h5>Specialize of course</h5>
                    <small class="fg-theme">University of Study</small>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered</p>
                  </div>
                </li>
                <li>
                  <div class="title">2008</div>
                  <div class="details">
                    <h5>Specialize of course</h5>
                    <small class="fg-theme">University of Study</small>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered</p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="col-md-6 wow fadeInRight" data-wow-delay="200ms">
              <h2 class="fw-normal">Experience</h2>
              <ul class="timeline mt-4 pr-md-5">
                <li>
                  <div class="title">2017 - Current</div>
                  <div class="details">
                    <h5>Specialize of course</h5>
                    <small class="fg-theme">University of Study</small>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered</p>
                  </div>
                </li>
                <li>
                  <div class="title">2014</div>
                  <div class="details">
                    <h5>Specialize of course</h5>
                    <small class="fg-theme">University of Study</small>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered</p>
                  </div>
                </li>
                <li>
                  <div class="title">2011</div>
                  <div class="details">
                    <h5>Specialize of course</h5>
                    <small class="fg-theme">University of Study</small>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div class="vg-page page-service">
        <div class="container">
          <div class="text-center wow fadeInUp">
            <div class="badge badge-subhead">Service</div>
          </div>
          <h1 class="fw-normal text-center wow fadeInUp">What can i do?</h1>
          <div class="row mt-5">
            <div class="col-md-6 col-lg-4 col-xl-3">
              <div class="card card-service wow fadeInUp">
                <div class="icon">
                  <span class="ti-paint-bucket"></span>
                </div>
                <div class="caption">
                  <h4 class="fg-theme">Web Design</h4>
                  <p>There are many variations of passages of Lorem Ipsum available</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4 col-xl-3">
              <div class="card card-service wow fadeInUp">
                <div class="icon">
                  <span class="ti-search"></span>
                </div>
                <div class="caption">
                  <h4 class="fg-theme">SEO</h4>
                  <p>There are many variations of passages of Lorem Ipsum available</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4 col-xl-3">
              <div class="card card-service wow fadeInUp">
                <div class="icon">
                  <span class="ti-vector"></span>
                </div>
                <div class="caption">
                  <h4 class="fg-theme">UI/UX Design</h4>
                  <p>There are many variations of passages of Lorem Ipsum available</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4 col-xl-3">
              <div class="card card-service wow fadeInUp">
                <div class="icon">
                  <span class="ti-desktop"></span>
                </div>
                <div class="caption">
                  <h4 class="fg-theme">Web Development</h4>
                  <p>There are many variations of passages of Lorem Ipsum available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="vg-footer">
        <h1 class="text-center">Virtual Folio</h1>
        <div class="container">
          <div class="row">
            <div class="col-lg-4 py-3">
              <div class="footer-info">
                <p>Where to find me</p>
                <hr class="divider">
                <p class="fs-large fg-white">1600 Amphitheatre Parkway Mountain View, California 94043 US</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3 py-3">
              <div class="float-lg-right">
                <p>Follow me</p>
                <hr class="divider">
                <ul class="list-unstyled">
                  <li><a href="#">Instagram</a></li>
                  <li><a href="#">Facebook</a></li>
                  <li><a href="#">Twitter</a></li>
                  <li><a href="#">Youtube</a></li>
                </ul>
              </div>
            </div>
            <div class="col-md-6 col-lg-3 py-3">
              <div class="float-lg-right">
                <p>Contact me</p>
                <hr class="divider">
                <ul class="list-unstyled">
                  <li>info@virtual.com</li>
                  <li>+8890234</li>
                  <li>+813023</li>
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
  