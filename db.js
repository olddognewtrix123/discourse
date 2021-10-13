
let currentTitle = "";
let currentRequirement = "";
let currentRolesArray = [];
let currentPreconditionsArray = [];
let currentTestingGoal = "";
var currentCheckedButton = "dataTypeNone";  
var checkedButton = (document.forms.rb.elements.dataType);
let currentMinimumBoundaryValue = "default";
let currentMaximumBoundaryValue = "default";
let currentStepsArr = ["default"];
var result = "";
var resultToText = "";
var resultArr = [];

let allNotes = [];

function help(){
  //saveDataToObject(currentObject);
  alert("Greetings fellow testers and anyone else tasked with creating test cases for software testing! \n \n  The Discourse Test Case Writer provides a simple tester's checklist for the parameters that a basic test case comprises. \n \n Load an existing set of test case parameters by clicking the Load Existing button and then select the test case. \n \n Begin a new test case by entering the particular requirement under test. Then enter the system roles that are affected by the requirement. \n \n Likewise, enter the preconditions that pertain to the requirement.\n \n State the goal of the test. This should be the final expected outcome of the test you are designing - it is not necessarily the same as the requirement. \n \n If the test case requires boundary values, selectd the type of data that represents the boundary values in the test case and enter the minimum and maximum boundary values. \n \n To complete the design of the test, start by entering a common user action, followed by the subsequent test steps. \n \n All but the very last test step entered will be given an expected outcome of 'Setup step.' \n \n The last user action that is entered as a test step will be assigned the test goal as its expected outcome. \n \n When writing test cases, enter '$N$' wherever the Discourse Test Case writer should insert the boundary condition into \n \n the test step. \n \n Finally, click the Create Test Cases button to save the test case parameters and see the completed test cases. \n \n Click the Export to CSV button to create an excel doc with the test case information provided in a comma-delimited format. ");									
}

function CreateNew() {
  var paramObjectName = prompt("What do you want to call this set of test cases?", "Keep it short!");
  if (paramObjectName != null && paramObjectName != "Keep it short!"){
    document.getElementById('paramFileListName').value = paramObjectName;
    addNewObject();  
  }
}

// All the functions for Roles begin here ******************

function addRole(){
console.log("before add, currentRolesArray is " + currentRolesArray);
  var userInputRole = document.getElementById("role").value;
  if (userInputRole != "" && userInputRole !== "undefined" && userInputRole.trim() != ""){
    currentRolesArray.push(userInputRole);
    document.getElementById("rolesSelectedLabel").style.display="inline-block";
    var ul = document.getElementById("allRoles");
    var li = document.createElement("li");
    var textnode = document.createTextNode(userInputRole);
    var deleteButtn = document.createElement("button");
    deleteButtn.setAttribute("id","deleteButton");
    deleteButtn.setAttribute("onclick", "deleteRole(userInputRole);");
    deleteButtn.onclick = function() {deleteRole(userInputRole);};
    deleteButtn.innerHTML="Delete";
    li.appendChild(textnode);
    li.appendChild(deleteButtn);
    ul.appendChild(li);
    document.getElementById("role").value = "";
    document.getElementById("role").focus();
    saveData();
  }
  else {
    document.getElementById("role").value = "";
    document.getElementById("role").focus();
  }
console.log("after add, currentRolesArray is " + currentRolesArray);
}

function populateRoles(roles){
  // first, clear the list of child nodes
  var list = document.getElementById("allRoles");  
  list.innerHTML = "";

  if(currentRolesArray.length >0){
    for(var r = 1; r < currentRolesArray.length; r++)
    {
      let usethisrole = currentRolesArray[r];
      document.getElementById("rolesSelectedLabel").style.display="inline-block";
      var ul = document.getElementById("allRoles");
      var li = document.createElement("li");
      var textnode = document.createTextNode(usethisrole);
      var deleteButtn = document.createElement("button");
      deleteButtn.setAttribute("id","deleteButton");
      deleteButtn.setAttribute("onclick", "deleteRole(usethisrole);");
      deleteButtn.onclick = function() {deleteRole(usethisrole);};
      deleteButtn.innerHTML="Delete";
      li.appendChild(textnode);
      li.appendChild(deleteButtn);
      ul.appendChild(li);
      document.getElementById("role").value = "";
      //document.getElementById("role").focus();
    }
  }
}

