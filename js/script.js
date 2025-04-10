'use strict';

const optArticleSelector = '.post',
optTitleSelector = '.post-title',
optTitleListSelector = '.titles',
optArticleTagsSelector = '.post-tags .list',
optArticleTagsLinksSelector = '.post-tags .list a',
optArticleAuthorSelector = '.post .post-author',
optArticleAuthorLinksSelector = '.post-author a',
optTagsListSelector = '.tags.list';

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

  const href = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(href);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');

}

//Function GenerateTitleLinks

const generateTitleLinks = function(customSelector = ''){
  /* Create html link and save it in 'const' */
  let html = '';
  /* Delate content of links in left column */
  const linkSelector = document.querySelector(optTitleListSelector);
  linkSelector.innerHTML = "";
  /* For every article element */
  const articlesSelector = document.querySelectorAll(optArticleSelector + customSelector);
  for(let Article of articlesSelector){
      /* Read 'id' and save it in 'const' */
      const idArticle = Article.getAttribute('id');
      /* Find element 'title' and save it in 'const' */
      const titleArticle = Article.querySelector(optTitleSelector).innerHTML;
      /* Create html link and save it in 'const' */
      const linkArticle = '<li><a href="#'+idArticle+'"><span>'+titleArticle+'</span></a></li>';
      /* Put created link in list of links in left column */
      html += linkArticle;
  }
  linkSelector.innerHTML += html;
  const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
}

generateTitleLinks();

function generateTags (){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = [];
  /* find all articles */
  const articlesSelector = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articlesSelector){
    /* find tags wrapper */
    const tagSelector = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      /* generate HTML of the link */
      const linkTag = '<li><a href="#tag-'+tag+'">'+tag+'</a></li>';
      /* [NEW] check if this link is NOT already in allTags */
      html += linkTag;
      /* add generated code to html variable */
      if(allTags.indexOf(linkTag) == -1){
        /* [NEW] add generated code to allTags array */
        allTags.push(linkTag);
      }
    }
    /* END LOOP: for each tag */
    tagSelector.innerHTML = html;
    /* insert HTML of all the links into the tags wrapper */

    /* END LOOP: for every article: */

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] add html from allTags to tagList */
    tagList.innerHTML = allTags.join(' ');
  }
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-','');
  /* find all tag links with class active */
  const activeTags =  document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for(let activeTag of activeTags){
    /* remove class active */
    activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
   /* find all tag links with "href" attribute equal to the "href" constant */
  const taglinks =  document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let link of taglinks){
    /* add class active */
    link.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tags = document.querySelectorAll(optArticleTagsLinksSelector);
  /* START LOOP: for each link */
  for(let tag of tags){
          /* add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();

/* Generate Authors */

function generateAuthors (){
  /* find all articles */
  const articlesSelector = document.querySelectorAll(optArticleSelector);
/* START LOOP: for every article */
  for(let article of articlesSelector){
    /* find tags wrapper */
    const authorSelector = article.querySelector(optArticleAuthorSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleAuthors = article.getAttribute('data-author');
    /* split tags into array */
    const author = articleAuthors.split("-");
    /* generate HTML of the link */
    const linkAuthor = 'by <a href="#author-'+articleAuthors+'">'+author[0]+' '+author[1]+'</a>';
    /* add generated code to html variable */
    html += linkAuthor;
    /* insert HTML of all the links into the tags wrapper */
    authorSelector.innerHTML = html;
  }
  /* END LOOP: for every article */
}

generateAuthors ();

function authorClickHandler(event){
  event.preventDefault();
  /* prevent default action for this event */
  const clickedElement = this;
  /* make new constant named "clickedElement" and give it the value of "this" */
  const href = clickedElement.getAttribute('href');
  /* make new constant named "clickedElement" and give it the value of "this" */
  const author = href.replace('#author-','');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const activeAuthors =  document.querySelectorAll('a.active[href^="#author-"]');
  /* find all authors links with class active */
  for(let activeAuthor of activeAuthors){
    /* START LOOP: remove class active from each active author link */
    activeAuthor.classList.remove('active');
  }
  /* END LOOP: remove class active from each active author link */
  const authorlinks =  document.querySelectorAll('a[href="' + href + '"]');
  /* find all author links with "href" attribute equal to the "href" constant */
  for(let link of authorlinks){
    /* START LOOP: add class active to each found author link */
    link.classList.add('active');
  }
  /* END LOOP: add class active to each found author link */
  generateTitleLinks('[data-author="' + author + '"]');
  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToAuthors(){
  const tags = document.querySelectorAll(optArticleAuthorLinksSelector);
  /* find all links to tags */
  for(let tag of tags){
    /* START LOOP: for each link */
    tag.addEventListener('click', authorClickHandler);
    /* add tagClickHandler as event listener for that link */
  }
  /* END LOOP: for each link */
}
addClickListenersToAuthors();
