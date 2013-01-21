FED2.HomeView = Backbone.View.extend({
	el: $("#page"),

	template: $("#homeTemplate").html(),
    // Render view *(backbone method)*
	render: function () {
		this.el.html(this.template);
	}
});
