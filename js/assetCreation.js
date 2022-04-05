// Instead of value, previouscondition value is in text/string
// in order to match, condition need to in text
// preparing parameters for condition
var op1 = 'Element is in very good condition';
var op2 = 'Some aesthetic defects, needs minor repair';
var op3 = 'Functional degradation of some parts, needs maintenance';
var op4 = 'Not working and maintenance must be done as soon as reasonably possible';
var op5 = 'Not working and needs immediate, urgent maintenance';

function checkCondition() {
	var asset_id = document.getElementById("asset_id").innerHTML;
	var postString = "asset_id=" + asset_id;
	var asset_name = document.getElementById('asset_name').innerHTML;
	postString = postString + "&asset_name=" + asset_name;
	var condition = "";
	if (document.getElementById("option1").checked){
        condition = op1;
    }
	if (document.getElementById("option2").checked){
        condition = op2;
    }
	if (document.getElementById("option3").checked){
        condition = op3;
    }
	if (document.getElementById("option4").checked){
        condition = op4;
    }
	if (document.getElementById("option5").checked){
        condition = op5;
    };
	var previousCondition = document.getElementById("previousConditionValue").innerHTML;
	postString = postString + "&condition=" + condition ;
	postString = postString + "&previousCondition=" + previousCondition;
	if (condition == previousCondition) {
		alert('The current selection is the same as the previous selection for the asset condition.');
	}
	else {
		alert('The current selection has changed comparing to the previous selection for this asset condition')
	}
	
	processconditionData(postString)
	sumReports()
};


function processconditionData(postString) {
		var serviceUrl= document.location.origin + "/api/insertConditionInformation";
		$.ajax({
			url: serviceUrl,
			crossDomain: true,
			async:false,
			type: "POST",
			success: function(data){console.log(data); alert(JSON.stringify(data));},
			data: postString
		});
}

function sumReports(){
	$.ajax({url: document.location.origin + "/api/getUserId", 
	crossDomain: true,success: function(result){
		console.log(JSON.stringify(result));
		var userID = JSON.stringify(result);
		// Extract solely the ID number
		userID = JSON.parse(userID);
		for(var i = 0; i < userID.length; i++){
			userID = userID[i]['user_id'];};
		// AJAX call for assets inputted by specific user (current user)
		pointURL = document.location.origin + "/api/userConditionReports/" + userID +"";
		
		$.ajax({url: pointURL, crossDomain: true,success: function(result){
			alert("You have submitted "+ result[0].array_to_json[0].num_reports + " reports in total");		
		}
		});
	}});
}
	


function saveNewAsset() {
	// now get the values for userid, coordinates, installation date and asset name
	// use triple equality operator (=== or !==) to check for null value
	if(document.getElementById("AssetName").value === null){
		if(document.getElementById("InstallDate").value === null){
			alert("Please Enter the Asset Name and Installation Date");}
		else{
			alert("Please Enter an Asset Name");}
	}
	
	if(document.getElementById("InstallDate").value === null){
			alert("Please Enter the Installation Date");}
			
	else {		
	var AssetName = document.getElementById("AssetName").value;
	var postString = "AssetName=" + AssetName;
	var InstallDate = document.getElementById("InstallDate").value;
	postString = postString + "&InstallDate=" + InstallDate;
	postString = postString + "&latitude=" + latitude + "&longitude=" + longitude;
	processAssetData(postString);
	}
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


