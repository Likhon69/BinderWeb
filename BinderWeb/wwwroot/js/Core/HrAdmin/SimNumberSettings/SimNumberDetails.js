

var SimNumberDetailsManager = {
        
    SaveSimNumberDetails: function () {
        var validator = $("#divSimNumberDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");

        if (validator.validate()) {
            var objSimNumberDetails = SimNumberDetailsHelper.CreateSimNumberDetails();

            var objSimNumber = JSON.stringify(objSimNumberDetails);
            var jsonParam = "objSimNumber:" + objSimNumber;
            var serviceUrl = "../SimNumber/SaveSimNumberDetails";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }

        function onSuccess(jsonData) {
      
            if (jsonData === "Success") {

                AjaxManager.MsgBox('success', 'center', 'Success:', 'Sim Number Saved/Updated Successfully',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#gridSimNumberSummary").data("kendoGrid").dataSource.read();
                            SimNumberDetailsHelper.clearSimNumberDetails();
                            $("#divgridFacilityToSimNumberMapSolution").data("kendoGrid").dataSource.read();
                            $("#divgridDeptToSimNumberMapSolution").data("kendoGrid").dataSource.read();
                        }
                    }]);
            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Error', jsonData,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
            }
        }

        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
        }
    }
};

//helper

var SimNumberDetailsHelper = {

    CreateSimNumberDetails: function () {
       
        var obj = new Object();
        
        obj.SimNumberId = $("#hdnSimNumberId").val();
        obj.SimNumber = $("#txtSimNumber").val();
        obj.IsActive = $("#chkSimNumberIsActive").is(':checked') === true ? 1 : 0;

        return obj;
    },

    populateSimNumberDetails: function (obj) {

        if (obj != null) {
            $("#hdnSimNumberId").val(obj.SimNumberId);
            $("#txtSimNumber").val(obj.SimNumber);
            $("#chkSimNumberIsActive").val(obj.IsActive);
            if (obj.IsActive == 1) {
                $("#chkSimNumberIsActive").prop('checked', 'checked');
            } else {
                $("#chkSimNumberIsActive").removeProp('checked', 'checked');
            }
        }

    },

    clearSimNumberDetails: function () {

        $("#hdnSimNumberId").val("0");
        $("#txtSimNumber").val("");
        $("#chkSimNumberIsActive").removeAttr("checked", false);
        $("#divSimNumberDetails > form").kendoValidator();
        $("#divSimNumberDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");

        status.text("").removeClass("invalid");
    }
};