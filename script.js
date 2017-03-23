var myData = [];
var testString = "";
$(document).ready(function () {
	/*this is necessary as the browser will try to execute the below function 
	before the document is ready and so it does not run reliably without this*/
	$("#submit").on("click", function () {
		var fileInput = document.getElementById('upload');
		var file = fileInput.files[0];
		var textType = /text.*/;
		var contentSection = document.createElement("pre"); //pre was chosen as data will be preformatted and we want to retain this (at this time**)
		contentSection.setAttribute("id", "output");
		var failReadDiv = document.createElement("div");
		failReadDiv.setAttribute("id", "failRead");


		if (file.type.match(textType)) {
			var reader = new FileReader();

			reader.onload = function () { //main bulk of function 
				//console.log (reader.result);
				myData = reader.result.split(/\r|\n/); //splits the file into separate lines and adds each line to the array 
				var startLine = myData.indexOf("J48 pruned tree");
				var endLine = myData.indexOf("=== Stratified cross-validation ===");
				var theTree = [];
				for (i = startLine +3; i <= endLine -8; i++) { //assigning i to the line I want to start reading, then for every element in the array until index is equal to the end line -8
					theTree.push(myData[i]); // adds each insatnce of i to an array
				}
				var addContent = document.createTextNode(theTree); //turns the decision tree section into a node 
				//var originalText = document.createTextNode(myData);
				//contentSection.appendChild(originalText);
				contentSection.appendChild(addContent); //adds the decision tree node to the new section 
				var currentDiv = document.getElementById("theBox");
				$("#theBox").addClass("hidden"); //hides the form box on submission of file
				$("#failRead").addClass("hidden"); // hides the failReadDiv when a correct file type is uploaded
				$("footer").css("position", "static"); //changes the footer position to static, this stops it appearing in the middle of the page
				document.body.insertBefore(contentSection, currentDiv);
				//console.log(startLine);
				//console.log(endLine);
				//console.log(myData);
				console.log(theTree);
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