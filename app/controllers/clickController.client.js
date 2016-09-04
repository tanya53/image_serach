'use strict';

(function () {
   console.log("point 0");
   var retImage= document.querySelector('.btn-primary');
   var  retRecent= document.querySelector('.btn-success');
   var clickNbr = $("#query").val();
   var offset = document.querySelector('#offset');
   var apiUrl;
   console.log("retImage ",retImage);
   console.log("retRecent",retRecent);
   console.log("clickNbr ",clickNbr);
   console.log("offset ",offset);
   console.log("apiUrl ",apiUrl);
   console.log("query value ",$("#query").val());
   
   function updateClickCount (data) {

      var clickObj = JSON.parse(data);
      if (clickObj.query != undefined){
         console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@");
         console.log("in if ",clickObj.query,clickObj.query.length);
         console.log("new value ",$('#query').val());
         var container = document.getElementById("results");
         $('#results').empty();
         console.log("child before fore ",$('#results').children().length);

         for (var i =0;i<clickObj.query.length;i++){
            console.log("obj ",clickObj.query[i]);
            var img = document.createElement('img');
            console.log("********",clickObj.query[i][1]);
            img.src = clickObj.query[i][0];
            img.alt = clickObj.query[i][1];
            img.width = 200;
            img.className = 'img-responsive img-thumbnail';
            container.appendChild(img);
            console.log("childrean ",$('#results').children().length);
         //$('#results').html("<div class='col-xs-12 col-sm-6 col-md-4'><div class='thumbnail'> <img class='img-responsive img-thumbnail' src ="+clickObj.query[i]+"></div></div>");
      }
      }
   }
   
   function outputsearch(data){
      console.log("made it to dump search");
      console.log(data);
      var junk = JSON.parse(data);
      console.log(junk);
      var outstr="<table><tr><th>Query</th><th>when</th></tr>";
      for (var i=0;i<junk.length;i++){
         outstr = outstr + "<tr><td>"+junk[i].queryType +"</td><td>"+ junk[i]._id+"</td></tr>";
      }
      outstr = outstr+"</table>";
      $('#results').html(outstr);
   }


   retImage.addEventListener('click', function () {
      
      console.log("we are in click for image search");
      console.log($("#offset").val());
      console.log($("#query").val());
      var offset = $("#offset").val();
      if ($("#query").val() === "") {$("#query").val("tiger");}
        
      //apiUrl = appUrl + '/imagesearch/' + $("#query").val() + " "+offset;
      apiUrl = appUrl + '/imagesearch?query='+$("#query").val()+'&offset='+offset;
      console.log("apiUrl 1",apiUrl);

       ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
     
   }, false);

   retRecent.addEventListener('click', function () {
      apiUrl = appUrl + '/latest/';
      console.log("point 3",apiUrl);
      ajaxFunctions.ajaxRequest('GET', apiUrl,outputsearch);
     

   }, false);

})();
