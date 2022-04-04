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
		  margin  = {top: 20, right: 20, bottom: 30, left: 50},
		  width   = +svg.attr("width")  - margin.left - margin.right,
		  height  = +svg.attr("height") - margin.top  - margin.bottom,
		  xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]),
		  xScale1 = d3.scaleBand(),
		  yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]),
		  g       = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
	
	$.ajax({url: document.location.origin + "/api/dailyParticipationRates", 
	crossDomain: true,success: function(result){
		data = result[0]['array_to_json'];
		data.forEach(function(d) {
			xScale0.domain(data.map(d => d.day));
			xScale1.domain(['reports_submitted','reports_not_working'].range([0, xScale0.bandwidth()]));
			yScale.domain([0, d3.max(data, d => d.reports_submitted > d.reports_not_working ? d.reports_submitted : d.reports_not_working)])
		
			var days = svg.selectAll(".day")
			  .data(data)
			  .enter().append("g")
			  .attr("class", "day")
			  .attr("transform", d => `translate(${xScale0(d.day)},0)`);
			  
			// Add the X Axis
			svg.append("g")
				 .attr("class", "x axis")
				 .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
				 .call(xAxis);
			// Add the Y Axis
			svg.append("g")
				 .attr("class", "y axis")
				 .call(yAxis);
			  
			/* Add reports_submitted bars */
			days.selectAll(".bar.reports_submitted")
			  .data(d => [d])
			  .enter()
			  .append("rect")
			  .attr("class", "bar reports_submitted")
			.style("fill","blue")
			  .attr("x", d => xScale1('reports_submitted'))
			  .attr("y", d => yScale(d.reports_submitted))
			  .attr("width", xScale1.bandwidth())
			  .attr("height", d => {
				return height - margin.top - margin.bottom - yScale(d.reports_submitted)
			  });
			  
			/* Add reports_not_working bars */
			days.selectAll(".bar.reports_not_working")
			  .data(d => [d])
			  .enter()
			  .append("rect")
			  .attr("class", "bar reports_not_working")
			.style("fill","red")
			  .attr("x", d => xScale1('reports_not_working'))
			  .attr("y", d => yScale(d.reports_not_working))
			  .attr("width", xScale1.bandwidth())
			  .attr("height", d => {
				return height - margin.top - margin.bottom - yScale(d.reports_not_working)
			  });
		})
	}
	})
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
