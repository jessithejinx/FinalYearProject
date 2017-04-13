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
				var myData = reader.result.split(',');

				console.log(myData);
			
				//var addContent = document.createTextNode(theTree); //turns the decision tree section into a node 
				//contentSection.appendChild(addContent); //adds the decision tree node to the new section 
				//var currentDiv = document.getElementById("theBox");
				$("#theBox").addClass("hidden"); //hides the form box on submission of file
				$("#failRead").addClass("hidden"); // hides the failReadDiv when a correct file type is uploaded
				$("footer").css("position", "static"); //changes the footer position to static, this stops it appearing in the middle of the page
				//document.body.insertBefore(contentSection, currentDiv);
				//console.log(theTree);

				/*var treeRoot = myData[0];
				console.log("first entry is "+ myData[0]);			
				console.log(treeRoot);
				var tree = {
				text: {name: treeRoot},
				children: []
				};*/
			
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