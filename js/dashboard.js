
// preparing parameters for condition
var op1 = "Element is in very good condition";
var op2 = "Some aesthetic defects, needs minor repair";
var op3 = "Functional degradation of some parts, needs maintenance";
var op4 = "Not working and maintenance must be done as soon as reasonably possibl";
var op5 = "Not working and needs immediate, urgent maintenance";

		
function loadVectorLayer(){		
		Cesium.Ion.defaultAccessToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NmQ2NmVmNy0zZGY4LTQ1ZDAtYmUwOC03MjkzM2JjNzQ2OTQiLCJpZCI6MTU2NjMsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1Njg1MjQwNTl9.siDvMt3fH91XzE39FU_xqVrx-i6M1wWOBl_2vCrY6Xo';

		var imageryProviders = Cesium.createDefaultImageryProviderViewModels();
		var selectedImageryProviderIndex = 7;  // MapBox Street is 5th in the list.

		var viewer = new Cesium.Viewer('cesiumContainer', {
			imageryProviderViewModels: imageryProviders,
			selectedImageryProviderViewModel: imageryProviders[selectedImageryProviderIndex]
		});

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
					var dataSource = new Cesium.GeoJsonDataSource();
						dataSource.load(result[0]).then(function (dataSource){
							viewer.dataSources.add(dataSource);
							viewer.zoomTo(dataSource);
							var p = dataSource.entities.values;
							for (var i = 0; i < p.length; i++) {
								var entity = p[i];
								var condition = entity.properties.condition_description;
								// create color-coded billboard based on its condition
								// https://cesium.com/learn/cesiumjs/ref-doc/PinBuilder.html
									if (condition == op1) {
										entity.billboard.image = new Cesium.PinBuilder().fromText("1", Cesium.Color.FORESTGREEN,40);
									}
									else if (condition == op2) {
										entity.billboard.image = new Cesium.PinBuilder().fromText("2", Cesium.Color.GREENYELLOW,40);
									}
									else if (condition == op3) {
										entity.billboard.image = new Cesium.PinBuilder().fromText("3", Cesium.Color.ORANGE,40);
									}
									else if (condition == op4) {
										entity.billboard.image = new Cesium.PinBuilder().fromText("4", Cesium.Color.TOMATO,40);
									}
									else if (condition == op5) {
										entity.billboard.image = new Cesium.PinBuilder().fromText("5", Cesium.Color.DARKRED,40);
									}
									else {
										entity.billboard.image = new Cesium.PinBuilder().fromText("x", Cesium.Color.DIMGREY,40);
									}
								
							}
						});
					}
				
				});
			}
		});
}

// set cesium page as an variable
// onclick function for cesium map menu
var map = document.getElementById("content-wrapper").innerHTML;
function showMap() {
	document.getElementById("content-wrapper").innerHTML = map;
	loadVectorLayer();
}

// Showing bar plot with asset name as x-axis and condition as y-axis
// card template adapted from Michal Szymanski
// https://mdbootstrap.com/snippets/standard/ascensus/3330482?view=side#js-tab-view
// get string http://pojo.sodhanalibrary.com/ConvertToVariable
function graphs() {
	var graph = '<section class="">'+
		'			<div class="row gx-lg-5">'+
		'			  <div class="col-lg-8 col-md-12 mb-4 mb-lg-0">'+
		'				<div class="bg-glass shadow-4-strong rounded-6 h-50">'+
		'				  <div class="p-4 border-bottom">'+
		'					<div class="row align-items-center">'+
		'					  <div class="col-6 mb-4 mb-md-0">'+
		'						<h4><strong>Bar Plot</strong></h4>'+
		'					  </div>'+
		'					</div>'+
		'				  </div>'+
		'				  <div class="p-4">'+
		'					<canvas id="barchart"></canvas>'+
		'				  </div>'+
		'				</div>'+
		'			</div>'+
		'		  </section>';
    // init the bar chart by binding a certain div
	document.getElementById("content-wrapper").innerHTML = graph
    var barChart = echarts.init(document.getElementById('barchart'));

    // a local variable used to store the data and the option of the bar chart
    var option1;

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
            var data = result[0].features;
            // lists used to store the x and y data
            x = [];
			y = [];
            // for each asset point
            for (var i = 0; i < data.length; i++) {
                // push the name to the x
                x.push(data[i].properties.asset_name);
                // push the condition 
                var condition_value = data[i].properties.condition_description;
                if (condition_value == op1) {
                    y.push(1);
                }
                else if (condition_value == op2) {
                    y.push(2);
                }
                else if (condition_value == op3) {
                    y.push(3);
                }
                else if (condition_value == op4) {
                    y.push(4);
                }
                else if (condition_value == op5) {
                    y.push(5);
                }
                else {
                    y.push(0);
                }
            }
            var chartdata = {
				labels: x,
				datasets : [
				  {
					label: 'Condition',
					backgroundColor: 'rgba(200, 200, 200, 0.75)',
					borderColor: 'rgba(200, 200, 200, 0.75)',
					hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
					hoverBorderColor: 'rgba(200, 200, 200, 1)',
					data: y
				  }
				]
			  };
            var ctx = document.getElementById('barchart');

		    var barGraph = new Chart(ctx, {
				type: 'bar',
				data: chartdata
			  });
			}
		});
	} 
	});
}

