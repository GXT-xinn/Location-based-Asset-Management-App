
// Set up Global variables
var trackLocationLayer = [];
var geoLocationID;

// Track user location consistently using watchPosition
function getLocation() {
	console.log("Start tracking")
	if (navigator.geolocation) {
		geoLocationID = navigator.geolocation.watchPosition(showPosition);
	}
	else {
		alert("Geolocation is not supported by this browser.");
	}
}
// Extract coordinates for closest asset calculation
function showPosition(position) {
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	trackLocationLayer.push(L.marker([lat, lon]).addTo(mymap)); 
	closestFormPoint(lat, lon);
}
// Main function for closest point calculation 
function closestFormPoint(latitude, longitude) {
	// set variable for minimum distance
	// As the function is meant to find the closest asset, it is important to set a boundary value - minDistance
    var minDistance = 10000000;
	// closestFormPoint variable will hold asset id
    var closestFormPoint = 0;
    var userlat = latitude;
    var userlng = longitude;
	// Loop through all assets points on the map added to map previously
    mapPoint.eachLayer(function(layer) {
        var distance = calculateDistance(userlat,userlng,layer.getLatLng().lat, layer.getLatLng().lng, 'K');
        if (distance < minDistance){
            minDistance = distance;
            closestFormPoint = layer.feature.properties.asset_id;
        }
    });
    // Show the popup for the closest point
	
    mapPoint.eachLayer(function(layer) {
        if (layer.feature.properties.asset_id == closestFormPoint){
            layer.openPopup();
        }
    });
}

// Distance calculation function adapted from coursework
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