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
	      margin  = {top: 20, right: 20, bottom: 80, left: 40},
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
	      .attr("transform", d => `translate(${margin.left+325},${margin.top+30})`);

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
		   .attr("y", margin.top-15)
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

function help() {
	alert("This is the function: "+ arguments.callee.name); 
}

function userRank() {
	alert("This is the function: "+ arguments.callee.name); 
}


function Show5Asset() {
	alert("This is the function showing the 5 assets closest to the user’s current location: "+ arguments.callee.name); 
}

function Remove5Asset() {
	alert("This is the function removing the 5 assets closest to the user’s current location: "+ arguments.callee.name); 
}

function Show5Report() {
	alert("This is the function showing the last 5 reports created by the user: "+ arguments.callee.name); 
}
function Remove5Report() {
	alert("This is the function removing the last 5 reports created by the user: "+ arguments.callee.name); 
}
function ShowRate() {
	alert("This is the function showing assets and that user hasn't rated in the last 3 days : "+ arguments.callee.name); 
}
function RemoveRate() {
	alert("This is the function removing assets and that user hasn't rated in the last 3 days : "+ arguments.callee.name); 
}
