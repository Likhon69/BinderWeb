

var AddDateProductPriceManager = {
    AddDateProductPrice: function () {
        debugger;
        if (AddDateProductPriceHelper.ValidateAddDateProductPrice()) {
            var objAddDateProductPrice = AddDateProductPriceHelper.CreateDetails();
            var objDateProductPriceInfo = new Object();
            var objDateProductPrice = DateProductPriceHelper.CreateDateProductPriceObject();
            objDateProductPriceInfo.productPriceTempVms = objAddDateProductPrice;
            objDateProductPriceInfo.param = objDateProductPrice;
            var jsonParam = objDateProductPriceInfo;
            var serviceUrl = binderApi + "/ProductPrice/AddDateProductPrice";
            AjaxManager.Post(serviceUrl, jsonParam, function (response) {
                debugger;
                if (response == "Success") {
                    Message.Success("Save Successfully");
                    $("#DateProductPriceGridDiv").data('kendoGrid').dataSource.read();
                 
                    //AddDateProductPriceHelper.clearDealersForm();
                } else {
                    Message.Warning(response);
                }

               
            }, function (error) {

            });
        }
    }
}

var AddDateProductPriceHelper = {

    CreateAddDateProductPrice: function () {
        var objDateProductPrice = new Object();
        var DateProductPriceObj = AddDateProductPriceHelper.CreateDetails();
        objDateProductPrice.DateProductPrice = DateProductPriceObj;

    },

    CreateDetails: function () {
        var DetailsObj = [];
        var gridSummary = $("#DateProductPriceGridDiv").data("kendoGrid");
        var gridData = gridSummary.dataSource.data();
        for (var i = 0; i < gridData.length; i++) {
            var obj = gridData[i];
            var objDetails = new Object();
            objDetails.PricingDate =kendo.toString(obj.PricingDate,"MM/dd/yyyy");
            objDetails.FirstSlotPrice = obj.FirstSlotPrice;
            objDetails.SecondSlotPrice = obj.SecondSlotPrice;
            objDetails.ProductId = obj.ProductId;
            DetailsObj.push(objDetails);
        }
        return DetailsObj;
    },
    ValidateAddDateProductPrice: function () {
        var data = [];
        var validator = $("#datePickerDiv").kendoValidator().data("kendoValidator"),
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