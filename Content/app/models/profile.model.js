
!function() {
    "use strict";

    var ProfileModel = Spine.Model.setup("Profile", ["name", "login", "password", "birthday"]);

    ProfileModel.include({
        name: "",
        login: "",
        password: "",
        birthday: ""
    });

    ProfileModel.extend(Spine.Model.Local);

    window.My = window.My || {};
    My.Models = My.Models || {};
    My.Models.Profile = ProfileModel;

}();
