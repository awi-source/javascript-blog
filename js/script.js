
'use strict';

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
};
  
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';
      
function generateTitleLinks(){
  console.log(generateTitleLinks); 
  const titleList = document.querySelector(optTitleListSelector);
  console.log(titleList); 
    
  let html = '';
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){
    console.log(article);

    const articleId = article.getAttribute('id');
    console.log(articleId);
  
 
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);
   
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
 
    html = html + linkHTML;

  }
  titleList.innerHTML = html;
  console.log(html);

  const links = document.querySelectorAll('.titles a');
  console.log(links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  
  /* START LOOP: for every article: */
  for(let article of articles){
  /* find tags wrapper */

  /* make html variable with empty string */

  /* get tags from data-tags attribute */

  /* split tags into array */

  /* START LOOP: for each tag */

  /* generate HTML of the link */

  /* add generated code to html variable */

  /* END LOOP: for each tag */

  /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */
  }
}

generateTags();