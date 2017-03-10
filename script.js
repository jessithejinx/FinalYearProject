var myData = [];
var testString= "";
$(document).ready(function () {
	/*this is necessary as the browser will try to execute the below function 
	before the document is ready and so it does not run reliably without this*/
	$("#submit").on("click", function () {
		var fileInput = document.getElementById('upload');
		var file = fileInput.files[0];
		var textType = /text.*/;
		var contentDiv = document.createElement("div");
		contentDiv.setAttribute("id", "output");
		var failReadDiv = document.createElement("div");
		failReadDiv.setAttribute ("id", "failRead");


		if (file.type.match(textType)) {
			var reader = new FileReader();

			reader.onload = function () { //main bulk of function 
				//console.log (reader.result);
				myData = reader.result.split(' '); //splits the file into separate words and adds each word to the array 
				//console.log(myData[2]+ " " +  myData[1]+ " " + myData[0]); // prints the content of the array backwards 
				var testing = [];
				for (i = myData.length -1; i>=0; i--){ //assigning i to the last value in the array, then for every element in the array until index is greater than or equal to 0
					testing.push(myData[i]);	// adds each insatnce of i to an array
				}
					var addContent= document.createTextNode(testing);
					var originalText= document.createTextNode(myData);
					contentDiv.appendChild(originalText);
					contentDiv.appendChild(addContent); 
					 var currentDiv = document.getElementById("theBox"); 
					 $ ( "#theBox" ).addClass("hidden"); //hides the form box on submission of file
					 $ ("#failRead").addClass("hidden"); // hides the failReadDiv when a correct file type is uploaded
 					 document.body.insertBefore(contentDiv, currentDiv);
				//console.log(myData);
				//console.log(testing);
			}

			reader.readAsText(file);
		} else {
			var failedRead = document.createTextNode("File not supported! Please Choose a .txt file");
			failReadDiv.appendChild(failedRead);
			var currentDiv = document.getElementById("theBox"); 		
			document.body.insertBefore(failReadDiv, currentDiv);
			//console.log("File not supported!");
		}
	});
});