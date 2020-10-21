$(document).ready(function () {
    DivisionManagerDetailsHelper.GenerateDivisionCombo();
    DivisionManagerDetailsHelper.GenerateEfectiveDate();
    DivisionManagerDetailsHelper.GenerateEndDate();
    DivisionManagerMapHelper.GeneratDivisionManagerMapSummaryGrid();
    
    $("#txtEmployeeId").keypress(function (e) {
        if (e.keyCode == 13) {
            DivisionManagerDetailsManager.GetEmployeeInfoByEmployeeId();
        }
    });
});