
var DegreeTypeDetailsManager = {
    AddNewDegreeType: function () {

        if (DegreeTypeDetailsHelper.validator("DegreeTypeDetailsContainer")) {

            //var jsonParam = "gradeId:" + gradeId;
            var jsonParam = DegreeTypeDetailsHelper.GeDegreeTypeObject();
            var param = "DegreeType:" + JSON.stringify(jsonParam);
            var serviceUrl = "../DegreeType/SaveDegreeType/";
            AjaxManager.SendJson2(serviceUrl, param, onSuccess, onFailed);
            //AjaxManager.SendJson(serviceUrl, jsonParam, onSuccess, onFailed);
        }

        function onSuccess(jsonData) {
            if (jsonData == "Success") {
                certificateTypeDetailsHelper.populateDegereeTypeCombo();

                AjaxManager.MsgBox('success', 'center', 'Success', 'New Degree Type Saved/Updated Successfully',
                    [{
                        addClass: 'btn btn-primary',
                        text: 'Ok',
                        onClick: function ($noty) {
                           // SubsidiaryHelper.LoadAllDegreeTypeList();
                            $noty.close();
                            $("#gridDegreeType").data("kendoGrid").dataSource.read();
                            //$("#popupDegreeTypeSetup").data("kendoWindow").close();
                        }
                    }]);

            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Error', jsonData,
                    [{
                        addClass: 'btn btn-primary',
                        text: 'Ok',
                        onClick: function ($noty) {
                            $noty.close();
                        }
                    }]);
            }
            DegreeTypeDetailsHelper.clearForm();
        }
        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText,
                [{
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function ($noty) {
                        $noty.close();
                    }
                }]);
            // window.alert(error.statusText);
        }
    },
};
var DegreeTypeDetailsHelper = {
    validator: function (ctrlIdToValidate) {

        var data = [];
        var validator = $("#" + ctrlIdToValidate).kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            status.text("").addClass("valid");
            return true;
        } else {
            status.text("Oops! There is invalid data in the form.").addClass("invalid");
            return false;
        }
    },
    GeDegreeTypeObject: function () {
        var obj = new Object();
        obj.DegreeTypeId = $("#hdnDegreeTypeId").val();
        obj.DegreeTypeName = $("#DegreeType").val();
        obj.IsActive = $("#chkIsDegreeTypeActive").is(':checked') == true ? 1 : 0;
        return obj;
    },
    clearForm: function () {
        $("#hdnDegreeTypeId").val(0);
        $("#DegreeType").val("");
        $("#chkIsDegreeTypeActive").prop("checked", "checked");
        var status = $(".status");
        status.text("").removeClass("invalid");
        //SubsidiaryHelper.InitiateGrid();
    },
    FillDetailsInForm: function (obj) {
        DegreeTypeDetailsHelper.clearForm();
        $("#hdnDegreeTypeId").val(obj.DegreeTypeId);
        $("#DegreeType").val(obj.DegreeTypeName);
       
        if (obj.IsActive == 1) {
            $("#chkIsDegreeTypeActive").prop("checked", "checked");
        } else {
            $("#chkIsDegreeTypeActive").prop('checked', false);
        }

        //SubsidiaryHelper.InitiateGrid(obj.MealTypeId);
    },
}