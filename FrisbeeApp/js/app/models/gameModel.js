// define team model
FED2.GameModel = Backbone.Model.extend({
	// Set model defaults *(backbone method)*
	defaults: {
		'date' : 'unknown',
		'team1' : 'unknown',
		'team1Score' : '?',
		'team2' : 'unknown',
		'team2Score' : '?'
	}
	
});