 // Code for moving to a specific section
 var allLink = document.querySelectorAll(".fixed-links");
 for (let i = 0; i < allLink.length; i++) {
       var url = window.location.href;
       if (url.lastIndexOf('#') > 0) {
             url = url.substring(0, url.lastIndexOf('#'))
       }
       let oldHref = allLink[i].href;
       allLink[i].href = url + allLink[i].href.substring(allLink[i].href.lastIndexOf('#'))
       allLink[i].onclick = function (event) {
             event.preventDefault();
             console.log(document.querySelector(oldHref.substring(oldHref.indexOf("#"))).top)
             window.scrollTo({
                   behavior: 'smooth',
                   top: document.querySelector(oldHref.substring(oldHref.indexOf("#"))).getBoundingClientRect().top + window.pageYOffset - 190
             })

       }
 }