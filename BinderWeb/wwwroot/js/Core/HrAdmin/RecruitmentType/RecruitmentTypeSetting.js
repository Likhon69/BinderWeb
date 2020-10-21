$(document).ready(function () {

    $("#btnSave").click(function () {

        RecruitmentTypeDetailsManager.SaveRecruitmentType();
    });
    $("#btnClear").click(function () {
        RecruitmentTypeDetailsHelper.clearRecruitmentTypeForm();
    });

    RecruitmentTypeSummaryHelper.GenerateRecruitmentTypeGrid();

});