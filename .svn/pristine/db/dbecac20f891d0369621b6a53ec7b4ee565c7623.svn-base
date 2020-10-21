

$(document).ready(function () {

    AjaxManager.initPopupWindow("windCompanyLocation", 'Company/Location', "60%");

    DottedLineEmailConfigSummaryHelper.InitDottedLineEmailConfigSummary();
    DottedLineEmailConfigHelper.InitDottedLineEmailConfig();

    $("#btnRemoveAll").click(function () {

        DottedLineEmailConfigHelper.ClickEventForRemoveAll();
    });


    $("#btnSave").click(function () {
        DottedLineEmailConfigManager.SaveDottedLineEmailConfig();
    });

    $("#btnClearAll").click(function () {
        DottedLineEmailConfigHelper.ClearFields();
    });


    $("#txtEmployeeId").keypress(function (e) {
        if (e.keyCode == 13) {
            DottedLineEmailConfigHelper.PopulatePreviousSettingsForEmployee();
        }
    });

    $("#btnRemoveAll").hide();

    $("#btnAddNewDottedLineSettings").click(function () {
        DottedLineEmailConfigHelper.AddNewDottedLineForm();
    });

    $("#btnCloseDottedLineSettings").click(function () {
        DottedLineEmailConfigHelper.CloseDottedLineForm();
    });

    $("#btnCloseLocationWindow").click(function () {
        $("#windCompanyLocation").data('kendoWindow').close();
    });

});