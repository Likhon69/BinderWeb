$(document).ready(function () {
    // create DatePicker from input HTML element
    $("#datepickerFrom").kendoDatePicker({

        format: "dd-MMM-yyyy",
        change: function () {
            var val = this.value();
            var dt = $("#datepickerTo").data('kendoDatePicker');
            dt.value(val);
            dt.min(val);
        }
    });

    $("#datepickerTo").kendoDatePicker({

        format: "dd-MMM-yyyy"
    });

    $("#btnGenerate").click(function () {

        DateProductPriceInformationManager.DateProductPrice();
    });
    $("#btnSave").click(function () {

        AddDateProductPriceManager.AddDateProductPrice();
    });
    DateProductPriceGridHelper.GenerateDateProductPriceGrid();
});


var DateProductPrice = "";

var DateProductPriceInformationManager = {
    
    DateProductPrice: function () {
        debugger;
        if (DateProductPriceHelper.ValidateDateProductPriceInfoForm()) {
            var objDateProductPrice = DateProductPriceHelper.CreateDateProductPriceObject();
            var objDateProductPriceInfo = objDateProductPrice;
            var jsonParam = objDateProductPriceInfo;
            var serviceUrl = binderApi + "/ProductPrice/GenerateProductPrice";
            AjaxManager.Post(serviceUrl, jsonParam, function (response) {
                if (response == '') {
                    Message.Warning("Date does not Match!");
                }
                DateProductPriceGridHelper.GenerateDateProductPriceGrid(response);
               
            }, function (error) {
                
            });
        }
    }
};

var DateProductPriceHelper = {

    CreateDateProductPriceObject: function () {
        var objDateProductPrice = new Object();

        objDateProductPrice.DatePickerFrom =kendo.toString($("#datepickerFrom").data('kendoDatePicker').value(),"MM/dd/yyyy");

        objDateProductPrice.DatePickerTo = kendo.toString($("#datepickerTo").data('kendoDatePicker').value(), "MM/dd/yyyy");
        objDateProductPrice.FirstSlotPrice = $("#firstSlotPrice").val();
        objDateProductPrice.SecondSlotPrice = $("#secondSlotPrice").val();
        return objDateProductPrice;
    },

    ValidateDateProductPriceInfoForm: function () {
        var data = [];
        debugger;
        var validator = $("#datePickerDiv").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            status.text("").addClass("valid");
            return true;
        } else {
            Message.Warning('There is invalid data in the form.');
            return false;
        }
    }
};