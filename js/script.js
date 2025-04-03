'use strict';

//List of links


const clickLinkHandler = function() {
    const clickedElement = this;
    clickedElement.classList.add('active');
    const articleName = clickedElement.getAttribute('href');
    console.log('articleName:', articleName);
}

const titleClickHandler = function(event){
    console.log('Link was clicked!');
    console.log('event:', event);
    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /* add class 'active' to the clicked link */
    const clickedElement = this;
    clickedElement.classList.add('active');
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post.active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
  
    /* find the correct article using the selector (value of 'href' attribute) */
  
    /* add class 'active' to the correct article */
  }
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
