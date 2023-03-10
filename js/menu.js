function closebestCondition() { 
	document.getElementById("listContainer").style.top = "-9999px";
}

function closeGraph() { 
	document.getElementById("graphContainer").style.top = "-9999px"; 
}

function bestCondition() {
	document.getElementById("listContainer").style.top="15%";
	// keep the existing HTML as there is a button that is needed 
	document.getElementById("listContainer").innerHTML=document.getElementById("listContainer").innerHTML+'<div class="h-75 w-75"></div>'
	$.ajax({url: document.location.origin + "/api/assetsInGreatCondition", 
	crossDomain: true,success: function(result){
                $.each(result[0]['array_to_json'], function(index, item){
					$('#myTable').append(
						"<tr>" +
						"<td>" + item.asset_name + "</td>" +
						"<td>" + item.installation_date + "</td>" +
						"<td>" + item.user_id + "</td>" +
						"<td>" + item.timestamp + "</td>" +
						"</tr>" 
					);
				});
                }
            });
        }

function dailyReportRate() {
	 document.getElementById("graphContainer").style.top="15%";
	 var widtha = document.getElementById("graphContainer").offsetWidth;
	 var heighta = document.getElementById("graphContainer").offsetHeight; 
	 // keep the existing HTML as there is a button that is needed 
	 document.getElementById("graphContainer").innerHTML=document.getElementById("graphContainer").innerHTML+'<div class="h-75 w-75"><svg width="'+widtha+'" height="'+heighta+'" id="svg1"></svg></div>'
	 
	 // Retrieve the daily report rate data to create bar graph
	const svg     = d3.select("#svg1"),
	      margin  = {top: 80, right: 20, bottom: 20, left: 40},
	      width   = +svg.attr("width")  - margin.left - margin.right,
	      height  = +svg.attr("height") - margin.top  - margin.bottom,
	      x0      = d3.scaleBand().rangeRound([0, width]).padding(0.2),
	      x1      = d3.scaleBand(),
	      y       = d3.scaleLinear().rangeRound([height, 0]),
	      color   = d3.scaleOrdinal().range(["#0571b0", "#ca0020"]),
	      g       = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
		  
	d3.json(document.location.origin + "/api/dailyParticipationRates").then(data => {
		data = data[0].array_to_json;
	  	//rebuild the data to dataset for combining the reports_submitted and reports_not_working
	  	var dataset = [];
		for(i = 0; i < data.length; i++ ) {
		  dataset[i] = {
		    day: data[i].day,
		    rates: [
		     {name: 'reports_submitted', value: data[i].reports_submitted},
		     {name: 'reports_not_working', value: data[i].reports_not_working}
		    ]
		  };
		}

		x0.domain(dataset.map(d => d.day));
		x1.domain(['reports_submitted','reports_not_working']).range([0,x0.bandwidth()]);
		y.domain([0, d3.max(dataset, d => d.rates[0].value)]);

		//set x axis
		g.append("g")
		  .attr("class", "axis axis-x")
		  .attr("transform", `translate(0,${height})`)
		  .call(d3.axisBottom(x0));

		//set y axis
		g.append("g")
		    .attr("class", "axis axis-y")
		    .call(d3.axisLeft(y).ticks(10).tickSize(8))
		  .append("text") // add y axis label
		    .attr("transform", "rotate(-90)")
		    .attr("y", 6)
		    .attr("dy", ".71em")
		    .style("text-anchor", "end")
		    .style("font-size", "15px")
		    .style("fill", "#000000")
		    .text("Number of reports");

		//add bars
		var day = svg.selectAll(".day")
		  .data(dataset)
		  .enter().append("g")
		  .attr("class", "day")
		  .attr("transform", d => `translate(${x0(d.day)+40},${margin.top})`);

		day.selectAll("rect")
		.data(d => d.rates)
		.enter().append("rect")
		  .attr("class", "bar")
		  .attr("width", x1.bandwidth())
		  .style("fill",d => color(d.name))
		  .attr("x", d => x1(d.name))
		  .attr("y", d => y(d.value))
		  .attr("height", d => height - y(d.value));

		//add legends
		var legend = svg.selectAll(".legend")
	      .data(['reports_submitted','reports_not_working'].slice())
	      .enter().append("g")
	      .attr("class", "legend")
	      .attr("transform", d => `translate(${margin.left+325},${margin.top-40})`);

	    legend.append("rect")
	      .attr("x", function(d,i){return (margin.left +(180*i))})
	      .attr("width", 18)
	      .attr("height", 18)
		  .style("font-size", "15px")
	      .style("fill", color);

		legend.append("text")
	      .attr("x", function(d,i){return (margin.left +(180*i) + 25)})
	      .attr("y", 9)
	      .attr("dy", ".35em")
		  .style("font-size", "15px")
	      .style("text-left", "end")
	      .text(d => d);
		  
		// add title
		g.append("text")
		   .attr("x", margin.left+500)
		   .attr("y", margin.top-135)
		   .attr("text-anchor", "middle")
		   .style("font-size", "25px")
		   .style("font-weight", "bold")
		   .text("Bar Chart of Daily Condition Reports");
	})
	.catch(err => {
	  svg.append("text")         
	        .attr("y", 20)
	        .attr("text-anchor", "left")  
	        .style("font-size", "20px") 
	        .style("font-weight", "bold")  
	        .text(`Couldn't open the data file: "${err}".`);
	});
}


