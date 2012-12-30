// define team model
FED2.Team = Backbone.Model.extend({
	// Set model defaults *(backbone method)*
	defaults: {
		'date' : 'unknown',
		'team1' : 'unknown',
		'team1Score' : '?',
		'team2' : 'unknown',
		'team2Score' : '?'
	},
	
	// Initialize model *(backbone method)*
	initialize: function () {
		this.logMessage("Team model initialized");
	},
	
	// Log message *(custom method)*
	logMessage: function (message) {
		console.log(message);
	}
});