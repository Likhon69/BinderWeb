$(document).ready(function () {
    UserOtpSummaryHelper.GenerateUserOtpGrid("");

    $("#btnSearch").click(function () {
        var employeeid = $("#txtSearchEmployee").val();
        var grid = $("#UserOTpViewSummaryDiv").data('kendoGrid');
        var dataSource = UserOtpSummaryManager.gridDataSource(employeeid);
        grid.setDataSource(dataSource);
    });

    $("#txtSearchEmployee").keypress(function (event) {

        if (event.keyCode == 13) {
            var employeeid = $("#txtSearchEmployee").val();
            var grid = $("#UserOTpViewSummaryDiv").data('kendoGrid');
            var dataSource = UserOtpSummaryManager.gridDataSource(employeeid);
            grid.setDataSource(dataSource);

        }
    });
});