'use strict';

//List of links

const titleClickHandler = function(event){
    /* [DONE] prevent default action for clicked link */
    event.preventDefault();
    /*[IN PROGRESS] Variables for easy access */
    const clickedElement = this;
    const activeLinks = document.querySelectorAll('.titles a.active');
    const activeArticles = document.querySelectorAll('.post.active');
    /* [DONE] remove class 'active' from all article links  */
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');
    /* [DONE] remove class 'active' from all articles */
    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */
    const articleName = clickedElement.getAttribute('href');
    console.log('articleName:', articleName);
    /* [IN PROGRESS] find the correct article using the selector (value of 'href' attribute) */
  
    /* [IN PROGRESS] add class 'active' to the correct article */
  }
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
