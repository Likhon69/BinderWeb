

var AttendenceRemarksDetailsManager = {
        
    SaveAttendenceRemarksDetails: function () {
        //debugger;
        var validator = $("#divAttendenceRemarksDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");

        if (validator.validate()) {
            var objAttendenceRemarksDetails = AttendenceRemarksDetailsHelper.CreateAttendenceRemarksDetails();

            var objAttendenceRemarks = JSON.stringify(objAttendenceRemarksDetails);
            var jsonParam = "objAttendenceRemarks:" + objAttendenceRemarks;
            var serviceUrl = "../AttendenceRemarks/SaveAttendenceRemarksDetails";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }

        function onSuccess(jsonData) {
      
            if (jsonData === "Success") {

                AjaxManager.MsgBox('success', 'center', 'Success:', 'AttendenceRemarks Saved/Updated Successfully',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#gridAttendenceRemarksSummary").data("kendoGrid").dataSource.read();
                            AttendenceRemarksDetailsHelper.clearAttendenceRemarksDetails();
                            $("#divgridFacilityToAttendenceRemarksMapSolution").data("kendoGrid").dataSource.read();
                            $("#divgridDeptToAttendenceRemarksMapSolution").data("kendoGrid").dataSource.read();
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

var AttendenceRemarksDetailsHelper = {

    CreateAttendenceRemarksDetails: function () {
       
        var obj = new Object();
        
        obj.AttendenceRemarksId = $("#hdnAttendenceRemarksId").val();
        obj.RemarksCode = $("#txtAttendenceRemarksCode").val();
        obj.RemarksName = $("#txtAttendenceRemarksName").val();
        obj.IsActive = $("#chkAttendenceRemarksIsActive").is(':checked') === true ? 1 : 0;

        return obj;
    },

    populateAttendenceRemarksDetails: function (obj) {

        if (obj != null) {
            $("#hdnAttendenceRemarksId").val(obj.AttendenceRemarksId);
            $("#txtAttendenceRemarksCode").val(obj.RemarksCode);
            $("#txtAttendenceRemarksName").val(obj.RemarksName);
            $("#chkAttendenceRemarksIsActive").val(obj.IsActive);
            if (obj.IsActive == 1) {
                $("#chkAttendenceRemarksIsActive").prop('checked', 'checked');
            } else {
                $("#chkAttendenceRemarksIsActive").removeProp('checked', 'checked');
            }
        }

    },

    clearAttendenceRemarksDetails: function () {

        $("#hdnAttendenceRemarksId").val("0");
        $("#txtAttendenceRemarksCode").val("");
        $("#txtAttendenceRemarksName").val("");
        $("#chkAttendenceRemarksIsActive").removeAttr("checked", false);
        $("#divAttendenceRemarksDetails > form").kendoValidator();
        $("#divAttendenceRemarksDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");

        status.text("").removeClass("invalid");
    },

};