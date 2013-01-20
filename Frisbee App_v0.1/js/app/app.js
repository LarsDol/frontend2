var FED2 = FED2 || {};

// Log message *(custom method)*
FED2.logMessage = function (message) {
	console.log(message);
}

var formatDate = function (date) {
	var d = new Date(date);
//	d= d.toString("MMMM dd, yyyy");
	console.log(d);

	var d_day = d.getDay();
	var d_hours = d.getHours();
	var d_minutes = d.getMinutes();

	if(d_minutes == 0){
		d_minutes = '00';
	}

	var formatted_date = d_hours + ":" + d_minutes;

	return formatted_date;
}