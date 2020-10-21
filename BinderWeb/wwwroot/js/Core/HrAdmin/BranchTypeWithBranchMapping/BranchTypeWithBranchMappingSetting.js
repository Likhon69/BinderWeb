$(document).ready(function () {

    BranchTypeWithBranchMappingDetailsHelper.BranchTypeCombo();
    BranchTypeWithBranchMappingDetailsHelper.BranchNameCombo();
    BranchTypeWithBranchMappingDetailsHelper.CreatePopUp();
    $("#btnAddBranchType").click(function () {

        $("#divBranchTypeChargePopUp").data('kendoWindow').open().center();
        
    });
    BranchTypeChargeSummaryHelper.GenerateBranchTypeChargeGrid();
  
    $("#btnSaveBranchTypeCharge").click(function () {
        BranchTypeChargeSummaryManager.SaveBranchTypeCharge();
      });
    $("#btnSaveBranchTypeMapping").click(function () {
        BranchTypeWithBranchMappingDetailsManager.SaveBranchTypeWithBranchMapping();
       
       
        
    });

    $("#btnClearAll").click(function () {
        BranchTypeWithBranchMappingDetailsHelper.clearBranchTypeWithBranchMappingInformation();
    });
    BranchTypeWithBranchMappingSummaryHelper.GenerateBranchTypeWithBranchMappingGrid();
    
});