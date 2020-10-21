
var disciplinary_NatureOfActionManager = {

    SaveNatureOfActionDetails: function () {
        if (disciplinary_NatureOfActionHelper.ValidateNatureOfAction()) {
            var obj = disciplinary_NatureOfActionHelper.CreateNatureOfActionPopup();
            var jsonParam = "objNatureOfAction:" + JSON.stringify(obj);
            var url = "../Employee/SaveNatureOfActionDetails";
            AjaxManager.SendJson2(url, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {

            if (jsonData == "Success") {

                AjaxManager.MsgBox('success', 'center', 'Success', "Nature Of Action Saved Successfully.",
                [{
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function ($noty) {
                        $noty.close();
                        $("#gridNatureOfActionSummary").data('kendoGrid').dataSource.read();
                        disciplinary_NatureOfActionHelper.ClearNatureOfActionDetails();
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
        }

    },

    GetNatureOfActionSummary: function () {
        var url = "../Employee/GetNatureOfActionSummary";
        var column = disciplinary_NatureOfActionHelper.GetNatureOfActionColumns();
        empressCommonManager.GenerateCommonGrid("gridNatureOfActionSummary", url, column);
    },

};

var disciplinary_NatureOfActionHelper = {

    ClearNatureOfActionDetails: function () {

        $("#txtNatureOfAction").val("");
        $("#hdnNatureOfActionId").val("0");
        $("#chkNatureOfActionIsActive").removeProp('checked', 'checked');
    },

    ValidateNatureOfAction: function () {
        var data = [];
        var validator = $("#gridNatureOfActionDetails").kendoValidator().data("kendoValidator"),
            status = $(".liNatureOfActionStatus");
        if (validator.validate()) {
            status.text("").addClass("valid");
            return true;
        } else {
            status.text("Oops! There is invalid data in the form.").addClass("invalid");
            return false;
        }
    },

    ShowDisciplinaryActionPopup: function () {
        disciplinary_NatureOfActionManager.GetNatureOfActionSummary();
        AjaxManager.PopupWindow("divNatureOfActionPopup", "Nature Of Action", "90%");
    },

    CloseAddNewCategoryPopup: function () {
        $("#divNatureOfActionPopup").data("kendoWindow").close();
    },

    CreateNatureOfActionPopup: function () {

        var obj = new Object();
        obj.NatureOfActionId = $("#hdnNatureOfActionId").val();
        obj.NatureOfActionName = $("#txtNatureOfAction").val();
        obj.IsActive = $("#chkNatureOfActionIsActive").is(":checked") == true ? 1 : 0;

        return obj;
    },

    populateNatureOfActionPopup: function (obj) {
        $("#hdnNatureOfActionId").val(obj.NatureOfActionId);
        $("#txtNatureOfAction").val(obj.NatureOfActionName);
        if (obj.IsActive == 1) {
            $("#chkNatureOfActionIsActive").prop('checked', 'checked');
        } else {
            $("#chkNatureOfActionIsActive").removeProp('checked', 'checked');
        }
    },

    GetNatureOfActionColumns: function () {

        var columns = [
            { field: "NatureOfActionId", title: "NatureOfActionId", width: 50, hidden: true },
            { field: "NatureOfActionName", title: "Nature Of Action", width: 100 },
            { field: "IsActive", title: "Is<br> Active", width: 80, filterable: false, sortable: false, template: "#= IsActive==1 ? 'Active' : 'Inactive' #" },
            { field: "Edit", title: "Edit", filterable: false, width: 70, template: '<button class="k-button" onClick="disciplinary_NatureOfActionHelper.clickEventForEditFunction()" title="Edit"><span class="k-icon k-i-pencil"></span>Edit</button>', sortable: false }
        ];

        return columns;
    },

    clickEventForEditFunction: function () {
        var entityGrid = $("#gridNatureOfActionSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            disciplinary_NatureOfActionHelper.populateNatureOfActionPopup(selectedItem);
        }
    }
};