$(document).ready(function () {
    // create DatePicker from input HTML element
    $("#datepickerFrom").kendoDatePicker({
        format: 'dd-MMM-yyyy',
        change: function () {
            var val = this.value();
            var dt = $("#datepickerTo").data('kendoDatePicker');
            dt.value(val);
            dt.min(val);
        }


    });

    $("#datepickerTo").kendoDatePicker({
        format: 'dd-MMM-yyyy'
    });

    $("#btnSearch").click(function () {

        DateProductPriceInformationSearchManager.DateProductPriceSearch();
    });
    $("#btnSave").click(function () {

        AddDateProductPriceApproveManager.AddDateProductPriceApprove();
    });
    DateProductPriceSearchGridHelper.GenerateDateProductPriceSearchGrid();
});


var DateProductPrice = "";

var DateProductPriceInformationSearchManager = {

    DateProductPriceSearch: function () {
        debugger;
        if (DateProductPriceSearchHelper.ValidateDateProductPriceInfoSearchForm()) {
            var objDateProductPrice = DateProductPriceSearchHelper.CreateDateProductPriceSearchObject();
            var objDateProductPriceInfo = objDateProductPrice;
            var jsonParam = objDateProductPriceInfo;
            var serviceUrl = binderApi + "/DateProductPriceApproveUnApprove/DateProductPriceSearch";
            AjaxManager.Post(serviceUrl, jsonParam, function (response) {
                if (response == '') {
                    Message.Error("Data Not Exist!");
                }
                DateProductPriceSearchGridHelper.GenerateDateProductPriceSearchGrid(response);
            }, function (error) {

            });
        }
    }
};

var DateProductPriceSearchHelper = {

    CreateDateProductPriceSearchObject: function () {
        var objDateProductPrice = new Object();

        objDateProductPrice.DatePickerFrom = kendo.toString($("#datepickerFrom").data('kendoDatePicker').value(), "MM/dd/yyyy");

        objDateProductPrice.DatePickerTo = kendo.toString($("#datepickerTo").data('kendoDatePicker').value(), "MM/dd/yyyy");

        return objDateProductPrice;
    },

    ValidateDateProductPriceInfoSearchForm: function () {
        var data = [];
        var validator = $("#datePickerDiv").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            status.text("").addClass("valid");
            return true;
        } else {
            Message.Warning('There is invalid data in the form.');
           // status.text("oops! There is invalid data in the form.").addClass("invalid");
            return false;
        }
    },

    PopulateDateProductPriceSearch: function (objDateProductPrice) {
        debugger;
        DateProductPriceSearchGridHelper.GenerateDateProductPriceSearchGrid(objDateProductPrice);
    }


};