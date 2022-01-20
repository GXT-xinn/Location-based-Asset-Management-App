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
 
// add the JSON layer onto the map - it will appear using the default icons 
 // load the geoJSON layer 
 busstopsLayer = L.geoJson(result).addTo(mymap); 
 // change the map zoom so that all the data is shown 
 mymap.fitBounds(busstopsLayer.getBounds()); 
 } // end of the inner function 
 }); // end of the ajax request 
} ;// end of the getEarthquakeData function
