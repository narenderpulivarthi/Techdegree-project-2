
/**
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


/** 
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/**
 * Create the `showPage` function with two parameters 'list' and 'page'.
 * This function will create and insert/append the elements needed to display a "page" of nine students
 * The list parameter represent student data that will be passed as an argument
 * The page parameter represent the page number.
 * List items per page is 9.
 */
const header = document.querySelector('header'); // Global variable.

function showPage(list, page){ 
   let startIndex = (page * 9) - 9; // the index of the list to be displayed as first item on the given page.
   let endIndex = page * 9; // // the index of the list to be displayed as first item on the given page.
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = ''; // selected the ul element and set the its innerHTML to empty string
   for(let i = 0; i < list.length; i++){ // loop over the list parameter
      if(i >= startIndex && i < endIndex) { // check if a particular list item satisfies the condition
         studentList.insertAdjacentHTML("beforeend" , // if satisfied, set the following data on the web page.
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

/** 
 * Create the `addPagination` function
 * This function will create and insert/append the elements needed for the pagination buttons
 * list parameter represent student data.
*/

function addPagination(list) {
   if(list.length === 0){ // if the  list array is empty perform the following.
      const studentList = document.querySelector('.student-list');
      const linkList = document.querySelector('.link-list');
      studentList.innerHTML = ''; //set ul element of studentList class innerHTML to empty.
      linkList.innerHTML = ''; // set ul element of linkList class innerHTML to empty.
      studentList.innerHTML = // set  ul element of studentList class innerHTML to the following.
      `<h1>No results found :( </h1> `;
      const h1 = document.querySelector('h1');
      h1.style.fontSize = "40px"; 
      return; // return without going further into the addPagination function
   }
   let numOfPages = Math.ceil(list.length / 9); // numOfPage variable represent the maximum number of pages to be displayed.
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   for(let i = 0; i < numOfPages; i++){ // Based on the list items displaye the required number of buttons
      linkList.insertAdjacentHTML("beforeend", 
      `
      <li>
         <button type="button" class="pg-btn">${i + 1}</button>
      </li>   
      `);
   }
   const pageButton = document.querySelectorAll('.pg-btn')[0]; // select the first page button and assign the class 'active'.
   pageButton.classList.add('active');
   linkList.addEventListener('click', (e) => { // when the page button is clicked:
      if(e.target.tagName === 'BUTTON'){
         document.querySelector('.active').classList.remove('active'); // 1.remove the class 'active' from the first button
         e.target.classList.add('active'); // add the class to the target button
         showPage(list, e.target.textContent); // based on the target button display the list items.
      }
   });    
}

showPage(data, 1); // called the function showPage with data and 1st page as arguments.
addPagination(data); // called the function addPagination with data as argument.

/* Extra Credits */


/**
 * Created a function 'createHtmlElements' with parameters: 
 * elementName : The element which is being created in the DOM.
 * property : That particular element's property which can be 'an attribute key' or 'content property'.
 * value : The value of that element's property.
 */


function createHtmlElements(elementName, property, value){ 
   const element = document.createElement(elementName);
   element[property] = value;   
   return element;
}

const label = createHtmlElements('label', 'for', 'search'); // 'label' element is set along with its attribute.
label.className = "student-search"; // A class is added to the label element
header.appendChild(label); // label is linked as child to header within DOM.
label.appendChild(createHtmlElements('span', 'textContent', 'Search by name')); //span element is set and linked as child to label within DOM
const input = createHtmlElements('input', 'placeholder', 'Search by name...'); // 'input' element is set along with its attribute.
input.id = "search"; // An id is given to the label element
label.appendChild(input);  // input is linked as child to label within DOM.
const searchButton = createHtmlElements('button', 'type', 'button'); // 'button' element is set along with its attribute assigned to variable searchButton.
searchButton.id = "search-button"; // An id is given to the button element
searchButton.innerHTML = `<img src="img/icn-search.svg" alt="Search icon">`; // button's innerHTML
label.appendChild(searchButton); // button is linked as child to label within DOM.

/**
 * 'keyup' event listener is added
 * It is triggered only when the input element with 'search' id has input of keyboard
 * added a conditional statement to target only the event element, preventing the element's hierarchy to bubble up
   and trigger other unnecessary events. (Event Bubbling concept implemented)
 * It is helpful in real-time search i.e search dynamically
 */

header.addEventListener('keyup', (e) => { 
   e.preventDefault(); // preventing the default settings to generate unnecessary functionality
   if(e.target.id === 'search'){
      performSearch(data); // calling the performSearch function if the condition is satisfied.
   }
});

/* 
   1. 'click' event listener is added
   2. It is triggered only when the button on search bar with 'search-button' id is clicked.
   3. added a conditional statement to target only the event element, preventing 
   the element's hierarchy to bubble up and trigger other unnecessary events. (Event Bubbling concept implemented)
*/
header.addEventListener('click', (e) => { 
   e.preventDefault(); 
   if(e.target.id === 'search-button'){ 
      performSearch(data); // calling the performSearch function if the condition is satisfied.
   }  
});
/* 
   1. performSearch function is set along with its parameter 'list';
   2. list parameter takes in the student list from data.js
*/

function performSearch(list){
   const search = document.querySelector('#search');
   const searchInput = search.value.toLowerCase(); // The input value on the search bar is stored in lower case in the searchInput variable
   const searchList = []; // set an array searchList to empty
   let searchName = ''; // set searchName variable with empty string.
   for(let i = 0; i < list.length; i++){ // run the list over the loop
      searchName = `${list[i].name.first.toLowerCase()} ${list[i].name.last.toLowerCase()}`;
      // based on the list index the student name is selected and stored in searchName.    
      if(searchInput !== 0 && searchName.includes(searchInput)){   
      // if the  input value is not empty and the searchName string has input character     
         searchList.push(list[i]); // then push that list items into the  searchList array
      }else if (searchInput.length === 0){ // if input value is empty, show the default page.
         showPage(data, 1); 
         addPagination(data); 
         return; // return without going further into the performSearch function.
      }    
   }
   showPage(searchList, 1); // based on the new searchList array call the function showpage and addPagination
   addPagination(searchList); 
}

/* The End */