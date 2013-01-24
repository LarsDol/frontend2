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

		$("#game_form").children("input").each(function (i, el) {
	        if ($(el).val() !== "") {
	         //   this.updateModel();
	      	}
	    });

		this.updateModel();
	},

	updateModel: function() {
		var score = 4;
		console.log(this.model);
		var url = this.model.get('resource_uri');
		console.log(url);

		this.model.set({'url': url});


		this.model.set({'team_1_score': score});
		console.log('token', FED2.config.access_token);
		console.log('this.model.attributes', this.model.attributes);

		this.model.save(this.model.toJSON(), {
			success: function() {
				 console.log("save succesful");
			}, 
			error: function(){
				// On error log the error in the console
                console.log('error');
			},
			headers: {
				Authorization: 'bearer '+ FED2.config.access_token
			}
		});
		console.log("about to render");
		this.render();
		console.log("finished");
	},

	showForm: function (e) {
		var el = ".game_row"

		var form_template = $("#scoreForm").html();
		var formTmpl = _.template(form_template);

		var checker = $(this.el).find("#editGame");

		if (checker.length > 0){
		  	$(this.el).find("#editGame").slideToggle();
			$(this.el).remove("#editGame");
		}else{
			$(this.el).append(formTmpl(this.model.toJSON()));
			$(this.el).find("#editGame").slideToggle();
		}
	},
	
	// Log message *(custom method)*
	logMessage: function (message) {
		console.log(message);
	}
});