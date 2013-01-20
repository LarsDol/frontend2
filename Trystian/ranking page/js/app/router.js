FED2.AppRouter = Backbone.Router.extend({

	routes: {
		// Define some URL routes
	
		'ranking' : 'showRanking',
		// Default
		'*path': 'defaultAction'
	},

	showRanking: function () {
		// Call render on the module we loaded in via the dependency array
		var gameModel = new FED2.GameModel();
		FED2.ranking = new FED2.PoolView({model: gameModel});
		FED2.ranking.render();

		console.log(ranking);

	},

	defaultAction: function () {
		FED2.home = new FED2.HomeView();
		FED2.home.render();
		// We have no matching route, lets display the home page
		console.log("defaultAction triggered");
	}
});

var initialize = function() {
	var app_router = new FED2.AppRouter();
	Backbone.history.start();
}

initialize();