

var TallyConfirmationManager = {

    AddTallyConfirmation: function () {
        debugger;
        if (TallyConfirmationHelper.ValidateTallyConfirmation()) {
            var objTallyConfirm = TallyConfirmationHelper.CreateTallyConfirmationObj();
            var objTallyConfirmInfo = objTallyConfirm;
            var jsonParam = objTallyConfirmInfo;
            var serviceUrl = binderApi + "/TallyPoint/PostQuantity";
            AjaxManager.Post(serviceUrl, jsonParam, function (response) {
               
                if (response == "Succes") {

                    Message.Success("Save Successfully");
             
                }

            }, function (error) {

            });
        }
    }
}

var TallyConfirmationHelper = {

    CreateTallyConfirmationObj: function () {
        debugger;
        
        var objConfirm = new Object();
        objConfirm.OrderId = _selectedMaster.OrderId;
        objConfirm.OrderedQuantity = _selectedMaster.Quantity;
        objConfirm.DeliveredQuantity = $("#txtQuantity").val();
        objConfirm.DisburseQuantity = objConfirm.OrderedQuantity - objConfirm.DeliveredQuantity;
        objConfirm.Remarks = $("#txtRemarks").val();
        return objConfirm;
    },

    ValidateTallyConfirmation: function () {
        var data = [];

        var validator = $("#TallyConfirmationDiv").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            status.text("").addClass("valid");
            return true;
        } else {
            status.text("Oops! There is invalid data in the form.").addClass("invalid");
            return false;
        }
    }
}