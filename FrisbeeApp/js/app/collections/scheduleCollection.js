// define schedule, a collection of teams
FED2.ScheduleCollection = Backbone.Collection.extend({
    // Specifiy model for this collection
	model: FED2.GameModel,

	url: FED2.config.api_url + 'games/?tournament_id=' + FED2.config.tournamentID + '&limit=200',

	// Parse the relevant data from the data object
    parse: function(data) {
        return data.objects;
        
    },
	
	comparator: function(schedule) {
		return schedule.get('start_time');
	}
});