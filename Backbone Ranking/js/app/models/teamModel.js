// Define game model
FED2.Team = Backbone.Model.extend({
	// Initialize model
	defaults:{
		'team' : 'unknown',
		'Win' : 'unknown',
		'Lost' : 'unknown',
		'Sw' : 'unknown',
		'Sl' : 'unknown',
		'Pw' : 'unknown',
		'Pl' : 'unknown'
	},
	initialize: function () {
		// Calculate
		var won = this.get("Pw");
		var lost = this.get("Pl");
		
		var saldo = won - lost;
		this.set("saldo", saldo)
	}
	

});