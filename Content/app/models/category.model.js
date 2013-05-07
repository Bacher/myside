
!function() {
    "use strict";

    var CategoryModel = Spine.Model.setup("Category", ["title", "children", "root"]);

    CategoryModel.include({
        title: "",
        children: [],
        root: false
    });

    CategoryModel.extend(Spine.Model.Local);

    window.My = window.My || {};
    My.Models = My.Models || {};
    My.Models.Category = CategoryModel;

}();
