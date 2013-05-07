
!function() {
    "use strict";

    var NoteModel = Spine.Model.setup("Node", ["text", "category", "blogpost", "date"]);

    NoteModel.include({
        text: "",
        category: "",
        blogpost: "",
        date: "1/1/2000"
    });

    NoteModel.extend(Spine.Model.Local);

    window.My = window.My || {};
    My.Models = My.Models || {};
    My.Models.Note = NoteModel;

}();
