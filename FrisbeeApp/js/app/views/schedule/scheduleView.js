FED2.ScheduleView = Backbone.View.extend({
	el: $("#page"),

	template: $("#scheduleTemplate").html(),

	initialize: function() {
        // Capture the scope of this object (aView) in a local variable 
        var self = this;

        // Instantiate a new collection
        this.collection = new FED2.ScheduleCollection();

        // Fetch data from the API, this is a "GET" request
        this.collection.fetch({
            // If the request succeeds, the success callback function is executed 
            success: function(data) {
                // Loop through the fetched models 
                _.each(self.collection.models, function(model){
                	console.log("model data: ", model.toJSON());

                    // Set the url for each model
                    model.url = model.get('resource_uri');

                    self.renderGame(model);
                });

                $(".loading").remove();
                // Call the addTournament method
                //self.addTournament();
                console.log("succes!");
            },

            error: function(data){
                $(".loader").fadeOut(700, function(){
                    $(".loader").remove();
                });
                $(".load_text").fadeOut(700, function(){
                    $(".load_text").text("Sorry! Data ophalen mislukt.");
                    $(".load_text").css("top", "46%");
                });
                $(".load_text").fadeIn(300);
                //self.el.find(".load_text").text("Sorry! Data ophalen mislukt.");
            }
        });

//        this.collection.on("reset", this.render, this);
//		this.collection.on("update", this.renderGame, this);
    },

    // Render view *(backbone method)*
    render: function () {
    	this.el.html(this.template);
    },
	
	// Render Schedule *(custom method)*
    renderGame: function (item) {
    	var jsonModel = item.toJSON();
    	var poolId = jsonModel.pool_id;
    	var id = '#' + poolId.toString();

    	this.list = this.el.find("#gamestable");
/*
    	if ($(id)){
    		console.log('hallo');
  			// do something here
		}else{
			console.log('hallo2');
		}
*/

		// Create new instance of TournamentView
		var gameView = new FED2.GameView({
            model: item
        });
		// Append the rendered HTML to the views element
        this.list.append(gameView.render().el);
    },

	updateScore: function(e) {
		e.preventDefault();

		var gameId = 88505;
		var url = FED2.config.api_url + "games/";

		var updateModel = {
			id: gameId
		};

		$("#editGame").children("input").each(function (i, el) {
	        if ($(el).val() !== "") {
	            updateModel[el.id] = $(el).val();
	      }
	    });

		console.log(updateModel);

        // Instantiate a new model and stored it in the variable "newModel"
        // Pass the data to the new model as a parameter
        var updateModel = new FED2.GameModel(updateModel);

        // Set the API url
        updateModel.url = url;
        
        // Save a new model to the API, this is a "POST" request
        // the save function takes two parameters,
        
        updateModel.save(
            // The first parameter is the data object
            updateModel.toJSON(), {
            // The second parameter takes request options
            success: function(data) {
                // On succes set the new url for the model
             //   newModel.url = newModel.get('resource_uri');
             console.log("save succesful");
            },
            error: function(data) {
                // On error log the error in the console
                console.log('error');
            },
            // Define an authorization header to allow for posting to the API
            headers: {
                Authorization: 'bearer '+ FED2.config.access_token
            }
        });
    },

	// Get types for schedulingFormat select box
	getTypes: function () {
	    return _.uniq(this.collection.pluck("team1"), false, function (type) {
	        return type.toLowerCase();
	    });
	},

	// Create schedulingFormat select box
	createSelect: function () {
	    var filter = this.$el.find("#filter"),
	        select = $("<select/>", {
	            html: "<option value='all'>All</option>"
	        });
	    _.each(this.getTypes(), function (item) {
	        var option = $("<option/>", {
	            value: item.toLowerCase(),
	            text: item.toLowerCase()
	        }).appendTo(select);
	    });
	    return select;
	},

	// Set filter
	setFilter: function (e) {
	    this.filterType = e.currentTarget.value;

		// Trigger custom event handler
		this.trigger("change:filterType");
	},

	// Filter the collection
	filterByType: function () {
	    if (this.filterType === "all") {
	        this.collection.reset(FED2.scheduleData);
	    } else {
	        this.collection.reset(FED2.scheduleData, { silent: true });
	        var filterType = this.filterType,
	            filtered = _.filter(this.collection.models, function (item) {
	            return item.get("team1").toLowerCase() === filterType;
	        });
	        this.collection.reset(filtered);
	    }
	}
});