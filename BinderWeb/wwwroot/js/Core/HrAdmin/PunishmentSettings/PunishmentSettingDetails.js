
var PunishmentSettingDetailsManager = {

    SavePunishmentDetails: function () {
        //debugger;
        var validator = $("#divPunishmentSettingDetails").kendoValidator().data("kendoValidator");
        if (validator.validate()) {
            var objPunishmentSetting = PunishmentSettingDetailsHelper.CreateObjectPunishmentSettingDetails();
            var objPunishmentSettingInfo = JSON.stringify(objPunishmentSetting).replace('&', '^');

            var jsonParam = 'objPunishmentSettingInfo:' + objPunishmentSettingInfo;
            var serviceUrl = "../Punishment/SavePunishmentmentSettingsDetails";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }

        function onSuccess(jsonData) {

            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success', 'Punishment Settings Save/Update Successfully',
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'ok',
                        onClick: function ($noty) {
                            $noty.close();
                            PunishmentSettingDetailsHelper.CreateObjectPunishmentSettingDetails();
                            PunishmentSettingDetailsHelper.PopulatePunishmentSettingDetails();
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

    GetPunishmentSettingDetails: function () {
        var data = [];
        var serviceUrl = "../Punishment/GetPunishmentmentSettingsSetupDetails";
        AjaxManager.GetJsonResult(serviceUrl, "", false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            if (jsonData != null) {
                PunishmentSettingDetailsHelper.PopulatePunishmentSettingDetails(jsonData);
            }
        }

        function onFailed(error) {
            window.alert(error.statusText);
        }

        return data;
    },


};


//______________ Helper ______________//


var PunishmentSettingDetailsHelper = {

    initPunishmentSettingDetails: function () {
        //debugger;
        //PunishmentSettingDetailsHelper.PopulatePunishmentSettingDetails();
        empressCommonHelper.populateCtcByCategory("cmbPunishmentAccHead", "Select CtC", 2);
        empressCommonHelper.populateCtcByCategory("cmbPunishmentWithAccHead", "Select CtC", 2);
        PunishmentSettingDetailsManager.GetPunishmentSettingDetails();
    },

    CreateObjectPunishmentSettingDetails: function () {
        var obj = new Object();
        ////debugger;
        obj.PunishmentSettingId = $("#hdnPunishmentSettingDetailsId").val();
        obj.PunishmentAccountHead = $("#cmbPunishmentAccHead").data("kendoComboBox").value();
        obj.PunishmentWithAccountHead = $("#cmbPunishmentWithAccHead").data("kendoComboBox").value();

        return obj;
    },
     
    PopulatePunishmentSettingDetails: function (data) {
        $("#hdnPunishmentSettingDetailsId").val(data.PunishmentSettingId);
        $("#cmbPunishmentAccHead").data("kendoComboBox").value(data.PunishmentAccountHead);
        $("#cmbPunishmentWithAccHead").data("kendoComboBox").value(data.PunishmentWithAccountHead);
        
    },

};
