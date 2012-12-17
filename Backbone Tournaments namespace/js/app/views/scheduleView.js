FED2.ScheduleView = Backbone.View.extend({
	// Define element (this.el)     
	el: $("#schedule"),
	
	// Initialize view *(backbone method)*
    initialize: function () {
		// Specify collection for this view
		this.collection = new FED2.Schedule(FED2.scheduleData);
		
		filtered = _.filter(this.collection.models, function(data) {
		  	return data.get("team1") == "Boomsquad";
		});
		
		// Render view
        this.render(filtered);
		
    },
	
	// Render view *(backbone method)*
    render: function (data) {
        var self = this;

        _.each(data, function (item) {
            self.renderSchedule(item);
        }, this);
    },
	
	// Render tournament *(custom method)*
    renderSchedule: function (item) {
		// Create new instance of TournamentView
		var scheduleView = new FED2.TeamView({
            model: item
        });

		// Append the rendered HTML to the views element
        this.$el.append(scheduleView.render().el);
    },

	// Log message *(custom method)*
	logMessage: function (message) {
		console.log(message);
	}
	
});

//create instance of master view
FED2.schedule = new FED2.ScheduleView();