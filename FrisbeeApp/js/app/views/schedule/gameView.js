FED2.GameView = Backbone.View.extend({
    // Define element (this.el)  
	tagName: "li",
	className: "gameRow",
	
	// Set reference to template
    template: $("#gameTemplate").html(),

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
	    "click .game_row": "showForm",
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
		var el = ".game_row"

		var form_template = $("#scoreForm").html();
		var formTmpl = _.template(form_template);

		var checker = $(this.el).find("#editGame");

		if (checker.length > 0){
		  	$(this.el).find("#editGame").slideToggle();
			$(this.el).remove("#editGame");

		  	console.log("bestaat");
		}else{
			$(this.el).append(formTmpl(this.model.toJSON()));
			$(this.el).find("#editGame").slideToggle();
			console.log("bestaat niet");
		}


		console.log("Showing form..");

	//    FED2.schedule.el.find("#editGame").slideToggle();
	},
	
	// Log message *(custom method)*
	logMessage: function (message) {
		console.log(message);
	}
});