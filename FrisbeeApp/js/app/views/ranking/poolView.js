FED2.PoolView = Backbone.View.extend({
	el: $("#page"),

	template: $("#poolTemplate").html(),

	initialize: function() {
        // Capture the scope of this object (aView) in a local variable 
        var self = this;
		// Specify collection for this view
        // Instantiate a new collection

        self.collection = new FED2.PoolCollection();
		// Attach custom event handler
	


        // Haal de Data op uit de API van LeagueVine 
        this.collection.fetch({
            // If the request succeeds, the success callback function is executed 
            success: function(data) {
                // Loop through the fetched models 
                _.each(self.collection.models, function(model){
                	//console.log("model data: ", model.toJSON());
                     $(".loading").remove();
                    // Set the url for each model
                    model.url = model.get('resource_uri');

                    //console.log(model.url);
                    self.renderTeam(model);
                   
                });

                
                console.log("succes!");
            },

            error: function(data){
                $(".loader").fadeOut(700, function(){
                    $(".loader").remove();
                });
                $(".load_text").fadeOut(700, function(){
                    $(".load_text").text("De pool data kan niet worden opgehaald, kijk of u verbonden ben met het internet");
                    $(".load_text").css("top", "46%");
                });
                $(".load_text").fadeIn(300);
            
            },
        });
    },

            
    events: {
	    //"change #filter select": "setFilter",
		"click .addScoreButton": "showRankingForm",
	
	},



	
	showRankingForm: function (e) {
		var el = "td"
		var form_template = $("#scoreFormRanking").html();
		var formTmpl = _.template(form_template);

		var checker = $(this.el).find("#scoreTable");

		if (checker.length > 0){
		  	$(this.el).find("#scoreTable").slideToggle();
			$(this.el).remove("#scoreTable");
		}else{
			$(this.el).append(formTmpl(this.model.toJSON()));
			$(this.el).find("#scoreTable").slideToggle();
		}
		
	
	},
	

    // Render view *(backbone method)*
    render: function () {
    	this.el.html(this.template);

    	this.list = this.el.find("#rankingtable");
    },
   
	
	// Render Poule *(custom method)*
    renderTeam: function (item) {
  
		// Create new instance of TeamView
		var teamView = new FED2.TeamView({
            model: item
        });
		// Append the rendered HTML to the views element
        this.list.append(teamView.render().el);
    },

    /*

  
	getTypes: function () {
	    return _.uniq(this.collection.pluck('games_played'), false, function (type) {
	        return type.toLowerCase();
	    });
	},

	// Create rankingFormat select box
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
	        this.collection.reset(FED2.PoolCollection);
	    } else {
	        this.collection.reset(FED2.PoolCollection, { silent: true });
	        var filterType = this.filterType,
	            filtered = _.filter(this.collection.models, function (item) {
	            return item.get("games_played").toLowerCase() === filterType;
	        });
	        this.collection.reset(filtered);
	    }
	}
	*/
});