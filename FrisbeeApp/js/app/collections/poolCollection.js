// define schedule, a collection of teams
FED2.PoolCollection = Backbone.Collection.extend({
    // Specifiy model for this collection
	model: FED2.PoolModel,

	url: FED2.config.api_url + 'pools/?tournament_id=' + FED2.config.tournamentID,

	// Parse the relevant data from the data object
    parse: function(data) {
        console.log("ik heb een object geretourneerd.");

        // console.log(data);
        var poolA;
        _.each(data.objects, function(pool) {
        	if(pool.name === 'A') {
        		poolA = pool;
        	}
        });

        poolA = poolA.standings;

        /*
			we hebben de data van de api vervormd tot en array zoals deze:

			FED2.poolData = [
				{ team: "Chasing", Win: "2", Lost: "2", Sw: "7", Sl: "9", Pw: "35", Pl: "39"},
				{ team: "Boomsquad", Win: "2", Lost: "2", Sw: "9", Sl: "8", Pw: "36", Pl: "34"},
				{ team: "Burning Snow", Win: "3", Lost: "1", Sw: "11", Sl: "4", Pw: "36", Pl: "23"},
				{ team: "Beast Amsterdam", Win: "2", Lost: "2", Sw: "6", Sl: "8", Pw: "30", Pl: "34"},
				{ team: "Amsterdam Money Gang", Win: "1", Lost: "3", Sw: "6", Sl: "10", Pw: "30", Pl: "37"}
			];

        */
        return poolA;

        
    },
/*	
	comparator: function(schedule) {
		return schedule.get('start_time');
	}
*/
});