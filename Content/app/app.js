
$(function() {
    window.App = {};

    My.Models.BlogPost.fetch();

    //var post = new My.Models.BlogPost({ title: "First post", text: "Hello World Text", status: { carma: 3, activity: 5 } });

    new My.Controllers.BlogPost("#viewport");
});