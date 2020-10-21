$(document).ready(function () {

    //Add Subdisiary Type
    $("#btnAddNewDegreeType").click(function () {
        //Load list
        DegreeTypeSummaryHelper.IntitiateDegreeTypeGrid();

        AjaxManager.PopupWindow("popupDegreeTypeSetup", "Add New Degree Type", "80%");
        //surveyQuestionDetailsManager.populateQuestionCategorySummaryGrid();
        //empressCommonHelper.populateSurveyCategoryCombo("cmbSurveyCategoryForQue");
        //$("#btnQuestionCategorySave").html("Save");
        $("#DegreeType").focus();
    });
    $("#popUpbtnClose").click(function () {
        //surverQuestionDetailsHelper.ClearNewQuestionTypeWindow();
        $("#popupDegreeTypeSetup").data("kendoWindow").close();
    });

    //Save button Click
    $('#btnDegreeTypeSave').click(function () {
        DegreeTypeDetailsManager.AddNewDegreeType();
    });

    //Clear button Click
    $('#btnDegreeClear').click(function () {
        DegreeTypeDetailsHelper.clearForm();
    });

});