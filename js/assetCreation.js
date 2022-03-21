
var op1 = 'Element is in very good condition';
var op2 = 'Some aesthetic defects, needs minor repair';
var op3 = 'Functional degradation of some parts, needs maintenance';
var op4 = 'Not working and maintenance must be done as soon as reasonably possible';
var op5 = 'Not working and needs immediate, urgent maintenance';

function checkCondition(AssetID) {
	var preCondition = document.getElementById("previousConditionValue").innerHTML;
	var AssetID = document.getElementById("assetID").innerHTML;
	var condition = "";
	if (document.getElementById("option1_" + AssetID + "").checked){
        condition = op1;
    }
	if (document.getElementById("option2_" + AssetID + "").checked){
        condition = op2;
    }
	if (document.getElementById("option3_" + AssetID + "").checked){
        condition = op3;
    }
	if (document.getElementById("option4_" + AssetID + "").checked){
        condition = op4;
    }
	if (document.getElementById("option5_" + AssetID + "").checked){
        condition = op5;
    }
	var postString = "&AssetID = " + AssetID + "&currentcondition = " + condition 
	+ "&previousCondition = " + preCondition;
	if (condition == preCondition) {
		alert('The current selection is the same as the previous selection for the asset condition.');
	}
	processConditionData(postString)
};
	
function processConditionData(postString) {
	// Created an AJAX
	var serviceUrl= document.location.origin + "/api/insertConditionInformation";
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
