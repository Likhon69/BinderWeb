$(document).ready(function () {
    BranchTypeWiseManPowerSetupSummaryHelper.GenerateBranchTypeChargeGrid();
    DivisionWiseManPowerSetupSummaryHelper.GenerateDivisionWiseManPowerSetupGrid();
    $("#btnSaveManPowerSetup").click(function () {

        BranchTypeWiseManPowerSetupSummaryManager.SaveBranchTypeWiseManPowerSetup();
    });
    $("#btnSaveManPowerSetupForDivision").click(function () {

       DivisionWiseManPowerSetupSummaryManager.SaveDivisionManPowerSetup();
    });

    

    $("#btnSetupForBranch").click(function () {

        $("#divManpowerSetupForBranch").show();
        $("#divManpowerSetupForDivision").hide();
    });

    $("#btnSetupForDivision").click(function () {

        $("#divManpowerSetupForBranch").hide();
        $("#divManpowerSetupForDivision").show();
    });
});