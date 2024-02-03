/**
* Template Name: MyResume
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/

*/

(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: "smooth",
    });
  };

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("body").classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let body = select("body");
        if (body.classList.contains("mobile-nav-active")) {
          body.classList.remove("mobile-nav-active");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Hero type effect
   */
  const typed = select(".typed");
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function (direction) {
        let progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Initiate portfolio details lightbox
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: ".portfolio-details-lightbox",
    width: "90%",
    height: "90vh",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();
})();

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
        <a  class="social-link" href=${item?.link}><i class='bx bxl-linkedin'></i></a>
        `;
        }
        if (item?.name === "Twitter") {
          socialIcon += `
          <a  class="social-link" href=${item?.link}><i class='bx bxl-twitter'></i></a>
        `;
        }
        if (item?.name === "GitHub") {
          socialIcon += `
          <a  class="social-link" href=${item?.link}><i class='bx bxl-github'></i></a>
        `;
        }
      });
      let skillSection =
        res?.skills?.length !== 0
          ? `<section id="skills" class="skills section-bg">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
        <div class="d-flex justify-content-center">
        <h2 class="me-3 mt-1">Skills</h2>
        
        
  ${skillButton}
        </div>
        </div>

        <div class="row skills-content">


        ${res?.skills
          ?.map((data) => {
            return `
            <div class="col-lg-6">

                <div class="progress">
                <span class="skill">${data?.skill}<i class="val"></i></span>
                <div class="progress-bar-wrap">
                  <div class="progress-bar" role="progressbar" aria-valuenow="90" style="width: ${
                    data?.type == 1 ? "33%" : data?.type == 2 ? "66%" : "100%"
                  }" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>

                `;
          })
          ?.join("")}


        </div>

      </div>
    </section>`
          : "";

      let educationSection =
        res?.eductaions?.length !== 0
          ? `  <div class="col-lg-6">
            
      
    <div class="d-flex justify-content-start">
  
    <h3 class="resume-title me-3">Education</h3>

    
    
${eduButton}
    </div>
   ${res?.eductaions
     ?.map((data) => {
       return `
          <div class="resume-item">
          <h4>${data?.course}</h4>
          <h5>${data?.start_date} - ${
         data?.is_current ? "Currently Studying" : data?.end_date
       }</h5>
          <p><em>${data?.university}</em></p>
          <p>${data?.description}</p>
        </div>
          `;
     })
     .join("")}
   
  </div>`
          : "";

      let experienceSection =
        res?.experiences?.length !== 0
          ? `<div class="col-lg-6">
  <div class="d-flex justify-content-start">
  
  <h3 class="resume-title me-3">Professional Experience</h3>
  

  
  
${expButton}
  </div>
  ${res?.experiences
    ?.map((data) => {
      return `
        <div class="resume-item">
        <h4>${data?.designation}</h4>
        <h5>${data?.start_date} - ${
        data?.is_current ? "Present" : data?.end_date
      }
      </h5>
        
   <p>${data?.description}</p>
      </div>
        `;
    })
    .join("")}

 
</div>`
          : "";

      let resumeSection =
        res?.eductaions?.length !== 0 && res?.experiences?.length !== 0
          ? `    <section id="resume" class="resume">
<div class="container" data-aos="fade-up">

  <div class="section-title">
    <h2>Resume</h2>
  </div>

  <div class="row">
  ${educationSection}
${experienceSection}
  </div>

</div>
</section>`
          : "";

      let projectSection =
        res?.projects?.length !== 0
          ? ` <section id="portfolio" class="portfolio section-bg">
<div class="container" data-aos="fade-up">

  <div class="section-title">
    <div class="d-flex justify-content-center">
    <h2 class="me-3 mb-1">Projects</h2>  
  ${projectButton}
    </div>
  </div>
  <div class="row portfolio-container" data-aos="fade-up" data-aos-delay="200">
  ${res?.projects
    ?.map((data) => {
      return `
        <div class="col-lg-4 col-md-6 portfolio-item filter-app">
          <div class="portfolio-wrap">
          <div class="card">
          <div class="card-body">
           <h5 class="card-title">${data?.title}</h5>
    
         <p class="card-text">${data?.description}</p>
    
          </div>
          </div>
        
          <div class="portfolio-info">
          <div class="portfolio-links">

            <a href=${
              data?.link ? data?.link : "#"
            } class="portfolio-details-lightbox" data-glightbox="type: external" title="Portfolio Details"><i class="bx bx-link"></i></a>
          </div>
          </div>
        </div>
        </div>
        `;
    })
    ?.join("")}
  </div>
</div>
  </div>

