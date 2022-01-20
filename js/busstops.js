var busstopsLayer;


function removeBusstopsData() { 
 try { 
 alert("Busstop data will be removed"); 
 mymap.removeLayer( busstopsLayer ); 
 } catch (err) { alert("Layer doesn’t exist :" + err); 
 } 
} ;

function getBusstopsData() { 
 var layerURL = document.location.origin + "/app/data/busstops.geojson"; 
 $.ajax({url: layerURL, crossDomain: true,success: function(result){ 
 console.log(result); // check that the data is correct 
 
var testMarkerRed = L.AwesomeMarkers.icon({ 
 icon: 'play', 
 markerColor: 'red' 
 }); 
 var testMarkerGray = L.AwesomeMarkers.icon({ 
 icon: 'play', 
 markerColor: 'gray' 
 }); 
 
 var testMarkerPink = L.AwesomeMarkers.icon({ 
 icon: 'play', 
 markerColor: 'pink' 
 }); 
 var testMarkerBlue = L.AwesomeMarkers.icon({ 
 icon: 'play', 
 markerColor: 'blue' 
 }); 
 var testMarkerPurple = L.AwesomeMarkers.icon({ 
 icon: 'play', 
 markerColor: 'purple' 
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
 // load the geoJSON layer 
 busstopsLayer = L.geoJson(result, 
 { 
 // use point to layer to create the points 
 pointToLayer: function (feature, latlng){ 
 // look at the GeoJSON file - specifically at the properties - to see the busstops type 
 if (feature.properties.IIT_METHOD == '1') { 
 return L.marker(latlng, {icon: testMarkerGray 
}).bindPopup("<b>"+feature.properties.place +"</b>"); 
 } 
 else if (feature.properties.IIT_METHOD =='2') { 
 return L.marker(latlng, 
{icon:testMarkerYellow}).bindPopup("<b>"+feature.properties.place +"</b>"); 
 } 
 else if (feature.properties.IIT_METHOD =='3') { 
 return L.marker(latlng, 
{icon:testMarkerPurple}).bindPopup("<b>"+feature.properties.place +"</b>"); 
 } 
 else if (feature.properties.IIT_METHOD == '4') { 
 return L.marker(latlng, 
{icon:testMarkerPink}).bindPopup("<b>"+feature.properties.place +"</b>"); 
 } 
 else if (feature.properties.IIT_METHOD =='9') { 
 return L.marker(latlng, 
{icon:testMarkerBlue}).bindPopup("<b>"+feature.properties.place +"</b>"); 
 } 
 else { 
 return L.marker(latlng, 
{icon:testMarkerBlack}).bindPopup("<b>"+feature.properties.place +"</b>");; 
 } 
 }, // end of point to layer 
 }).addTo(mymap); 
 // change the map zoom so that all the data is shown 
 mymap.fitBounds(busstopsLayer.getBounds()); 
 } // end of the inner function 
 }); // end of the ajax request 
} ;// end of the getEarthquakeData function
