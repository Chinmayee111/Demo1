fetch("/task1/sections.json")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then(data => {
    data.forEach(displaySection);
  })
  .catch((error) => console.error("FETCH ERROR:", error));

  function displaySection(data) {
    const section = data;
    const primaryDiv = document.getElementById("primary");

    const sectionDiv = document.createElement("div");

    sectionDiv.id = 'section_'+section.sectionId;
    sectionDiv.classList.add("section");
    primaryDiv.appendChild(sectionDiv);
    const sectionName = section.sectionName;
    const heading = document.createElement("h1");
    heading.innerHTML = sectionName;
    sectionDiv.appendChild(heading);

    const sectionImg = document.createElement("img");
    sectionImg.src = "heroImages/"+section.sectionUrl;
    sectionDiv.appendChild(sectionImg);

    const sectionArticle = document.createElement("div");
    sectionArticle.id ='section_articles_'+section.sectionId;
    sectionDiv.appendChild(sectionArticle);

    fetch("/task1/articles.json")
    .then((response) => {
        if (response.ok) {
        return response.json();
        } else {
        throw new Error("NETWORK RESPONSE ERROR");
        }
    })
    .then(articles => {
        var sectionArticles = articles.filter(function(item){return item.sectionId == section.sectionId;});
        
        sectionArticles.forEach(val => {
            var counter = 0;
            val.articleList.forEach(article => {
                const articleDiv = document.getElementById("section_articles_" + val.sectionId);
                if (counter==4) {
                    var link = document.createElement("a");
                    link.innerHTML = 'See All';
                    link.setAttribute("href", "#");
                    articleDiv.appendChild(link);
                } else if(counter<4) {   
                    var articleTitle= article.articleTitle;
                    var title = document.createElement("p");
                    title.innerHTML = articleTitle;
                    articleDiv.appendChild(title);
                }
                counter++;
            });
        });
    })
    .catch((error) => console.error("FETCH ERROR:", error));
    
  }

  fetch("/task1/articles.json")
    .then((response) => {
        if (response.ok) {
        return response.json();
        } else {
        throw new Error("NETWORK RESPONSE ERROR");
        }
    })
    .then(data => {
        // var sectionArticles = articles.filter(function(item){return item.sectionId == section.sectionId;});
        const secondaryDiv = document.getElementById("secondary");

        data.forEach(val => {
            val.articleList.forEach(article => {
                var sideArticleDiv = document.createElement("div");
                sideArticleDiv.classList.add("articles");
                secondaryDiv.appendChild(sideArticleDiv);

                var title = document.createElement("p");
                title.innerHTML = article.articleTitle;
                sideArticleDiv.appendChild(title);

                const articleImg = document.createElement("img");
                articleImg.src = "articleimage/"+article.articleImage;
                articleImg.classList.add("sideImages");
                sideArticleDiv.appendChild(articleImg);
            });
        });
    })
    .catch((error) => console.error("FETCH ERROR:", error));