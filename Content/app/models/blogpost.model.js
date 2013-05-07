
!function() {
    "use strict";
    
    var BlogPostModel = Spine.Model.setup("BlogPost", ["title", "text", "date", "health", "trackId", "comments"]);
    
    BlogPostModel.include({
        title: "",
        text: "",
        date: "1/1/2000", /* MM/DD/YYYY */
        health: { carma: 0, activity: 0 },
        trackId: null,
        comments: []
    });

    BlogPostModel.extend(Spine.Model.Local);

    window.My = window.My || {};
    My.Models = My.Models || {};
    My.Models.BlogPost = BlogPostModel;

}();
