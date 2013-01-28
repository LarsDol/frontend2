// define team model
FED2.TeamModel = Backbone.Model.extend({
	// Set model defaults *(backbone method)*
	defaults: {
		'name' : 'unknown',
		'wins' : 'unknown',
		'losses' : '?',
		'games_played' : 'unknown',
		'points_scored' : '?',
		'points_allowed' : '?',
		'plus_minus' : '?'
	}
	
});