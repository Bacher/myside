
!function($, undefined) {
    "use strict";

    var BlogPostController = Spine.Controller.create({

        init: function($element) {
            this.$element = $($element);
            this.$element.empty();
            this.render();
        },

        render: function() {
            jade.render(this.$element[0], "blogpost", {});
        }
    });

    window.My = window.My || {};
    My.Controllers = My.Controllers || {};
    My.Controllers.BlogPost = BlogPostController;

}(jQuery);
