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
console.log(generateTitleLinks);
  /* [DONE] remove contents of titleList */
const titlelist = document.querySelector(optTitleListSelector);
console.log(titlelist);
titlelist.innerHTML='';
  /* [DONE] for each article */
const articles = document.querySelectorAll(optArticleSelector);
for(let article of articles){
  console.log(article);
}
    /* [IN PROGRESS] get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);
    /* find the title element */
    
    /* get the title from the title element */
  const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(span);
    /* insert link into titleList */
    titleList.innerHTML = titleList.innerHTML + linkHTML;
}

generateTitleLinks();

}