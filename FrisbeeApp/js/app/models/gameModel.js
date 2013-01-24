// define team model
FED2.GameModel = Backbone.Model.extend({
	// Set model defaults *(backbone method)*
	defaults: {
		'start_time' : 'unknown',
		'team_1' : 'unknown',
		'team_1_score' : '?',
		'team_2' : 'unknown',
		'team_2_score' : '?'
	}
	
});