
function bestCondition() {
	$.ajax({url: document.location.origin + "/api/assetsInGreatCondition", 
	crossDomain: true,success: function(result){
		console.log(result);
	}
	})
}

function dailyReportRate() {
	alert("This is the function showing the bar graph of daily reporting rate for the past week: "+ arguments.callee.name); 
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