</div>
</section>`
          : "";
      const dynamicContent = document.getElementById("dynamic-content");
      dynamicContent.innerHTML = `     
        <i class="bi bi-list mobile-nav-toggle d-lg-none"></i>
        <!-- ======= Header ======= -->
        <header id="header" class="d-flex flex-column justify-content-center">
      
          <nav id="navbar" class="navbar nav-menu">
            <ul>
              <li><a href="#hero" class="nav-link scrollto active"><i class="bx bx-home"></i> <span>Home</span></a></li>
              <li><a href="#about" class="nav-link scrollto"><i class="bx bx-user"></i> <span>About</span></a></li>
              <li><a href="#resume" class="nav-link scrollto"><i class="bx bx-file-blank"></i> <span>Resume</span></a></li>
              <li><a href="#portfolio" class="nav-link scrollto"><i class="bx bx-book-content"></i> <span>Project</span></a></li>
            </ul>
          </nav><!-- .nav-menu -->
      
        </header><!-- End Header -->
      
        <!-- ======= Hero Section ======= -->
        <section id="hero" class="d-flex flex-column justify-content-center" >
          <div class="container" data-aos="zoom-in" data-aos-delay="100">
            <h1>${res?.full_name ? res?.full_name : "John Deo"}</h1>
            <p>I'm <span class="typed" >${
              res?.position ? res?.position : "Software Developer"
            }</span></p>
            <div class="social-links">
        ${socialIcon}
            
            </div>
          </div>
        </section><!-- End Hero -->

      
        <main id="main">
      
          <!-- ======= About Section ======= -->
          <section id="about" class="about">
            <div class="container" data-aos="fade-up">
      
              <div class="section-title">
              <div class="d-flex justify-content-center">
              <h2 class="me-3 mt-1">About</h2>
              
              
        ${profileButton}
              </div>
                <p>${res?.summary}</p>
              </div>
      
              <div class="row">
                <div class="col-lg-4">
                  <img src=${
                    res?.profile_picture
                      ? res?.profile_picture
                      : "assets/img/Dummy.png"
                  } class="img-fluid" alt="">
                </div>
                <div class="col-lg-8 pt-4 pt-lg-0 content">
                  <h3>${
                    res?.position ? res?.position : "Software Developer"
                  }.</h3>
                 
                  <div class="row">
                    <div class="col-lg-6">
                      <ul>
        
                        
                        <li><i class="bi bi-chevron-right"></i> <strong>Phone:</strong> <span>${
                          res?.mobile_no ? res?.mobile_no : "+1234567890"
                        }</span></li>
                        <li><i class="bi bi-chevron-right"></i> <strong>Address:</strong> <span>${
                          res?.address ? res?.address : "XYZ Street"
                        }</span></li>
                      </ul>
                    </div>
                    <div class="col-lg-6">
                      <ul>
                        <li><i class="bi bi-chevron-right"></i> <strong>Email:</strong> <span>${
                          res?.email ? res?.email : "johndoe@gmail.com"
                        }</span></li>
                        
                      </ul>
                    </div>
                  </div>
               
                </div>
              </div>
      
            </div>
          </section><!-- End About Section -->
      
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
          <!-- ======= Facts Section ======= -->
          <section id="facts" class="facts">
            <div class="container" data-aos="fade-up">
      
              <div class="section-title">
                <h2>Facts</h2>
              </div>
      
              <div class="row">
      
                <div class="col-lg-3 col-md-6">
                  <div class="count-box">
                    <i class="bi bi-emoji-smile"></i>
                    <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" class="purecounter"></span>
                    <p>Happy Clients</p>
                  </div>
                </div>
      
                <div class="col-lg-3 col-md-6 mt-5 mt-md-0">
                  <div class="count-box">
                    <i class="bi bi-journal-richtext"></i>
                    <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1" class="purecounter"></span>
                    <p>Projects</p>
                  </div>
                </div>
      
                <div class="col-lg-3 col-md-6 mt-5 mt-lg-0">
                  <div class="count-box">
                    <i class="bi bi-headset"></i>
                    <span data-purecounter-start="0" data-purecounter-end="1463" data-purecounter-duration="1" class="purecounter"></span>
                    <p>Hours Of Support</p>
                  </div>
                </div>
      
                <div class="col-lg-3 col-md-6 mt-5 mt-lg-0">
                  <div class="count-box">
                    <i class="bi bi-award"></i>
                    <span data-purecounter-start="0" data-purecounter-end="25" data-purecounter-duration="1" class="purecounter"></span>
                    <p>Awards</p>
                  </div>
                </div>
      
              </div>
      
            </div>
          </section><!-- End Facts Section -->
      
          <!-- ======= Skills Section ======= -->
          ${skillSection}
          <!-- End Skills Section -->
      
          <!-- ======= Resume Section ======= -->
      ${resumeSection}
          <!-- End Resume Section -->
      
          <!-- ======= Portfolio Section ======= -->
         ${projectSection}
          <!-- End Portfolio Section -->
      
        </main><!-- End #main -->
      
        <!-- ======= Footer ======= -->
        <footer id="footer">
          <div class="container">
          
            <div class="copyright">
              &copy; Copyright <strong><span>JotCV</span></strong>. All Rights Reserved
            </div>
          
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
