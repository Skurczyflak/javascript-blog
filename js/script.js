'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML)
};

const opt = {
  ArticleSelector : '.post',
  TitleSelector : '.post-title',
  TitleListSelector : '.titles',
  ArticleTagsSelector : '.post-tags .list',
  ArticleTagsLinksSelector : '.list a[href^="#tag-"]',
  ArticleAuthorSelector : '.post .post-author',
  ArticleAuthorLinksSelector : 'a[href^="#author-"]',
  TagsListSelector : '.tags.list',
  CloudClassCount : 5,
  CloudClassPrefix : 'tag-size-',
  AuthorListSelector : '.list.authors'
};

// // Object options implementation in future projects
// const opts = {
//   tagSizes: {
//     count: 5,
//     classPrefix: 'tag-size-',
//   },
// };

// const select = {
//   all: {
//     articles: '.post',
//     linksTo: {
//       tags: 'a[href^="#tag-"]',
//       authors: 'a[href^="#author-"]',
//     },
//   },
//   article: {
//     tags: '.post-tags .list',
//     author: '.post-author',
//   },
//   listOf: {
//     titles: '.titles',
//     tags: '.tags.list',
//     authors: '.authors.list',
//   },
// };

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
  const linkSelector = document.querySelector(opt.TitleListSelector);
  linkSelector.innerHTML = "";
  /* For every article element */
  const articlesSelector = document.querySelectorAll(opt.ArticleSelector + customSelector);
  for(let Article of articlesSelector){
      /* Read 'id' and save it in 'const' */
      const idArticle = Article.getAttribute('id');
      /* Find element 'title' and save it in 'const' */
      const titleArticle = Article.querySelector(opt.TitleSelector).innerHTML;
      /* Create html link and save it in 'const' */
      const linkHTMLData = {id: idArticle, title: titleArticle};
      const linkArticle = templates.articleLink(linkHTMLData);
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

function calculateTagsParams(tags){
  const minMax = {
    max: 0,
    min: 0
  };
  let toArray = Object.values(tags);
  minMax.min = Math.min(...toArray);
  minMax.max = Math.max(...toArray);
  return minMax;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (opt.CloudClassCount - 1) + 1 );
  return opt.CloudClassPrefix + classNumber;
}

function generateTags (){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articlesSelector = document.querySelectorAll(opt.ArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articlesSelector){
    /* find tags wrapper */
    const tagSelector = article.querySelector(opt.ArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      /* generate HTML of the link */

      const linkHTMLData = {id: tag, title: tag};
      const linkTag = templates.tagLink(linkHTMLData);
      /* [NEW] check if this link is NOT already in allTags */
      html += linkTag;
      /* add generated code to html variable */
      if(!allTags[tag]){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    /* END LOOP: for each tag */
    tagSelector.innerHTML = html;
    /* insert HTML of all the links into the tags wrapper */

    /* END LOOP: for every article: */

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(opt.TagsListSelector);

    /* [NEW] create variable for all links HTML code */
    const allTagsData = {tags: []};
    const tagsParams = calculateTagsParams(allTags);
    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
  const tags = document.querySelectorAll(opt.ArticleTagsLinksSelector);
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
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};
  /* find all articles */
  const articlesSelector = document.querySelectorAll(opt.ArticleSelector);
/* START LOOP: for every article */
  for(let article of articlesSelector){
    /* find tags wrapper */
    const authorSelector = article.querySelector(opt.ArticleAuthorSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleAuthors = article.getAttribute('data-author');
    /* split tags into array */
    const author = articleAuthors.split("-");
    /* generate HTML of the link */
    const authorFullName = author[0] + ' ' + author[1];
    const linkHTMLData = {id: articleAuthors, title: authorFullName};
    const linkAuthor = templates.authorLink(linkHTMLData);
    /* add generated code to html variable */
    html += linkAuthor;
    /* insert HTML of all the links into the tags wrapper */
    authorSelector.innerHTML = html;

    /* [NEW] check if this link is NOT already in allAuthors */
    if(!allAuthors[articleAuthors]) {
    /* [NEW] add tag to allAuthors object */
      allAuthors[articleAuthors] = 1;
    }else {
      allAuthors[articleAuthors]++;
    }

    /* [NEW] find list of Authors in right column */
    const authorList = document.querySelector(opt.AuthorListSelector);

    /* [NEW] create variable for all links HTML code */
    const allAuthorsData = {writer: []};
    /* [NEW] START LOOP: for each tag in allAuthors: */
    for(let authors in allAuthors){
      const author = authors.split("-");
      /* [NEW] generate code of a link and add it to allAuthors */
      const authorFullName = author[0] + ' ' + author[1];
      allAuthorsData.writer.push({
        id: authors,
        count: allAuthors[authors],
        fullName: authorFullName

      });
      //allAuthorsHTML += '<li><a href="#author-'+authors+'">'+author[0]+' '+author[1]+'</a> (' + allAuthors[authors] + ') </li>';
    }
    /* [NEW] END LOOP: for each tag in allAuthors: */

    /*[NEW] add HTML from allAuthorsHTML to tagList */
    authorList.innerHTML = templates.authorListLink(allAuthorsData);

  /* END LOOP: for every article */
}
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
  const tags = document.querySelectorAll(opt.ArticleAuthorLinksSelector);
  /* find all links to tags */
  for(let tag of tags){
    /* START LOOP: for each link */
    tag.addEventListener('click', authorClickHandler);
    /* add tagClickHandler as event listener for that link */
  }
  /* END LOOP: for each link */
}
addClickListenersToAuthors();
