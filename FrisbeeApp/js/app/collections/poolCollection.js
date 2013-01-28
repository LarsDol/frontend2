// define schedule, a collection of teams

FED2.PoolCollection = Backbone.Collection.extend({
    // Specifiy model for this collection
    model: FED2.PoolModel,

    url: FED2.config.api_url + 'pools/?tournament_id=' + FED2.config.tournamentID,

    // Parse the relevant data from the data object
             
    parse: function(data) {
        // console.log(data);
        var poolA;


        _.each(data.objects, function(pool) {
            if(pool.name === "A") {
                poolA = pool;
            }
        });



        poolA = poolA.standings;

        console.log(data.objects);

        return poolA;
            
    },


comparator: function(pool) {
        return -pool.get('plus_minus');
    },



});