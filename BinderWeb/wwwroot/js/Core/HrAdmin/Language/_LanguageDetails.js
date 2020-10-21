var LanguageDetailsManager = {

    SaveLanguage: function () {

        if (LanguageDetailsHelper.ValidateLanguageInfoForm()) {
            var objLanguage = LanguageDetailsHelper.CreateLanguageObject();
            var objLanguageInfo = JSON.stringify(objLanguage);
            var jsonParam = 'language:' + objLanguageInfo;
            var serviceUrl = "../Language/SaveLanguage/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }

        function onSuccess(jsonData) {
            if (jsonData == "Success") {

                AjaxManager.MsgBox('success', 'center', 'Success:', 'Language Save Successfully',
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'Ok',
                        onClick: function ($noty) {
                            $noty.close();
                            $("#LanguageSummaryDiv").data("kendoGrid").dataSource.read();
                            LanguageDetailsHelper.clearLanguageForm();
                        }
                    }
                ]);
            } else {
                AjaxManager.MsgBox('error', 'center', 'Error', jsonData,
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'Ok',
                        onClick: function ($noty) {
                            $noty.close();
                        }
                    }
                ]);
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

var LanguageDetailsHelper = {

    CreateLanguageObject: function () {
        var objLanguage = new Object();
        objLanguage.LanguageId = $("#hdnLanguageId").val();
        objLanguage.LanguageCode = $("#txtLanguageCode").val();
        objLanguage.LanguageName = $("#txtLanguageName").val();
        objLanguage.Status = $("#chkstatus").is(':checked') == true ? 1 : 0;

        return objLanguage;
    },

    clearLanguageForm: function () {
        $("#hdnLanguageId").val("0");
        $("#txtLanguageCode").val("");
        $("#txtLanguageName").val("");
        $('#chkstatus').attr('checked', false);

    },

    populateLanguageInfo: function (objLanguage) {

        LanguageDetailsHelper.clearLanguageForm();
        $("#hdnLanguageId").val(objLanguage.LanguageId);
        $("#txtLanguageCode").val(objLanguage.LanguageCode);
        $("#txtLanguageName").val(objLanguage.LanguageName);
        if (objLanguage.Status == 1) {
            $("#chkstatus").prop('checked', 'checked');
        } else {
            $("#chkstatus").removeProp('checked', 'checked');
        }

    },

    ValidateLanguageInfoForm: function () {
        var data = [];

        var validator = $("#LanguageDetailsDiv").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            status.text("").addClass("valid");
            return true;
        } else {
            status.text("Oops! There is invalid data in the form.").addClass("invalid");
            return false;
        }
    },
};