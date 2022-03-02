// define global variable
var buildings;
// raise an error while remove building data
function removeBuildings() { 
 try { 
 alert("Building data will be removed"); 
 mymap.removeLayer( buildings ); 
 } catch (err) { alert("Layer doesn’t exist :" + err); 
 } 
} ;

function getBuildings() { 
var baseComputerAddress = document.location.origin;
var dataAddress="/api/getGeoJSON/ucfscde/buildings/building_id/location";
var layerURL = baseComputerAddress + dataAddress;
 $.ajax({url: layerURL, crossDomain: true,success: function(result){ 
 console.log(result); // check that the data is correct 
 // load the geoJSON layer 
 buildings = L.geoJson(result, 
 { 
 // use point to layer to create the points 
style: {
	color: "black",
	fillcolor: "grey",
	fillOpacity: 0.3
}
 }).addTo(mymap); 
 // change the map zoom so that all the data is shown 
 mymap.fitBounds(buildings.getBounds()); 
 } // end of the inner function 
 }); // end of the ajax request 
};



// define global variable
var ethernet;
// raise an error while remove ethernet data
function removeEthernet() { 
 try { 
 alert("Ethernet data will be removed"); 
 mymap.removeLayer( ethernet ); 
 } catch (err) { alert("Layer doesn’t exist :" + err); 
 } 
} ;

function getEthernet() { 
var baseComputerAddress = document.location.origin;
var dataAddress="/api/getGeoJSON/ucfscde/ethernet_cables/ethernet_id/location";
var layerURL = baseComputerAddress + dataAddress;
 $.ajax({url: layerURL, crossDomain: true,success: function(result){ 
 console.log(result); // check that the data is correct 
 // load the geoJSON layer 
 ethernet = L.geoJson(result).addTo(mymap); 
 // change the map zoom so that all the data is shown 
 mymap.fitBounds(ethernet.getBounds()); 
 } // end of the inner function 
 }); // end of the ajax request 
};



// define global variable
var rooms;
// raise an error while remove rooms data
function removeRooms() { 
 try { 
 alert("Rooms data will be removed"); 
 mymap.removeLayer( Rooms ); 
 } catch (err) { alert("Layer doesn’t exist :" + err); 
 } 
} ;

function getRooms() { 
var baseComputerAddress = document.location.origin;
var dataAddress="/api/getGeoJSON/ucfscde/rooms/room_id/location";
var layerURL = baseComputerAddress + dataAddress;
 $.ajax({url: layerURL, crossDomain: true,success: function(result){ 
 console.log(result); // check that the data is correct 
 // load the geoJSON layer 
 Rooms = L.geoJson(result, 
 { 
 // use point to layer to create the points 
style: {
	color: "orange",
	Opacity: 0.6
}
 }).addTo(mymap); 
 // change the map zoom so that all the data is shown 
 mymap.fitBounds(Rooms.getBounds()); 
 } // end of the inner function 
 }); // end of the ajax request 
};



// define global variable
var sensors;
// raise an error while remove sensor data
function removeSensors() { 
 try { 
 alert("Sensors data will be removed"); 
 mymap.removeLayer( sensors ); 
 } catch (err) { alert("Layer doesn’t exist :" + err); 
 } 
} ;

function getSensors() { 
var baseComputerAddress = document.location.origin;
var dataAddress="/api/getGeoJSON/ucfscde/temperature_sensors/sensor_id/location";
var layerURL = baseComputerAddress + dataAddress;
 $.ajax({url: layerURL, crossDomain: true,success: function(result){ 
 console.log(result); // check that the data is correct 
 // load the geoJSON layer 
 sensors = L.geoJson(result).addTo(mymap); 
 // change the map zoom so that all the data is shown 
 mymap.fitBounds(sensors.getBounds()); 
 } // end of the inner function 
 }); // end of the ajax request 
};