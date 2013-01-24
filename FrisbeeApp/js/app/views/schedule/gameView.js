FED2.GameView = Backbone.View.extend({
    // Define element (this.el)  
	tagName: "li",
	className: "gameRow",
	
	// Set reference to template
    template: $("#gameTemplate").html(),
    formTemplate: $("#scoreForm").html(),

	// Initialize view *(backbone method)*
	initialize: function () {

	},

		// Render view *(backbone method)*
    render: function () {
		// Store template in variable
        var tmpl = _.template(this.template);
		
		// Inject the rendered tempate into the views element 
        $(this.el).html(tmpl(this.model.toJSON()));

		return this;
    },

    events: {
	    "click": "showForm",
	    "click #update": "updateScore"
	},
	
	updateScore: function (e) {
		e.preventDefault();

		var model = {};

		$("#editGame").children("input").each(function (i, el) {
	        if ($(el).val() !== "") {
	            this.updateModel();
	      }
	    });

		console.log(updateModel);

	},

	updateModel: function() {
		var score = $('jouwinput').val();
		this.model.set('score', score);
		this.model.save(this.model.toJSON(), {
			success: function() {

			}, 
			headers: {

			}
		});
		this.render();
	},

	showForm: function (e) {
		console.log("Showing form..");
		var el = $(this);
		var form_tmpl = _.template(this.formTemplate);
	//	FED2.schedule.el.find("#")
		$(".game_row").append(form_tmpl);
		$(".game_row").css("display", "block");

	    $(".game_row").find("#editGame").slideToggle();
	},
	
	// Log message *(custom method)*
	logMessage: function (message) {
		console.log(message);
	}
});