// global variable
var roomsAJAX;
// make sure the data api server is running before you run this test
function getRoomData() {
 // get the root of the URL from the web page
 var theURL = document.location.origin + "/api/testCRUD"
 roomsAJAX = new XMLHttpRequest();
 // this is a GET request as we are retrieving data
 roomsAJAX.open("GET", theURL);
 // the function to run when the result is returned
 roomsAJAX.onreadystatechange = showRoomData;
// send the request
 roomsAJAX.send(); }
 
function showRoomData() {
 // check if the response has been received - if not, keep waiting
 if (roomsAJAX.readyState < 4)
 // while waiting response from server
 document.getElementById('responseDIV').innerHTML = "Loading...";
 else if (roomsAJAX.readyState === 4) {
	 // 4 = Response from
	 // server has been completely loaded.
	 if (roomsAJAX.status > 199 && roomsAJAX.status < 300)
	 // http status between 200 to 299 are all successful
	 document.getElementById('responseDIV').innerHTML = roomsAJAX.responseText;} }