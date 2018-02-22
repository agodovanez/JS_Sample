//used to populate dropdown boxes
function populateDropDownBox(passedArray, elementNameToPopulate) {

	var elementToPopulate = document.getElementById(elementNameToPopulate);

	for (var i = 0; i < passedArray.length; i++) {
		var el = document.createElement("option");
		el.textContent = passedArray[i];
		el.value = passedArray[i];
		elementToPopulate.appendChild(el);
	}
}

//this function is called to populate initial three drop downs
function populate() {
	var ageGroup = ["", "Infant", "Child", "Youth","Adult"];
	var gender = ["", "Male", "Female"];
	var list = [];
	for (var i = 1; i <= 25; i++) {
		list.push(i);
	}

	populateDropDownBox(ageGroup, "AgeGroup");
	populateDropDownBox(gender, "Gender");		
	populateDropDownBox(list, "Qty");

	var A = document.getElementById("Item");
}


function ageChanged(){
	var oldItems = document.getElementById("Item");
	var oldItemsLength  = oldItems.options.length;
	for(i=0;i<oldItemsLength;i++){
		oldItems.remove(oldItems.options[i]);
	}
	
	var ages = document.getElementById("AgeGroup");
	var age = ages.options[ages.selectedIndex].text;
	if (age == "Infant") {					
		var item = ["","Bunting Bag", "Jacket", "Boots"];
		populateDropDownBox(item, "Item")
	}
	else{
		var item = ["", "Jacket", "Boots"];
		populateDropDownBox(item, "Item")
	}
	
	loadSizes();
}

//this function is called from the 'onchange event' and loads sizes	
function loadSizes() {
	//clear old values
	var select = document.getElementById("Size");
	var length = select.options.length;
	for (i = 0; i < length; i++) {
		select.remove(select.options[i]);
	}
				
	var ages = document.getElementById("AgeGroup");
	var age = ages.options[ages.selectedIndex].text;		
	
	var items = document.getElementById("Item");
	var selectedItem = items.options[items.selectedIndex].text;
	var sizeChart = null;
	
	
	
	//logic to decide what sizes to use
	if (selectedItem == "Boots") {
		switch (age) {
			case "Infant":
				sizeChart = [];
				break;
			case "Child":
				sizeChart = ["4 Child", "5 Child", "6 Child","7 Child", "8 Child", "10 Child", "12 Child", "13 Child"];
				break;
			case "Youth":
				sizeChart = ["1 Youth", "2 Youth", "3 Youth", "4 Youth", "5 Youth"];
				break;
			case "Adult":					
				sizeChart = ["6", "7", "8", "9", "10", "11", "12"];
				break;
		}
	}
	else if (selectedItem == "Jacket") {
		switch (age) {
			case "Infant":
				sizeChart = ["", "3-6 mths", "6-12 mths", "12-24 mths"];
				break;
			case "Youth":
				sizeChart = ["14","16","18"];
				break;
			case "Child":
				sizeChart = ["", "2", "3", "3x", "4", "4x", "5", "6", "6x", "8", "10", "12"];
				break;				
			case "Adult":
				sizeChart = ["", "Small", "Medium", "Large", "XL", "XXL", "XXXL"];
				break;
		}               
	}
	else if (selectedItem == "Bunting Bag") {
		sizeChart = ["0-3 Months"];
	}
	if (sizeChart != null) {
		populateDropDownBox(sizeChart, "Size");
	}		
}

function addRow() {
	var ages = document.getElementById("AgeGroup");
	var genders = document.getElementById("Gender");
	var items = document.getElementById("Item");
	var sizes = document.getElementById("Size");
	var qtys = document.getElementById("Qty");

	var age = ages.options[ages.selectedIndex].text;
	var gender = genders.options[genders.selectedIndex].text;
	var item = items.options[items.selectedIndex].text;
	var size = sizes.options[sizes.selectedIndex].text;
	var qty = qtys.options[qtys.selectedIndex].text;

	var table = document.getElementById("orderDetails");
	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);

	row.insertCell(0).innerHTML = rowCount;
	row.insertCell(1).innerHTML = age;
	row.insertCell(2).innerHTML = gender;
	row.insertCell(3).innerHTML = item;
	row.insertCell(4).innerHTML = size;
	row.insertCell(5).innerHTML = qty;
	row.insertCell(6).innerHTML = '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';		
	createXML();
	
}

function deleteRow(obj) {

	var index = obj.parentNode.parentNode.rowIndex;
	var table = document.getElementById("orderDetails");
	table.deleteRow(index);
	createXML();
}
							
function readTable(){
	
  var contactFirstName   = document.getElementById("contactFirstName").value;
  var contactLastName   = document.getElementById("contactLastName").value;
  var phone = document.getElementById("phone").value;
  var email   = document.getElementById("email").value;
  var org = document.getElementById("org").value;
  var addr = document.getElementById("addr").value;
  var parentFirstName = document.getElementById("parentFirstName").value;
  var parentLastName = document.getElementById("parentLastName").value;
  var type   = document.getElementById("type").value;
  var comment = document.getElementById("comments").value;	  	 


/* initialize blank XML string */			
var strXML = ""; //"<"+"?"+"xml"+" version="+"'"+"1.0"+"'"+" encoding="+"'"+"UTF-8"+"' "+"?"+">";					
strXML = strXML +"<Order>";
   
/* place contact info into xml */
	strXML = strXML + "<phone>"     + phone + "</phone>";
	strXML = strXML + "<email>"     + email + "</email>";
	strXML = strXML + "<firstName>" + contactFirstName + "</firstName>";
	strXML = strXML + "<lastName>"  + contactLastName + "</lastName>";
	strXML = strXML + "<parentFirstName>" + parentFirstName + "</parentFirstName>";
	strXML = strXML + "<parentLastName>" + parentLastName + "</parentLastName>";
	strXML = strXML + "<organization>" + org + "</organization>";
	strXML = strXML + "<organizationAddress>" + addr + "</organizationAddress>";
	strXML = strXML + "<organizationType>" + type + "</organizationType>";
	strXML = strXML + "<comments>" + comment + "</comments>";


var tab = document.getElementById("orderDetails");
var tempXML = "";
  
for(x=1; x < tab.rows.length; x++){
   tempXML = tempXML + "<lineItem>";
   tempXML = tempXML + "<age>" + tab.rows[x].cells[1].innerHTML + "</age>";
   tempXML = tempXML + "<gender>" + tab.rows[x].cells[2].innerHTML + "</gender>";
   tempXML = tempXML + "<type>" + tab.rows[x].cells[3].innerHTML + "</type>";
   tempXML = tempXML + "<itemSize>" + tab.rows[x].cells[4].innerHTML + "</itemSize>";
   tempXML = tempXML + "<itemQuantity>" + tab.rows[x].cells[5].innerHTML + "</itemQuantity>";
   tempXML = tempXML + "</lineItem>";
}

  //this appends the line item XML to the contacts xml    
var orderXML = strXML + tempXML + "</Order>"; 				

return orderXML;
}

function createXML(){		
	document.getElementById("returnedXML").value = readTable();
}