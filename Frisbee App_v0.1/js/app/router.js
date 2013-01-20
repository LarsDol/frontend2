FED2.AppRouter = Backbone.Router.extend({

	routes: {
		// Define some URL routes
		'schedule': 'showSchedule',
		// Default
		'*path': 'defaultAction'
	},

	showSchedule: function () {
		// Call render on the module we loaded in via the dependency array
		var gameModel = new FED2.GameModel();
		FED2.schedule = new FED2.ScheduleView({model: gameModel});
		FED2.schedule.render();

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