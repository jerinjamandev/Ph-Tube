


function showLoading() {
  document.getElementById("video-main-section").classList='hidden';
  document.getElementById("loading").classList='flex lex flex-col items-center mt-4';
}

function hiddenLoading() {
  document.getElementById("video-main-section").classList='grid grid-cols-3 gap-4';
  document.getElementById("loading").classList='hidden';
}



function removeCalss() {
  const ActivesButton= document.getElementsByClassName("active");
  console.log(ActivesButton);
  for (let btn of ActivesButton) {
    btn.classList.remove("active");
  }
}


function loadVideo(search=''){
  showLoading()
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${search}`)
  .then(res=>res.json())
  .then(data=>{
    setTimeout(() => {
      displayVideos(data.videos)
    }, 2000),
    removeCalss()

    document.getElementById("all").classList.add("active");
  })
}
function loadVideobyCategory(id){
  showLoading()
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then(res=>res.json())
  .then(data=>{
    setTimeout(() => {
      displayVideos(data.category)
    }, 2000),
    removeCalss()

    document.getElementById(`btn-${id}`).classList.add("active");
    
  })
}






function buttonCategory() {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
  .then(res=>res.json())
  .then(data=>displayCategories(data.categories))
}







const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-main-section");

  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    videoContainer.innerHTML = `
    <div
        class="py-20 col-span-full flex flex-col justify-center items-center text-center"
      >
        <img class="w-[120px]" src="./Icon.png" alt="" />
        <h2 class="text-2xl font-bold">
          Oops!! Sorry, There is no content here
        </h2>
      </div>
    `;
    hiddenLoading()
  }

  videos.forEach((video) => {
    // console.log(video);

    const videoCard = document.createElement("div");

    videoCard.innerHTML = `
     <div class="card bg-base-100">
        <figure class="relative">
          <img class="w-full h-[150px] object-cover" src="${
            video.thumbnail
          }" alt="Shoes" />
          <span
            class="absolute bottom-2 right-2 text-sm rounded text-white bg-black px-2"
            >3hrs 56 min ago</span
          >
        </figure>

        <div class="flex gap-3 px-0 py-5">
          <div class="profile">
            <div class="avatar">
              <div
                class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2"
              >
                <img
                  src="${video.authors[0].profile_picture}"
                />
              </div>
            </div>
          </div>

          <div class="intro">
            <h2 class="text-sm font-semibold">${video.title}</h2>
            <p class="text-sm text-gray-400 flex gap-1">
             ${video.authors[0].profile_name}
              ${
                video.authors[0].verified == true
                  ? `<img
                class="w-5 h-5"
                src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"
                alt=""
              />`
                  : ``
              }
            </p>
            <p class="text-sm text-gray-400">${video.others.views} views</p>
          </div>

        </div>
        <button onClick="singleVideo()" class="btn btn-block">Show Details</button>
      </div>
    
    `;
    //append
    videoContainer.append(videoCard);
  });
  hiddenLoading()
};



function displayCategories(categories) {
  const categoryButtonSection=document.getElementById('category-btn-section')
 
   categories.forEach(cat => {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML=`
        <button id='btn-${cat.category_id}' onClick='loadVideobyCategory(${cat.category_id})' class="px-4  btn border-[1px]  hover:bg-[#FF1F3D]  hover:text-white">${cat.category}</button>
     `
     categoryButtonSection.appendChild(categoryDiv)
   });
}




function singleVideo() {
  document.getElementById('my_modal_1').showModal()

  document.getElementById('show-detials').innerHTML=`<div>
  <p>hello</p>

     <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
          </form>
        </div>
  </div>`
}




buttonCategory()


document.getElementById('searchInput').addEventListener('input',function () {
  const inputValue=document.getElementById('searchInput').value;
  loadVideo(inputValue)
})

loadVideo('')






















