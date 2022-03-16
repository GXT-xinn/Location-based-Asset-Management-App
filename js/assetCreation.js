

function checkCondition(AssetID) {
	var preCondition = document.getElementById("previousConditionValue").innerHTML;
	var AssetID = document.getElementById("assetID").innerHTML;
	var condition = "";
	if (document.getElementById("option1_" + AssetID + "").checked){
        condition = 1;
    }
	if (document.getElementById("option2_" + AssetID + "").checked){
        condition = 2;
    }
	if (document.getElementById("option3_" + AssetID + "").checked){
        condition = 3;
    }
	if (document.getElementById("option4_" + AssetID + "").checked){
        condition = 4;
    }
	if (document.getElementById("option5_" + AssetID + "").checked){
        condition = 5;
    }
	var postString = "&assetID = " + AssetID + "&currentcondition = " + condition + "&previousCondition = " + preCondition;
	if (condition == preCondition) {
		alert('The current selection is the same as the previous selection for the asset condition.');
	}
	// Created an AJAX
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
	alert(JSON.stringify(data));
}

function saveNewAsset() {
	// now get the values for userid, coordinates, installation date and asset name
	postString = "latitude=" + latitude + "&longitude=" + longitude;
	var assetName = document.getElementById("assetName").value;
	postString = postString + "&AssetName=" + assetName;
	var installDate = document.getElementById("installDate").value;
	postString = postString + "&InstallationDate=" + installDate;
	
	// Created an AJAX
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
    // Raise the alert to display the inserted data
    alert(JSON.stringify(data));
}
