FED2.GameView = Backbone.View.extend({
    // Define element (this.el)  
	tagName: "li",
	className: "gameRow",
	scoreModel: null,
	// Set reference to template
    template: $("#gameTemplate").html(),

	// Initialize view *(backbone method)*
	initialize: function () {
		this.getScore();
	},

		// Render view *(backbone method)*
    render: function () {
    	var jsonModel = this.model.toJSON();
    	var poolID = jsonModel.pool.name;

		// Store template in variable
        var tmpl = _.template(this.template);
		
		// Inject the rendered tempate into the views element 
        $(this.el).html(tmpl(this.model.toJSON()));

        $(this.el).attr('id', this.model.id);
        $(this.el).attr('pool', poolID);

		return this;
    },

   	// Render Schedule *(custom method)*
    renderScore: function (item) {
    	var el = ".game_row";
    	console.log(item);


		// Create new instance of TournamentView
		var scoreView = new FED2.ScoreView({
            model: item
        });
		// Append the rendered HTML to the views element
        $(this.el).append(scoreView.render().el);

    },

    getScore: function (){
		// Capture the scope of this object (aView) in a local variable 
	    var self = this;

	    this.gameID = this.model.id;

	    // Fetch data from the API, this is a "GET" request
	    FED2.schedule.scoreCollection.fetch({
	        // If the request succeeds, the success callback function is executed 
	        success: function(data) {
	            // Loop through the fetched models  
	            //console.log(FED2.schedule.scoreCollection.models[0].attributes.game_id);
		        _.each(FED2.schedule.scoreCollection.models, function(model) {
		        	//console.log("model", model);
		        	if(model.attributes.game_id == self.gameID) {
		        		//console.log("idmatch:", model.attributes.game_id, self.gameID, "model:", model.attributes);
		        		model.url = 'https://api.leaguevine.com/v1/game_scores/';
		        		self.scoreModel = model;
		        		console.log("model succeeded");
		        	}
		        });
	        },

	        error: function(data){
	        	console.log("error");
	        }
	    });
    },

    events: {
	    "click .game_row": "showForm",
	    "click #update": "updateScore"
	},
	
	updateScore: function (e) {
		e.preventDefault();

		console.log("Ready to re-render!");
	},



	showForm: function (e) {
		var checker = $(this.el).find(".editGame");
		console.log("trolol", this.model);
		if(this.scoreModel != null){
			if (checker.length > 0){
		  		$(this.el).find(".editGame").slideToggle();
				$(this.el).remove(".editGame");
			}else{
				this.renderScore(this.scoreModel);
				$(this.el).find("#name_team1").text(this.model.attributes.team_1.name);
		  		$(this.el).find("#name_team2").text(this.model.attributes.team_2.name);
				$(this.el).find(".editGame").slideToggle();
			}
		}else{
			console.log("hallo");
		}

	}
});