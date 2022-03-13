
function checkCondition(AssetID) {
	var preCondition = document.getElementById("previousConditionValue").innerHTML;
	var AssetID = AssetID;
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