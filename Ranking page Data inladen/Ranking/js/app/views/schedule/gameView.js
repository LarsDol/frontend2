FED2.TeamView = Backbone.View.extend({
    // Define element (this.el)  
	tagName: "tr",
	
	// Set reference to template
    template: $("#teamTemplate").html(),

	// Initialize view *(backbone method)*
	initialize: function () {

	},

	events: {
	    "click a.delete": "showForm"
	},

	editGame: function (e) {
		console.log('banaan');
	},
		
	// Render view *(backbone method)*
    render: function () {
		// Store template in variable
        var tmpl = _.template(this.template);
		
        console.log(this.model.toJSON());

		// Inject the rendered tempate into the views element 
        $(this.el).html(tmpl(this.model.toJSON()));

		return this;
    },

    showForm: function (e) {
		e.preventDefault();
//	    FED2..el.find("#addGame").slideToggle();
	},
	// Log message *(custom method)*
	logMessage: function (message) {
		console.log(message);
	}
});