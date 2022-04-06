var width; // NB – keep this as a global variable
var mapPoint; // store the geoJSON feature so that we can remove it if the screen is resized
var popup = L.popup(); // create a custom popup as a global variable 
var assets; // holding asset point from user


function setMapClickEvent() {
	// get the window width
	width = $(window).width();
	// Remove the asset layer called when maximize the screen
	if (width < 992) { 
		if (assets){
		mymap.removeLayer(assets);}
	// we use the bootstrap Medium and Large options for the asset location capture
	// and the small and XS options for the condition option
	// see here: https://www.w3schools.com/bootstrap/bootstrap_grid_system.asp
	//the condition capture – 992px is defined as 'medium' by bootstrap
	// cancel the map onclick event using off ..
		mymap.off('click',onMapClick)
		// set up a point with click functionality
		setUpPointClick();
		getLocation();
	}
	else { 
		// the asset creation page
		// remove the map point if it exists
		if (mapPoint){
		mymap.removeLayer(mapPoint);}
		// the on click functionality of the MAP should pop up a blank asset creation form
		mymap.on('click', onMapClick);
		exsitingPointClick();
	}
};


// Condition Assessment: User's asset point load automatically

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
			// Prepare colour marker for the points
			 var testMarkerPink = L.AwesomeMarkers.icon({ 
			 icon: 'play', 
			 markerColor: 'pink' 
			 }); 
			 var testMarkerRed = L.AwesomeMarkers.icon({ 
			 icon: 'play', 
			 markerColor: 'red' 
			 });  
			 var testMarkerGreen = L.AwesomeMarkers.icon({ 
			 icon: 'play', 
			 markerColor: 'green' 
			 }); 
			 var testMarkerBlack = L.AwesomeMarkers.icon({ 
			 icon: 'play', 
			 markerColor: 'black' 
			 }); 
			 var testMarkerYellow = L.AwesomeMarkers.icon({ 
			 icon: 'play', 
			 markerColor: 'yellow' 
			 }); 
			 var testMarkerPurple = L.AwesomeMarkers.icon({ 
			 icon: 'play', 
			 markerColor: 'purple' 
			 }); 
			// Add points to map
			if (mapPoint){mymap.removeLayer(mapPoint);}
			
		   	mapPoint = L.geoJSON(result,{
		   			pointToLayer: function (feature, latlng){
						var condition = feature.properties.condition_description
						var op1 = 'Element is in very good condition';
						var op2 = 'Some aesthetic defects, needs minor repair';
						var op3 = 'Functional degradation of some parts, needs maintenance';
						var op4 = 'Not working and maintenance must be done as soon as reasonably possible';
						var op5 = 'Not working and needs immediate, urgent maintenance';
						if (condition == op1){
							return L.marker(latlng, {icon: testMarkerGreen}).bindPopup(getPopupHTML(feature));
						}
						if (condition == op2){
							return L.marker(latlng, {icon: testMarkerYellow}).bindPopup(getPopupHTML(feature));
						}
						if (condition == op3){
							return L.marker(latlng, {icon: testMarkerPink}).bindPopup(getPopupHTML(feature));
						}
						if (condition == op4){
							return L.marker(latlng, {icon: testMarkerPurple}).bindPopup(getPopupHTML(feature));
						}
						if (condition == op5){
							return L.marker(latlng, {icon: testMarkerRed}).bindPopup(getPopupHTML(feature));
						}
						else {
							return L.marker(latlng, {icon: testMarkerBlack}).bindPopup(getPopupHTML(feature));	
						}
		   			}
		   		}).addTo(mymap);
		   	mymap.fitBounds(mapPoint.getBounds());
		}
		});
	}});
}

