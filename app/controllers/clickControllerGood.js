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
      console.log("point 1 data",data);
      var clickObj = JSON.parse(data);
      console.log("data",data);
      console.log(clickObj.query);
      if (clickObj.query != undefined){
         console.log("in if ",clickObj.query);
         console.log("new value ",$('#query').val());
         $('#results').html("<div class='col-xs-12 col-sm-6 col-md-4'><div class='thumbnail'> <img class='img-responsive img-thumbnail' src ="+clickObj.query+"></div></div>");
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
      apiUrl = appUrl + '/imagesearch/' + $("#query").val();
      console.log("apiUrl 1",apiUrl);

    /* ajaxFunctions.ajaxRequest('GET', apiUrl, function () {
        console.log("we are in ajaxRequest again");
        console.log("apiUrl 2",apiUrl);
        ajaxFunctions.ajaxRequest('GET',apiUrl,updateClickCount);*/
       ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
     
   }, false);

   retRecent.addEventListener('click', function () {
      apiUrl = appUrl + '/latest/';
      console.log("point 3",apiUrl);
      ajaxFunctions.ajaxRequest('GET', apiUrl,outputsearch);
     

   }, false);

})();