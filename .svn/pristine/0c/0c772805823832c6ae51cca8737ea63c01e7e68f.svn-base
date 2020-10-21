

var AddDateProductPriceApproveManager = {

    AddDateProductPriceApprove: function () {
        debugger;
        if (AddDateProductPriceApproveHelper.ValidateAddDateProductPriceApprove()) {

            var objDateProductPriceApprove = items;//AddDateProductPriceApproveHelper.CreateDetails();

            var jsonParam = objDateProductPriceApprove;
            var serviceUrl = binderApi + "/DateProductPriceApproveUnApprove/AddDateProductPriceApprove";
            AjaxManager.Post(serviceUrl, jsonParam, function (response) {
                if (response == "Success") {
                    Message.Success("Save Successfully");
                    DateProductPriceInformationSearchManager.DateProductPriceSearch();
                  //  $("#DateProductPriceGridDiv").data('kendoGrid').dataSource.read();
                    //$("#DateProductPriceGridDiv").data('kendoGrid').clearSelection();
                }
            }, function (error) {

                    Message.Warning("Something Problem!");
            });
        }
    }


}

AddDateProductPriceApproveHelper = {

    CreateDetails: function () {
        var DetailsObj = [];
        debugger;
        for (var i = 0; i < selecteditems.length; i++) {

            DetailsObj.push(parseInt(selecteditems[i]));
        }
        return DetailsObj;
    },
    ValidateAddDateProductPriceApprove: function () {
        var data = [];
        var validator = $("#DateProductPriceGridDiv").kendoValidator().data("kendoValidator"),
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