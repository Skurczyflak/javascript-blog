'use strict';

//List of links

const titleClickHandler = function(event){
    /* [DONE] prevent default action for clicked link */
    event.preventDefault();
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    const clickedElement = this;
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post.active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */
    const articleHref = clickedElement.getAttribute('href');
    console.log('articleName:', articleHref);
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const listArticles = document.querySelectorAll('.post');
    console.log('list of articles:', listArticles);
    let correctArticle = 0;

    for(let article of listArticles){
        const idArticle = article.getAttribute('id');
        if(articleHref === '#'+idArticle){
            correctArticle = idArticle;
        }
    }
    /* [DONE] add class 'active' to the correct article */
    console.log(correctArticle);
    const showArticle = document.getElementById(correctArticle);
    showArticle.classList.add('active'); 
  }
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
