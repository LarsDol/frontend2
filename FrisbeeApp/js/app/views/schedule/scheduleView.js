FED2.ScheduleView = Backbone.View.extend({
	el: $("#page"),

	template: $("#scheduleTemplate").html(),

	initialize: function() {
		FED2.load_checker = false;
        // Capture the scope of this object (aView) in a local variable 
        var self = this;
        this.scoreCollection = new FED2.ScoreCollection();

        // Instantiate a new collection
        this.collection = new FED2.ScheduleCollection();

        // Fetch data from the API, this is a "GET" request
        this.collection.fetch({
            // If the request succeeds, the success callback function is executed 
            success: function(data) {
                // Loop through the fetched models 
                _.each(self.collection.models, function(model){

                    // Set the url for each model
                    model.url = model.get('resource_uri');

                    self.renderGame(model);
                });

                $(".loading").remove();

                self.el.find("#filter").append(self.createSelect());
				
				// Attach custom event handler
				self.el.on("change:filterType", self.filterByType, self);

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

    events: {
    	"change #filter select": "setFilter"
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

		// Create new instance of TournamentView
		var gameView = new FED2.GameView({
            model: item
        });
		// Append the rendered HTML to the views element
        this.list.append(gameView.render().el);
    },

	// Get types for schedulingFormat select box
	getTypes: function () {
	    return _.uniq(this.collection.attributes.team_1.pluck('name'), false, function (type) {
			console.log(type);
	        return type.toLowerCase();
	    });

	},

	// Create schedulingFormat select box
	createSelect: function () {
	    var filter = this.el.find("#filter"),
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
	        this.collection.reset(FED2.ScheduleCollection);
	    } else {
	        this.collection.reset(FED2.ScheduleCollection, { silent: true });
	        var filterType = this.filterType,
	            filtered = _.filter(this.collection.models, function (item) {
	            return item.get("team_1.name").toLowerCase() === filterType;
	        });
	        this.collection.reset(filtered);
	    }
	}
});