function userRank() {
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
			if (ranking == 1){
				alert("You are ranked at the "+ result[0].array_to_json[0].rank + "st place in total number of submitted reports in the database");					
			}
			if (ranking == 2){
				alert("You are ranked at the "+ result[0].array_to_json[0].rank + "nd place in total number of submitted reports in the database");					
			}
			if (ranking == 3){
				alert("You are ranked at the "+ result[0].array_to_json[0].rank + "rd place in total number of submitted reports in the database");					
			}
			else {
				alert("You are ranked at the "+ result[0].array_to_json[0].rank + "th place in total number of submitted reports in the database");
			}
		}
		});
	}}); 
}

var the5assets
// Created empty variables to hold user's coordinates
var lon;
var lat;
function Show5Asset(position) {
	// AJAX call for assets inputted by specific user (current user)
		pointURL = document.location.origin + "/api/fiveClosestAssets/" + lon +"/"+ lat +"";
		
		$.ajax({url: pointURL, crossDomain: true,success: function(result){
			
			if (mapPoint){mymap.removeLayer(mapPoint);}
			if (assets){mymap.removeLayer(assets);}
			if (the5assets){mymap.removeLayer(the5assets);}
			if (the5reports){mymap.removeLayer(the5reports);}
			if (ratelayer){mymap.removeLayer(ratelayer);}
			the5assets = L.geoJSON(result,{
		   			pointToLayer: function (feature, latlng){
		   				return L.marker(latlng).bindPopup(getPopupHTML(feature));}
		   		}).addTo(mymap);
		   	mymap.fitBounds(the5assets.getBounds());
			removePositionPoints()
		}
		});
}

function Remove5Asset() {
	try {
	 mymap.removeLayer( the5assets ); 
	 setUpPointClick()
	 } 
	catch (err) { alert("Layer doesn???t exist :" + err); 
	 } 
}

