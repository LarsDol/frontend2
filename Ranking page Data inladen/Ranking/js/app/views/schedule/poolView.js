FED2.PoolView = Backbone.View.extend({
	el: $("#page"),

	template: $("#poolTemplate").html(),

	initialize: function() {
        // Capture the scope of this object (aView) in a local variable 
        var self = this;

        // Instantiate a new collection
        this.collection = new FED2.PoolCollection();

        // Fetch data from the API, this is a "GET" request
        this.collection.fetch({
            // If the request succeeds, the success callback function is executed 
            success: function(data) {
                // Loop through the fetched models 
                _.each(self.collection.models, function(model){
                	//console.log("model data: ", model.toJSON());
                    
                    // Set the url for each model
                    model.url = model.get('resource_uri');

                    console.log(model.url);
                    self.renderTeam(model);
                });
                // Call the addTournament method
                //self.addTournament();
                console.log("succes!");
            }
        });
    },

    events: {
	    "change #filter select": "setFilter",
		"click #edit": "editGame"
	},
    // Render view *(backbone method)*
    render: function () {
    	this.el.html(this.template);

    	this.list = this.el.find("#gamestable");
    },
	
	// Render Schedule *(custom method)*
    renderTeam: function (item) {
    	//console.log("test")
    	//console.log(item.toJSON(	));
		// Create new instance of TournamentView
		var teamView = new FED2.TeamView({
            model: item
        });
		// Append the rendered HTML to the views element
        this.list.append(teamView.render().el);
    },

    editGame: function(){
    	console.log("editting game");
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
	            return item.get("team").toLowerCase() === filterType;
	        });
	        this.collection.reset(filtered);
	    }
	}
});