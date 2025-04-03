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

    /* My method */
    // const articleHref = clickedElement.getAttribute('href');
    // console.log('articleName:', articleHref);

    /* Module method */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    /* My method */
    // const listArticles = document.querySelectorAll('.post');
    // console.log('list of articles:', listArticles);
    // let correctArticle = 0;

    // for(let article of listArticles){
    //     const idArticle = article.getAttribute('id');
    //     if(articleHref == '#'+idArticle){
    //         correctArticle = idArticle;
    //     }
    // }

    /* Module method */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */

    /* My method */
    // console.log(correctArticle);
    // const showArticle = document.getElementById(correctArticle);
    // showArticle.classList.add('active'); 

    /* Module method */
    targetArticle.classList.add('active');

  }

  //Function GenerateTitleLinks

  const generateTitleLinks = function(){

    /* Delate content of links in left column */
    const linkSelector = document.querySelector('.list.titles'); 
    console.log(linkSelector);
    linkSelector.innerHTML = "";
    /* For every article element */
    const articlesSelector = document.querySelectorAll('.post');
    console.log(articlesSelector);

    for(let Article of articlesSelector){
        /* Read 'id' and save it in 'const' */
        const idArticle = Article.getAttribute('id');
        console.log(idArticle); 
        /* Find element 'title' and save it in 'const' */
        const tittleArticle = Article.querySelector('.post-title').innerHTML;
        console.log(tittleArticle);
        /* Create html link and save it in 'const' */
        const linkArticle = '<li><a href="#'+idArticle+'"><span>'+tittleArticle+'</span></a></li>';
        console.log(linkArticle)
        /* Put created link in list of links in left column */
        linkSelector.innerHTML += linkArticle;
    }
  }

  generateTitleLinks();
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
