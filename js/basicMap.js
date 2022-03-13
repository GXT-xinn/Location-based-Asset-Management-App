<!-- the following script will load the map and set the default view and zoom, as well as loading the basemap tiles -->
var mymap; // global variable to store the map
var width; // NB – keep this as a global variable
var mapPoint; // store the geoJSON feature so that we can remove it if the screen is resized
var popup = L.popup(); // create a custom popup as a global variable 
// create an event detector to wait for the user's click event and then use the popup to show them where they clicked 
// note that you don't need to do any complicated maths to convert screen coordinates to real world coordiantes - the Leaflet API does this for you 

function onMapClick(e) { 
 popup 
 .setLatLng(e.latlng) 
 .setContent("You clicked the map at " + e.latlng.toString()) 
 .openOn(mymap); 
 };

function setMapClickEvent() {
	// get the window width
	width = $(window).width();

	// we use the bootstrap Medium and Large options for the asset location capture
	// and the small and XS options for the condition option
	// see here: https://www.w3schools.com/bootstrap/bootstrap_grid_system.asp
	if (width < 992) { //the condition capture – 992px is defined as 'medium' by bootstrap
	// cancel the map onclick event using off ..
	mymap.off('click',onMapClick)
	// set up a point with click functionality
	setUpPointClick();
	}
	else { // the asset creation page
	// remove the map point if it exists
	if (mapPoint){
	mymap.removeLayer(mapPoint);
	 }
	 // the on click functionality of the MAP should pop up a blank asset creation form
	 mymap.on('click', onMapClick);
	}
};


function setUpPointClick() {
	// create a geoJSON feature (in your assignment code this will be replaced
	// by an AJAX call to load the asset points on the map
	var geojsonFeature = {
	"type": "Feature",
	"properties": {
	"name": "London",
	"popupContent": "This is where UCL is based"
	},
	"geometry": {
	"type": "Point",
	"coordinates": [-0.13263, 51.522449]
	 }
 }
// and add it to the map and zoom to that location
// use the mapPoint variable so that we can remove this point layer on
mapPoint= L.geoJSON(geojsonFeature).addTo(mymap).bindPopup(popUpHTML);
mymap.setView([51.522449,-0.13263], 12)
// the on click functionality of the POINT should pop up partially populated condition form so that the user can select the condition they require
 var popUpHTML = getPopupHTML;
 console.log(popUpHTML);
};


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
}