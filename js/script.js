'use strict';

//List of links

// const links = document.querySelectorAll('.titles a');
// console.log('links:', links);

// const clickLinkHandler = function() {
//     const clickedElement = this;
//     clickedElement.classList.add('active');
//     const articleName = clickedElement.getAttribute('href');
//     console.log('articleName:', articleName);
// }

// for(const link of links) {

//     link.addEventListener('click', clickLinkHandler)
// }
const titleClickHandler = function(event){
    console.log('Link was clicked!');
    console.log('event:', event);
    /* remove class 'active' from all article links  */
  
    /* add class 'active' to the clicked link */
  
    /* remove class 'active' from all articles */
  
    /* get 'href' attribute from the clicked link */
  
    /* find the correct article using the selector (value of 'href' attribute) */
  
    /* add class 'active' to the correct article */
  }
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
