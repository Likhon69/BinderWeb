var isAttendanceExist = true;
$(document).ready(function () {
   
    $("#tabstripMessageInfo").kendoTabStrip({});
    
    $("#cmbShift").change(function () { todaysAttendanceHelper.changeShiftName(); });
    
    //$("#cmbYear").change(function () { holidayChartHelper.changeCalenderbyYearAndMonth(); });
    //$("#cmbMonth").change(function () { holidayChartHelper.changeCalenderbyYearAndMonth(); });
    empressCommonHelper.initePanelBer("liHolidayChartPanel");
    $("#btnSendRequestForAttendanceAdjustment").click(function () { PendingApprovalHelper.SendAttendanceAdjustment(); });
    $("#btnCloseAttendanceAdjustment").click(function () { PendingApprovalHelper.clearAttendanceRequestFrom(); });

    //PendingApprovalHelper.GenerateFromAndToDateNumericForOnSiteClient();

    dashboardManager.GetAccessPermisionForCurrentUser();
    dashboardManager.GetAccessPermisionForCurrentUserRecruitmentModule();
    dashboardManager.GetAccessPermisionForCurrentUserForTrainingModule();

    dashboardHelper.showHideRequestChart();

    dashboardManager.GetAttendanceAsemblyInfo();
    

    OfficeTimeWithClockManager.startServerClock();

    //holidayChartHelper.GenerateYearCombo();
    //holidayChartHelper.GenerateMonthCombo();

    toDoHelper.GenerateToDoGrid();
   // toDoHelper.GeRowDataOfToDoMenuGrid();

   
   // notificationHelper.notificationInit();

    holidayChartHelper.initiateHolidayCalenderForDashboard();

    
    if (isAttendanceExist) {
        OfficeTimeWithClockManager.getOfficeTime();
        myAttendanceHelper.GenerateMyAttendanceChart(0, 0, 0);
        //todaysAttendanceHelper.GenerateTodaysAttendanceChart();

        todaysAttendanceHelper.GenerateTodaysAttendanceAmChart();
        dashboardHelper.startAutoRefresh(300);
        todaysAttendanceHelper.GetShiftInformationByCompanyId();
        $("#cmbYearPendingApproval").change(function () { PendingApprovalHelper.populatePendingApprovalByYearAndMonth(); });
        $("#cmbMonthPendingApproval").change(function () { PendingApprovalHelper.populatePendingApprovalByYearAndMonth(); });

        PendingApprovalHelper.GenerateYearCombo();
        PendingApprovalHelper.GenerateMonthCombo();
        $("#divConveyanceStatus").show();


    } else {
        $("#divConveyanceStatus").hide();
    }
    LeaveStatusHelper.GenerateLeaveStatusChart();
    ConveyanceStatusHelper.GenerateLeaveStatusChart();
  
    
    


   
   
});

var accessArray = [];
var accessArrayForRecruitment = [];
var accessArrayForTraining = [];

var dashboardManager = {
    GetAccessPermisionForCurrentUser: function () {
        var objStatus = "";
        var jsonParam = "";
        var serviceUrl = "../Group/GetAccessPermisionForCurrentUser/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {

            dashboardHelper.PopulateAccessArray(jsonData);
        }
        function onFailed(error) {

            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText, [{ addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) { $noty.close(); } }]);
        }
    },

    GetAccessPermisionForCurrentUserRecruitmentModule: function () {
        var objStatus = "";
        var jsonParam = "";
        var serviceUrl = "../Group/GetAccessPermisionForCurrentUserRecruitmentModule/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {

            dashboardHelper.PopulateAccessArrayForRecruitment(jsonData);
        }
        function onFailed(error) {

            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText, [{ addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) { $noty.close(); } }]);
        }
    },

    GetAccessPermisionForCurrentUserForTrainingModule: function () {
        var objStatus = "";
        var jsonParam = "";
        var serviceUrl = "../Group/GetAccessPermisionForCurrentUserTrainingModule/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {

            dashboardHelper.PopulateAccessArrayForTraining(jsonData);
        }
        function onFailed(error) {

            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText, [{ addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) { $noty.close(); } }]);
        }
    },
    
    GetAttendanceAsemblyInfo: function() {
        var jsonParam = "";
        var serviceUrl = "../Home/GetAttendanceAsemblyInfo/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            
            //isAttendanceExist = jsonData.IsAttendanceByLogin;

            isAttendanceExist = true;
            if (!isAttendanceExist) {
                $("#divPendingApproval").hide();
                $("#divMyAttendanceMonth").hide();
                $("#divMyLogHourThisMonth").hide();
                $("#divAttendance").hide();
            }

        }
        function onFailed(error) {

            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText, [{ addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) { $noty.close(); } }]);
        }
    }
};

