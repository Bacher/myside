
!function() {
    "use strict";
    
    var BlogPostModel = Spine.Model.setup("BlogPost", ["topic", "text", "status", "trackId", "comments"]);
    
    BlogPostModel.include({
        topic: "",
        text: "",
        status: { carma: 0, activity: 0 },
        trackId: null,
        comments: []
    });

    BlogPostModel.extend(Spine.Model.Local);

    window.My = window.My || {};
    My.Models = My.Models || {};
    My.Models.BlogPost = BlogPostModel;
}();
