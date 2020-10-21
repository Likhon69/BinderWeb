

$(document).ready(function () {

    AssemblyWiseFieldRenameHelper.transferPromotionCurrentEmploymentRename();
    AssemblyWiseFieldRenameHelper.transferPromotionCurrentEmploymentHide();

    $("#txtTinNumber").attr('disabled', true);
    $("#txtSalaryAccountNo").attr('disabled', true);

    $("#btnUpadateCardNo").click(function () {
        EmpCardIdChangeManager.UpdateCardIdChange();
    });

    $("#btnSearch").click(function () {
        EmpCardIdChangeManager.SearchEmploymentInformationByEmployeeCode();
    });

    $("#btnClearCardNo").click(function () {
        EmpCardIdChangeHelper.clearCurrentEmploymentInformation();
    });

    $("#txtEmployeeCode").keypress(function (e) {
        var key = e.which;
        if (key == 13) // the enter key code
        {
            EmpCardIdChangeManager.SearchEmploymentInformationByEmployeeCode();
        }        
    });

});


var EmpCardIdChangeManager = {

    SearchEmploymentInformationByEmployeeCode: function () {
        if (currentEmploymentHelper.validateSearchItem("divTransferPromotion")) {
            var employeeCode = $("#txtEmployeeCode").val();
            var param = "employeeId=" + employeeCode;
            var serviceUrl = "../Employee/GetEmploymentByEmployeeIdWithoutEmployeeTypeRestruction";
            AjaxManager.GetJsonResult(serviceUrl, param, false, false, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {


            if (jsonData != null) {

                EmpCardIdChangeHelper.populateCurrentEmploymentInformation(jsonData);
            }
            else {
                AjaxManager.MsgBox('warning', 'center', 'Error', "No data found",
                [{
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function ($noty) {
                        $noty.close();
                        EmpCardIdChangeHelper.clearCurrentEmploymentInformation();

                    }
                }]);
            }
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }

    },


    UpdateCardIdChange: function () {
        var newCardNo = $("#txtNewAttendanceCardNo").val();
        if (newCardNo != "") {
            var objCardId = EmpCardIdChangeHelper.CreateObjectEmpCardIdChange();
            var objCardIdInfo = JSON.stringify(objCardId).replace('&', '^');

            var jsonParam = 'objCardIdInfo:' + objCardIdInfo;
            var serviceUrl = "../Employee/UpdateAttendanceCardNoChange";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        } else {
            AjaxManager.MsgBox('warning', 'center', 'warning', 'New Attendance Card No cannot be empty',
                  [
                      {
                          addClass: 'btn btn-primary',
                          text: 'ok',
                          onClick: function ($noty) {
                              $noty.close();
                          }
                      }
                  ]);
        }


        function onSuccess(jsonData) {

            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success', 'Attendance Card No Updated Successfully',
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'ok',
                        onClick: function ($noty) {
                            $noty.close();
                            EmpCardIdChangeHelper.clearCurrentEmploymentInformation();
                            $("#txtEmployeeName").focus();
                        }
                    }
                ]);
            } else {
                AjaxManager.MsgBox('error', 'center', 'Error', jsonData,
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'ok',
                        onClick: function ($noty) {
                            $noty.close();
                        }
                    }
                ]);
            }
        }

        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText,
            [
                {
                    addClass: 'btn btn-primary',
                    text: 'ok',
                    onClick: function ($noty) {
                        $noty.close();
                    }
                }
            ]);
        }
    }

};


