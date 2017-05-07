var myData = [];
$(document).ready(function () {
	/*this is necessary as the browser will try to execute the below function 
	before the document is ready and so it does not run reliably without this*/
	$("#submit").on("click", function () {
		var fileInput = document.getElementById('upload');
		var file = fileInput.files[0];
		var textType = /text.*/;
		var failReadDiv = document.createElement("div");
		failReadDiv.setAttribute("id", "failRead");


		if (file.type.match(textType)) { //read in function adapted from: http://codepen.io/matt-west/pen/KjEHg [Accessed 16/2/17]
			var reader = new FileReader();

			reader.onload = function () { //main bulk of function 
				myData = reader.result.replace(/\[/g,'').replace(/\]/g,'').replace(/\"/g,''); // removes unwanted characters
				myData = myData.split(','); //splits the file on each "," and adds to the array

				console.log(myData);
				$("#theBox").addClass("hidden"); //hides the form box on submission of file
				$("#failRead").addClass("hidden"); // hides the failReadDiv when a correct file type is uploaded
				$("#button-div").addClass("visible");
				$("footer").css("position", "static"); //changes the footer position to static, this stops it appearing in the middle of the page
				
				
			
				config = { 
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
				Third_child = {
					parent: second_child,
					text: { name: myData[9] }
				};
				fourth_child = {
					parent: second_child,
					text: { name: myData[12] }
				};
				fifth_child = {
					parent: fourth_child,
					text: { name: myData[15] }
				};
				sixth_child = {
					parent: fourth_child,
					text: { name: myData[30] }
				};
				seventh_child = {
					parent: fifth_child,
					text: { name: myData[18] }
				};
				eigth_child = {
					parent: fifth_child,
					text: { name: myData[21] }
				};
				ninth_child = {
					parent: eigth_child,
					text: { name: myData[24] }
				};
				tenth_child = {
					parent: eigth_child,
					text: { name: myData[27] }
				};
				simple_chart_config = [
					config, parent_node,
					first_child, second_child, Third_child, fourth_child, fifth_child, sixth_child, seventh_child, eigth_child, ninth_child, tenth_child
				];
				var my_chart = new Treant(simple_chart_config);
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
			//download as JPEG function implementing the DOM-to-image library

						$("#button").on("click", function () {
							console.log("click");
						var node = document.getElementById('tree-simple');
							domtoimage.toJpeg(document.getElementById('tree-simple'), { quality: 0.95 })
								.then(function (dataUrl) {
									var link = document.createElement('a');
									link.download = 'J48 Converted Tree.jpeg';
									link.href = dataUrl;
									link.click();
						});

				})

					$("#button2").on("click", function () {
						console.log("click");
					domtoimage.toBlob(document.getElementById('tree-simple'))
					.then(function (blob){
							saveAs(blob, 'J48 Converted Tree.png');
					})

				})
				

				
});