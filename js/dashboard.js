		
		
function loadVectorLayer(){		
		Cesium.Ion.defaultAccessToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NmQ2NmVmNy0zZGY4LTQ1ZDAtYmUwOC03MjkzM2JjNzQ2OTQiLCJpZCI6MTU2NjMsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1Njg1MjQwNTl9.siDvMt3fH91XzE39FU_xqVrx-i6M1wWOBl_2vCrY6Xo';

		var imageryProviders = Cesium.createDefaultImageryProviderViewModels();
		var selectedImageryProviderIndex = 7;  // MapBox Street is 5th in the list.

		var viewer = new Cesium.Viewer('cesiumContainer', {
			imageryProviderViewModels: imageryProviders,
			selectedImageryProviderViewModel: imageryProviders[selectedImageryProviderIndex]
		});

		// preparing parameters for condition
		var op1 = "Element is in very good condition";
		var op2 = "Some aesthetic defects, needs minor repair";
		var op3 = "Functional degradation of some parts, needs maintenance";
		var op4 = "Not working and maintenance must be done as soon as reasonably possibl";
		var op5 = "Not working and needs immediate, urgent maintenance";


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
							viewer.flyTo(dataSource);
							var p = dataSource.entities.values;
							for (var i = 0; i < p.length; i++) {
								var entity = p[i];
								var condition = entity.properties.condition_description;
								entity.billboard = undefined;
								// create color-coded points based on its condition
								// Codes are adapted from a solution on StackExchange platform
								// https://gis.stackexchange.com/questions/190270/viewing-a-point-geojson-layer-as-markers-in-cesium
									if (condition == op1) {
										entity.point = new Cesium.PointGraphics({
											color: Cesium.Color.FORESTGREEN,
											pixelSize: 14,
											outlineWidth: 2
										});
									}
									else if (condition == op2) {
										entity.point = new Cesium.PointGraphics({
											color: Cesium.Color.GREENYELLOW,
											pixelSize: 14,
											outlineWidth: 2
										});
									}
									else if (condition == op3) {
										entity.point = new Cesium.PointGraphics({
											color: Cesium.Color.ORANGE,
											pixelSize: 14,
											outlineWidth: 2
										});
									}
									else if (condition == op4) {
										entity.point = new Cesium.PointGraphics({
											color:Cesium.Color.TOMATO,
											pixelSize: 14,
											outlineWidth: 2
										});
									}
									else if (condition == op5) {
										entity.point = new Cesium.PointGraphics({
											color: Cesium.Color.DARKRED,
											pixelSize: 14,
											outlineWidth: 2
										});
									}
									else {
										entity.point = new Cesium.PointGraphics({
											color: Cesium.Color.DIMGREY,
											pixelSize: 14,
											outlineWidth: 2
										});
									}
								
							}
						});
					}
				
				});
			}
		});
}