function deleteRole(val){
console.log("before delete, currentRolesArray is " + currentRolesArray);
  var cutHere = currentRolesArray.indexOf(val);
console.log("val is " + val + " and cutHere is " + cutHere);
  currentRolesArray.splice(cutHere,1);
  cutHere = cutHere-1;
  var list = document.getElementById("allRoles");  
  list.removeChild(list.childNodes[cutHere]);
console.log("after delete, currentRolesArray is " + currentRolesArray);
  saveData();
}

// All the functions for Preconditions begin here ******************

function addPrecon(){
console.log("before add, currentPreconditionsArray is " + currentPreconditionsArray);
  var userInput = document.getElementById("precondition").value;
  if (userInput != "" && userInput !== "undefined" && userInput.trim() != ""){
    currentPreconditionsArray.push(userInput);
    document.getElementById("preconditionsSelectedLabel").style.display="inline-block";
    var ul = document.getElementById("allPreconditions");
    var li = document.createElement("li");
    var textnode = document.createTextNode(userInput);
    var deleteButtn = document.createElement("button");
    deleteButtn.setAttribute("id","deleteButton");
    deleteButtn.setAttribute("onclick", "deletePrecondition(userInput);");
    deleteButtn.onclick = function() {deletePrecondition(userInput);};
    deleteButtn.innerHTML="Delete";
    li.appendChild(textnode);
    li.appendChild(deleteButtn);
    ul.appendChild(li);
    document.getElementById("precondition").value = "";
    document.getElementById("precondition").focus();
    saveData();
  }
  else {
    document.getElementById("precondition").value = "";
    document.getElementById("precondition").focus();
  }
console.log("after add, currentPreconditionsArray is " + currentPreconditionsArray);
}

function populatePreconditions(preconditions){
  // first, clear the list of child nodes
  var list = document.getElementById("allPreconditions");  
  list.innerHTML = "";

  if(currentPreconditionsArray.length >0){
    for(var r = 1; r < currentPreconditionsArray.length; r++)
    {
      let usethisprecondition = currentPreconditionsArray[r];
      document.getElementById("preconditionsSelectedLabel").style.display="inline-block";
      var ul = document.getElementById("allPreconditions");
      var li = document.createElement("li");
      var textnode = document.createTextNode(usethisprecondition);
      var deleteButtn = document.createElement("button");
      deleteButtn.setAttribute("id","deleteButton");
      deleteButtn.setAttribute("onclick", "deletePrecondition(usethisprecondition);");
      deleteButtn.onclick = function() {deletePrecondition(usethisprecondition);};
      deleteButtn.innerHTML="Delete";
      li.appendChild(textnode);
      li.appendChild(deleteButtn);
      ul.appendChild(li);
      document.getElementById("precondition").value = "";
      //document.getElementById("precondition").focus();
    }
  }
}

function deletePrecondition(val){
  var cutHere = currentPreconditionsArray.indexOf(val);
  currentPreconditionsArray.splice(cutHere,1);
  cutHere = cutHere-1;
  var list = document.getElementById("allPreconditions");  
  list.removeChild(list.childNodes[cutHere]);
  saveData();
}

