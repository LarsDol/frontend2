// define schedule, a collection of teams

FED2.Schedule = Backbone.Collection.extend({
    // Specifiy model for this collection
	model: FED2.Team,
	
	// Initialize collection *(backbone method)*
	initialize: function () {
	},
	
	comparator: function(schedule) {
		return schedule.get('team2');
	}
});