// function toggleMenu() {
//     const menu = document.querySelector(".menu-links");
//     const icon = document.querySelector(".hamburger-icon");
//     menu.classList.toggle("open");
//     icon.classList.toggle("open");
//   }
  
  
  // Function to parse query parameters from URL
  function getQueryParam(parameterName) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(parameterName);
  }
  
  // Get the 'profile' query parameter value
  const profileId = getQueryParam('profile');
  
  // Check if the 'profile' parameter is present in the URL
  if (profileId) {
      // Construct the API URL with the profileId
      const apiUrl = `https://api.jotcv.com/api/candidate/web-profile/${profileId}`;
  
      // Make an API request (assuming you are using fetch)
      fetch(apiUrl)
          .then(response => response.json())
          .then(item => {
            
              // Update the HTML with the dynamic content
              let res=item?.data
              let mySocial = "";

              res?.social_links?.forEach((element) => {
                mySocial =
                  mySocial +
                  `
                    <a
                    class="px-2"
                    href=${element?.link}
                    key="1"
                    >${element?.name}</a
                  >
            
                  
              
                      `;
              });

              let mySkills =
              res?.skills?.length !== 0 &&
              res?.skills
                ?.map((item) => {
                  return ` <p
                  class="text-sm rounded-md text-white font-semibold p-2 w-fit bg-emerald-500"
                >
                  ${item?.skill}
                </p>`;
                })
                ?.join("");

                let myExperience = "";

                res?.experiences?.forEach((element) => {
                  myExperience =
                    myExperience +
                    `
                        <div class="mt-1 p-1.5 text-justify">
                        <h3 class="text-base text-black font-semibold">${
                          element?.company_name
                        }</h3>
                        <div class="flex justify-between">
                          <p class="text-base text-black">${element?.designation}</p>
                          <p class="text-base text-black">${element?.start_date}-${
                      element?.is_current ? "Present" : element?.end_date
                    }</p>
                        </div>
                        <p class="text-sm text-black font-medium">
                        ${element?.description}
                      
                        </p>
                      </div>
                        
                  
                          `;
                });
                let myProjects = "";

                res?.projects?.forEach((element) => {
                  myProjects =
                    myProjects +
                    `
                    <div class="mt-1 p-1.5 text-justify">
                    <h3 class="text-base text-black font-semibold">${element?.title}</h3>
                    <div class="flex justify-between">
                      <p class="text-base text-black">${element?.link}</p>
                      <p class="text-base text-black">${element?.start_date}-${element?.end_date}</p>
                    </div>
                    <p class="text-sm text-black font-medium">
                    ${element?.description}
                    </p>
                  </div>
                     
                      `;
                });
                let myEducation = "";
              
                res?.eductaions?.forEach((element) => {
                  myEducation =
                    myEducation +
                    `
                    <div class="mt-1 p-1.5 rounded">
                    <div>
                      <h3 class="text-lg font-medium">${element?.university}</h3>
                      <p class="text-base text-gray-600">
                      ${element?.course}
                      </p>
                      <p class="text-sm text-gray-600">${element?.start_date}-${
                      element?.is_current ? "Currently studying" : element?.end_date
                    }</p>
                    </div>
                  </div>
                      
                    
              
                      `;
                });
                let myLanguage = "";
              
                res?.languages?.forEach((element) => {
                  myLanguage =
                    myLanguage +
                    `
                    <div class="mt-1 flex gap-x-4 px-2">
                    <p class="text-base">${element?.language}</p>
                  </div>
                    
                 
                  
              
                      `;
                });
                let myInterests = "";
              
                res?.interests?.forEach((element) => {
                  myInterests =
                    myInterests +
                    ` <p class="text-sm px-2">${element?.interest}</p>
                  
                   
               
                  
              
                      `;
                });
                let myCertificate = res?.certification?.map((item) => {
                  return `
                  <li>${item?.certificate}</li>
                  
                  `
                })?.join("");
                const videoQuestions = res?.video_questions?.filter((question) => question?.video !== null);


                let myVideos = "";
              
                videoQuestions?.forEach((element) => {
                  myVideos =
                  myVideos +
                    `
                  
                    <div>
                    <h2 class="text-base">${element?.question?.question}</h2>
                    <a href=${element?.video} class="text-sm">Answer</a>
                  </div>
                     
              
                      `;
                });
              
                let videoProfileHtml = '';
              
              if (videoQuestions.length !== 0) {
                videoProfileHtml = `
                
                  <div class="px-2">
                  <h1 class="font-semibold uppercase text-xl mt-4 text-emerald-500">
                    Video Profile
                  </h1>
                  <div class="flex gap-x-3">
                  ${myVideos}
                   
                  </div>
                </div>
                `;
              }
              const dynamicContent = document.getElementById('dynamic-content');
              dynamicContent.innerHTML = `  
              <div>
              <div class="main-container">
                <!-- header -->
                <div class="px-2">
                  <header class="flex justify-start gap-x-6 items-center">
                    <img
                      class="w-28 h-32 mt-4 rounded-md"
                      src=${res?.profile_picture}
                      alt="Demo Image"
                    />
                    <div>
                      <h1 class="font-semibold text-2xl">${res?.full_name}</h1>
                      <h3 class="font-medium text-gray-400 text-lg">${res?.position}</h3>
                      <p class="font-medium text-base">
                       ${res?.summary}
                      </p>
                    </div>
                  </header>
                </div>
                <!-- contact -->
                <div>
                  <section
                    class="flex bg-gray-200 font-semibold text-sm mt-2.5 text-emerald-500 justify-around items-center"
                  >
                    <h3>${res?.email}</h3>
                    <h3>${res?.mobile_no}</h3>
                    <h3>${res?.address}</h3>
                    <h3>
                     ${mySocial}
                    </h3>
                  </section>
                </div>
                <!-- skill -->
                <div class="px-2">
                  <h1 class="font-semibold uppercase text-xl mt-3 text-emerald-500">
                    Skills
                  </h1>
                  <div class="flex gap-x-2.5 flex-wrap mt-2.5">
                   ${mySkills}
                  </div>
                </div>
                <!-- workExp -->
                <div class="px-2">
                  <h1 class="font-semibold uppercase text-xl mt-4 text-emerald-500">
                    Work Experience
                  </h1>
                  <div>
                  ${myExperience}
                  </div>
                </div>
                <!-- Project -->
                <div class="px-2">
                  <h1 class="font-semibold uppercase text-xl mt-4 text-emerald-500">
                    Projects
                  </h1>
                  <div>
                   ${myProjects}
                  </div>
                </div>
                <!-- education -->
                <div class="px-2">
                  <h1 class="font-semibold uppercase text-xl mt-4 text-emerald-500">
                    Education
                  </h1>
                  <div>
                ${myEducation}
                  </div>
                </div>
                <!--language-->
                <div class="px-2">
                  <h1 class="font-semibold uppercase text-xl mt-4 text-emerald-500">
                    Languages
                  </h1>
                  <div class="flex gap-x-4">
            ${myLanguage}
                  </div>
                </div>
                <!--certificate-->
                <div class="px-2">
                  <h1 class="font-semibold uppercase text-xl mt-4 text-emerald-500">
                    Certifications
                  </h1>
                  <div>
                    <ul class="list-disc flex gap-x-1 list-inside">
                    ${myCertificate}
                    </ul>
                  </div>
                </div>
                <!-- interest -->
                <div class="px-2">
                  <h1 class="font-semibold uppercase text-xl mt-4 text-emerald-500">
                    Interests
                  </h1>
                  <div class="flex gap-x-3">
                ${myInterests}
                  </div>
                </div>
                <!-- video profile -->
             ${videoProfileHtml}
              </div>
            </div>
             `
          })
          .catch(error => {
              console.error('API request error:', error);
          });
  } else {
      // Handle the case when 'profile' parameter is not present
      console.error('Profile parameter is missing from the URL.');
  }
  