//martian
function populateTestSteps(arr){
  // first, clear the list of child nodes
  var list = document.getElementById("allSteps");  
  list.innerHTML = "";
  if(arr.length>0)
  {
    for(var s = 0; s < arr.length; s++)
    {
      let usethisstep = arr[s];
      var objTo = document.getElementById("allSteps");
      var newDiv = document.createElement("div");
      newDiv.innerHTML = '<div id="teststep" style="margin:0 auto"><div><form><br><input type="text" name="step" onblur="saveData()" id="stepdescription" value="'+ usethisstep +'" style="border: 2px solid red;  background-color: white; color: black; width:550px; border:0px; height:60px;"></form></div></div>';
    	  
      var deleteButtn1 = document.createElement("button");
      deleteButtn1.onclick = function() {
          console.log("deleting step!");
					  const index = arr.indexOf(usethisstep);
					  if (index > -1) {
					    arr.splice(index, 1);
					  }
					  currentStepsArr = arr;
					  populateTestSteps(arr);
					  saveData();
					};
      var t = document.createTextNode("Delete");
      deleteButtn1.appendChild(t);

      var upButtn = document.createElement("button");
      upButtn.onclick = function() {
				    const index = arr.indexOf(usethisstep);
				    if (index > -1) {
				      arr.splice(index, 1);
				      arr.splice(index-1,0,usethisstep);
				    }
				    currentStepsArr = arr;
				    populateTestSteps(arr);
				    saveData();
				   };
      var t1 = document.createTextNode("Up");
      upButtn.appendChild(t1);

      var downButtn = document.createElement("button");
      downButtn.onclick = function() {
				       const index = arr.indexOf(usethisstep);
				       if (index > -1) {
				        arr.splice(index, 1);
				        arr.splice(index+1,0,usethisstep);
				       }
				       currentStepsArr = arr;
				       populateTestSteps(arr);
				       saveData();
				      };
      var t2 = document.createTextNode("Down");
      downButtn.appendChild(t2);

      if(s==0 && arr.length>1)
      {
        // this is the first step -- just give it a buttonDiv that contains a down arrow
        objTo.appendChild(newDiv);
        objTo.appendChild(downButtn);
      }
      else if(s!=0 && arr.length>1) // it is a subsequent button
      {
	if(s == arr.length-1) 
 	{
	  // this is the last step in sequence - just give it an up button and a delete button
          objTo.appendChild(newDiv);
          objTo.appendChild(upButtn);
          objTo.appendChild(deleteButtn1);
	}
	else
	{
	  // this is a subsequent step befor the end of the sequence - it gets an up, down, and delete button

          objTo.appendChild(newDiv);
          objTo.appendChild(upButtn);
          objTo.appendChild(downButtn);
          objTo.appendChild(deleteButtn1);
	}
      }
      else{objTo.appendChild(newDiv);}     // no buttons if just one step
    }
  }
}


function addEmptyStepForm(){
  var objTo = document.getElementById("allSteps");
  var newDiv = document.createElement("div");
  newDiv.innerHTML = '<div id="teststep" style="margin:0 auto"><div><form><br><input type="text" name="step" onblur="saveData()" id="stepdescription" value="Enter  to insert variable" style="border: 2px solid red;  background-color: white; color: black; width:550px; border:0px; height:60px;"></form></div></div>';
  objTo.appendChild(newDiv);
}

function getCurrentSteps(){
   var tempStepsArray = []
  // for each childofthatdiv, push the value to tempStepsArray
  var elms = document.querySelectorAll("[id='stepdescription']");
  for(var i = 0; i < elms.length; i++) {
    var addme = elms[i].value;
    tempStepsArray.push(addme);
  }
  currentStepsArr = tempStepsArray;
}

//function deleteStep(){
// console.log("deleteStep got called!");
//}

// Miscellaneous functions begin here ********************************************************

 function resetUI(){

 }

 function toggleDataSavedMessage(){
  var x = document.getElementById("dataSaveToggle");
  if (x.style.display === "none") {
    x.style.display = "block";
  } 
  //else {
  //  x.style.display = "none";
  //}
 }

 function toggleShowData(){
  var x = document.getElementById("showdata");
  if (x.style.display === "none") {
    x.style.display = "block";
  } 
  else {
    x.style.display = "none";
  }
 }

 function displayAvailableTestCases(arr){
  // first, clear the list of child nodes
  var list = document.getElementById("allTests");  
  list.innerHTML = "";

  var list2 = document.getElementById("teststepdiv");



  if(arr.length >0){
    for(var r = 0; r < arr.length; r++)
    {
      let usethistest = arr[r];
      document.getElementById("selectdb").style.display="inline-block";
      var ul = document.getElementById("allTests");
      var li = document.createElement("li");
      li.onclick = function() {getAndDisplayData(usethistest);}
      var textnode = document.createTextNode(usethistest);
      li.appendChild(textnode);
      ul.appendChild(li);
    }
   }
  }

 function getRadioButtonSelected(){
  var radios = document.forms["radiobuttonsform"].elements["dataType"];
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].type === 'radio' && radios[i].checked) {
        currentCheckedButton = radios[i].id;       
    }
  }
  if (currentCheckedButton == "dataTypeNone"){
    document.getElementById("minmaxdiv").style.display = "none";
  }
  else{document.getElementById("minmaxdiv").style.display = "block";}
  saveData();
 }


