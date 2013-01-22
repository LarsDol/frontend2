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
       var poolB;
       
       
     
        

        _.each(data.objects, function(pool) {
        	if(pool.id === 18744) {
        		poolA = pool;
        	}
        /*	else if(pool.name === 'B'){
        		poolB = pool;
        	} */
        });
        
      	poolA = poolA.standings;
      //	poolB = poolB.standings;
      //	var poolArray = [poolA, poolB];

      	//console.log("begin")
      	console.log(poolA);
      	//console.log("eind")
      	//return poolArray;
      	return poolA;
        console.log("dataobjects")
        console.log(data.objects);
    },
       
/*	
	comparator: function(schedule) {
		return schedule.get('start_time');
	}
*/
});