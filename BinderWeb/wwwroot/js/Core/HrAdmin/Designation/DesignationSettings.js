$(document).ready(function () {
    
    $("#txtSortOrder").kendoNumericTextBox({
        format: "#",
        min: 0,
        max: 500
    }).parent().parent().css('width', "17.4em");
    $("#txtDesignationCode").focus();

    designationSummaryManager.GenerateDesignationGridSummary();
 


});