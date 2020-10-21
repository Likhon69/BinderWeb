$(document).ready(function () {
    BranchManagerSummaryHelper.GenerateBranchManagerGrid();

    BranchManagerSettingsHelper.DivisionNameCombo();
    BranchManagerSettingsHelper.RegionNameCombo();
    BranchManagerSettingsHelper.AreaNameCombo();
    BranchManagerSettingsHelper.BranchNameCombo();

   
    $("#txtEffectiveDate").kendoDatePicker({
        depth:"year",
            format: 'dd-MMM-yyyy'
        });

    $("#txtEndDate").kendoDatePicker({
        depth: "year",
            format: 'dd-MMM-yyyy'
        });

    $("#btnSave").click(function () {
        
        BranchManagerSettingsManager.SaveBranchManagerInfo();
    });
    $("#btnClearAll").click(function () {
        BranchManagerSettingsHelper.ClearBranchManagerInfoObject();
    });

    $("#btnSearch").click(function () {
        
        BranchManagerSettingsHelper.SearchEmployeeNameByEmployeeId();
    });

    $("#txtSearchByEmployeeId").keypress(function (event) {
       
        if (event.keyCode == 13) {
            var employeeid = $("#txtSearchByEmployeeId").val();
            if (employeeid != '') {
                BranchManagerSettingsHelper.SearchEmployeeNameByEmployeeId();
            }
            else {

            }
        }
    });

});






