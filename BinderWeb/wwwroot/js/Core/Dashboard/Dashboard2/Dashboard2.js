var assemblyInfo = "";
$(document).ready(function () {
    //$("#tabstrip").kendoTabStrip({
    //    tabPosition: "top",
    //});
    $("#tabstripWish").kendoTabStrip({
        //tabPosition: "right",
        //animation: {
        //    open: {
        //        effects: "fadeIn"
        //    }
        //}
    });
    $("#tabstripOTAllocation").kendoTabStrip({
        tabPosition: "top",
    });

    employeeWellcomeHelper.initiateEmployeeWelCome();

    upcomingHolidayHelper.initiateUpcomingHoliday();

    officialNoticeHelper.initiateOfficialNotice();

    EmployeeWishListHelper.initiateWishList();

    leaveStatusHelper.initiateLeaveStatus();

    myTaskHelper.initiatemyTaskStatus();

    assemblyInfo = empressCommonManager.GetAssemblyInfo();

   // attendanceRegularizationStatusHelper.initiateattendanceRegularizationStatus();

   // movementStatusHelper.initiatemovementStatus();

    mattforNewDashboardHelper.initiateMyAttendance();
   // rosterAndOtAllocationHelper.initiateRosterAndOtAllocation();

    var effectforMyService = kendo.fx("#divContainerHrServiceRequest").flipHorizontal($("#divHrServiceMain"), $("#divMyHRServiceRequest")).duration(1000),
            reverse = false;

    $(".toggleMyService").click(function () {
        effectforMyService.stop();
        reverse ? effectforMyService.reverse() : effectforMyService.play();
        reverse = !reverse;
    });

    if (assembly.AssemblyInfoId == 19) {//only Modhumoti
        $("#divCplPending").hide();
        $("#divManpowerPlaningPending").hide();
        $("#divManpowerRequision").hide();
        $("#divSalaryCertificate").hide();
        $("#divOutstation").hide();
        $("#divRosterHyperlink").hide();
        $("#divOtAllocationHyperlink").hide();

    }
    

    

});