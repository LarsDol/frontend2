FED2.ScoreView = Backbone.View.extend({
    // Define element (this.el)  
	tagName: "section",
	className: "editGame",
	
	// Set reference to template
    template: $("#scoreTemplate").html(),

	// Initialize view *(backbone method)*
	initialize: function () {
		        // Capture the scope of this object (aView) in a local variable
	},

		// Render view *(backbone method)*
    render: function () {
    	console.log('rendering scoreView');
		// Store template in variable
        var tmpl = _.template(this.template);
		
		// Inject the rendered tempate into the views element 
        $(this.el).html(tmpl(this.model.toJSON()));

		return this;
    },
    events: {
	    "click #update": "updateScore"
	},
	updateScore: function(e) {
		var self = this;
		var tournament = {
            "game_id": 88452,
		    "team_1_score": 3,
		    "team_2_score": 2,
		    "is_final": false,
		    "set_number": 5
        }
        
        // create a new model by passing properties into the Model() constructor
        var newModel = new FED2.ScoreModel(tournament);
        // if we want to POST a new tournament model, we need the api_url
        // see: https://www.leaguevine.com/docs/api/
        newModel.url = 'https://api.leaguevine.com/v1/game_scores/';

        newModel.save(newModel.toJSON(), {
            success: function(data) {
                // when this model is saved, we want to be able to update it
                // when a model is saved, it gets properties that are returned by the API!
                // we can log the data that is in the model => console.log(newModel.toJSON);
               
                //console.log('model after saving: ', newModel.toJSON()); 
                
                //var league_id = newModel.get('season').league_id;
                //console.log('league id', league_id);
                newModel.url = newModel.get('resource_uri');
                console.log("new model completed");
                console.log("about to render");
				self.render();
				console.log("finished");
            },
            error: function(data) {
                console.log('error');
            },
            headers: {
                // we need to authorize for this.
                // see the API demo for more info
                Authorization: 'bearer '+FED2.config.access_token
            }
        });
	}
/*
    updateScore: function(e) {
    	console.log("updating score..");
    	

		console.log(this.model);
		var url = this.model.get('resource_uri');
		console.log(url);
		var bool = false;

		this.model.set({'url': url});


		this.model.set({'team_1_score': 1});
		this.model.set({'team_2_score': 4});
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
		
	}
*/
});