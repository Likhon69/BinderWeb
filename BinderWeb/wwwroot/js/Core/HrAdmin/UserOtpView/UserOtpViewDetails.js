var UserOtpDetailsManager = {

    SearchEmployee: function () {
        //debugger;
        if (UserOtpDetailsManager.validateSearchItem("searchemployeediv")) {
            var employeeName = $("#txtSearchEmployee").val();
            var param = "employeeId=" + employeeName;
            var serviceUrl = "../Employee/GetEmploymentByEmployeeId";
            AjaxManager.GetJsonResult(serviceUrl, param, false, false, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {


            if (jsonData != null) {

                UserOtpDetailsManager.populateEmployeeName(jsonData);
            }
            else {
                AjaxManager.MsgBox('warning', 'center', 'Error', "No data found",
                [{
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function ($noty) {
                        $noty.close();
                        //currentEmploymentHelper.clearCurrentEmploymentInformation();

                    }
                }]);
            }
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }

    },

    CallEmployeeSummaryBySearch: function () {
        
        var employeeName = $("#txtSearchEmployee").val();

        $("#UserOTpViewSummaryDiv").empty();
        $("#UserOTpViewSummaryDiv").kendoGrid();

        UserOtpSummaryHelper.GenerateUserOtpGrid(employeeName );
    },

    validateSearchItem: function (divId) {

        var validator = $("#" + divId).kendoValidator().data("kendoValidator"),
           status = $(".status");

        if (validator.validate()) {
            status.text("").addClass("valid");
            return true;
        }
        else {
            status.text("Oops! There is invalid data in the form.").addClass("invalid");
            return false;
        }
    },
};