function showPage(list, page){
   let startIndex = (page * 9) - 9;
   let endIndex = page * 9;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   for(let i = 0; i < list.length; i++){
      if(i >= startIndex && i < endIndex) {
         studentList.insertAdjacentHTML("beforeend" ,
         `<li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
               <h3 class="students">${list[i].name.first} ${list[i].name.last}</h3>  
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>
         `);
      }
   }
}

showPage(data, 1);
addPagination(data);

function addPagination(list) {
   if(list.length === 0){
      const studentList = document.querySelector('.student-list');
      const linkList = document.querySelector('.link-list');
      studentList.innerHTML = '';
      linkList.innerHTML = '';
      studentList.innerHTML =
      `<h1>No results found</h1>`;
      return;
   }
   let numOfPages = Math.ceil(list.length / 9);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   for(let i = 0; i < numOfPages; i++){
      linkList.insertAdjacentHTML("beforeend", 
      `
      <li>
         <button type="button" class="pg-btn">${i + 1}</button>
      </li>   
      `);
   }
   const pageButton = document.querySelectorAll('.pg-btn')[0];
   pageButton.classList.add('active');
   linkList.addEventListener('click', (e) => {
      if(e.target.tagName === 'BUTTON'){
         document.querySelector('.active').classList.remove('active');
         e.target.classList.add('active');
         showPage(list, e.target.textContent);
      }
   });    
}


/* Extra Credits */

const header = document.querySelector('header');
header.insertAdjacentHTML("beforeend",
   `<label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name..."> 
      <button type="button" id = "search-button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `);

header.addEventListener('keyup', (e) => {
   e.preventDefault();
   if(e.target.id === 'search'){
      performSearch(data);
   }
});

function performSearch(list){
   const search = document.querySelector('#search');
   const searchInput = search.value.toLowerCase();
   const searchList = [];
   let searchName = '';
   for(let i = 0; i < list.length; i++){
      searchName = `${list[i].name.first.toLowerCase()} ${list[i].name.last.toLowerCase()}`;    
      if(searchInput !== 0 && searchName.includes(searchInput)){        
         searchList.push(list[i]);
      }else if (searchInput === 0){
         showPage(data, 1);
         addPagination(data); 
      }    


   }
   showPage(searchList, 1);
   addPagination(searchList); 
}