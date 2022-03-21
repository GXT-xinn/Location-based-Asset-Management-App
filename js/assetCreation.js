
function checkCondition(AssetID) {
	var preCondition = document.getElementById("previousConditionValue").innerHTML;
	var AssetID = document.getElementById("assetID").innerHTML;
	var userID = document.getElementById("userID").innerHTML;
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
	var postString = "&assetID = " + AssetID + "&currentcondition = " + condition 
	+ "&previousCondition = " + preCondition + "&userID = " + userID;
	if (condition == preCondition) {
		alert('The current selection is the same as the previous selection for the asset condition.');
	}
	processConditionData(postString)
};
	
function processConditionData(postString) {
	// Created an AJAX
	var serviceUrl= document.location.origin + "/api/testCRUD";
	$.ajax({
	    url: serviceUrl,
	    crossDomain: true,
	    type: "POST",
	    success: function(data){console.log(data); alert(JSON.stringify(data));},
	    data: postString
	});	
}
	


function saveNewAsset() {
	// now get the values for userid, coordinates, installation date and asset name
	var AssetName = document.getElementById("AssetName").value;
	var postString = "AssetName=" + AssetName;
	var InstallDate = document.getElementById("InstallDate").value;
	postString = postString + "&InstallDate=" + InstallDate;
	postString = postString + "&latitude=" + latitude + "&longitude=" + longitude;
	processAssetData(postString);
};

function processAssetData(postString) {
	var theURL= document.location.origin + "/api/insertAssetPoint";
	$.ajax({
    url: theURL,
    crossDomain: true,
    type: "POST",
    success: function(data){console.log(data); alert(JSON.stringify(data));},
	data: postString
	});
}
