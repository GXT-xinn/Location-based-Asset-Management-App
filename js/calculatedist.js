
// Global variables
var trackLocationLayer = [];
var geoLocationID;

// Condition Assessment: Track user's location automatically
function getLocation() {
	console.log("Start tracking")
	if (navigator.geolocation) {
		geoLocationID = navigator.geolocation.watchPosition(showPosition);
	}
	else {
		alert("Geolocation is not supported by this browser.");
	}
}

function showPosition(position) {
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	trackLocationLayer.push(L.marker([lat, lon]).addTo(mymap)); 
	closestFormPoint(lat, lon);
}

function closestFormPoint(latitude, longitude) {
	console.log("Start calculate distance");
    // take the leaflet form data layer
    // go through each point one by one
    // for the closest point show the pop up of that point
    var minDistance = 10000000;
    var closestFormPoint = 0;
    // for this example, use the latitude/longitude of warren street
    // in your assignment replace this with the user's location
    var userlat = latitude;
    var userlng = longitude;
    mapPoint.eachLayer(function(layer) {
        var distance = calculateDistance(userlat,userlng,layer.getLatLng().lat, layer.getLatLng().lng, 'K');
        if (distance < minDistance){
            minDistance = distance;
            closestFormPoint = layer.feature.properties.asset_id;
        }
    });
    // for this to be a proximity alert, the minDistance must be 5 of 5
    // closer than a given distance - you can check that here
    // using an if statement
    // show the popup for the closest point
	
    mapPoint.eachLayer(function(layer) {
		console.log("Found closest point")
        if (layer.feature.properties.asset_id == closestFormPoint){
            layer.openPopup();
        }
    });
}

function calculateDistance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var radlon1 = Math.PI * lon1/180;
    var radlon2 = Math.PI * lon2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    subAngle = Math.acos(subAngle);
    subAngle = subAngle * 180/Math.PI; // convert the degree value returned by acos back to degrees from radians
    dist = (subAngle/360) * 2 * Math.PI * 3956; //((subtended angle in degrees)/360) * 2 * pi * radius ) where radius of the earth is 3956 miles
    if (unit=="K") { dist = dist * 1.609344 ;} // convert miles to km
    if (unit=="N") { dist = dist * 0.8684 ;} // convert miles to nautical miles
    return dist;
}


function removePositionPoints() { 
	// Disable the location tracking to remove points
	navigator.geolocation.clearWatch(geoLocationID); 
	// Loop through the array and remove any points 
	for (var i=trackLocationLayer.length-1; i > -1;i--) { 
		console.log("Tracking: Removing point "+i + " with coordinates "+trackLocationLayer[i].getLatLng()); 
		mymap.removeLayer(trackLocationLayer[i]); 
	} 
}