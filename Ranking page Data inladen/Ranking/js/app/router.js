FED2.AppRouter = Backbone.Router.extend({

	routes: {
		// Define some URL routes
		'ranking': 'showRanking',
		// Default
		'*path': 'defaultAction'
	},

	showRanking: function () {
		// Call render on the module we loaded in via the dependency array
		var teamModel = new FED2.TeamModel();
		FED2.ranking = new FED2.PoolView({model: teamModel});
		FED2.ranking.render();

		console.log("showSchedule triggered");

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