// Test Case Writing **************************************************************************************************************************************************************************
// Test Case Writing **************************************************************************************************************************************************************************
// Test Case Writing **************************************************************************************************************************************************************************
// Test Case Writing **************************************************************************************************************************************************************************

function writeTestCases(){
  if(currentRolesArray.length==1){alert('There needs to be at least one Role defined.')}
  else if(currentPreconditionsArray.length==1){alert('There needs to be at least one Precondition defined.')}
  else{
	var display = document.getElementById("tempDisplayArea");
	display.innerHTML = "";
	var statement = "";
	result = "";
	resultToText = "";
	resultArr = [];
	
	statement = currentTitle + ";";
	resultArr.push(statement);
	statement = "(Title of test case collection)" + ";";
	resultArr.push(statement);
	
	statement = currentRequirement + ";";
	resultArr.push(statement);
	statement = "(Requirement under test.)" + ";";
	resultArr.push(statement);
	
	for(var r = 1; r<currentRolesArray.length; r++){
		statement = "Log on as " + currentRolesArray[r] + ";";
		resultArr.push(statement);
		statement = "Logon step" + ";";
		resultArr.push(statement);
		
		
		
		if(currentCheckedButton == "dataTypeNone")
		
		{
		    console.log("dataTypeNone selected");
		    
			for(var p = 1; p<currentPreconditionsArray.length; p++){
				var newstatement = currentPreconditionsArray[p] + ";";
				newstatement2 = newstatement.replace('>&', currentMinimumBoundaryValue);
				resultArr.push(newstatement2);
				newstatement3 = "System state precondition" + ";";
				resultArr.push(newstatement3);
				
 
				
				for(var s = 0; s<currentStepsArr.length; s++){
				var newstatement4 = currentStepsArr[s];
				newstatement5 = newstatement4.replace('>&', currentMinimumBoundaryValue);
					if(currentStepsArr.length == 0){
						alert('At lease one Test Step needs to be defined.');
					}
					else {
						if(s==currentStepsArr.length-1){
							statement6 = newstatement5 + "; ";
							resultArr.push(statement6);
						
							statement7 = currentTestingGoal + "; ";
							resultArr.push(statement7);
						}
						else{
							statement6 = newstatement5 + "; ";
							resultArr.push(statement6);
						
							statement7 = "Setup step." + "; ";
							resultArr.push(statement7);
						}
					}
				}
			}
		}
		
		else{ // one of the other data types was selected ***********************************************************************************
			
			for(var p = 1; p<currentPreconditionsArray.length; p++){
				var newstatement = currentPreconditionsArray[p] + ";";
				newstatement2 = newstatement.replace('>&', currentMinimumBoundaryValue);
				resultArr.push(newstatement2);
				newstatement3 = "System state precondition" + ";";
				resultArr.push(newstatement3);
				
				for(var s = 0; s<currentStepsArr.length; s++){
				var newstatement4 = currentStepsArr[s];
				newstatement5 = newstatement4.replace('>&', currentMinimumBoundaryValue);
					if(currentStepsArr.length == 0){
						alert('At lease one Test Step needs to be defined.');
					}
					else {
						if(s==currentStepsArr.length-1){
							statement6 = newstatement5 + "; ";
							resultArr.push(statement6);
						
							statement7 = currentTestingGoal + "; ";
							resultArr.push(statement7);
						}
						else{
							statement6 = newstatement5 + "; ";
							resultArr.push(statement6);
						
							statement7 = "Setup step." + "; ";
							resultArr.push(statement7);
						}
					}
				}
			}
			
			var min = currentMinimumBoundaryValue
			var max = currentMaximumBoundaryValue
			
			var testVal = (max - min);
			
			if(testVal>1){
			    min = Math.ceil(min);
                max = Math.floor(max);
                var middleVal = Math.floor(Math.random() * (max - min + 1)) + min;
                
                if(middleVal == min){
                    middleVal = middleVal +1;
                }
                
                if(middleVal == max){
                    middleVal = middleVal -1;
                }
                
                for(var p = 1; p<currentPreconditionsArray.length; p++){
				var newstatement = currentPreconditionsArray[p] + ";";
				newstatement2 = newstatement.replace('>&', middleVal);
				resultArr.push(newstatement2);
				newstatement3 = "System state precondition" + ";";
				resultArr.push(newstatement3);
				
				for(var s = 0; s<currentStepsArr.length; s++){
				var newstatement4 = currentStepsArr[s];
				newstatement5 = newstatement4.replace('>&', middleVal);
					if(currentStepsArr.length == 0){
						alert('At lease one Test Step needs to be defined.');
					}
					else {
						if(s==currentStepsArr.length-1){
							statement6 = newstatement5 + "; ";
							resultArr.push(statement6);
						
							statement7 = currentTestingGoal + "; ";
							resultArr.push(statement7);
						}
						else{
							statement6 = newstatement5 + "; ";
							resultArr.push(statement6);
						
							statement7 = "Setup step." + "; ";
							resultArr.push(statement7);
						}
					}
				}
			}
                
			}
			
			for(var p = 1; p<currentPreconditionsArray.length; p++){
				var newstatement = currentPreconditionsArray[p] + ";";
				newstatement2 = newstatement.replace('>&', currentMaximumBoundaryValue);
				resultArr.push(newstatement2);
				newstatement3 = "System state precondition" + ";";
				resultArr.push(newstatement3);
				
				for(var s = 0; s<currentStepsArr.length; s++){
				var newstatement4 = currentStepsArr[s];
				newstatement5 = newstatement4.replace('>&', currentMaximumBoundaryValue);
					if(currentStepsArr.length == 0){
						alert('At lease one Test Step needs to be defined.');
					}
					else {
						if(s==currentStepsArr.length-1){
							statement6 = newstatement5 + "; ";
							resultArr.push(statement6);
						
							statement7 = currentTestingGoal + "; ";
							resultArr.push(statement7);
						}
						else{
							statement6 = newstatement5 + "; ";
							resultArr.push(statement6);
						
							statement7 = "Setup step." + "; ";
							resultArr.push(statement7);
						}
					}
				}
			}
		}
	}

	for(var x = 0; x<resultArr.length; x++){
		if(x%2!=0){
			result = result + resultArr[x] +  '<br>';
			resultToText = resultToText + resultArr[x] +  '\r\n';
		}
		else{
			result = result + resultArr[x] + '&nbsp;';
			resultToText = resultToText + resultArr[x] + ' ';
		}
	}
	
	display.innerHTML = result;
	
	var x = document.getElementById("exportTXT");
	
	  if (x.style.display === "none") {
        x.style.display = "block";
	  }
	
//	var y = document.getElementById("exportCSV");
//	  if (y.style.display === "none") {
  //      y.style.display = "block";
	//  }
  }
}


