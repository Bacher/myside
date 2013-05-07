
!function($, undefined) {
    "use strict";

    var CategoryMenuController = Spine.Controller.create({
        init: function($element) {
            this.$element = $($element);
            this.models = My.Models.Category;
            this.render();

            this.e = {};
            this.e.container = this.$element.find(".categorymenu");

            this.fillUp();

            this.initControls();
        },

        render: function() {
            jade.render(this.$element[0], "categorymenu", {});
        },

        fillUp: function() {
            var roots = this.models.findAllByAttribute("root", true)

            for(var i = 0; i < roots.length; ++i) {
                //$("<a>").addClass("btn categorybtn").text(roots[i].title).attr("data-id", roots[i].id).appendTo(this.e.container);
            }
        },

        initControls: function() {
            this.$element.on("click", ".categorybtn", $.proxy(this.onCategoryClick, this));
            this.$element.on("click", ".globebtn", $.proxy(this.onGlobeClick, this));
            this.$element.on("click", ".timelinebtn", $.proxy(this.onTimelineClick, this));
        },

        onCategoryClick: function(ev) {

        },

        onGlobeClick: function() {
            Spine.trigger("myside:show-globe-view");
        },

        onTimelineClick: function() {
            Spine.trigger("myside:show-timeline-view");
        }
    });

    window.My = window.My || {};
    My.Controllers = My.Controllers || {};
    My.Controllers.CategoryMenu = CategoryMenuController;

}(jQuery);
