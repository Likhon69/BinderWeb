

var TallyPointManager = {

    PassParameterSearch: function () {
        debugger;
        if (TallyPointHelper.ValidateTallySearch()) {
            var objTallySrch = TallyPointHelper.CreateTallySearchObject();
            var objTallySrchInfo = objTallySrch;
            var jsonParam = objTallySrchInfo;
            var serviceUrl = binderApi + "/TallyPoint/SearchSoc";
            AjaxManager.Post(serviceUrl, jsonParam, function (response) {
                debugger;
                if (response == '') {
                    Message.Error("Data Not Exist!");
                }
                TallySocSearchGridHelper.TallySocSearchGrid(response);
             

            }, function (error) {

                   

            });
        }
    }

}

var TallyPointHelper = {
    
    CreateTallySearchObject: function () {
        debugger;
        var objSearchSoc = new Object();
        objSearchSoc.SearchSoc = $("#searchSoc").val();

        return objSearchSoc;
    },

    ValidateTallySearch: function () {
        var data = [];

        var validator = $("#TallySearchDiv").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            status.text("").addClass("valid");
            return true;
        } else {
            Message.Warning("There is invalid data in the form");
            return false;
        }
    }
}