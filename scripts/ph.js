const hiddenLoading=()=>{
  document.getElementById('loading').classList='hidden';
  document.getElementById('video-main-section').classList='grid grid-cols-3 gap-4';

}

const showLoading=()=>{
  document.getElementById('loading').classList='flex flex-col items-center mt-4';
  document.getElementById('video-main-section').classList='hidden';
}


document.getElementById('searchInput').addEventListener('input',function(){
  const inputValue=document.getElementById('searchInput').value ;
  loadVideo(inputValue)
})



const loadcatagoryBtn=()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res=>res.json())
    .then(data=>loadcatagoryShowBtn(data.categories))

}
const removeBg=()=>{
  const activeBtn=document.getElementsByClassName('active');
    for (let btn  of activeBtn) {
      btn.classList.remove('active')
    }
  }

const loadVedioByCatagory=(id)=>{
  showLoading()
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then(res=>res.json())
.then(data=>{showVedios(data.category),document.getElementById(`btn-${id}`).classList='active px-4 py-2',removeBg()})

  
}


const loadcatagoryShowBtn=(categories)=>{
  const categoryBtnSection=document.getElementById('category-btn-section');
  categories.forEach(cat => {
    const div=document.createElement('div');
    div.innerHTML=`
    <button id="btn-${cat.category_id}" onClick='loadVedioByCatagory(${cat.category_id})' class=" btn  btn border-[1px] hover:bg-[#FF1F3D] px-4  hover:text-white">${cat.category}</button>
    `
    categoryBtnSection.appendChild(div)

  });
}



const loadVideo=(searchtext="")=>{
    showLoading()
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchtext}`)
    .then(res=>res.json())
  .then(data=>{showVedios(data.videos),document.getElementById('all').classList='active px-4 py-2',removeBg()})
}

const showVedios=(vedios)=>{
   const videomainsection=document.getElementById('video-main-section');
   if(vedios.length===0){
    videomainsection.innerHTML=` <div
    class="py-20 col-span-full flex flex-col justify-center items-center text-center"
  >
    <img class="w-[120px]" src="./Icon.png" alt="" />
    <h2 class="text-2xl font-bold">
      Oops!! Sorry, There is no content here
    </h2>
  </div>`;
    hiddenLoading()
    return
   }

   videomainsection.innerHTML=''
   vedios.forEach(video=>{
    console.log(video);
    const div=document.createElement('div')
    div.innerHTML=`

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
    `

    videomainsection.appendChild(div)

   })

   hiddenLoading()
}



loadcatagoryBtn()
loadVideo()