// Export **************************************************************************************************************************************************************************
// Export *******************************************************************************************************************************************************************

function exportToTXT(){
	//http://jsfiddle.net/UselessCode/qm5AG/
	//https://stackoverflow.com/questions/21012580/is-it-possible-to-write-data-to-file-using-only-javascript  << - holy crap that works!!
	//download('the content of the file', currentTitle + '.txt', 'text/plain');
	download(resultToText, currentTitle + '.txt', 'text/plain');
}

function download(strData, strFileName, strMimeType) {
    var D = document,
        A = arguments,
        a = D.createElement("a"),
        d = A[0],
        n = A[1],
        t = A[2] || "text/plain";

    //build download link:
    a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);


    if (window.MSBlobBuilder) { // IE10
        var bb = new MSBlobBuilder();
        bb.append(strData);
        return navigator.msSaveBlob(bb, strFileName);
    } /* end if(window.MSBlobBuilder) */



    if ('download' in a) { //FF20, CH19
        a.setAttribute("download", n);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function() {
            var e = D.createEvent("MouseEvents");
            e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
            D.body.removeChild(a);
        }, 66);
        return true;
    }; /* end if('download' in a) */



    //do iframe dataURL download: (older W3)
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
    setTimeout(function() {
        D.body.removeChild(f);
    }, 333);
    return true;
}

 //function exportToCSV(){		//  https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
 //	var exportArr = [];
