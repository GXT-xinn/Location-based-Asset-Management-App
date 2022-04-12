
// preparing parameters for condition
var op1 = "Element is in very good condition";
var op2 = "Some aesthetic defects, needs minor repair";
var op3 = "Functional degradation of some parts, needs maintenance";
var op4 = "Not working and maintenance must be done as soon as reasonably possible";
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
// echart function is adpated from dyclassroom.com, link below
// https://dyclassroom.com/chartjs/chartjs-how-to-draw-bar-graph-using-data-from-mysql-table-and-php
// get string http://pojo.sodhanalibrary.com



var graph = '<h2><strong>Graphs</strong></h2>'+
'<p>Information of user assets are displayed below</p>'+
'<br>'+
'<div class="row">'+
'	<div class="col-sm-4">'+
'		<div class="card">'+
'			<div class="card-body">'+
'				<h5 class="card-title text-mute">User Rank</h5>'+
'				<p class="mb-0 h5 me-2" id="userRank"></p>'+
'			</div>'+
'		</div>'+
'	</div>'+
'	<div class="col-sm-4">'+
'		<div class="card">'+
'			<div class="card-body">'+
'				<h5 class="card-title text-mute">Total Asset</h5>'+
'				<p class="mb-0 h5 me-2" id="NumberofAsset"></p>'+
'			</div>'+
'		</div>'+
'	</div>'+
'	<div class="col-sm-4">'+
'		<div class="card">'+
'			<div class="card-body">'+
'				<h5 class="card-title text-mute">Total Report</h5>'+
'				<p class="mb-0 h5 me-2" id="NumberofReport"></p>'+
'			</div>'+
'		</div>'+
'	</div>'+
'</div>'+
'<br>'+
'<br>'+
'<div class="row">'+
'  <div class="col-lg-12 col-md-12 mb-4 mb-lg-0">'+
'		<div class="card">'+
'        <div class="card-header">'+
'          <ul class="nav nav-tabs card-header-tabs" id="navTab" role="tablist">'+
'            <li class="nav-item">'+
'              <a class="nav-link active" href="#bar" role="tab" aria-controls="bar" aria-selected="true" onclick="bargraph()">Bar</a>'+
'            </li>'+
'            <li class="nav-item">'+
'              <a class="nav-link"  href="#Line" role="tab" aria-controls="Line" aria-selected="false" onclick="linegraph()">Line</a>'+
'            </li>'+
'            <li class="nav-item">'+
'              <a class="nav-link" href="#Doughnut" role="tab" aria-controls="Doughnut" aria-selected="false">Doughnut</a>'+
'            </li>'+
'          </ul>'+
'        </div>'+
'        <div id="canvasContainer" class="card-body">'+
'          <h4 class="card-title" align="center">Asset Condition</h4>      '+
'           <div class="tab-content mt-3">'+
'            <div class="tab-pane active" role="tabpanel">'+
'				<canvas id="barchart" height="200px"></canvas>'+
'            </div>'+
'          </div>'+
'        </div>'+
'      </div>'+
'  </div>'+
'</div>';
	

function bargraph() {
    // init the bar chart by binding a certain div
	document.getElementById("content-wrapper").innerHTML = graph;

    $.ajax({url: document.location.origin + "/api/getUserId", 
			crossDomain: true,success: function(result){
				var userID = JSON.stringify(result);
				// Extract solely the ID number
				userID = JSON.parse(userID);
				for(var i = 0; i < userID.length; i++){
					userID = userID[i]['user_id'];};
				// AJAX call for assets inputted by specific user (current user)
				pointURL = document.location.origin + "/api/geoJSONUserId/" + userID +"";
				$.ajax({url: pointURL, crossDomain: true,success: function(result){
            var data = result[0].features;
			document.getElementById("NumberofAsset").innerHTML = data.length;
            // lists used to store the x and y data
            x = [];
			y = [];
			backcolor = [];
            // for each asset point
            for (var i = 0; i < data.length; i++) {
				var chartColors = {
				  case1: 'rgba(255, 99, 132, 0.7)',
				  case2: 'rgba(54, 162, 235, 0.7)',
				  case3: 'rgba(255, 206, 86, 0.7)',
				  case4: 'rgba(75, 192, 192, 0.7)',
				  case5: 'rgba(153, 102, 255, 0.7)'
				};
                // push the name to the x
                x.push(data[i].properties.asset_name);
                // push the condition 
                var condition_value = data[i].properties.condition_description;
                if (condition_value == op1) {
                    y.push(1);
					backcolor.push(chartColors.case1);
                }
                else if (condition_value == op2) {
                    y.push(2);
					backcolor.push(chartColors.case2);
                }
                else if (condition_value == op3) {
                    y.push(3);
					backcolor.push(chartColors.case3);
                }
                else if (condition_value == op4) {
                    y.push(4);
					backcolor.push(chartColors.case4);
                }
                else if (condition_value == op5) {
                    y.push(5);
					backcolor.push(chartColors.case5);
                }
                else {
                    y.push(0);
					backcolor.push(chartColors.case5);
                }
            }
			var ctx = document.getElementById('barchart');
		    var barGraph = new Chart(ctx, {
				type: 'bar',
				data: {
						labels: x,
						datasets : [
						  {
							label: 'Condition',
							backgroundColor: backcolor,
							data: y
						  }]
					},
				 options: {
					 tooltip: {},
					  legend: {
						display: false
					  },
					  scales: {
						xAxes: [{
							stacked: false,
							beginAtZero: true,
							ticks: {
								stepSize: 1,
								min: 0,
								autoSkip: false
							},
							scaleLabel: {
								display: true,
								labelString: 'Asset Name',
								fontStyle: 'italic',
								fontSize: 12
							  }
						}],
						yAxes: [{
							stacked: false,
							beginAtZero: true,
							ticks: {
								stepSize: 1,
								min: 0,
								autoSkip: false
							},
							scaleLabel: {
								display: true,
								labelString: 'Condition Value',
								fontStyle: 'italic',
								fontSize: 12
							  }
						}]
					}
				  }
			  });
			}
		});
	} 
	});
}

