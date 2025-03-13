const loadcatagoryBtn=()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res=>res.json())
    .then(data=>loadcatagoryShowBtn(data.categories))

}

const loadVedioByCatagory=(id)=>{
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then(res=>res.json())
  .then(data=>showVedios(data.category))
  
}


const loadcatagoryShowBtn=(categories)=>{
  const categoryBtnSection=document.getElementById('category-btn-section');
  categories.forEach(cat => {
    const div=document.createElement('div');
    div.innerHTML=`
    <button onClick='loadVedioByCatagory(${cat.category_id})' class=" btn  btn border-[1px] hover:bg-[#FF1F3D] px-4  hover:text-white">${cat.category}</button>
    `
    categoryBtnSection.appendChild(div)

  });
}



const loadVideo=(searchtext="")=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchtext}`)
    .then(res=>res.json())
  .then(data=>{showVedios(data.videos),document.getElementById('all').classList='active px-4 py-2'})
}

const showVedios=(vedios)=>{
   const videomainsection=document.getElementById('video-main-section');
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
}



loadcatagoryBtn()
loadVideo()
