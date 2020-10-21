
var HrisSettingsDetailsManager = {

    SaveHrisSettingsDetails: function () {
        //debugger;
        var validator = $("#divHrisSettingsDetails").kendoValidator().data("kendoValidator");

        if (validator.validate()) {
            var objHrisSettings = HrisSettingsDetailsHelper.CreateObjectHrisSettingsDetails();
            var objHrisSettingsInfo = JSON.stringify(objHrisSettings).replace('&', '^');
            //debugger;
            var jsonParam = 'objHrisSettingsInfo:' + objHrisSettingsInfo;
            var serviceUrl = "../HrisSettings/SaveHrisSettingsDetails";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }


        function onSuccess(jsonData) {

            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success', 'Hris Settings Save/Update Successfully',
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'ok',
                        onClick: function ($noty) {
                            $noty.close();
                            HrisSettingsDetailsManager.GetHrisSettingsDetails();  
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
    },

    GetHrisSettingsDetails: function () {
        //debugger;
        var objStatus = "";
        var jsonParam = "";
         
        var serviceUrl = "../HrisSettings/GetHrisSettingsDetails";
        AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed); 

        function onSuccess(jsonData) {
            //debugger;
            objStatus = jsonData;
            // //debugger;
            if (objStatus != null) {
                HrisSettingsDetailsHelper.PopulateHrisSettingsDetails(jsonData);
            }
             
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        //return data;
    },
};


//______________ Helper ______________//


var HrisSettingsDetailsHelper = {
    initHrisSettingsDetails: function () {
        $("#txtLeaveApplicationAutoprocessDaysAfter").kendoNumericTextBox({
            format: "#",
            min: "0",
            max: "365",
            value: "0",
        }).parent().parent().css('width', "10.4em");
    
        HrisSettingsDetailsManager.GetHrisSettingsDetails();
        //HrisSettingsDetailsHelper.PopulateHrisSettingsDetails(obj);

    },
    CreateObjectHrisSettingsDetails: function () {
        //debugger;
        var obj = new Object();

        obj.HrisSettingsId = $("#hdnHrisSettingsId").val();

        obj.IsOnlyActiveEmployeeLoad = $("#chkOnlyActiveEmployeeLoad").is(':checked') == true ? 1 : 0;
        obj.IsFieldForceSalaryEnable = $("#chkFieldForceSalaryEnable").is(':checked') == true ? 1 : 0;
        obj.MultipleSalaryAccountApplicable = $("#chkMultipleSalaryAccount").is(':checked') == true ? 1 : 0;
        obj.IsMobileBillCalculationTotal = $("#chkMobileBillCalculationTotal").is(':checked') == true ? 1 : 0;
        obj.IsWFBalanceCheckingApplicable = $("#chkWFBalanceCheckingApplicable").is(':checked') == true ? 1 : 0;
        obj.IsMultipleLoanApplicable = $("#chkMultipleLoanApplicable").is(':checked') == true ? 1 : 0;
        obj.ManualEmployeeOrder = $("#chkManualEmployeeOrder").is(':checked') == true ? 1 : 0;
        obj.EmployeeOrderSQL = $("#txtEmployeeOrderSQL").val();
        obj.FieldForceShowByDefault = $("#chkFieldForceShowByDefault").is(':checked') == true ? 1 : 0;
        obj.ExtraMonthlyAttendanceStatus = $("#chkExtraMonthlyAttendanceStatus").is(':checked') == true ? 1 : 0;
        obj.IsDynamicEducationActive = $("#chkIsDynamicEducationActive").is(':checked') == true ? 1 : 0;
        obj.IsAccessRestrictionActiveForAppraisal = $("#chkIsAccessResForAppraisal").is(':checked') == true ? 1 : 0;
        obj.IsDuplicateEmployeeUploadCheking = $("#chkIsDuplicateEmployeeUploadCheking").is(':checked') == true ? 1 : 0;
        obj.LeaveApplicationAutoprocessDaysAfter=$("#txtLeaveApplicationAutoprocessDaysAfter").data("kendoNumericTextBox").value();        
        if (obj.LeaveApplicationAutoprocessDaysAfter == "") {
            obj.LeaveApplicationAutoprocessDaysAfter = 0;
        }

        return obj;

    },

    PopulateHrisSettingsDetails: function (obj) {
        //debugger;
        if (obj != null) {

            $("#hdnHrisSettingsId").val(obj.HrisSettingsId);
            if (obj.IsOnlyActiveEmployeeLoad == 1) {
                $("#chkOnlyActiveEmployeeLoad").prop('checked', 'checked');
            } else {
                $("#chkOnlyActiveEmployeeLoad").removeProp('checked', 'checked');
            }
            if (obj.IsFieldForceSalaryEnable == 1) {
                $("#chkFieldForceSalaryEnable").prop('checked', 'checked');
            } else {
                $("#chkFieldForceSalaryEnable").removeProp('checked', 'checked');
            }
            if (obj.MultipleSalaryAccountApplicable == 1) {
                $("#chkMultipleSalaryAccount").prop('checked', 'checked');
            } else {
                $("#chkMultipleSalaryAccount").removeProp('checked', 'checked');
            }
            if (obj.IsMobileBillCalculationTotal == 1) {
                $("#chkMobileBillCalculationTotal").prop('checked', 'checked');
            } else {
                $("#chkMobileBillCalculationTotal").removeProp('checked', 'checked');
            }
            if (obj.IsWFBalanceCheckingApplicable == 1) {
                $("#chkWFBalanceCheckingApplicable").prop('checked', 'checked');
            } else {
                $("#chkWFBalanceCheckingApplicable").removeProp('checked', 'checked');
            }
            if (obj.IsMultipleLoanApplicable == 1) {
                $("#chkMultipleLoanApplicable").prop('checked', 'checked');
            } else {
                $("#chkMultipleLoanApplicable").removeProp('checked', 'checked');
            }
            if (obj.ManualEmployeeOrder == 1) {
                $("#chkManualEmployeeOrder").prop('checked', 'checked');
                $("#liSql").show();
                $("#txtEmployeeOrderSQL").val(obj.EmployeeOrderSQL);

            } else {
                $("#chkManualEmployeeOrder").removeProp('checked', 'checked');
                $("#liSql").hide();
                $("#txtEmployeeOrderSQL").val("");
            }
            
            if (obj.FieldForceShowByDefault == 1) {
                $("#chkFieldForceShowByDefault").prop('checked', 'checked');
            } else {
                $("#chkFieldForceShowByDefault").removeProp('checked', 'checked');
            }
            if (obj.ExtraMonthlyAttendanceStatus == 1) {
                $("#chkExtraMonthlyAttendanceStatus").prop('checked', 'checked');
            } else {
                $("#chkExtraMonthlyAttendanceStatus").removeProp('checked', 'checked');
            }
            if (obj.IsDynamicEducationActive == 1) {
                $("#chkIsDynamicEducationActive").prop('checked', 'checked');
            } else {
                $("#chkIsDynamicEducationActive").removeProp('checked', 'checked');
            }
            if (obj.IsAccessRestrictionActiveForAppraisal == 1) {
                $("#chkIsAccessResForAppraisal").prop('checked', 'checked');
            } else {
                $("#chkIsAccessResForAppraisal").removeProp('checked', 'checked');
            }
            if (obj.IsDuplicateEmployeeUploadCheking == 1) {
                $("#chkIsDuplicateEmployeeUploadCheking").prop('checked', 'checked');
            } else {
                $("#chkIsDuplicateEmployeeUploadCheking").removeProp('checked', 'checked');
            }
            //$("#txtLeaveApplicationAutoprocessDaysAfter").val(obj.LeaveApplicationAutoprocessDaysAfter);

            var autoProcessLeave = $("#txtLeaveApplicationAutoprocessDaysAfter").data("kendoNumericTextBox");
            autoProcessLeave.value(obj.LeaveApplicationAutoprocessDaysAfter);
       
        }
    },

    ClearHrisSettingsDetails: function () {

        $("#chkOnlyActiveEmployeeLoad").removeAttr("checked", false);
        $("#chkFieldForceSalaryEnable").removeAttr("checked", false);
        $("#chkMultipleSalaryAccount").removeAttr("checked", false);
        $("#chkMobileBillCalculationTotal").removeAttr("checked", false);
        $("#chkWFBalanceCheckingApplicable").removeAttr("checked", false);
        $("#chkMultipleLoanApplicable").removeAttr("checked", false);
        $("#chkManualEmployeeOrder").removeAttr("checked", false);
        $("#txtEmployeeOrderSQL").val("");
        $("#liSql").hide();
        $("#chkFieldForceShowByDefault").removeAttr("checked", false);
        $("#chkExtraMonthlyAttendanceStatus").removeAttr("checked", false);
        $("#chkIsDynamicEducationActive").removeAttr("checked", false);
        $("#chkIsAccessResForAppraisal").removeAttr("checked", false);
        $("#chkIsDuplicateEmployeeUploadCheking").removeAttr("checked", false);
        $("#txtLeaveApplicationAutoprocessDaysAfter").data("kendoNumericTextBox").value('0');
    },


};