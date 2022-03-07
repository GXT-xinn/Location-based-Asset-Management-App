 
function saveNewAsset() {
	// now get the geometry values
	var latitude = document.getElementById("latitude").value;
	var longitude = document.getElementById("longitude").value;
	postString = "latitude=" + latitude + "&longitude=" + longitude;
	processData(postString);	
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