//	 for(var y = 0; y<resultArr.length; y+2){
//	 	var z = y;
//	 	var subExportArr = [];
//	 	var pushme = resultArr[z];
//	 	subExportArr.push[pushme];
//	 	z++;
//	 	pushme = resultArr[z];
//	 	subExportArr.push[pushme];
//	 	exportArr.push[subExportArr];
//	 }

 //    let csvContent = "data:text/csv;charset=utf-8," + exportArr.map(e => e.join(",")).join("\n");
	
 //	var encodedUri = encodeURI(csvContent);
 //var link = document.createElement("a");
// link.setAttribute("href", encodedUri);
/// link.setAttribute("download", "my_data.csv");
// document.body.appendChild(link); // Required for FF

 //link.click(); // This will download the data file named "my_data.csv".
 //}

//*****************************  database stuff  ******************************************************************************
//***************  database stuff  **************************  database stuff  **************************  database stuff  **************************  database stuff  ***********
//***************  database stuff  **************************  database stuff  **************************  database stuff  **************************  database stuff  ***********
//***************  database stuff  **************************  database stuff  **************************  database stuff  **************************  database stuff  ***********


let db;
let dbReq = indexedDB.open('DiscourseDatabase00',1);



function getAndDisplayData(title){ 

    // When newobject is added, when Save happens, and when a plan is called, getAndDisplayData runs.
    // getAndDisplayData uses title as the key to grab all the data for the one item

	var x = document.getElementById("exportTXT");
	if (x.style.display === "block") {
    x.style.display = "none";
	}
	
	///var y = document.getElementById("exportCSV");
	///if (y.style.display === "block") {
   /// y.style.display = "none";
	//}
	
	var display = document.getElementById("tempDisplayArea");
	display.innerHTML = ""; 
	
    let useme= title;
    let tx = db.transaction(['parameterObjects'], 'readwrite');
    tx.oncomplete = function(event) {  
    }   
    tx.onerror = function(event){
	alert('getData transaction error ' + event.target.errorCode);
    }
    var objectStore = tx.objectStore("parameterObjects");
    var objectStoreRequest = objectStore.get(useme);



    // getAndDisplayData then updates the page and the data for the page

    objectStoreRequest.onsuccess = function(event){
      // here is all the data from the db
      var myRecord = objectStoreRequest.result;

      // Parameter filelist name
      currentTitle = useme;
      document.getElementById('paramFileListName').value = useme;

      // Requirement
      document.getElementById('req').value = myRecord.requirement;
      currentRequirement =  myRecord.requirement;

      // Roles
      currentRolesArray = myRecord.rolesArray;
      populateRoles(currentRolesArray);

      // Preconditions
      currentPreconditionsArray = myRecord.preconditionsArray;
      populatePreconditions(currentPreconditionsArray);

      // Testing Goal
      document.getElementById('goal').value = myRecord.testingGoal;
      currentTestingGoal = myRecord.testingGoal;

      // Data Type Radio Buttons
      currentCheckedButton= myRecord.dataType;
      let checkthisbutton = document.getElementById(currentCheckedButton);
      checkthisbutton.checked = true;
        if (currentCheckedButton == "dataTypeNone"){
          document.getElementById("minmaxdiv").style.display = "none";
        }
        else{document.getElementById("minmaxdiv").style.display = "block";}

      // Minimum and Maximum values
      currentMinimumBoundaryValue = myRecord.minimumBoundaryValue;
      currentMaximumBoundaryValue = myRecord.maximumBoundaryValue;
      document.getElementById('min').value = currentMinimumBoundaryValue;
      document.getElementById('max').value = currentMaximumBoundaryValue;

      // Test Case steps

      //let currentStepsArr = ["default"];
      currentStepsArr = myRecord.testSteps;
      populateTestSteps(currentStepsArr);
    }
}

