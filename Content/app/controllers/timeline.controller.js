
!function($, undefined) {
    "use strict";

    var TimelineController = Spine.Controller.create({
        init: function($element) {
            this.$element = $($element);
            
            this.render();

            this.e = {};
            
            this.fillUp();

            this.initControls();
        },

        render: function() {
            jade.render(this.$element[0], "timeline", {});
        },

        fillUp: function() {
        },

        initControls: function() {
            
        }
    });

    window.My = window.My || {};
    My.Controllers = My.Controllers || {};
    My.Controllers.Timeline = TimelineController;

}(jQuery);
