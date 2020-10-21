

var PostSocRemarksManager = {

    AddPostSocRemarks: function () {
        debugger;
        if (PostSocRemarksHelper.ValidateTallySocRemarks()) {
            var objSocRemarks = PostSocRemarksHelper.CreateTallySocRemarksObject();
            var objSocRemarksInfo = objSocRemarks;
            var jsonParam = objSocRemarksInfo;
            var serviceUrl = binderApi + "/OrderPayment/SaveSocRemarks";
            AjaxManager.Post(serviceUrl, jsonParam, function (response) {
                debugger;
              /*  if (response == '') {
                    Message.Error("Data Not Exist!");
                }*/
              


            }, function (error) {



            });
        }
    }

}

var PostSocRemarksHelper = {

    CreateTallySocRemarksObject: function () {
        debugger;
        var objSocRemarks = new Object();
        objSocRemarks.Soc = $("#txtSoc").val();
        objSocRemarks.Remarks = $("#txtRemarks").val();
        objSocRemarks.OrderId = _selectedMaster.OrderId;
        return objSocRemarks;
    },

    ValidateTallySocRemarks: function () {
        var data = [];

        var validator = $("#PaymentConfirmationDiv").kendoValidator().data("kendoValidator"),
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