

var GradeTypeDetailsManager = {

    SaveGradeType: function () {
        ////debugger;
        var validator = $("#divGradeTypeDetails").kendoValidator().data("kendoValidator"),
            status = $("status");

        if (validator.validate()) {
         
            var objGradeType = GradeTypeDetailsHelper.CreateGradeType();

            var objGradeTypeInfo = JSON.stringify(objGradeType);

            var jsonParam = 'objGradeTypeInfo:' + objGradeTypeInfo;
            var serviceUrl = "../GradeTypeSettings/SaveGrade/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }

        function onSuccess(jsonData) {

            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success', 'Grade Type Information Saved/Updated Successfully',
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'ok',
                        onClick: function ($noty) {
                            $noty.close();
                            $("#gridGradeTypeSummary").data("kendoGrid").dataSource.read();
                            GradeTypeDetailsHelper.clearGradeType();
                            empressCommonHelper.PopulateGradeTypeCombo("cmbType");
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

var GradeTypeDetailsHelper = {

    InitGradeTypeDetails: function () {

    },
    CreateGradeType: function () {
        ////debugger;
        var obj = new Object();
        obj.GradeTypeInfoId = $("#hdnGradeTypeId").val();
        obj.GradeTypeName = $("#txtGradeTypeName").val();
        obj.IsActive = $("#chkGradeTypeIsActive").is(':checked') == true ? 1 : 0;

        return obj;
    },
    populateGradeType: function (obj) {

        $("#hdnGradeTypeId").val(obj.GradeTypeInfoId);
        $("#txtGradeTypeName").val(obj.GradeTypeName);
        if (obj.IsActive == 1) {
            $("#chkGradeTypeIsActive").prop('checked', 'checked');
        } else {
            $("#chkGradeTypeIsActive").removeProp('checked', 'checked');
        }
    },

    clearGradeType: function () {
       
        $("#hdnGradeTypeId").val("0");
        $("#txtGradeTypeName").val("");
        $("#chkGradeTypeIsActive").removeAttr("checked", false);
    },

    GradeTypePopUpWindow: function () {
        
        $("#divGradeTypeDetails").kendoWindow({
            title: "Grade Type Details",
            resizeable: false,
            width: "80%",
            actions: ["Pin", "Refresh", "Maximize", "Close"],
            modal: true,
            visible: false,
        });
    },

    clickEventForAddNewGradeTypeButton: function () {
        ////debugger;
        GradeTypeDetailsHelper.clearGradeType();
        $("#divGradeTypeDetails").data("kendoWindow").open().center();

    },
    clickEventForcloseGradeTypeButton: function () {
        GradeTypeDetailsHelper.clearGradeType();
        $("#GradeTypePopupDiv").data("kendoWindow").close();
    }

};