var dashboardHelper = {
    startAutoRefresh: function (autoRefreshTime) {
        
        var refreshInerval = autoRefreshTime * 1000;
            timerID = self.setInterval(function () {
                //todaysAttendanceHelper.GenerateTodaysAttendanceChart();
                todaysAttendanceHelper.GenerateTodaysAttendanceAmChart();
            //MenuManager.getCurrentUser(false);
            //MyEofficeManager.checkOfficeTime();
            //MyEofficeManager.checkShortLeaveAndHalfDayLeaveDurarion();
        },
        refreshInerval);
    },
    
    PopulateAccessArray: function (jsonData) {
        accessArray = [];
        for (var i = 0; i < jsonData.length; i++) {
            accessArray.push(jsonData[i]);
        }
    },

    PopulateAccessArrayForRecruitment: function (jsonData) {
        accessArrayForRecruitment = [];
        for (var i = 0; i < jsonData.length; i++) {
            accessArrayForRecruitment.push(jsonData[i]);
        }
    },

    PopulateAccessArrayForTraining: function (jsonData) {
        accessArrayForTraining = [];
        for (var i = 0; i < jsonData.length; i++) {
            accessArrayForTraining.push(jsonData[i]);
        }
    },

    checkApproverUser: function () {
        var approver = false;
        for (var i = 0; i < accessArray.length; i++) {
            if (accessArray[i].ReferenceID == 4) {
                approver = true;
                break;
            }
        }
        return approver;
    },
    
    checkRecomanderUser: function () {
        var recomander = false;

        for (var i = 0; i < accessArray.length ; i++) {
            if (accessArray[i].ReferenceID == 3) {
                recomander = true;
                break;
            }
        }
        return recomander;
    },
    checkRecruitmentUser: function () {
        var recruiter = false;
        for (var i = 0; i < accessArrayForRecruitment.length ; i++) {
            if (accessArrayForRecruitment[i].ReferenceID == 26) {
                recruiter = true;
                break;
            }
        }
        return recruiter;
    },
    checkTrainingPanelViewer: function () {
        
        var trainingPanelViewer = false;

        for (var i = 0; i < accessArrayForTraining.length ; i++) {
            if (accessArrayForTraining[i].ReferenceID == 25) {
                trainingPanelViewer = true;
                break;
            }
        }
        return trainingPanelViewer;
    },
    showHideRequestChart: function () {
        var isrecomander = dashboardHelper.checkRecomanderUser();
        var isapprover = dashboardHelper.checkApproverUser();
        var isrecruiter = dashboardHelper.checkRecruitmentUser();
        var isTrainingPanelViewer = dashboardHelper.checkTrainingPanelViewer();

        $("#divAttendance").hide();
        if(isrecomander == false && isapprover == false) {
            $("#divRecomandationRequest").hide();
            $("#divApprovalRequest").hide();
        }
        else if(isrecomander == true && isapprover == false) {
            $("#divRecomandationRequest").show();
            recomandationRequestHelper.GenerateRecomandationRequestChart();
            $("#divApprovalRequest").hide();
        }
        else if (isrecomander == false && isapprover == true) {
            $("#divRecomandationRequest").hide();
            $("#divApprovalRequest").show();
            ApprovalRequestHelper.GenerateApprovalRequestChart();
        }
        else if (isapprover == true) {
            $("#divRecomandationRequest").show();
            $("#divApprovalRequest").show();
            $("#divAttendance").show();
            
            recomandationRequestHelper.GenerateRecomandationRequestChart();
            ApprovalRequestHelper.GenerateApprovalRequestChart();
        }


        if (isrecruiter == true) {

            $("#divJobVacencyPanel").show();
            RecruitmentHelper.initRecruitment();
        }
        

        if (isTrainingPanelViewer == true) {
            $("#divTrainingPanel").show();
            TrainingListHelper.init();

        }
    }
};