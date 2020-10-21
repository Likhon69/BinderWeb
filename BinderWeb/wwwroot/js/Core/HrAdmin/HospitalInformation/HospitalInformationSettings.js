$(document).ready(function() {
    hospitalInfoSummaryManager.populateHospitalInfoSummaryGrid();
    $("#btnSave").click(function() {
        hospitalInfoDetailsManager.SaveHospitalInformation();
    });
    $("#btnClear").click(function () {
        hospitalinfoDetailsHelper.clearAllFieldsOfHospitalInfo();
    });
    
    $("#txtHospitalName").focus();
});