// define schedule, a collection of teams
FED2.ScoreCollection = Backbone.Collection.extend({
    // Specifiy model for this collection
	model: FED2.ScoreModel,

	url: FED2.config.api_url + 'game_scores/?tournament_id=' + FED2.config.tournamentID + '&order_by=%5Btime%5D&limit=200',

	// Parse the relevant data from the data object
    parse: function(data) {
        return data.objects;      
    }
});