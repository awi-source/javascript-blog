'use strict';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  //console.log('Link was clicked!');
  //console.log(event);
 
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    //console.log(activeLink);
  }
  
  //console.log('clickedElement (with plus):' +  clickedElement);
  clickedElement.classList.add('active'); 
    
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
    //console.log(activeArticle);
  }
    
  const articleSelector = clickedElement.getAttribute('href');
  //console.log(articleSelector);
   
  const targetArticle = document.querySelector(articleSelector);
  //console.log(targetArticle);
    
  targetArticle.classList.add('active');
};
  
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list';

      
const generateTitleLinks = function(customSelector = ''){
  //console.log(generateTitleLinks); 
  const titleList = document.querySelector(optTitleListSelector);
  //console.log(titleList); 
    
  let html = '';
  // const articles = document.querySelectorAll(optArticleSelector);
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  // console.log(articles);
  // console.log(customSelector);
  // console.log(optArticleSelector + customSelector);

  for(let article of articles){
    //console.log(article);

    const articleId = article.getAttribute('id');
    //console.log(articleId);
  
 
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    //console.log(articleTitle);
   
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log(linkHTML);
 
    html = html + linkHTML;

  }
  titleList.innerHTML = html;
  //console.log(html);

  const links = document.querySelectorAll('.titles a');
  //console.log(links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }


  generateTitleLinks();
  // console.log(generateTitleLinks);

  const generateTags = function(){
    /* [NEW] create a new variable allTags with an empty array */
    let allTags = [];
    console.log(allTags);
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    //const articles = document.querySelectorAll(optArticleSelector + customSelector);
    /* START LOOP: for every article: */
    for(let article of articles){
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      //console.log(tagsWrapper);
      /* make html variable with empty string */
      let html = '';
      //console.log(html);
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      //console.log(articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      //console.log(articleTagsArray);
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
      //console.log(tag);
      /* generate HTML of the link */
        const tagHTML = '<li><a href="#tag-' + tag + '">'  + tag + '</a></li>';
        console.log(tagHTML);
        /* add generated code to html variable */
        //html = `${html} ${tagHTML}`;
        html = html + tagHTML + '  ';
        //console.log(html);
        /* [NEW] check if this link is NOT already in allTags */
        if(allTags.indexOf(linkHTML) == -1){ 
        // /* [NEW] add generated code to allTags array */
         allTags.push(linkHTML);
        //if(allTags.indexOf(tagHTML) == -1){ 
        //   /* [NEW] add generated code to allTags array */
        //allTags.push(tagHTML);
        }
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');
    /* [NEW] add html from allTags to tagList */
    tagList.innerHTML = allTags.join(' ');
    console.log(allTags);
  }

  generateTags();

  //function tagClickHandler(event){
  const tagClickHandler = function(event){
  
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log(this);
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', ''); 
    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    //const activeTags = document.querySelectorAll('a[href"'+ href + '"]');
    /* START LOOP: for each active tag link */
    for(let activeTag of activeTags){
      console.log(activeTag);
      /* remove class active */
      activeTag.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href +'"]');
    /* START LOOP: for each found tag link */
    for(let tagLink of tagLinks){
      /* add class active */
      tagLink.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
    console.log(generateTitleLinks);
  };

  const addClickListenersToTags = function(){
    
    /* find all links to tags */
    const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
    console.log(allLinksToTags);
    /* START LOOP: for each link */
    for(let linkToTag of allLinksToTags){
      /* add tagClickHandler as event listener for that link */
      linkToTag.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  };

  addClickListenersToTags();
  //}

  const generateAuthors = function(){
  //find all articles
    const articles = document.querySelectorAll(optArticleSelector);
    //start LOOP of every article
    for(let article of articles){
      //find author wrapper
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      //make html variable with empty string
      let html ='';
      //get authors from data-author attribute
      const articleAuthor = article.getAttribute('data-author');
      //generate HTML code of the author description
      const authorHTML = 'by ' + '<a href="#author-' + articleAuthor + '">' +  articleAuthor + '</a>';
      //add generated code to the html variable
      html = html + authorHTML;  
      //inser authorHTML into author wrapper
      authorWrapper.innerHTML = html;
      //end LOOP
    }
  };
  generateAuthors();

  const authorClickHandler = function(event){
  //prevent default action
    event.preventDefault();
    //make new constant - clickedElement
    const clickedElement = this;
    //make new constant hreff of the clickedElement
    const href = clickedElement.getAttribute('href');
    //make const author and extract articleAuthor from the href const
    const author = href.replace('#author-', '');
    //const activeAuthors
    const activeAuthors = document.querySelectorAll('a.active[href^="#author"]');
    //start LOOP
    for(let chosenAuthor of activeAuthors){
    //remove class active
      chosenAuthor.classList.remove('active');
    //end LOOP
    }
    //find all links to authors with href equal to href const
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    //start LOOP
    for(let authorLink of authorLinks){
    //add class active
      authorLink.classList.add('active');
    //end LOOP
    }
    //execute generateTitleLink with appropriate selector
    generateTitleLinks('[data-author="' + author + '"]');
  };


  const addClickListenerToAuthors = function(){
  //find all links to authors
    const LinksToAuthors = document.querySelectorAll('a[href^="#author-"]');
    //start LOOP
    for(let LinkToAuthor of LinksToAuthors){
      LinkToAuthor.addEventListener('click', authorClickHandler);
    //end LOOP
    }
  };
  addClickListenerToAuthors();
  };