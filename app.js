(function(){
  "use strict";

  var Moosipurk = function(){
    // SINGLETON PATTERN (4 rida)
    if(Moosipurk.instance){
      return Moosipurk.instance;
    }
    Moosipurk.instance = this; //this viitab moosipurgile

    this.routes = Moosipurk.routes;

    console.log(this);
    //console.log('moosipurgi sees');

    //Kõik muutujad, mis on üldised ja muudetavad
    this.currentRoute = null; // hoiab meeles mis lehel hetkel on
    this.interval = null;

    //panen rakenduse tööle
    this.init();
  };

  //kirjeldatud kõik lehed
  Moosipurk.routes = {
    "home-view" : {
      render: function(){
        // käivitan siis kui jõuan lehele
        console.log('JS avalehel');
        if(this.interval){clearInterval(this.interval);}
        var seconds = 0;
        this.interval = window.setInterval(function(){
          seconds++;
          document.querySelector('#counter').innerHTML = seconds;
        }, 1000);
      }
    },
    "list-view" : {
      render: function(){
        console.log('JS loend lehel');
      }
    },
    "manage-view" : {
      render: function(){
        console.log('JS haldus lehel');
      }
    }
  };

  //kõik moosipurgi funktsioonid siia sisse
  Moosipurk.prototype = {
    init: function(){
      console.log('rakendus käivitus');
      //Esialgne loogika tuleb siia
      window.addEventListener('hashchange', this.routeChange.bind(this));
      //vaatan mis lehel olen
      console.log(window.location.hash);
      if(!window.location.hash){
        window.location.hash = "home-view";
      }else{
        //hash oli olemas
        this.routeChange();
      }
      //hakka kuulama hiireklõpse
      this.bindMouseEvents();
    },
    bindMouseEvents: function(){
      document.querySelector('.add-new-jar').addEventListener('click', this.addNewClick.bind(this));
    },
    addNewClick: function(event){
      //lisa uus purk
      var title = document.querySelector('.title').value;
      var ingredients = document.querySelector('.ingredients').value;
      console.log(title+' '+ingredients);
      var new_jar = new Jar(title, ingredients);
      document.querySelector('.list-of-jars').appendChild(new_jar.createHtmlElement());
    },
    routeChange: function(event){
      this.currentRoute = window.location.hash.slice(1);
      //kas leht on olemas
      if(this.routes[this.currentRoute]){
        //jah olemas
        this.updateMenu();
        console.log('>>> '+this.currentRoute);
        //käivitan selle lehe jaoks ettenähtud js
        this.routes[this.currentRoute].render();
      }else{
        //404? ei ole
        console.log('404');
        window.location.hash = 'home-view';
      }
    },
    updateMenu: function(){
      //kui menüül on active-menu siis võtame ära
      document.querySelector('.active-menu').className=document.querySelector('.active-menu').className.replace(' active-menu', '');
      //käesolevale lehele lisan juurde
      document.querySelector('.'+this.currentRoute).className+=' active-menu';
    }
  };

  var Jar = function(title, new_ingredients){
    this.title = title;
    this.ingredients = new_ingredients;
  };
  Jar.prototype = {
    createHtmlElement: function(){
      //anna tagasi ilus html
      var li = document.createElement('li');
      var span = document.createElement('span');
      span.className = 'letter';
      var letter = document.createTextNode(this.title.charAt(0));
      span.appendChild(letter);
      li.appendChild(span);

      var content_span = document.createElement('span');
      content_span.className = 'content';
      var content = document.createTextNode(this.title+' | '+this.ingredients);
      content_span.appendChild(content);
      li.appendChild(content_span);

      console.log(li);
      return li;
    }
  };

  window.onload = function(){
    var app = new Moosipurk();
  };

})();
