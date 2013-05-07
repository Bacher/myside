
!function($, undefined) {
    "use strict";

    var BlogPostController = Spine.Controller.create({

        MONTHS: [
            "Jan.",
            "Feb.",
            "March",
            "April",
            "May",
            "June",
            "July",
            "Aug.",
            "Sep.",
            "Oct.",
            "Nov.",
            "Dec."
        ],

        init: function($element) {
            this.e = {};

            this.$element = $($element);
            this.$element.empty();
            this.render();

            this.initToolbar();
            this.initControls();
        },

        show: function(model) {
            this.model = model;

            this.fillUp();
        },

        render: function() {
            jade.render(this.$element[0], "blogpost", {});
        },

        initToolbar: function() {
            var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier', 'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande',
                'Lucida Sans', 'Tahoma', 'Times', 'Times New Roman', 'Verdana'],
                fontTarget = $('[title=Font]').siblings('.dropdown-menu');

            $.each(fonts, function(idx, fontName) {
                fontTarget.append($("<li>").append($("<a>").attr("data-edit", "fontName " + fontName).css("font-family", fontName).text(fontName)));
            });

            $("a[title]").tooltip({ container: "body" });

            $('.dropdown-menu input').click(function() { return false; })
                .change(function() { $(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle'); })
                .keydown('esc', function() { this.value = ""; $(this).change(); });
        },

        initControls: function() {
            this.e.editor = this.$element.find(".texteditor").wysiwyg();

            this.e.carmaSlider = this.$element.find(".carma > div").slider({ min: -5, max: 5, value: 0 });
            this.e.activitySlider = this.$element.find(".activity > div").slider({ min: -5, max: 5, value: 0 });
            this.e.datepicker = this.$element.find(".datepicker").datepicker({ onSelect: $.proxy(this.onDateChange, this) });
            this.e.commenttext = this.$element.find(".comments-section .comment-text");

            this.$element.on("click", ".savebutton", $.proxy(this.save, this));
            this.$element.on("click", ".comments-section a.btn", $.proxy(this.addComment, this));
            this.$element.on("click", ".comments-section .remove-comment", $.proxy(this.deleteComment, this));
            this.$element.on("mousedown click", ".footer .controls .addnote", $.proxy(this.addNote, this));
        },

        fillUp: function() {
            this.fillUpDate();
            this.fillUpComments();

            this.e.title = this.$element.find(".titleinput").val(this.model.title);

            this.e.editor.html(this.model.text);

            this.e.carmaSlider.slider({ value: this.model.health.carma });
            this.e.activitySlider.slider({ value: this.model.health.activity });

            this.fillUpNotes();
        },

        fillUpDate: function() {
            this.e.datepicker.datepicker("setDate", this.model.date);

            var dt = new Date(Date.parse(this.model.date));

            this.$element.find(".date .day").text(dt.getDate());
            this.$element.find(".date .month").text(this.MONTHS[dt.getMonth()]);
        },

        fillUpComments: function() {
            var container = this.$element.find(".comments-section .comments");
            container.empty();
            $.each(this.model.comments, function(id, comment) {
                container.append($("<div>").attr("data-id", id).addClass("comment").append($("<p>").text(comment)).append($("<div>").addClass("remove-comment").append($("<i>").addClass("icon-remove-sign"))));
            });
        },

        save: function() {
            console.log("saving");

            this.model.text = this.e.editor.html();
            this.model.title = this.e.title.val();
            this.model.health.carma = this.e.carmaSlider.slider("value");
            this.model.health.activity = this.e.activitySlider.slider("value");

            var now = new Date(),
                date = now.getMonth() + "/" + now.getDate() + "/" + now.getFullYear();

            this.model.save();

            var blogId = this.model.id;

            this.$element.find(".notes").children().each(function() {
                var $el = $(this),
                    categoryId = $el.attr("data-categoryid"),
                    noteId = $el.attr("data-id"),
                    text = $el.find("textarea").val(),
                    entry;

                if(noteId) {
                    entry = My.Models.Note.find(noteId);
                } else {
                    entry = new My.Models.Note();
                }

                entry.text = text;
                entry.date = date;
                entry.category = categoryId;
                entry.blogpost = blogId;

                entry.save();
            });
        },

        onDateChange: function(e, a) {
            this.model.date = e;
            this.fillUpDate();
        },

        addComment: function() {
            var text = this.e.commenttext.val();
            if(text != "") {
                this.model.comments.push(text);
                this.model.save();
                this.e.commenttext.val("");

                this.fillUpComments();
            }
        },

        deleteComment: function(ev, ui) {
            var id = ev.currentTarget.parentElement.attributes["data-id"].value;
            this.model.comments.splice(id, 1);
            this.model.save();

            this.fillUpComments();
        },

        fillUpNotes: function() {
            var notes = My.Models.Note.findAllByAttribute("blogpost", this.model.id);

            for(var i = 0; i < notes.length; ++i) {
                var breadcrumb = $("<ul>").addClass("breadcrumb")
                    .append($("<li>").text("Hobby ").append($("<span>").addClass("divider").text("/")))
                    .append($("<li>").text("Bicycle ").append($("<span>").addClass("divider").text("/")))
                    .append($("<li>").text("Results"));

                this.$element.find(".notes-section .notes").append($("<div>").addClass("note").attr("data-categoryid", My.Models.Category.findByAttribute("title", "Results").id).attr("data-id", notes[i].id)
                    .append(breadcrumb)
                    .append($("<textarea>").val(notes[i].text))).find(".note:last textarea");
            }
        },

        addNote: function(ev) {
            if(ev.type === "mousedown") {
                this._tmp = document.getSelection().toString().trim();
            } else {
                var breadcrumb = $("<ul>").addClass("breadcrumb")
                    .append($("<li>").text("Hobby ").append($("<span>").addClass("divider").text("/")))
                    .append($("<li>").text("Bicycle ").append($("<span>").addClass("divider").text("/")))
                    .append($("<li>").text("Results"));

                this.$element.find(".notes-section .notes").append($("<div>").addClass("note").attr("data-categoryid", My.Models.Category.findByAttribute("title", "Results").id)
                    .append(breadcrumb)
                    .append($("<textarea>").val(this._tmp))).find(".note:last textarea").focus();
            }
        }
    });

    window.My = window.My || {};
    My.Controllers = My.Controllers || {};
    My.Controllers.BlogPost = BlogPostController;

}(jQuery);
