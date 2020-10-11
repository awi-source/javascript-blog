{
  'use strict'

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);
 
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
      console.log(activeLink);
    }
  
      console.log('clickedElement (with plus):' +  clickedElement);
      clickedElement.classList.add('active');
    
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
      console.log(activeArticle);
    }
    
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);
   
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);
    
    targetArticle.classList.add('active');
  }
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* [DONE] remove contents of titleList */
const titlelist = document.querySelector(optTitleListSelector);
console.log(titlelist);
titlelist.innerHTML='';
  /* [IN PROGRESS] for each article */

    /* get the article id */

    /* find the title element */

    /* get the title from the title element */

    /* create HTML of the link */

    /* insert link into titleList */

}

generateTitleLinks();

}