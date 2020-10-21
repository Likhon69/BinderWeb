


var RecruitmentTypeDetailsManager = {

    SaveRecruitmentType: function () {

        if (RecruitmentTypeDetailsHelper.ValidateRecruitmentTypeInfoForm()) {
            var objRec = RecruitmentTypeDetailsHelper.CreateRecruitmentTypeObject();
            var objRecTypeInfo = JSON.stringify(objRec);
            var jsonParam = 'recruitmenttype:' + objRecTypeInfo;
            var serviceUrl = "../RecruitmentTS/SaveRecruitmentType/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }

        function onSuccess(jsonData) {
            if (jsonData == "Success") {

                AjaxManager.MsgBox('success', 'center', 'Success:', 'Recruitment Type Save Successfully',
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'Ok',
                        onClick: function ($noty) {
                            $noty.close();
                            $("#RecruitmentTypeSummarydiv").data("kendoGrid").dataSource.read();
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

var RecruitmentTypeDetailsHelper = {

    CreateRecruitmentTypeObject: function () {
        var objRec = new Object();
        objRec.RecruitmentTypeId = $("#hdnRecruitmentTypeId").val();
        objRec.RecruitmentTypeCode = $("#txtRecruitmentTypeCode").val();
        objRec.RecruitmentTypeName = $("#txtRecruitmentTypeName").val();
        objRec.Status = $("#chkstatus").is(':checked') == true ? 1 : 0;

        return objRec;
    },

    clearRecruitmentTypeForm: function () {
        $("#hdnRecruitmentTypeId").val("0");
        $("#txtRecruitmentTypeCode").val("");
        $("#txtRecruitmentTypeName").val("");
        $('#chkstatus').attr('checked', false);

    },

    populateRecruitmentTypeInfo: function (objRec) {

        RecruitmentTypeDetailsHelper.clearRecruitmentTypeForm();
        $("#hdnRecruitmentTypeId").val(objRec.RecruitmentTypeId);
        $("#txtRecruitmentTypeCode").val(objRec.RecruitmentTypeCode);
        $("#txtRecruitmentTypeName").val(objRec.RecruitmentTypeName);
        if (objRec.Status == 1) {
            $("#chkstatus").prop('checked', 'checked');
        } else {
            $("#chkstatus").removeProp('checked', 'checked');
        }

    },

    ValidateRecruitmentTypeInfoForm: function () {
        var data = [];

        var validator = $("#RecruitmentTypeDetailsDiv").kendoValidator().data("kendoValidator"),
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