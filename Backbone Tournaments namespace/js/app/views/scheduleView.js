FED2.ScheduleView = Backbone.View.extend({
	// Define element (this.el)     
	el: $("#schedule"),
	
	// Initialize view *(backbone method)*
    initialize: function () {
		this.list = this.$el.find("table#games");
		// Specify collection for this view
		this.collection = new FED2.Schedule(FED2.scheduleData);
		
		this.render();
		
		this.$el.find("#filter").append(this.createSelect());
		
		// Attach custom event handler
		this.on("change:filterType", this.filterByType, this);
		
		// Attach eventhandlers to collection: reset, add & remove something from collection.
        this.collection.on("reset", this.render, this);
		this.collection.on("add", this.renderSchedule, this);
		this.collection.on("remove", this.removeGame, this);
    },

	events: {
	    "change #filter select": "setFilter",
		"click #add": "addGame",
		"click #showForm": "showForm"
	},
	
	// Render view *(backbone method)*
    render: function () {
		this.$el.find("table#games").html("");

       	_.each(this.collection.models, function (item) {
        	this.renderSchedule(item);
        }, this);
    },
	
	// Render Schedule *(custom method)*
    renderSchedule: function (item) {
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
	    FED2.scheduleData.push(newModel);
	    
	    if (_.indexOf(this.getTypes(), newModel.team1) === -1) {
	         this.collection.add(new FED2.Team(newModel));
	        this.$el.find("#filter").find("select").remove().end().append(this.createSelect());
	    } else {
	        this.collection.add(new FED2.Team(newModel));
	    }
	    
	    this.collection.reset(FED2.scheduleData);
	},
	
	// Remove tournament model
	removeGame: function (removedModel) {
	    var removed = removedModel.attributes;
	    _.each(FED2.scheduleData, function (item) {
	        if (_.isEqual(item, removed)) {
	            FED2.scheduleData.splice(_.indexOf(FED2.scheduleData, item), 1);
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
	},

	showForm: function (e) {
		e.preventDefault();
	    this.$el.find("#addGame").slideToggle();
	}
});

//create instance of master view
FED2.schedule = new FED2.ScheduleView();