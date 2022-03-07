 
function saveNewAsset() {
	// now get the geometry values
	var latitude = document.getElementById("latitude").value;
	var longitude = document.getElementById("longitude").value;
	postString = "latitude=" + latitude + "&longitude=" + longitude;
	processData(postString);	
}

function processData(postString) {
	alert(postString);

	var serviceUrl=  document.location.origin + "/api/testCRUD";
	$.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "POST",
    data: postString,
    success: function(data){console.log(data); dataUploaded(data);}

}); 
}
// create the code to process the response from the data server
function dataUploaded(data) {
    // change the DIV to show the response
    document.getElementById("responseDIV").innerHTML = JSON.stringify(data);
}



function deleteSingleAsset() {
	var deleteID = document.getElementById("deleteID").value;
	var deleteString = "id="+deleteID;
	var serviceUrl= document.location.origin + "/api/testCRUD";
	$.ajax({
	    url: serviceUrl,
	    crossDomain: true,
	    type: "POST",
	    success: function(data){console.log(data); dataDeleted(data);},
	    data: deleteString
});	
}
function dataDeleted(data){
    document.getElementById("deleteAssetResponse").innerHTML = JSON.stringify(data);
}

function saveConditionInformation() {
	var preCondition = document.getElementById("previousConditionValue").innerHTML;
	var AssetID = document.getElementById("assetID").innerHTML;
	var condition = "";
	if (document.getElementById("option1").checked){
        condition = 1;
    }
	if (document.getElementById("option2").checked){
        condition = 2;
    }
	if (document.getElementById("option3").checked){
        condition = 3;
    }
	if (document.getElementById("option4").checked){
        condition = 4;
    }
	if (document.getElementById("option5").checked){
        condition = 5;
    }
	var postString = "AssetID = " + AssetID + "&currentcondition = " + condition + "&previousCondition = " + preCondition;
	if (condition == preCondition) {
		alert('The current selection is the same as the previous selection for the asset condition.')
	}
	var serviceUrl= document.location.origin + "/api/testCRUD";
	$.ajax({
	    url: serviceUrl,
	    crossDomain: true,
	    type: "POST",
	    success: function(data){console.log(data); conditionData(data);},
	    data: postString
});	
}

function conditionData(data){
	document.getElementById("conditionResult").innerHTML = JSON.stringify(data);
}