var lineChar = '<h4 class="card-title" align="center">Daily Report Rate</h4>      '+
'   <div class="tab-content mt-3">'+
'	<div class="tab-pane active" id="Line" role="tabpanel">'+
'		<canvas id="linegraph" height="200px"></canvas>'+
'	</div>'+
'  </div>';
function linegraph() {
    // init the bar chart by binding a certain div
	document.getElementById("canvasContainer").innerHTML = lineChar;

		pointURL = document.location.origin + "/api/dailyParticipationRates";
		$.ajax({url: pointURL, crossDomain: true,success: function(result){
            var dataset = result[0].array_to_json;
            // lists used to store the x and y data
            x = [];
			y = [];
			y1 = [];
            // for each asset point
            for (var i = 0; i < dataset.length; i++) {
				x.push(dataset[i].day);
				y.push(dataset[i].reports_submitted);
				y1.push(dataset[i].reports_not_working);
            }
			console.log(y);
			console.log(y1);
			var ctx = document.getElementById('linegraph').getContext("2d");
		    var lineGraph = new Chart(ctx, {
				type: 'line',
				data: {
						labels: x,
						datasets :  [
                        {
                            label: "reports_submitted",
                            fill: true,
                            borderColor: "rgba(78, 171, 235, 0.6)",
                            data: y
                        },
                        {
                            label: "reports_not_working",
							fill: true,
                            borderColor: "rgba(255, 124, 152, 0.6)",
                            data: y1
                        }
                    ]
					}
			  });
			}
		});
}


var pieChar = '<h4 class="card-title" align="center">Pie Chart on Asset Condition</h4>      '+
'   <div class="tab-content mt-3">'+
'	<div class="tab-pane active" id="Doughnut" role="tabpanel">'+
'		<canvas id="douChart" height="200px"></canvas>'+
'	</div>'+
'  </div>';


function rankUser() {
	$.ajax({url: document.location.origin + "/api/getUserId", 
	crossDomain: true,success: function(result){
		var userID = JSON.stringify(result);
		// Extract solely the ID number
		userID = JSON.parse(userID);
		for(var i = 0; i < userID.length; i++){
			userID = userID[i]['user_id'];};
		// AJAX call for assets inputted by specific user (current user)
		pointURL = document.location.origin + "/api/userRanking/" + userID +"";
		
		$.ajax({url: pointURL, crossDomain: true,success: function(result){
			ranking = result[0].array_to_json[0].rank
			document.getElementById("userRank").innerHTML = ranking;
		}
		});
	}}); 
}

function sumReports(){
	$.ajax({url: document.location.origin + "/api/getUserId", 
	crossDomain: true,success: function(result){
		var userID = JSON.stringify(result);
		// Extract solely the ID number
		userID = JSON.parse(userID);
		for(var i = 0; i < userID.length; i++){
			userID = userID[i]['user_id'];};
		// AJAX call for assets inputted by specific user (current user)
		pointURL = document.location.origin + "/api/userConditionReports/" + userID +"";
		
		$.ajax({url: pointURL, crossDomain: true,success: function(result){
			reports = result[0].array_to_json[0].num_reports
			document.getElementById("NumberofReport").innerHTML = reports;
		}
		});
	}});
}

function totalAsset(){
	$.ajax({url: document.location.origin + "/api/getUserId", 
			crossDomain: true,success: function(result){
				var userID = JSON.stringify(result);
				// Extract solely the ID number
				userID = JSON.parse(userID);
				for(var i = 0; i < userID.length; i++){
					userID = userID[i]['user_id'];};
				// AJAX call for assets inputted by specific user (current user)
				pointURL = document.location.origin + "/api/geoJSONUserId/" + userID +"";
				$.ajax({url: pointURL, crossDomain: true,success: function(result){
					var data = result[0].features;
					document.getElementById("NumberofAsset").innerHTML = data.length;
				}
				})
			}
	})
}
				
function graphs(){
	bargraph(),
	rankUser(),
	sumReports()
	totalAsset()
}