var the5reports
function Show5Report() {
	$.ajax({url: document.location.origin + "/api/getUserId", 
	crossDomain: true,success: function(result){
		var userID = JSON.stringify(result);
		// Extract solely the ID number
		userID = JSON.parse(userID);
		for(var i = 0; i < userID.length; i++){
			userID = userID[i]['user_id'];};
		// AJAX call for assets inputted by specific user (current user)
		pointURL = document.location.origin + "/api/lastFiveConditionReports/" + userID +"";
		
		$.ajax({url: pointURL, crossDomain: true,success: function(result){
			if (mapPoint){mymap.removeLayer(mapPoint);}
			if (assets){mymap.removeLayer(assets);}
			if (the5assets){mymap.removeLayer(the5assets);}
			if (the5reports){mymap.removeLayer(the5reports);}
			if (ratelayer){mymap.removeLayer(ratelayer);}
			 var testMarkerPink = L.AwesomeMarkers.icon({ 
			 icon: 'play', 
			 markerColor: 'pink' 
			 }); 
			 var testMarkerRed = L.AwesomeMarkers.icon({ 
			 icon: 'play', 
			 markerColor: 'red' 
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
			 var testMarkerPurple = L.AwesomeMarkers.icon({ 
			 icon: 'play', 
			 markerColor: 'purple' 
			 }); 
			// Add points to map
			if (the5reports){mymap.removeLayer(the5reports);}
			
		   	the5reports = L.geoJSON(result,{
		   			pointToLayer: function (feature, latlng){
						var condition = feature.properties.condition_description
						var op1 = 'Element is in very good condition';
						var op2 = 'Some aesthetic defects, needs minor repair';
						var op3 = 'Functional degradation of some parts, needs maintenance';
						var op4 = 'Not working and maintenance must be done as soon as reasonably possible';
						var op5 = 'Not working and needs immediate, urgent maintenance';
						if (condition == op1){
							return L.marker(latlng, {icon: testMarkerGreen}).bindPopup(getPopupHTML(feature));
						}
						if (condition == op2){
							return L.marker(latlng, {icon: testMarkerYellow}).bindPopup(getPopupHTML(feature));
						}
						if (condition == op3){
							return L.marker(latlng, {icon: testMarkerPink}).bindPopup(getPopupHTML(feature));
						}
						if (condition == op4){
							return L.marker(latlng, {icon: testMarkerPurple}).bindPopup(getPopupHTML(feature));
						}
						if (condition == op5){
							return L.marker(latlng, {icon: testMarkerRed}).bindPopup(getPopupHTML(feature));
						}
						else {
							return L.marker(latlng, {icon: testMarkerBlack}).bindPopup(getPopupHTML(feature));	
						}
		   			}
		   		}).addTo(mymap);
		   	mymap.fitBounds(the5reports.getBounds());
		}
		});
	}});  
	removePositionPoints()
}

function Remove5Report() {
	try {
	 mymap.removeLayer( the5reports ); 
	 setUpPointClick()
	 } 
	catch (err) { alert("Layer doesn???t exist :" + err); 
	 } 
}


var ratelayer
function ShowRate() {
	// AJAX call for assets inputted by specific user (current user)
		$.ajax({url: document.location.origin + "/api/getUserId", 
	crossDomain: true,success: function(result){
		var userID = JSON.stringify(result);
		// Extract solely the ID number
		userID = JSON.parse(userID);
		for(var i = 0; i < userID.length; i++){
			userID = userID[i]['user_id'];};
		// AJAX call for assets inputted by specific user (current user)
		pointURL = document.location.origin + "/api/conditionReportMissing/" + userID +"";
		
		$.ajax({url: pointURL, crossDomain: true,success: function(result){
			
			if (mapPoint){mymap.removeLayer(mapPoint);}
			if (assets){mymap.removeLayer(assets);}
			if (the5assets){mymap.removeLayer(the5assets);}
			if (the5reports){mymap.removeLayer(the5reports);}
			if (ratelayer){mymap.removeLayer(ratelayer);}
			ratelayer = L.geoJSON(result,{
		   			pointToLayer: function (feature, latlng){
		   				return L.marker(latlng).bindPopup(getPopupHTML(feature));}
		   		}).addTo(mymap);
		   	mymap.fitBounds(ratelayer.getBounds());
		}
		});
	}}); 
	removePositionPoints()
}
function RemoveRate() {
	try {
	 mymap.removeLayer( ratelayer ); 
	 setUpPointClick()
	 } 
	catch (err) { alert("Layer doesn???t exist :" + err); 
	 } 
}