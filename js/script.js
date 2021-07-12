/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
let itemsPerPage = 9; // The number of student items to be displayed on a single page i.e 9.(Note: Global Scope.)
function showPage(list, page) {
   let startIndex = (page * itemsPerPage) - itemsPerPage; // represents the index for the first student on the page
   let endIndex = page * itemsPerPage; // represents the index for the last student on the page
   const studentList = document.querySelector('.student-list'); // selecting student-list class and assigning it to the variable studentList
   studentList.innerHTML = ''; // innerHTML to be empty string in case any pre-elements exists
   for(let i = 0; i < list.length; i++ ){ // loop is generated till the total student items
      if(i >= startIndex && i < endIndex) { // conditional statement generates only 9 student items
       studentList.insertAdjacentHTML("beforeend" , // placing the DOM elements inside the an element with studentList class 
         `
         <li class="student-item cf">
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

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   let numOfPages = Math.ceil(list.length / itemsPerPage); // calculate Total number of pages required, using ceil method
   const linkList = document.querySelector('.link-list'); // select the element with a class of `link-list` and assign it to a variable
   linkList.innerHTML = '';    //innerHTML to be empty string in case any pre-elements exists
   for (let i = 0; i < numOfPages; i++){ // loop over the number of pages needed
      linkList.insertAdjacentHTML("beforeend", 
      `<li>
         <button type="button">${i + 1}</button>
      </li>
      `);
   }
   const button = document.querySelector('button'); // select the button element
   button.className = 'active'; // assign a class named 'active' to the first button
   linkList.addEventListener('click', (e) => { // The 'active' Class is reassigned to the target button
      if(e.target.tagName === 'BUTTON'){
         document.querySelector('.active').className = '';
         e.target.className = 'active';
         showPage(list, e.target.textContent);
      }
   });
   
}
showPage(data, 1); // Call function showPage()
addPagination(data); // Call functions addPagination()

/*
   Creating a search bar and adding it to the webpage
   The HTML part is adopted to the project from the Project Instructions.
*/

const header = document.querySelector('.header'); // accessing/selecting the header class
header.insertAdjacentHTML("beforeend",  // Adding the search bar to the DOM elements
   `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name..."> 
      <button type="button" id = "search-button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`
   );


/*
Adding functionality to the search bar
*/
const ul = document.querySelector('.student-list');
const search = document.querySelector('#search');  // Search bar 'input' is selected and assigned to search variable
const searchButton = document.querySelector('#search-button'); // search 'button' is selected and assigned to searchButton variable
// const ul = document.querySelector('.student-list'); // selecting the ul element with class name 'student-list' to append future elements
function performSearch(list){ // created a function performSearch with its parameter list.
   let newList = []; // create an empty array named newList
   const searchInput = search.value.toLowerCase(); // store the search value with lowercase in searchInput variable
   for(let i = 0; i < list.length; i++) { // loop over all the students list
      let names = `${list[i].name.first.toLowerCase()} ${list[i].name.last.toLowerCase()}`; // assigning a string using template literal to names variable
      if(searchInput.value != 0 && names.includes(searchInput)){ //Check any matching names from the students list
         newList.push(list[i]); // assign all the matching studentlist to an array named 'newList'
         console.log(newList);        
      }
      showPage(newList, 1); // calling the showPage function to display the new list of students
      addPagination(newList); // calling the addPagination function to display the page buttons based on the new list of students
      if(newList.length === 0){ //  If no matche are found
         let h1 = document.createElement('h1'); // create h1 element in the DOM
         h1.textContent = "No results found :("; // h1 textContent
         h1.style.fontSize = "32px"; 
         ul.appendChild(h1); // append the h1 element to display the h1 element

      }
   }
}

searchButton.addEventListener('click', (event) => { // Event listener when search button is clicked to show the resuls of the studentlist
   event.preventDefault(); // remove default settings of the click event
   performSearch(data);   // calling the performSearch function
});
   
search.addEventListener('keyup', () => { // Event listener dynamically/ real time search based on the keyboard entry: suggested in the project instructions
   performSearch(data); // calling the performSearch function   
});
