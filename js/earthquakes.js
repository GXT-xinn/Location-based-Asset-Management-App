var earthquakeLayer; 

function removeEarthquakeData() { 
 try { 
 alert("Earthquake data will be removed"); 
 mymap.removeLayer( earthquakelayer ); 
 } catch (err) { alert("Layer doesn’t exist :" + err); 
 } 
} 

function getEarthquakeData() { 
 var layerURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"; 
 $.ajax({url: layerURL, crossDomain: true,success: function(result){ 
 console.log(result); // check that the data is correct 
// load the geoJSON layer 
 earthquakelayer = L.geoJson(result, 
 { 
 // use point to layer to create the points 
 pointToLayer: function (feature, latlng){ 
 // look at the GeoJSON file - specifically at the properties - to see the earthquake magnitude and use a different marker depending on this value 
 // also include a pop-up that shows the place value of the earthquakes 
 if (feature.properties.mag > 1.75) { 
 return L.marker(latlng, 
{icon:testMarkerGreen}).bindPopup("<b>"+feature.properties.place +"</b>"); 
 } 
 else { 
 // magnitude is 1.75 or less 
 return L.marker(latlng, 
{icon:testMarkerPink}).bindPopup("<b>"+feature.properties.place +"</b>");; 
 } 
 }, // end of point to layer 
 }).addTo(mymap); 
 // change the map zoom so that all the data is shown 
 mymap.fitBounds(earthquakelayer.getBounds()); 
 } // end of the inner function 
 }); // end of the ajax request 
} // end of the getEarthquakeData function
