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
    clickedElement.classList.add('active');
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post.active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');

  }

  //Function GenerateTitleLinks

  const generateTitleLinks = function(){
    /* Create html link and save it in 'const' */
    let html = '';
    /* Delate content of links in left column */
    const linkSelector = document.querySelector('.list.titles'); 
    linkSelector.innerHTML = "";
    /* For every article element */
    const articlesSelector = document.querySelectorAll('.post');

    for(let Article of articlesSelector){
        /* Read 'id' and save it in 'const' */
        const idArticle = Article.getAttribute('id');
        /* Find element 'title' and save it in 'const' */
        const titleArticle = Article.querySelector('.post-title').innerHTML;
        /* Create html link and save it in 'const' */
        const linkArticle = '<li><a href="#'+idArticle+'"><span>'+titleArticle+'</span></a></li>';
        /* Put created link in list of links in left column */
        html += linkArticle;
    }
    linkSelector.innerHTML += html;
  }

  generateTitleLinks();
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
