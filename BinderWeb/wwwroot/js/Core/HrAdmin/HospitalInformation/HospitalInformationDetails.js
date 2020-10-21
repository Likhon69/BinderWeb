var hospitalInfoDetailsManager = {
    SaveHospitalInformation: function () {
        if (hospitalinfoDetailsHelper.validator()) {
            var objHospitalInformation = hospitalinfoDetailsHelper.CreateHospitalInformationForSaveData();
            objHospitalInformation = JSON.stringify(objHospitalInformation);
            var jsonParam = 'strobjHospitalInformationInfo:' + objHospitalInformation;
            var serviceUrl = "../HospitalInformation/SaveAndUpdateHospitalInformation/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {

            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', 'Hospital Name Saved/Updated Successfully',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            hospitalinfoDetailsHelper.clearAllFieldsOfHospitalInfo();
                            $("#gridHospitalInformationSummary").data("kendoGrid").dataSource.read();
                            $("#txtHospitalName").focus();
                        }
                    }]);

            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Failed', jsonData,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
            }
        }

        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Failed', error.statusText,
                         [{
                             addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                 $noty.close();
                             }
                         }]);
        }
    }
};

var hospitalinfoDetailsHelper = {
    fillHospitalInfoDataInForm: function (selectedRowData) {
        hospitalinfoDetailsHelper.clearAllFieldsOfHospitalInfo();
        $("#btnSave").text("Update");
        
        $("#hdnHospitalInformation").val(selectedRowData.HospitalId);
        $("#txtHospitalName").val(selectedRowData.HospitalName);
        $("#chkStatus").prop("checked", selectedRowData.IsActive == 1 ? true : false);
    },
    clearAllFieldsOfHospitalInfo: function () {
        $("#btnSave").text("Save");
        
        $("#hdnHospitalInformation").val(0);
        $("#txtHospitalName").val('');
        $("#chkStatus").removeAttr("checked");
        
        $("#divHospitalInformationDetails > form").kendoValidator();
        $("#divHospitalInformationDetails").find("span.k-tooltip-validation").hide();

        var status = $(".status");
        status.text("").removeClass("invalid");
    },
    CreateHospitalInformationForSaveData: function () {
        var obj = new Object();
        obj.HospitalId = $("#hdnHospitalInformation").val();
        obj.HospitalName = $("#txtHospitalName").val();
        obj.IsActive = $("#chkStatus").is(':checked') == true ? 1 : 0;

        return obj;
    },
    validator: function () {
        var data = [];
        var validator = $("#divHospitalInformationDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {

            var chkspAcesName = AjaxManager.checkSpecialCharacters("txtHospitalName");
            if (!chkspAcesName) {
                status.text("Oops! There is invalid data in the form.").addClass("invalid");
                return false;
            }
            status.text("").addClass("valid");
            return true;
        } else {
            status.text("Oops! There is invalid data in the form.").addClass("invalid");
            return false;
        }
    },
};