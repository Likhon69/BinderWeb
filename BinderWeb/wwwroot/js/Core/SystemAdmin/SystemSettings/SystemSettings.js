$(document).ready(function () {
    systemSettingsHelper.createTab();
    //themeLanguageHelper.GenerateMotherCompanyCombo();
    loginRuleHelper.GenerateMotherCompanyCombo();
    themeLanguageHelper.GenerateThemeCombo();
    themeLanguageHelper.GenerateLanguageCombo();
    loginRuleHelper.InitiateloginRuleAndPolicy();
    hrPolicyHelper.GenerateHrKendoControl();

    loginRuleHelper.GeneratePasswordTypeCombo();
    loginRuleHelper.GenerateSpecialCharecterCombo();
    loginRuleHelper.GenerateChangePassAfterFirstLoginCombo();
    loginRuleHelper.GenerateODBCClientListCombo();

    $("#btnSave").click(function () { systemSettingsManager.SaveSystemSettings(); });
    $("#btnClearAll").click(function () { systemSettingsHelper.ClearSystemSettings(); });

    loginRuleHelper.IsPasswordChangedOrExpire();

    $("#cmb_CompanyName").focus();

    $("#chkEnableCustomStatusOutPunch").click(function() {
      var enableCustomStatusOutPunch = $("#chkEnableCustomStatusOutPunch").is(":checked") == true ? 1 : 0;

        if (enableCustomStatusOutPunch == 1) {
            $("#liCustomStatusForNoOutPunch").show();
        } else {
            $("#liCustomStatusForNoOutPunch").hide();
        }
    });

    $("#chkEnableLateAfterShiftInGraceTime").click(function () {
        var enableLateAfterShiftInGraceTime = $("#chkEnableLateAfterShiftInGraceTime").is(":checked") == true ? 1 : 0;

        if (enableLateAfterShiftInGraceTime == 1) {
            $("#liEnableCustomStatusAfterShiftInGraceTime").show();
        } else {
            $("#liEnableCustomStatusAfterShiftInGraceTime").hide();
            $("#liCustomStatusForAfterShiftinGraceTime").hide();
            $("#chkEnableCustomStatusAfterShiftInGraceTime").removeProp('checked', 'checked');
            $("#txtCustomStatusForAfterShiftinGraceTime").val("");

        }
    });

    $("#chkEnableCustomStatusAfterShiftInGraceTime").click(function () {
        var enableCustomStatusAfterShiftInGraceTime = $("#chkEnableCustomStatusAfterShiftInGraceTime").is(":checked") == true ? 1 : 0;

        if (enableCustomStatusAfterShiftInGraceTime == 1) {
            $("#liCustomStatusForAfterShiftinGraceTime").show();
        } else {
            $("#liCustomStatusForAfterShiftinGraceTime").hide();
            $("#txtCustomStatusForAfterShiftinGraceTime").val("");
        }
    });
    
});

var systemSettingsManager = {
    SaveSystemSettings: function () {
        //debugger;
        //EnableAbsentForNoOutPunch
        //EnableCustomStatusOutPunch
        //CustomStatusForNoOutPunch

        if (systemSettingsHelper.formValidator()) {

            var objSystemSettings = new Object();
            objSystemSettings = themeLanguageHelper.CreateThemeObjectForSave(objSystemSettings);
            objSystemSettings = loginRuleHelper.CreateLoginRuleObjectForSave(objSystemSettings);
            objSystemSettings = hrPolicyHelper.CreateHrPolicyObject(objSystemSettings);
            if (objSystemSettings.EnableAbsentForNoOutPunch == 1 && objSystemSettings.EnableCustomStatusOutPunch == 1) {
                AjaxManager.MsgBox('warning', 'center', 'Login Failed', "You can select either 'Enable Absent For No Out Punch' or 'Enable Custom Status For No Out Punch' at a time. ",
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'Ok',
                        onClick: function ($noty) {
                            $noty.close();
                            $("#cmb_CompanyName").focus();
                        }
                    }
                ]);
                return false;
            }

            if (objSystemSettings.EnableCustomStatusOutPunch == 1 && objSystemSettings.CustomStatusForNoOutPunch == "") {
                AjaxManager.MsgBox('warning', 'center', 'Login Failed', "'Custom Status For No Out Punch' Can not be empty",
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'Ok',
                        onClick: function ($noty) {
                            $noty.close();
                            $("#cmb_CompanyName").focus();
                        }
                    }
                ]);
                return false;
            }

            if (objSystemSettings.EnableCustomStatusAfterShiftInGraceTime == 1 && objSystemSettings.CustomStatusForAfterShiftinGraceTime == "") {
                AjaxManager.MsgBox('warning', 'center', 'Login Failed', "'Custom Status For After Shift-in Grace Time' Can not be empty",
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'Ok',
                        onClick: function ($noty) {
                            $noty.close();
                            $("#cmb_CompanyName").focus();
                        }
                    }
                ]);
                return false;
            }
            var objSystemSettingsInfo = JSON.stringify(objSystemSettings).replace(/&/g, "^");
            var jsonParam = 'strobjSystemSettingsInfo=' + objSystemSettingsInfo;
            var serviceUrl = "../SystemSettings/SaveSystemSettings/";
            AjaxManager.SendJson(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {

            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success', 'System Settings Saved Successfully.',
                   [{
                       addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                           $noty.close();
                           systemSettingsHelper.ClearSystemSettings();
                           $("#cmb_CompanyName").focus();
                       }
                   }]);
            } else {
                AjaxManager.MsgBox('error', 'center', 'Login Failed', jsonData,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                                $("#cmb_CompanyName").focus();
                            }
                        }]);
            }
        }

        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Login Failed', error.statusText,
                       [{
                           addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                               $noty.close();
                           }
                       }]);
        }
    }
};

var systemSettingsHelper = {

    createTab: function () {
        $("#tabstrip").kendoTabStrip({});
    },

    ClearSystemSettings: function () {
        //debugger;
        //themeLanguageHelper.clearThemeForm();
        loginRuleHelper.clearLoginRulePolicy();

        var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
        tabStrip.select(0);
    },



    formValidator: function () {
        var res = false;

        //res = themeLanguageHelper.validateThemeForm();
        //if (res == false) {
        //    return res;
        //}
        //else {
        //    res = loginRuleHelper.validateLoginRuleForm();
        //    if (res == false) {
        //        return res;
        //    }
        //}
        res = loginRuleHelper.validateLoginRuleForm();
        if (res == false) {
            return res;
        }
        res = true;
        return res;
    }
};
