

var hrPolicyManager = {};

var hrPolicyHelper = {

    CreateHrPolicyObject: function (objSystemSettings) {
        //debugger;
        objSystemSettings.IsWebLoginEnable = $("#chkIsWebLoginEnable").is(":checked") == true ? 1 : 0;
        objSystemSettings.DeleteApproveLeaveUponPunch = $("#chkDeleteApproveLeaveUponPunch").is(":checked") == true ? 1 : 0;
        objSystemSettings.DeleteLateUponAttendanceApproval = $("#chkDeleteLateUponAttendanceApproval").is(":checked") == true ? 1 : 0;
        objSystemSettings.IsOtLimitApplicable = $("#chkIsOtLimitApplicable").is(":checked") == true ? 1 : 0;
        objSystemSettings.IsSingleBranchApplicable = $("#chkIsSingleBranchApplicable").is(":checked") == true ? 1 : 0;

        objSystemSettings.CheckPreviousAbsenteeism = $("#chkCheckPreviousAbsenteeism").is(":checked") == true ? 1 : 0;
        objSystemSettings.CheckApproverSettings = $("#chkCheckApproverSettings").is(":checked") == true ? 1 : 0;
        objSystemSettings.BypassDefaultStateForSameBoss = $("#chkBypassDefaultStateForSameBoss").is(":checked") == true ? 1 : 0;
        
        objSystemSettings.DefaultLateDeductionDaysFirstTime = $("#txtDefaultLateDeductionDaysFirstTime").val();
        if (objSystemSettings.DefaultLateDeductionDaysFirstTime == "") {
            objSystemSettings.DefaultLateDeductionDaysFirstTime = 0;
        }
        objSystemSettings.DefaultLateDeductionDays = $("#txtDefaultLateDeductionDays").val();
        if (objSystemSettings.DefaultLateDeductionDays == "") {
            objSystemSettings.DefaultLateDeductionDays = 0;
        }
        objSystemSettings.DefaultLateDeductionDaysNext = $("#txtDefaultLateDeductionDaysNext").val();
        if (objSystemSettings.DefaultLateDeductionDaysNext == "") {
            objSystemSettings.DefaultLateDeductionDaysNext = 0;
        }

        objSystemSettings.IsOtCalculateForSalary = $("#chkIsOTCalculateForSalary").is(":checked") == true ? 1 : 0;
        var earlyExitDeductionDays = $("#txtDefaultEarlyExitDeductionDays").val();
        if (earlyExitDeductionDays == "") {
            earlyExitDeductionDays = 0;
        }
        objSystemSettings.DefaultEarlyExitDeductionDays = earlyExitDeductionDays;
        objSystemSettings.IsEmployeeIdAutoGenereted = $("#chkIsEmployeeIdAutoGenereted").is(":checked") == true ? 1 : 0;
        objSystemSettings.IsGradeWiseLeave = $("#chkIsGradeWiseLeave").is(":checked") == true ? 1 : 0;
        objSystemSettings.EnableMultiplePolicyForSameLeaveType = $("#chkEnableMultiplePolicyForSameLeaveType").is(":checked") == true ? 1 : 0;
        objSystemSettings.IsAbsenteeismMarge = $("#chkIsAbsenteeismMarge").is(":checked") == true ? 1 : 0;
        objSystemSettings.IsTotalBillingApplicable = $("#chkIsTotalBillingApplicable").is(":checked") == true ? 1 : 0;
        //---
        objSystemSettings.LateTime = $("#txtLateTime").val();
        if (objSystemSettings.LateTime == "") {
            objSystemSettings.LateTime = 0;
        }
        objSystemSettings.EarlyExitTime = $("#txtEarlyExitTime").val();
        if (objSystemSettings.EarlyExitTime == "") {
            objSystemSettings.EarlyExitTime = 0;
        }
        objSystemSettings.EnableApproverCheckingWhileApplication = $("#chkEnableApproverCheckingWhileApplication").is(":checked") == true ? 1 : 0;
        objSystemSettings.EnableDelayOnShiftInGraceTime = $("#chkEnableDelayOnShiftInGraceTime").is(":checked") == true ? 1 : 0;
        objSystemSettings.EnableLateAfterShiftInGraceTime = $("#chkEnableLateAfterShiftInGraceTime").is(":checked") == true ? 1 : 0;
        objSystemSettings.EnableEarlyExitBeforeShiftOutGraceTime = $("#chkEnableEarlyExitBeforeShiftOutGraceTime").is(":checked") == true ? 1 : 0;
        objSystemSettings.EnableAbsentAfterLateTime = $("#chkEnableAbsentAfterLateTime").is(":checked") == true ? 1 : 0;
        objSystemSettings.EnableAbsentBeforeEarlyExitTime = $("#chkEnableAbsentBeforeEarlyExitTime").is(":checked") == true ? 1 : 0;
        objSystemSettings.EnableAbsentForNoOutPunch = $("#chkEnableAbsentForNoOutPunch").is(":checked") == true ? 1 : 0;

        objSystemSettings.EnableCustomStatusOutPunch = $("#chkEnableCustomStatusOutPunch").is(":checked") == true ? 1 : 0;
        objSystemSettings.CustomStatusForNoOutPunch = $("#txtCustomStatusForNoOutPunch").val();

        objSystemSettings.EnableCustomStatusAfterShiftInGraceTime = $("#chkEnableCustomStatusAfterShiftInGraceTime").is(":checked") == true ? 1 : 0;
        objSystemSettings.CustomStatusForAfterShiftinGraceTime = $("#txtCustomStatusForAfterShiftinGraceTime").val();

        objSystemSettings.RegulariseAttendaceDaysLimit = $("#txtAttendanceRegulariseDays").val();
        if (objSystemSettings.RegulariseAttendaceDaysLimit == "") {
            objSystemSettings.RegulariseAttendaceDaysLimit = 0;
        }

        objSystemSettings.ShortLeaveSlot = $('input[name="rdoShortLeaveSlot"]:checked').val();



        return objSystemSettings;
    },

    PopulateHrPolicy: function (objSystemSettings) {
        //debugger;
        if (objSystemSettings.IsWebLoginEnable == 1) {
            $("#chkIsWebLoginEnable").prop('checked', 'checked');
        } else {
            $("#chkIsWebLoginEnable").removeProp('checked', 'checked');
        }

        if (objSystemSettings.DeleteApproveLeaveUponPunch == 1) {
            $("#chkDeleteApproveLeaveUponPunch").prop('checked', 'checked');
        } else {
            $("#chkDeleteApproveLeaveUponPunch").removeProp('checked', 'checked');
        }

        if (objSystemSettings.DeleteLateUponAttendanceApproval == 1) {
            $("#chkDeleteLateUponAttendanceApproval").prop('checked', 'checked');
        } else {
            $("#chkDeleteLateUponAttendanceApproval").removeProp('checked', 'checked');
        }

        if (objSystemSettings.IsOtLimitApplicable == 1) {
            $("#chkIsOtLimitApplicable").prop('checked', 'checked');
        } else {
            $("#chkIsOtLimitApplicable").removeProp('checked', 'checked');
        }

        if (objSystemSettings.IsSingleBranchApplicable == 1) {
            $("#chkIsSingleBranchApplicable").prop('checked', 'checked');
        } else {
            $("#chkIsSingleBranchApplicable").removeProp('checked', 'checked');
        }
        if (objSystemSettings.CheckPreviousAbsenteeism == 1) {
            $("#chkCheckPreviousAbsenteeism").prop('checked', 'checked');
        } else {
            $("#chkCheckPreviousAbsenteeism").removeProp('checked', 'checked');
        }
        if (objSystemSettings.CheckingApproverSettings == 1) {
            $("#chkCheckApproverSettings").prop('checked', 'checked');
        } else {
            $("#chkCheckApproverSettings").removeProp('checked', 'checked');
        }
        if (objSystemSettings.BypassDefaultStateForSameBoss == 1) {
            $("#chkBypassDefaultStateForSameBoss").prop('checked', 'checked');
        } else {
            $("#chkBypassDefaultStateForSameBoss").removeProp('checked', 'checked');
        }
        
        $("#txtDefaultLateDeductionDaysFirstTime").val(objSystemSettings.DefaultLateDeductionDaysFirstTime);
        var defaultLateDeductionDaysFirstTime = $("#txtDefaultLateDeductionDaysFirstTime").data("kendoNumericTextBox");
        defaultLateDeductionDaysFirstTime.value(objSystemSettings.DefaultLateDeductionDaysFirstTime);

        $("#txtDefaultLateDeductionDays").val(objSystemSettings.DefaultLateDeductionDays);
        var defaultLateDeductionDays = $("#txtDefaultLateDeductionDays").data("kendoNumericTextBox");
        defaultLateDeductionDays.value(objSystemSettings.DefaultLateDeductionDays);

        $("#txtDefaultLateDeductionDaysNext").val(objSystemSettings.DefaultLateDeductionDaysNext);
        var defaultLateDeductionDaysNext = $("#txtDefaultLateDeductionDaysNext").data("kendoNumericTextBox");
        defaultLateDeductionDaysNext.value(objSystemSettings.DefaultLateDeductionDaysNext);

        if (objSystemSettings.IsOtCalculateForSalary == 1) {
            $("#chkIsOTCalculateForSalary").prop('checked', 'checked');
        } else {
            $("#chkIsOTCalculateForSalary").removeProp('checked', 'checked');
        }
        //------------
        if (objSystemSettings.IsEmployeeIdAutoGenereted == 1) {
            $("#chkIsEmployeeIdAutoGenereted").prop('checked', 'checked');
        } else {
            $("#chkIsEmployeeIdAutoGenereted").removeProp('checked', 'checked');
        }
        if (objSystemSettings.IsGradeWiseLeave == 1) {
            $("#chkIsGradeWiseLeave").prop('checked', 'checked');
        } else {
            $("#chkIsGradeWiseLeave").removeProp('checked', 'checked');
        }
        if (objSystemSettings.EnableMultiplePolicyForSameLeaveType == 1) {
            $("#chkEnableMultiplePolicyForSameLeaveType").prop('checked', 'checked');
        } else {
            $("#chkEnableMultiplePolicyForSameLeaveType").removeProp('checked', 'checked');
        }
        if (objSystemSettings.IsAbsenteeismMarge == 1) {
            $("#chkIsAbsenteeismMarge").prop('checked', 'checked');
        } else {
            $("#chkIsAbsenteeismMarge").removeProp('checked', 'checked');
        }
        if (objSystemSettings.IsTotalBillingApplicable == 1) {
            $("#chkIsTotalBillingApplicable").prop('checked', 'checked');
        } else {
            $("#chkIsTotalBillingApplicable").removeProp('checked', 'checked');
        }
        $("#txtDefaultEarlyExitDeductionDays").val(objSystemSettings.DefaultEarlyExitDeductionDays);
        var defaultEarlyExitDeductionDays = $("#txtDefaultEarlyExitDeductionDays").data("kendoNumericTextBox");
        defaultEarlyExitDeductionDays.value(objSystemSettings.DefaultEarlyExitDeductionDays);
        //-------
        if (objSystemSettings.EnableApproverCheckingWhileApplication == 1) {
            $("#chkEnableApproverCheckingWhileApplication").prop('checked', 'checked');
        } else {
            $("#chkEnableApproverCheckingWhileApplication").removeProp('checked', 'checked');
        }
        if (objSystemSettings.EnableDelayOnShiftInGraceTime == 1) {
            $("#chkEnableDelayOnShiftInGraceTime").prop('checked', 'checked');
        } else {
            $("#chkEnableDelayOnShiftInGraceTime").removeProp('checked', 'checked');
        }
        if (objSystemSettings.EnableLateAfterShiftInGraceTime == 1) {
            $("#chkEnableLateAfterShiftInGraceTime").prop('checked', 'checked');
            $("#liEnableCustomStatusAfterShiftInGraceTime").show();
        } else {
            $("#chkEnableLateAfterShiftInGraceTime").removeProp('checked', 'checked');
            $("#liEnableCustomStatusAfterShiftInGraceTime").hide();
            $("#liCustomStatusForAfterShiftinGraceTime").hide();

        }
   if (objSystemSettings.EnableCustomStatusAfterShiftInGraceTime == 1) {
       $("#chkEnableCustomStatusAfterShiftInGraceTime").prop('checked', 'checked');
       $("#liCustomStatusForAfterShiftinGraceTime").show();
        } else {
       $("#chkEnableCustomStatusAfterShiftInGraceTime").removeProp('checked', 'checked');
       $("#liCustomStatusForAfterShiftinGraceTime").hide();
   }
   $("#txtCustomStatusForAfterShiftinGraceTime").val(objSystemSettings.CustomStatusForAfterShiftinGraceTime);
        if (objSystemSettings.EnableEarlyExitBeforeShiftOutGraceTime == 1) {
            $("#chkEnableEarlyExitBeforeShiftOutGraceTime").prop('checked', 'checked');
        } else {
            $("#chkEnableEarlyExitBeforeShiftOutGraceTime").removeProp('checked', 'checked');
        }
        if (objSystemSettings.EnableAbsentAfterLateTime == 1) {
            $("#chkEnableAbsentAfterLateTime").prop('checked', 'checked');
        } else {
            $("#chkEnableAbsentAfterLateTime").removeProp('checked', 'checked');
        }
        if (objSystemSettings.EnableAbsentBeforeEarlyExitTime == 1) {
            $("#chkEnableAbsentBeforeEarlyExitTime").prop('checked', 'checked');
        } else {
            $("#chkEnableAbsentBeforeEarlyExitTime").removeProp('checked', 'checked');
        }
        if (objSystemSettings.EnableAbsentForNoOutPunch == 1) {
            $("#chkEnableAbsentForNoOutPunch").prop('checked', 'checked');
        } else {
            $("#chkEnableAbsentForNoOutPunch").removeProp('checked', 'checked');
        }
        //$("#txtLateTime").val(objSystemSettings.LateTime);
      //  $("#txtEarlyExitTime").val(objSystemSettings.EarlyExitTime);
        $("#txtLateTime").val(objSystemSettings.LateTime);
        var lateTime = $("#txtLateTime").data("kendoNumericTextBox");
        lateTime.value(objSystemSettings.LateTime);
        $("#txtEarlyExitTime").val(objSystemSettings.DefaultEarlyExitDeductionDays);
        var earlyExitTime = $("#txtEarlyExitTime").data("kendoNumericTextBox");
        earlyExitTime.value(objSystemSettings.EarlyExitTime);
        //------------
        //debugger;
        if (objSystemSettings.EnableCustomStatusOutPunch == 1) {
            $("#chkEnableCustomStatusOutPunch").prop('checked', 'checked');
            $("#liCustomStatusForNoOutPunch").show();
        } else {
            $("#chkEnableCustomStatusOutPunch").removeProp('checked', 'checked');
            $("#liCustomStatusForNoOutPunch").hide();
        }
        $("#txtCustomStatusForNoOutPunch").val(objSystemSettings.CustomStatusForNoOutPunch);
     
        var regulariseDaysLimit = $("#txtAttendanceRegulariseDays").data("kendoNumericTextBox");
        regulariseDaysLimit.value(objSystemSettings.RegulariseAttendaceDaysLimit);
        

        if (objSystemSettings.ShortLeaveSlot == 1) {
            $("#rdoFirstSlot").prop("checked", true);
        }
        if (objSystemSettings.ShortLeaveSlot == 2) {
            $("#rdoLastSlot").prop("checked", true);
        }
        if (objSystemSettings.ShortLeaveSlot == 3) {
            $("#rdoBoth").prop("checked", true);
        }




    },
    GenerateHrKendoControl: function () {
        $("#txtDefaultLateDeductionDaysFirstTime").kendoNumericTextBox();
        $("#txtDefaultLateDeductionDays").kendoNumericTextBox();
        $("#txtDefaultLateDeductionDaysNext").kendoNumericTextBox();
        $("#txtDefaultEarlyExitDeductionDays").kendoNumericTextBox();
        $("#txtLateTime").kendoNumericTextBox();
        $("#txtEarlyExitTime").kendoNumericTextBox();
        $("#txtAttendanceRegulariseDays").kendoNumericTextBox();

    }
};