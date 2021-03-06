FED2.AppRouter = Backbone.Router.extend({

	routes: {
		// Define some URL routes
		'schedule': 'showSchedule',
		'ranking': 'showRanking',
		// Default
		'*path': 'defaultAction'
	},

	showSchedule: function () {
		// Call render on the module we loaded in via the dependency array
		var gameModel = new FED2.GameModel();
		FED2.schedule = new FED2.ScheduleView({model: gameModel});
		FED2.schedule.render();
	},

	showRanking: function () {
		// Call render on the module we loaded in via the dependency array
		var teamModel = new FED2.TeamModel();
		FED2.ranking = new FED2.PoolView({model: teamModel});
		FED2.ranking.render();
	},

	defaultAction: function () {
		FED2.home = new FED2.HomeView();
		FED2.home.render();
	}
});

var initialize = function() {
	var app_router = new FED2.AppRouter();
	Backbone.history.start();
}

initialize();