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
            ? ` 
			<div id="page-2" class= "page two">
			<div class="d-flex">
			<h2 class="heading">Experience</h2>
			${expButton}
			</div>
			${res?.experiences
				?.map((data) => {
				  return `
				  <div class="resume-wrap d-flex ">
				  <div class="icon d-flex align-items-center justify-content-center">
					  <span class="flaticon-ideas"></span>
				  </div>
				  <div class="text pl-3">
					  <span class="date">${data?.start_date} - ${
						data?.is_current ? "Present" : data?.end_date
					  }</span>
					  <h2>${data?.designation}</</h2>
					  <span class="position">${data?.company_name}</span>
					  <p>${data?.description}</p>
				  </div>
			  </div>
				 
					
					  `;
				})
				.join("")} 
		 
		</div>
			
		 `:"";
  
        let eduCard =
          res?.eductaions?.length !== 0
            ? `
			<div id="page-1" class= "page one">
			<div class="d-flex">
			<h2 class="heading">Education</h2>
			
			${eduButton}
			</div>
			${res?.eductaions
				?.map((data) => {
				  return `
				  <div class="resume-wrap d-flex ">
				  <div class="icon d-flex align-items-center justify-content-center">
					  <span class="flaticon-ideas"></span>
				  </div>
				  <div class="text pl-3">
					  <span class="date">${
						data?.start_date
					  } - ${
					  data?.is_current
						? "Currently Studying"
						: data?.end_date
					}</span>
					  <h2>${data?.course}</h2>
					  <span class="position">${data?.university}</span>
					  
				  </div>
			  </div>
				 
				   
					   `;
				})
				.join("")} 
		 
	 
	 
		 
	   </div> 
			
			
			
		`:""
  
        let skillCard =
          res?.skills?.length !== 0
            ? ` 
			<div id="page-3" class= "page three">
			<div class="d-flex">
			<h2 class="heading">Skills</h2>
			${eduButton}
			</div>

			<div class="row">
			${res?.skills
                ?.map((data) => {
                  return `
				  <div class="col-md-6 animate-box">
				  <div class="progress-wrap ">
					 <h3>${data?.skill}</h3>
					 <div class="progress">
						  <div class="progress-bar color-1" role="progressbar" aria-valuenow="90"
						   aria-valuemin="0" aria-valuemax="100" style="width: 97%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" ${
							data?.type == 1 ? "33%" : data?.type == 2 ? "66%" : "100%"
						  }">
						 
						   </div>
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
		  <section class="ftco-section" id="services-section">
		  <div class="container-fluid px-md-5">
			  <div class="row justify-content-center py-5 mt-5">
			<div class="col-md-12 heading-section text-center ">
			<h1 class="big big-2">Projects</h1>
				<div class="d-flex justify-content-center">
				<h2 class="mb-4">Projects</h2>
				${projectButton}
				</div>
			</div>
		  </div>
			  <div class="row">
			  ${res?.projects
                ?.map((data) => {
                  return `
				  <div class="col-md-4 text-center d-flex ">
				  <div class="desc">
				  <h3 class="mb-5">${data?.title}</h3>
				  <a class="border-bottom border-primary text-decoration-none"href=${
					data?.link ? data?.link : "#"
				  }>Link</a>
				  <p>${data?.description}</p>
			  </div>
			  </div>
              
                   
                      `;
                })
                ?.join("")}
					
				  </div>
		  </div>
	  </section>
    `
          :"";
  
        const dynamicContent = document.getElementById("dynamic");
        dynamicContent.innerHTML = `  
        <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar ftco-navbar-light site-navbar-target" id="ftco-navbar">
	    <div class="container">
	      <a class="navbar-brand" href="#">${res?.full_name}</a>
	      <button class="navbar-toggler js-fh5co-nav-toggle fh5co-nav-toggle" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
	        <span class="oi oi-menu"></span> Menu
	      </button>

	      <div class="collapse navbar-collapse" id="ftco-nav">
	        <ul class="navbar-nav nav ml-auto">
	          <li class="nav-item"><a href="#home-section" class="nav-link"><span>Home</span></a></li>
	          <li class="nav-item"><a href="#about-section" class="nav-link"><span>About</span></a></li>
	          <li class="nav-item"><a href="#resume-section" class="nav-link"><span>Resume</span></a></li>
	          <li class="nav-item"><a href="#services-section" class="nav-link"><span>Projects</span></a></li>
	           
	        
	        </ul>
	      </div>
	    </div>
	  </nav>
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

    <section class="ftco-about img ftco-section ftco-no-pt ftco-no-pb " id="about-section">
    	<div class="container">
    		<div class="row d-flex no-gutters">
    			<div class="col-md-6 col-lg-6 d-flex">
    				<div class="img-about img d-flex align-items-stretch">
    					<div class="overlay"></div>
	    				<div class="img d-flex align-self-stretch align-items-center" style="background-image:url(${res?.profile_picture});">
	    				</div>
    				</div>
    			</div>
    			<div class="col-md-6 col-lg-6 pl-md-5 py-5">
    				<div class="row justify-content-start pb-3">
		          <div class="col-md-12 heading-section">
		          	<h1 class="big">About</h1>
					<div class="d-flex">
		            <h2 class="mb-4">About Me</h2>
					${profileButton}
					</div>
		            <p>${res?.summary}</p>
		            <ul class="about-info mt-4 px-md-0 px-2">
		            	<li class="d-flex"><span>Name:</span> <span>${res?.full_name}</span></li>
		            	<li class="d-flex"><span>Address:</span> <span>${res?.address}</span></li>
		            	<li class="d-flex"><span>Email:</span> <span>${res?.email}</span></li>
		            	<li class="d-flex"><span>Phone: </span> <span>${res?.mobile_no}</span></li>
		            </ul>
		          </div>
		        </div>
	        
	        </div>
        </div>
    	</div>
    </section>

    <section class="ftco-section ftco-no-pb goto-here" id="resume-section">
    	<div class="container">
    		<div class="row">
    			<div class="col-md-3">
				    <nav id="navi">
					    <ul>
					    ${res?.eductaions?.length!==0 ?`<li><a href="#page-1">Education</a></li>`:""}  
					    ${res?.experiences?.length!==0 ?`<li><a href="#page-2">Experience</a></li>`:""}  

					    ${res?.skills?.length!==0 ?`
						<li><a href="#page-3">Skills</a></li>
						
						`:""}  
					 
					      
					      
					    </ul>
					  </nav>
					</div>
					<div class="col-md-9">
				     ${eduCard}
                        ${expCard}
					  ${skillCard}
					 
					</div>
			  </div>
    	</div>
    </section>

  ${projectCard}
 
    <section class="ftco-section contact-section ftco-no-pb" id="contact-section">
      <div class="container">
      	<div class="row justify-content-center mb-5 pb-3">
          <div class="col-md-7 heading-section text-center ">
            <h1 class="big big-2">Contact</h1>
            <h2 class="mb-4">Contact Me</h2>
          </div>
        </div>

        <div class="row d-flex contact-info mb-5">
          <div class="col-md-6 col-lg-3 d-flex ">
          	<div class="align-self-stretch box text-center p-4 shadow">
          		<div class="icon d-flex align-items-center justify-content-center">
          			<span class="icon-map-signs"></span>
          		</div>
          		<div>
	          		<h3 class="mb-4">Address</h3>
		            <p>${res?.address}</p>
		          </div>
	          </div>
          </div>
          <div class="col-md-6 col-lg-3 d-flex ">
          	<div class="align-self-stretch box text-center p-4 shadow">
          		<div class="icon d-flex align-items-center justify-content-center">
          			<span class="icon-phone2"></span>
          		</div>
          		<div>
	          		<h3 class="mb-4">Contact Number</h3>
		            <p><a href="tel://1234567920">${res?.mobile_no}</a></p>
	            </div>
	          </div>
          </div>
          <div class="col-md-6 col-lg-3 d-flex ">
          	<div class="align-self-stretch box text-center p-4 shadow">
          		<div class="icon d-flex align-items-center justify-content-center">
          			<span class="icon-paper-plane"></span>
          		</div>
          		<div>
	          		<h3 class="mb-4">Email Address</h3>
		            <p><a href="mailto:info@yoursite.com">${res?.email}</a></p>
		          </div>
	          </div>
          </div>
       

        
      </div>
    </section>
		
    <footer class="ftco-footer ftco-section">
      <div class="container">
    
        <div class="row">
          <div class="col-md-12 text-center">

            <p><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
  Copyright@JotCV &copy;<script>document.write(new Date().getFullYear());</script> 
  <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --></p>
          </div>
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
  