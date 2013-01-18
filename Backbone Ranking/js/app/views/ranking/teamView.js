FED2.TeamView = Backbone.View.extend({
    // Define element (this.el)  
	tagName: "tr",
	
	// Set reference to template
    template: $("#teamTemplate").html(),

	// Initialize view *(backbone method)*
	initialize: function () {
		this.logMessage("Poule view initialized");
	},
	
	// Attach event handler to view elements
	events: {
	    "click a.delete": "deleteGame"
	},
	
	deleteGame: function (e) {
		e.preventDefault();
	    
		var removedType = this.model.get("team").toLowerCase();
	    
		this.model.destroy();
	    this.remove();
	    
		if (_.indexOf(FED2.ranking.getTypes(), removedType) === -1) {
	        FED2.ranking.$el.find("#filter select").children("[value='" + removedType + "']").remove();
	    }
	},
		
	// Render view *(backbone method)*
    render: function () {
		// Store template in variable
        var tmpl = _.template(this.template);
		
		// Inject the rendered tempate into the views element 
        $(this.el).html(tmpl(this.model.toJSON()));

		return this;
    },

	// Log message *(custom method)*
	logMessage: function (message) {
		console.log(message);
	}
});