
$(function() {
    function initControllers() {
        var blogPostController = new My.Controllers.BlogPost("#post-viewport");
        blogPostController.show(My.Models.BlogPost.first());

        var categoryMenuController = new My.Controllers.CategoryMenu("#categorymenu-viewport");

        var timelineController = new My.Controllers.Timeline("#timeline-viewport");
    }

    function toogleView(id) {
        $("#viewport").children().hide();

        $(id).show();
        $(".categorymenu-view").show();
    }

    window.App = {};

    My.Models.BlogPost.fetch();
    My.Models.Category.fetch();
    My.Models.Note.fetch();
    My.Models.Profile.fetch();

    if(My.Models.BlogPost.count() == 0) {
        new My.Models.BlogPost({ title: "First post", text: "<b>Hello World Text</b>", health: { carma: 3, activity: 5 }, date: "5/10/2012" }).save();

        var results = new My.Models.Category({ title: "Results" }).save();
        var repair = new My.Models.Category({ title: "Repair" }).save();
        var bicycle = new My.Models.Category({ title: "Bicycle", children: [results.id, repair.id] }).save();
        var electronic = new My.Models.Category({ title: "Electronic" }).save();
        var hobby = new My.Models.Category({ title: "Hobby", children: [bicycle.id, electronic.id], root: true }).save();

        new My.Models.Profile({ name: "Ilya", login: "Bacher", password: "123", birthday: "5/5/1990" }).save();
    }

    window.App.user = My.Models.Profile.first();

    initControllers();

    Spine.bind("myside:show-blogpost-view", function() {
        toogleView(".post-view");
        location.hash = "blogpost";
    });

    Spine.bind("myside:show-globe-view", function() {
        toogleView(".globe-view");
        location.hash = "globe";
    });

    Spine.bind("myside:show-timeline-view", function() {
        toogleView(".timeline-view");
        location.hash = "timeline";
    });


    var viewName = location.hash.replace("#", "");
    Spine.trigger("myside:show-" + (viewName === "" ? "blogpost" : viewName) + "-view");
});
