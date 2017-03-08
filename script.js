$( document ).ready(function(){
/*this is necessary as the browser will try to execute the below function 
before the document is ready and so it does not run reliably without this*/
	var myData = [];
    $( "#submit" ).on( "click", function() {
          var fileInput = document.getElementById('upload');
			var file = fileInput.files[0];
			var textType = /text.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = function() { //main bulk of function 
					//console.log (reader.result);
					myData = reader.result.split(' ');
					console.log (myData);
					
				}

				reader.readAsText(file);	
			} else {
				console.log ("File not supported!");
			}
    });
});