// Condition Assessment: Condition form appears in pop-up when click
function getPopupHTML(feature){
	
	// Getting properties for specific asset from database
	// Using feature.properties.xxxx
	var asset_id = feature.properties.asset_id;
	var asset_name = feature.properties.asset_name;
	var installation_date = feature.properties.installation_date;
	var condition_description = feature.properties.condition_description;

    
	var htmlString = "<DIV id='popup_" + asset_id + "'><h4> Asset Condition Report </h4><br>";
	htmlString = htmlString + "<h6> Asset Name: " + asset_name + "</h6>";
	htmlString = htmlString + "<h6> Asset ID: " + asset_id + "</h6><br>";
	htmlString = htmlString + '<h6> Which one of options below can best describe the condition of the asset?</h6>'+
	'<form>'+
	'	<div class="radio">'+
	'	<input type="radio" name="condition" id="option1">  1 - Element is in very good condition'+
	'	</div>'+
	'	<br>'+
	'	<div class="radio">'+
	'	<input type="radio" name="condition" id="option2">  2 - Some aesthetic defects, needs minor repair'+
	'	</div>'+
	'	<br>'+
	'	<div class="radio">'+
	'	<input type="radio" name="condition" id="option3">  3 - Functional degradation of some parts, needs maintenance'+
	'	</div>'+
	'	<br>'+
	'	<div class="radio">'+
	'	<input type="radio" name="condition" id="option4">  4 - Not working and maintenance must be done as soon as reasonably possible'+
	'	</div>'+
	'	<br>'+
	'	<div class="radio">'+
	'	<input type="radio" name="condition" id="option5">  5 - Not working and needs immediate, urgent maintenance'+
	'	</div>'+
	'	<br>'+
	'</form>';
	
	htmlString = htmlString + "<button class='btn btn-primary' id='ConditionResult_" + asset_id + "' onclick='checkCondition()'>Submit Condition</button>";
	htmlString = htmlString + "<div id='previousConditionValue' style='display: none;'>"+condition_description+"</div>";
	htmlString = htmlString + "<div id='asset_id' style='display: none;'>"+ asset_id +"</div>"; 
	htmlString = htmlString + "<div id='asset_name' style='display: none;'>"+ asset_name +"</div>"; 
	return htmlString;
};


//////////////////////////////
// Asset Point Creation
// - Create an asset point
// - save to database
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
}

function basicFormHtml() {
		
	var myvar = '<form id="assetform">'+
	'	<div class="form-group">'+
	'	<label class="label" for="AssetName">Asset Name: </label>'+
	'	<input type="text" class="form-control form-control-sm" size="25" id="AssetName" placeholder="e.g. window"></div>'+
	'	<br>'+
	'	<div class="form-group">'+
	'	<label class="label" for="InstallDate">Installation Date: </label>'+
	'	<input type="date" class="form-control form-control-sm" id="InstallDate"/></div>'+
	'	<br>'+
	'	<button class="btn btn-primary" id=" saveAsset" onclick="saveNewAsset()">Save Asset</button>'+
	'</form>';
	

	return myvar;
}


// Asset Point Creation: 
// - displaying existing asset point created by user
function exsitingPointClick() {
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
			if (assets){mymap.removeLayer(assets);}
		   	assets = L.geoJSON(result,{
		   			pointToLayer: function (feature, latlng){
		   				return L.marker(latlng).bindPopup(existingPopupHTML(feature));}
		   		}).addTo(mymap);
		   	mymap.fitBounds(assets.getBounds());
		}
		});
	}});
}
// - read-only pop-up holding condition information

function existingPopupHTML(feature){
	
	// Getting properties for specific asset from database
	// Using feature.properties.xxxx
	var asset_id = feature.properties.asset_id;
	var asset_name = feature.properties.asset_name;
	var installation_date = feature.properties.installation_date;
	var condition_description = feature.properties.condition_description;
	
	var htmlString = "<p><span class='bolded'>Asset ID</span>: " + asset_id + "</p>"
	htmlString = htmlString + "<p><span class='bolded'>Asset Name</span>: " + asset_name + "</p>";
	htmlString = htmlString + "<p><span class='bolded'>Installation Date</span>: " + installation_date + "</p>";
	// - condition return 'No Condition Captured" when description is 'Unknown'
	if (condition_description == 'Unknown'){
		htmlString = htmlString + "<p><span class='bolded'>Condition</span>: No Condition Captured</p>";}
	else{
		htmlString = htmlString + "<p><span class='bolded'>Condition</span>: " + condition_description + "</p>";}
	
	return htmlString;
};

//////////////////////////////
