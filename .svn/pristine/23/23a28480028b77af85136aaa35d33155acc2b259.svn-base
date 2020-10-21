var RecruitmentSourceManager = {

    SaveRecruitmentSource: function () {

        if (RecruitmentSourceHelper.ValidateRecruitmentSourceInfoForm()) {
            var objRec = RecruitmentSourceHelper.CreateRecruitmentSourceObject();
            var objRecSourceInfo = JSON.stringify(objRec);
            var jsonParam = 'recruitmentsource:' + objRecSourceInfo;
            var serviceUrl = "../RecruitmentTS/SaveRecruitmentSource/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }

        function onSuccess(jsonData) {
            if (jsonData == "Success") {

                AjaxManager.MsgBox('success', 'center', 'Success:', 'Recruitment Source Save Successfully',
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'Ok',
                        onClick: function ($noty) {
                            $noty.close();
                            $("#RecruitmentSourceSummarydiv").data("kendoGrid").dataSource.read();
                            RecruitmentTypeDetailsHelper.clearRecruitmentTypeForm();
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

var RecruitmentSourceHelper = {
    CreateRecruitmentSourceObject: function () {
        var objRec = new Object();
        objRec.RecruitmentSourceId = $("#hdnRecruitmentSourceId").val();
        objRec.RecruitmentSourceCode = $("#txtRecruitmentSourceCode").val();
        objRec.RecruitmentSourceName = $("#txtRecruitmentSourceName").val();
        objRec.Status = $("#chkstatus").is(':checked') == true ? 1 : 0;

        return objRec;
    },

    clearRecruitmentSourceForm: function () {
        $("#hdnRecruitmentSourceId").val("0");
        $("#txtRecruitmentSourceCode").val("");
        $("#txtRecruitmentSourceName").val("");
        $('#chkstatus').attr('checked', false);

    },

    populateRecruitmentSourceInfo: function (objRec) {

        RecruitmentSourceHelper.clearRecruitmentSourceForm();
        $("#hdnRecruitmentSourceId").val(objRec.RecruitmentSourceId);
        $("#txtRecruitmentSourceCode").val(objRec.RecruitmentSourceCode);
        $("#txtRecruitmentSourceName").val(objRec.RecruitmentSourceName);
        if (objRec.Status == 1) {
            $("#chkstatus").prop('checked', 'checked');
        } else {
            $("#chkstatus").removeProp('checked', 'checked');
        }

    },

    ValidateRecruitmentSourceInfoForm: function () {
        var data = [];

        var validator = $("#RecruitmentSourceDetailsDiv").kendoValidator().data("kendoValidator"),
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