var EmpCardIdChangeHelper = {

    populateCurrentEmploymentInformation: function (obj) {
        $("#txtEmployeeName").val(obj.EmployeeName);
        $("#hdnHrRecordId").val(obj.HrRecordId);
        $("#txtCompany").val(obj.CompanyName);
        $("#txtBranch").val(obj.BranchName);
        $("#txtDepartment").val(obj.DepartmentName);
        $("#txtDesignation").val(obj.DesignationName);
        $("#txtFunction").val(obj.Function_Name);
        $("#txtEmploymentType").val(obj.EmployeeTypeName);
        $("#txtDutyShift").val(obj.ShiftName);
        $("#txtPayrollGrade").val(obj.GradeName);
        $("#txtDivision").val(obj.DivisionName);
        $("#txtFacility").val(obj.FacilityName);
        $("#txtSection").val(obj.SectionName);
        $("#txtSalaryLocation").val(obj.SalaryLocationName);

        $("#txtCurrReporingDepartment").val(obj.ReportingDepartmentName);
        $("#txtCurrentReportingBoss").val(obj.ReportingBoss);
        $("#txtTinNumber").val(obj.TinNumber);
        $("#txtSalaryAccountNo").val(obj.BankAccountNo);
        $("#txtExistingAttendanceCardNo").val(obj.AttendanceCardNo);

        //if (obj.JoiningDate != "/Date(-2209010400000)/") {
        //    $("#txtJoiningDate").val(AjaxManager.changeToSQLDateFormat(obj.JoiningDate, 0));
        //}
        //if (obj.ConfirmationDate != "/Date(-2209010400000)/") {
        //    $("#txtConfirmationDate").val(AjaxManager.changeToSQLDateFormat(obj.ConfirmationDate, 0));
        //}
        //if (obj.JobEndDate != "/Date(-2209010400000)/") {
        //    $("#txtSeperationDate").val(AjaxManager.changeToSQLDateFormat(obj.JobEndDate, 0));
        //}

        var joinDate = kendo.toString(kendo.parseDate(obj.JoiningDate), "dd-MMM-yyyy");
        if (joinDate != '01-Jan-0001' && joinDate != '01-Jan-1900')
            $("#txtJoiningDate").val(joinDate);

        var confDate = kendo.toString(kendo.parseDate(obj.ConfirmationDate), "dd-MMM-yyyy");
        if (confDate != '01-Jan-0001' && confDate != '01-Jan-1900')
            $("#txtConfirmationDate").val(confDate);

        //var sepDate = kendo.toString(kendo.parseDate(obj.JobEndDate), "dd-MMM-yyyy");
        //if (sepDate != '01-Jan-0001' && sepDate != '01-Jan-1900')
        //    $("#txtSeperationDate").val(sepDate);

        var sepDate = kendo.toString(kendo.parseDate(obj.JobEndDate), "dd-MMM-yyyy");
        if (sepDate != '01-Jan-0001' && sepDate != '31-Dec-1899' && sepDate != '01-Jan-1900')
            $("#txtSeperationDate").val(sepDate);
        else {
            $("#txtSeperationDate").val('');
        }


        try {

            $("#txtOfficeEmail").val(obj.OfficialEmail);
            $("#txtContactNo").val(obj.EmergencyContactNo);
            $("#txtPersonalContact").val(obj.PersonalMobileNo);


            if (obj.ProfilePicture != "") {
                $("#imgProfilePicture").attr('src', obj.ProfilePicture);

            } else {
                $("#imgProfilePicture").attr('src', "");
            }
        } catch (e) {

        }
    },

    CreateObjectEmpCardIdChange: function () {
        var obj = new Object();
        obj.HrRecordId = $("#hdnHrRecordId").val();
        obj.ExistAttendanceCardNo = $("#txtExistingAttendanceCardNo").val();
        obj.NewAttendanceCardNo = $("#txtNewAttendanceCardNo").val();
        return obj;
    },

    clearCurrentEmploymentInformation: function () {
        currentEmploymentHelper.clearCurrentEmploymentInformation();
        $("#txtExistingAttendanceCardNo").val("");
        $("#txtNewAttendanceCardNo").val("");

        $("#divCurrentEmploymentDetails > form").kendoValidator();
        $("#divCurrentEmploymentDetails").find("span.k-tooltip-validation").hide();

        var status = $(".status");
        status.text("").removeClass("invalid");
    }
}