function addNewObject(){	
  let title = document.getElementById('paramFileListName').value;
  let rolesArray = ["add a role"];
  let tx = db.transaction(["parameterObjects"], "readwrite"); 
  let store = tx.objectStore("parameterObjects");
  let note = {title: title, requirement:"What is the requirement?", rolesArray: ["default"], preconditionsArray: ["default"], testingGoal:"What is the goal of this test?", dataType: currentCheckedButton, minimumBoundaryValue: currentMinimumBoundaryValue, maximumBoundaryValue:currentMaximumBoundaryValue, testSteps:["default"], timestamp: Date.now()};
  store.add(note);
  tx.oncomplete = function() { 
    getAndDisplayData(title);
    toggleDataSavedMessage(); 
  }
  tx.onerror = function(event) {alert('error storing note ' + event.target.errorCode); }
}


function saveData(){ 
  let title = document.getElementById('paramFileListName').value;
  let useme= title;

  let tx = db.transaction(['parameterObjects'], 'readwrite');
  tx.oncomplete = function(event) {  
  }   
  tx.onerror = function(event){
	alert('getData transaction error ' + event.target.errorCode);
  }
  var objectStore = tx.objectStore("parameterObjects");
  var objectStoreRequest = objectStore.get(useme);
  objectStoreRequest.onsuccess = function(event){
    getCurrentSteps();
    var myRecord = objectStoreRequest.result;
    myRecord.requirement = document.getElementById('req').value;
    myRecord.rolesArray =  currentRolesArray;
    myRecord.preconditionsArray =  currentPreconditionsArray;
    myRecord.testingGoal =  document.getElementById('goal').value;
    myRecord.dataType = currentCheckedButton
    myRecord.minimumBoundaryValue = document.getElementById('min').value;
    myRecord.maximumBoundaryValue = document.getElementById('max').value;
    myRecord.testSteps = currentStepsArr;
    var updateStoreRequest = objectStore.put(myRecord);
    updateStoreRequest.onsuccess = function() {
       getAndDisplayData(title);
    };
  }
}

function checkData() {
  let transaction = db.transaction(["parameterObjects"]);
  let objectStore = transaction.objectStore("parameterObjects");
  objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    var i = 0;
    if(cursor) {
      //Need to add code to get indexed list of parameter objects
      toggleShowData();
      getAndDisplayNotes();
    }else{
      alert('There are no sets of tests in the database yet. Click the "Create New" button to start developing test cases for the requirement under test.');}     
  }
}

dbReq.onupgradeneeded = function(event) {
  db = event.target.result;
  let parameterObjects;
  if (!db.objectStoreNames.contains('parameterObjects')) {
    parameterObjects = db.createObjectStore('parameterObjects', { keyPath: "title" });
  } else {
    parameterObjects = dbReq.transaction.objectStore('parameterObjects', { keyPath: "title" });
  }
  if (!parameterObjects.indexNames.contains('timestamp')) { // just creating a timestamp index
    parameterObjects.createIndex('timestamp', 'timestamp'); 
  }
}

dbReq.onsuccess = function(event) {
    db = event.target.result;
}

dbReq.onerror = function(event) {
    alert('error opening database ' + event.target.errorCode);
}

function getAndDisplayNotes(){ 
    allNotes = [];
    let tx = db.transaction(["parameterObjects"]);
    let store = tx.objectStore("parameterObjects");

    // Retrieve the index to run the cursor on;
    // the results will be ordered by their timestamp
    let index = store.index('timestamp'); //retrieve the timestamp with the name we request
    let req = index.openCursor();
    req.onsuccess = function(event) {  
	let cursor = event.target.result;

	if (cursor != null)
	{
	    allNotes.push(cursor.value.title);
	    cursor.continue();
	} else {
	    displayAvailableTestCases(allNotes);
	}
    }   

    req.onerror = function(event){
	alert('error in cursor request ' + event.target.errorCode);
    }
}



