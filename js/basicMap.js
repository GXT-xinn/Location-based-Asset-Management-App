<!-- the following script will load the map and set the default view and zoom, as well as loading the basemap tiles -->
var mymap; // global variable to store the map
var width; // NB – keep this as a global variable
var mapPoint; // store the geoJSON feature so that we can remove it if the screen is resized
var popup = L.popup(); // create a custom popup as a global variable 

function loadLeafletMap() {
      // load the map
 mymap = L.map('mapContainer').setView([51.505, -0.09], 9);
 // load the tiles
 L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
 maxZoom: 20,
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
 '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
 id: 'mapbox/streets-v11',
tileSize: 512,
zoomOffset: -1
 }).addTo(mymap);
};


function setMapClickEvent() {
	// get the window width
	width = $(window).width();

	// we use the bootstrap Medium and Large options for the asset location capture
	// and the small and XS options for the condition option
	// see here: https://www.w3schools.com/bootstrap/bootstrap_grid_system.asp
	if (width < 992) { 
		//the condition capture – 992px is defined as 'medium' by bootstrap
		// cancel the map onclick event using off ..
		mymap.off('click',onMapClick)
		// set up a point with click functionality
		setUpPointClick();
	}
	else { 
		// the asset creation page
		// remove the map point if it exists
		if (mapPoint){
		mymap.removeLayer(mapPoint);}
		// the on click functionality of the MAP should pop up a blank asset creation form
		mymap.on('click', onMapClick);
	}
};




function setUpPointClick() {
	// Create an AJAX call for current user ID
	$.ajax({url: document.location.origin + "/api/getUserId", 
	crossDomain: true,success: function(result){
		console.log(JSON.stringify(result));
		var userID = JSON.stringify(result);
		// Extract solely the ID number
		userID = JSON.parse(userID);
		for(var i = 0; i < userID.length; i++){
			userID = userID[i]['user_id'];};
		// AJAX call for assets inputted by specific user (current user)
		pointURL = document.location.origin + "/api/geoJSONUserId/" + userID +"";
		
		$.ajax({url: pointURL, crossDomain: true,success: function(result){
			console.log(result); // check that the data is correct
			// Add points to map
		   	mapPoint = L.geoJSON(result,{
		   			pointToLayer: function (feature, latlng){
		   				return L.marker(latlng).bindPopup(getPopupHTML(feature));}
		   		}).addTo(mymap);
		   	mymap.fitBounds(mapPoint.getBounds());
		}
		});
	}});
}

function getPopupHTML(feature){
	// 
	
	var AssetID = feature.properties.asset_id;
	var assetName = feature.properties.asset_name;
	var InstallationDate = feature.properties.installation_date;
	var previousCondition = feature.properties.condition_description;

    
	var htmlString = "<DIV id='popup_" + AssetID + "'><h4> Asset Condition Report </h4><br>";
	htmlString = htmlString + "<h6> Asset Name: " + assetName + "</h6>";
	htmlString = htmlString + "<h6> Asset ID: " + AssetID + "</h6><br>";
	htmlString = htmlString + '<h6> Which one of options below can best describe the condition of the asset?</h6>'+
	'<form>'+
	'	<div class="radio">'+
	'	<input type="radio" name="conditionvalue" id="option1_'+ AssetID +'">  1 - Element is in very good condition'+
	'	</div>'+
	'	<br>'+
	'	<div class="radio">'+
	'	<input type="radio" name="conditionvalue" id="option2_'+ AssetID +'">  2 - Some aesthetic defects, needs minor repair'+
	'	</div>'+
	'	<br>'+
	'	<div class="radio">'+
	'	<input type="radio" name="conditionvalue" id="option3_'+ AssetID +'">  3 - Functional degradation of some parts, needs maintenance'+
	'	</div>'+
	'	<br>'+
	'	<div class="radio">'+
	'	<input type="radio" name="conditionvalue" id="option4_'+ AssetID +'">  4 - Not working and maintenance must be done as soon as reasonably possible'+
	'	</div>'+
	'	<br>'+
	'	<div class="radio">'+
	'	<input type="radio" name="conditionvalue" id="option5_'+ AssetID +'">  5 - Not working and needs immediate, urgent maintenance'+
	'	</div>'+
	'	<br>'+
	'</form>';
	
	htmlString = htmlString + "<button class='btn btn-primary' id='ConditionResult_" + AssetID + "' onclick='checkCondition("+ AssetID +")'>Submit Condition</button>";
	htmlString = htmlString + "<div id='previousConditionValue' style='display: none;'>"+previousCondition+"</div>";
	htmlString = htmlString + "<div id='assetID' style='display: none;'>"+ AssetID +"</div>"; 
	return htmlString;
};

var latitude
var longitude

function onMapClick(e) {
	var formHTML = basicFormHtml();
	latitude = String(e.latlng.lat);
	longitude = String(e.latlng.lng);
	 popup
	 .setLatLng(e.latlng)
	 .setContent("You clicked the map at " + e.latlng.toString()+"<br>"+"<br>"+formHTML)
	 .openOn(mymap);
};

function basicFormHtml() {
	var userID;
	$.ajax({
		url:document.location.origin + "/api/getUserId",
		crossDomain: true,
		async: false,
		success: function (result) {
		userID = JSON.stringify(result)}});	
		
	var myvar = '<form>'+
	'	<div class="form-group">'+
	'	<label class="label" for="AssetName">Asset Name: </label>'+
	'	<input type="text" class="form-control form-control-sm" size="25" id="AssetName" placeholder="e.g. window"></div>'+
	'	<br>'+
	'	<div class="form-group">'+
	'	<label class="label" for="InstallDate">Installation Date: </label>'+
	'	<input type="date" class="form-control form-control-sm" id="InstallDate"/></div>'+
	'	<br>'+
	'	<button class="btn btn-primary" id=" saveAsset" onclick="saveNewAsset()">Save Asset</button>'+
	'</form>' +
	"<div id='userID' style='display: none;'>"+ userID +"</div>";
	

	return myvar;
}