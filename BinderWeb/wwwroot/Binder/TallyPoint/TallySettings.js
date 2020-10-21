



$(document).ready(function () {
    

    $("#btnSearch").click(function () {

        TallyPointManager.PassParameterSearch();
    });
    $("#btnSaveOk").click(function () {

        TallyConfirmationManager.AddTallyConfirmation();
    });

    TallySocSearchGridHelper.init();

    TallySummaryHelper.GenerateTallyGrid();

});
