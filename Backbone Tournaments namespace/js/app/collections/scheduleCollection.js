// define schedule, a collection of teams

FED2.Schedule = Backbone.Collection.extend({
    // Specifiy model for this collection
	model: FED2.Team,
	
	// Initialize collection *(backbone method)*
	initialize: function () {
		this.logMessage("Schedule collection initialized");
	},
	
	// Log message *(custom method)*
	logMessage: function (message) {
		console.log(message);
	}
});