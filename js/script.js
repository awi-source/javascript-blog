'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorTagLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorRightLink: Handlebars.compile(document.querySelector('#template-author-right-link').innerHTML)
}

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;

 
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  
  clickedElement.classList.add('active');  
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
    
  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add('active');
};
  
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.list.authors';

      
const generateTitleLinks = function(customSelector = ''){ 
  const titleList = document.querySelector(optTitleListSelector);
  let html = '';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  for(let article of articles){
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;  
    const linkHTMLData = {id: articleId, title: articleTitle};
const linkHTML = templates.articleLink(linkHTMLData);
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

};
generateTitleLinks();

const calculateTagsParams = function(tags){
  const params = {
    max: 0,
    min: 999999
  };
  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max= tags[tag];
    }
  }
  for(let tag in tags){
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
    return params;
  }
};

const calculateTagClass = function(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  return Math.floor( percentage * (optCloudClassCount - 1) + 1 );
};

const generateTags = function(){
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for(let tag of articleTagsArray){
      const tagHTMLData = {tag: tag};
      const tagHTML = templates.articleTagLink(tagHTMLData);
      html = html + tagHTML + '  ';
      if(!allTags[tag]) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;  
      }  
    }
    tagsWrapper.innerHTML = html;
  }

  const tagList = document.querySelector('.tags');
  const tagsParams = calculateTagsParams(allTags);
  const allTagsData = {tags:[]};

  for(let tag in allTags){
   allTagsData.tags.push({
    tag: tag,
    count: allTags[tag],
    className: calculateTagClass(allTags[tag], tagsParams)
  });
  } 
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
};

generateTags();

const tagClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', ''); 
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  for(let activeTag of activeTags){
    activeTag.classList.remove('active');
  }

  const tagLinks = document.querySelectorAll('a[href="' + href +'"]');
  for(let tagLink of tagLinks){
    tagLink.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
};

const addClickListenersToTags = function(){
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
  for(let linkToTag of allLinksToTags){ 
    linkToTag.addEventListener('click', tagClickHandler);  
  }
};

addClickListenersToTags();

const generateAuthors = function(){
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    let html ='';

    const articleAuthor = article.getAttribute('data-author');
    const authorHTMLData = {author: articleAuthor};
    const authorHTML = templates.authorTagLink(authorHTMLData);

    html = html + authorHTML;  

    if(!allAuthors[articleAuthor]){
      allAuthors[articleAuthor] = 1; 
    } else {
      allAuthors[articleAuthor] ++;
    }
    authorWrapper.innerHTML = html;
  }

  const authorsList = document.querySelector(optAuthorsListSelector);
  const allAuthorsData = {authors: []};

  for(let articleAuthor in allAuthors) {
    allAuthorsData.authors.push({
    author: articleAuthor,
    authorCount: allAuthors[articleAuthor]
    });
  }
  authorsList.innerHTML = templates.authorRightLink(allAuthorsData);
};
  
generateAuthors();

const authorClickHandler = function(event){

  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const activeAuthors = document.querySelectorAll('a.active[href^="#author"]');

  for(let chosenAuthor of activeAuthors){
    chosenAuthor.classList.remove('active');
  }

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
 
  for(let authorLink of authorLinks){
    authorLink.classList.add('active');
  }
  
  generateTitleLinks('[data-author="' + author + '"]');
};

const addClickListenerToAuthors = function(){
  const LinksToAuthors = document.querySelectorAll('a[href^="#author-"]');
  for(let LinkToAuthor of LinksToAuthors){
    LinkToAuthor.addEventListener('click', authorClickHandler);
  }
};
addClickListenerToAuthors();
