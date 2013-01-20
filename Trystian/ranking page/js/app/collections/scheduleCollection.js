// define schedule, a collection of teams
FED2.PoolCollection = Backbone.Collection.extend({
    // Specifiy model for this collection
	model: FED2.PoolModel,

	url: FED2.config.api_url + 'games/?tournament_id=' + FED2.config.tournamentID,

	// Parse the relevant data from the data object
    parse: function(data) {
        console.log("ik heb een object geretourneerd.");
        return data.objects;
        
    },
	
	comparator: function(ranking) {
		return ranking.get('start_time');
	}
});