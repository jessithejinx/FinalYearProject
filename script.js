var myData = [];
$(document).ready(function () {
	/*this is necessary as the browser will try to execute the below function 
	before the document is ready and so it does not run reliably without this*/
	$("#submit").on("click", function () {
		var fileInput = document.getElementById('upload');
		var file = fileInput.files[0];
		var textType = /text.*/;
		//var contentSection = document.createElement("pre");
		//contentSection.setAttribute("id", "output");
		var failReadDiv = document.createElement("div");
		failReadDiv.setAttribute("id", "failRead");


		if (file.type.match(textType)) { //download function adapted from: http://codepen.io/matt-west/pen/KjEHg [Accessed 16/2/17]
			var reader = new FileReader();

			reader.onload = function () { //main bulk of function 
				myData = reader.result.split(','); //splits the file on each "," and adds to the array

				console.log(myData);
			
				//var addContent = document.createTextNode(theTree); //turns the decision tree section into a node 
				//contentSection.appendChild(addContent); //adds the decision tree node to the new section 
				//var currentDiv = document.getElementById("theBox");
				$("#theBox").addClass("hidden"); //hides the form box on submission of file
				$("#failRead").addClass("hidden"); // hides the failReadDiv when a correct file type is uploaded
				$("footer").css("position", "static"); //changes the footer position to static, this stops it appearing in the middle of the page
				
				
			
				config = {  //insert code here
					container: "#tree-simple"
				};
				parent_node = {
					text: { name: myData[0] }
				};
				first_child = {
					parent: parent_node,
					text: { name: myData[3] }
				};
				second_child = {
					parent: parent_node,
					text: { name: myData[6] }
				};
				simple_chart_config = [
					config, parent_node,
					first_child, second_child
				];
				var my_chart = new Treant(simple_chart_config);
			}
		
			//below section takes an element and converts it to an image, code can be found at: https://github.com/tsayen/dom-to-image [Accessed 18/4/17]
			//the purpose would be to make it easier for the zoom and download to function 
				var node = document.getElementById('tree-simple');

					domtoimage.toPng(node)
						.then(function (dataUrl) {
							var img = new Image();
							img.src = dataUrl;
							document.body.appendChild(img);
						})
						.catch(function (error) {
							console.error('oops, something went wrong!', error);
						});
			//the below section of code creates the zoom funcation and buttons
			//function zoom can be found at: http://www.webdeveloper.com/forum/showthread.php?256121-Simple-Image-Zoom-In-Out  [Accessed 17/4/17 ]
				function zoom(zm) {
				var img=document.getElementById("tree-simple")
				var wid=img.width
				var ht=img.height
				img.style.width=(wid*zm)+"px"
				img.style.height=(ht*zm)+"px"
				img.style.marginLeft = -(img.width/2) + "px";
				img.style.marginTop = -(img.height/2) + "px";
				}	
		
				var zoomOutButton = document.createElement("button", {id: "zoomOutbutton"}); 
				var newContent = document.createTextNode(value ="-");
				var zoomInButton = document.createElement("button", {id: "zoomInbutton"}); 
				var newContent2 = document.createTextNode("+");
				zoomInButton.appendChild(newContent);
				zoomOutButton.appendChild(newContent2);
				var currentDiv = document.getElementById("tree-simple"); 
				document.body.insertBefore(zoomInButton, currentDiv);
				document.body.insertBefore(zoomOutButton, currentDiv);
				zoomInButton.onclick = function(){
					zoom(1.1);
				};
				zoomOutButton.onclick = function(){
					zoom(0.9);
				};

				//the below section creates the download button
				var downloadButton = document.createElement("img", {id: "downloadButton"});
				var newContent3 = document.createTextNode("download");
				downloadButton.src ="download_button.png"; //button image found at: https://www.curveexpert.net/download/ [Accessed 17/4/17]
				downloadButton.style ="height: 75px"; 
				downloadButton.appendChild(newContent3);
				document.body.insertBefore(downloadButton, currentDiv);
				downloadButton.onclick = function(){ 
					document.getElementById("tree-simple").download = "J48 Tree Image Conversion";
				}
			
			//The below code shows my attempted next steps of changing the file to json from an array and applying it for use with the treant library
			/*var treeRoot = myData[0];
			var tree = {
			text: {name: treeRoot},
			children: []
			};*/

			// below loops through every branch associated with the parent node
			/*for (var i = 0; i < myData[1].length; i++){
			//console.log(data[1][i]); //these are the choices for the parent 
			//need to build json node structure and set root node
			var branchLabel = myData[1][i][1]; // this is identifying the decision that leads to the new node
			var nodeLabel = myData[1][i][2]; //this is the data that needs to be pushed to the node
			console.log(nodeLabel);
			if (!Array.isArray(nodeLabel)) { //check if the node is leaf or a decision
				var jsonNode = { //builds the json to add to our structure
				text: {name:nodeLabel}
				};
				tree.children.push(jsonNode); //this is adding the json to the structure as a child
			}
			 */

			/*simple_chart_config = { this initialises the library when we have the right format 
				chart: {
					container: "#tree-simple"
				},
				
				nodeStructure: tree 
				
			};
			var my_chart = new Treant(simple_chart_config);*/
			reader.readAsText(file);
		} else {
			var failedRead = document.createTextNode("File not supported! Please Choose a .txt file");
			failReadDiv.appendChild(failedRead);
			var currentDiv = document.getElementById("theBox");
			document.body.insertBefore(failReadDiv, currentDiv);
		  }
	});
});