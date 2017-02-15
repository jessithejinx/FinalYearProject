$( document ).ready(function(){
/*this is necessary as the browser will try to execute the below function 
before the document is ready and so it does not run without this*/
    $( "#submit" ).on( "click", function() {
        console.log( "click" );
    });

});