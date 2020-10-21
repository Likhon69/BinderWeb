
$(document).ready(function () {

    $("#CostcentreDetailsPopupWindow").kendoWindow({
        title: "Cost Centre Details",
        resizeable: false,
        width: "50%",
        actions: ["Pin", "Refresh", "Maximize", "Close"],
        modal: true,
        visible: false
    });
    CostCentreSummaryHelper.GenerateCostCentreGrid(0,"Company");
    CostCentreHelper.initiateCostCentre();
    CostCentreHelper.populateParentCostCentreCombo();

    $("#btnAddNew").click(function () {
        CostCentreHelper.clearCostCentre();
        $("#CostcentreDetailsPopupWindow").data("kendoWindow").open().center();
    });
    $("#btnClose").click(function () {
        $("#CostcentreDetailsPopupWindow").data("kendoWindow").close();
       
    });

    $("#btnSave").click(function () {
        CostCentreManager.SaveCostCentre();
    });

    $("#cmbCompanyNameDetails").change(function () {
       
        CostCentreHelper.populateParentCostCentreCombo();
        
    });
    $("#btnApplyAccountHead").click(function () { accountHeadMappingManager.ApplyAccountHead(); });
});