FED2.PoolView = Backbone.View.extend({
	// Define element (this.el)     
	el: $("#ranking"),
	
	// Initialize view *(backbone method)*


    initialize: function () {
		this.list = this.$el.find("#pool");
		// Specify collection for this view
		this.collection = new FED2.Pool(FED2.poolData);
		
		this.render();
		
		this.$el.find("#filter").append(this.createSelect());
		
		// Attach custom event handler
		this.on("change:filterType", this.filterByType, this);
		
		// Attach eventhandlers to collection: reset, add & remove something from collection.
        this.collection.on("reset", this.render, this);
		this.collection.on("add", this.renderPool, this);
		this.collection.on("remove", this.removeGame, this);
    },

	events: {
	    "change #filter select": "setFilter",
		"click #add": "addGame",
		"click #showForm": "showForm"
	},
	
	// Render view *(backbone method)*
    render: function () {
		this.$el.find("#pool").html("");

       	_.each(this.collection.models, function (item) {
        	this.renderPool(item);
        }, this);
    },
	
	// Render Pool *(custom method)*
    renderPool: function (item) {
		// Create new instance of TournamentView
		var teamView = new FED2.TeamView({
            model: item
        });

		// Append the rendered HTML to the views element
        this.list.append(teamView.render().el);
    },

	// Add game model
	addGame: function (e) {
	    e.preventDefault();
	    var newModel = {};
	    $("#addGame").children("input").each(function (i, el) {
	        if ($(el).val() !== "") {
	            newModel[el.id] = $(el).val();
	      }
	    });
	    FED2.poolData.push(newModel);
	    
	    if (_.indexOf(this.getTypes(), newModel.team) === -1) {
	         this.collection.add(new FED2.Team(newModel));
	        this.$el.find("#filter").find("select").remove().end().append(this.createSelect());
	    } else {
	        this.collection.add(new FED2.Team(newModel));
	    }
	    
	    this.collection.reset(FED2.poolData);
	},
	
	// Remove  model
	removeGame: function (removedModel) {
	    var removed = removedModel.attributes;
	    _.each(FED2.poolData, function (item) {
	        if (_.isEqual(item, removed)) {
	            FED2.poolData.splice(_.indexOf(FED2.poolData, item), 1);
	        }
	    });
	},

	// Get types for poolFormat select box
	getTypes: function () {
	    return _.uniq(this.collection.pluck("team"), false, function (type) {
	        return type.toLowerCase();
	    });
	},

	// Create poolFormat select box
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
	// Pakt elementen die in de poolData staan
	filterByType: function () {
	    if (this.filterType === "all") {
	        this.collection.reset(FED2.poolData);
	    } else {
	        this.collection.reset(FED2.poolData, { silent: true });
	        var filterType = this.filterType,
	            filtered = _.filter(this.collection.models, function (item) {
	            return item.get("team").toLowerCase() === filterType;
	        });
	        this.collection.reset(filtered);
	    }
	},

	showForm: function (e) {
		e.preventDefault();
	    this.$el.find("#addGame").slideToggle();
	}
});
// Kickstart the application by creating an instance of PoolView
FED2.ranking = new FED2.PoolView();