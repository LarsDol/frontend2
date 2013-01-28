FED2.ScoreView = Backbone.View.extend({
    // Define element (this.el)  
	tagName: "section",
	className: "editGame",
	
	// Set reference to template
    template: $("#scoreTemplate").html(),
    setTemplate: $("#setTemplate").html(),

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
	    "click #update": "saveSet",
	    "click #newSet": "addSet",
	    "click #lockSet": "lockSet"
	},

	addSet: function(e) {
		e.preventDefault();

        var set_tmpl = _.template(this.setTemplate);

		$(this.el).find("tbody").append(set_tmpl(this.model.toJSON())).fadeIn();

		var newLength = this.model.attributes.game_sets.length + 1;

		var modelData = {
            "game_id": this.model.get('game_id'),
		    "is_final": false,
		    "team_1_score": 0,
        	"team_2_score": 0,
		    "set_number": newLength		    
        }

		this.updateScore(modelData, false);

		if(this.model.attributes.game_sets.length == 5){
			$(this.el).find("#newSet").fadeOut(400, function(){
				$(this.el).find("#newSet").remove();
			});
		}

	},

	saveSet: function(e) {
		e.preventDefault();

		var finalChecker = this.model.attributes.is_final;

		if(finalChecker == false){
			var sets = this.model.attributes.game_sets;

			parent = $(this.el).parent();

			var newScore1 = parseInt(parent.find('.team1_score').text());
			var newScore2 = parseInt(parent.find('.team1_score').text());
			console.log(sets.length);
			for(var i = 0; i < sets.length; i++){
				if(sets[i].is_final == false){
					var tr = 'tr#'+ sets[i].number.toString();
					var tr2 = $(this.el).find(tr);

					var team_1_score = parseInt(tr2.find("#team_1_score").find("select").val());
					var team_2_score = parseInt(tr2.find("#team_2_score").find("select").val());

					var modelData = {
			            "game_id": this.model.get('game_id'),
					    "is_final": false,
					    "team_1_score": team_1_score,
			        	"team_2_score": team_2_score,
					    "set_number": sets[i].number		    
			        }

			        this.updateScore(modelData);
			        tr2.find("#team_1_score").html(team_1_score);
					tr2.find("#team_2_score").html(team_2_score);

					if(team_1_score > team_2_score){
						newScore1 ++;

					}else if(team_2_score > team_1_score){
						newScore2 ++;
					}

			        console.log(modelData);
				}
			}
			if(newScore1 != NaN && newScore2 != NaN){
				parent.find('.team1_score').text(newScore1);
				parent.find('.team2_score').text(newScore2);
			}

		}else{
			console.log('Game score is Final');
		}	

	},

	lockSet: function(e) {
		e.preventDefault();

		var finalChecker = this.model.attributes.is_final;

		var setNumber = parseInt($(e.currentTarget).attr('setnumber'));

		if(finalChecker == false){

			$(e.currentTarget).attr('class', 'lock_closed');
			var superParent = $(e.currentTarget).parent().parent().parent().parent().parent().parent().parent();

			var parent = $(e.currentTarget).parent().parent();

			var team_1_score = parseInt(parent.find("#team_1_score").find("select").val());
			var team_2_score = parseInt(parent.find("#team_2_score").find("select").val());

			var modelData = {
	            "game_id": this.model.get('game_id'),
			    "is_final": true,
			    "team_1_score": team_1_score,
	        	"team_2_score": team_2_score,
			    "set_number": setNumber		    
	        }

			this.updateScore(modelData);

			parent.find("#team_1_score").html(team_1_score);
			parent.find("#team_2_score").html(team_2_score);

			if(team_1_score > team_2_score){
				var newScore = parseInt(superParent.find('.team1_score').text()) + 1;
				superParent.find('.team1_score').text(newScore);
			}else if(team_2_score > team_1_score){
				var newScore = parseInt(superParent.find('.team2_score').text()) + 1;
				superParent.find('.team2_score').text(newScore);
			}

		}else{
			console.log('Game score is Final');
		}	
	},

	unlockSet: function(e){
		e.preventDefault();

		var finalChecker = this.model.attributes.is_final;

		var setNumber = parseInt($(e.currentTarget).attr('setnumber'));

		if(finalChecker == false){
			var newLength = this.model.attributes.game_sets.length + 1;

			var modelData = {
	            "game_id": this.model.get('game_id'),
			    "is_final": false,
			    "team_1_score": this.model.attributes.game_sets[setNumber-1].team_1_score,
	        	"team_2_score": this.model.attributes.game_sets[setNumber-1].team_2_score,
			    "set_number": setNumber		    
	        }

	        this.updateScore(modelData);

	        console.log('Game unlocked');
		}else{
			console.log('Game score is Final');
		}		
	},

	updateScore: function(modelData){
		var self = this;
		console.log('test', modelData);
        // create a new model by passing properties into the Model() constructor
        var newModel = new FED2.ScoreModel(modelData);
        //newModel.push()
        // if we want to POST a new tournament model, we need the api_url
        // see: https://www.leaguevine.com/docs/api/
        newModel.url = 'https://api.leaguevine.com/v1/game_scores/';

        newModel.save(newModel.toJSON(), {
            success: function(data) {
                newModel.url = newModel.get('resource_uri');
                console.log('new model created');
            },
            error: function(data) {
                console.log('error');
            },
            headers: {
                Authorization: 'bearer '+FED2.config.access_token
            }
        });
	}
});