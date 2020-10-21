
var isAttendanceAlreadyLoaded = false;
var isOutstationAlreadyLoaded = false;
var isAttendanceRequestAlreadyLoaded = false;
var isMovementAlreadyLoaded = false;
var isRosterAlreadyLoaded = false;
var isOtAllocationAlreadyLoaded = false;

var mattforNewDashboardManager = {
    
    GetMyAttendanceData: function (hrRecordId, month, year) {
        var objdata = "";
        var jsonParam = "hrRecordId=" + hrRecordId + "&month=" + month + "&year=" + year;
        var serviceUrl = "../Dashboard/GetMyAttendanceGraph/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objdata = jsonData;
        }
        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
        }
        return objdata;
    },
    
    OutStationAppliedStatus: function () {
        var objStatus = "";
        var jsonParam = "";
        var serviceUrl = "../Dashboard/OutStationAppliedStatus";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objStatus = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objStatus;
    },
    
    AttendanceRequestAppliedStatus: function () {
        var objStatus = "";
        var jsonParam = "";
        var serviceUrl = "../Dashboard/AttendanceRequestAppliedStatus";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objStatus = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objStatus;
    },

    MovementAppliedStatus: function () {
        var objStatus = "";
        var jsonParam = "";
        var serviceUrl = "../Dashboard/MovementAppliedStatus";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objStatus = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objStatus;
    },
    
    gridDataSourceForIndividualRoster: function (year, month, employeeid) {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 50,
            transport: {
                read: {
                    url: '../Roster/GetIndividualRosterDetails?year=' + year + '&month=' + month + '&employeeid=' + employeeid,
                    type: "post",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options) {
                    return JSON.stringify(options);
                }
            },
            schema: {
                data: "Items", total: "TotalCount",
                model: {
                    fields: {
                        DateValue: { type: "date" }
                    }
                },

            }

        });
        return gridDataSource;
    },
    
    gridDataSourceForOTAllocation: function (year, month, employeeid) {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 50,
            transport: {
                read: {
                    url: '../Dashboard/OTAllocation?year=' + year + '&month=' + month + '&employeeid=' + employeeid,
                    type: "post",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options) {
                    return JSON.stringify(options);
                }
            },
            schema: {
                data: "Items", total: "TotalCount",
                model: {
                    fields: {
                        OtFromDate: { type: "date" }
                    }
                },

            }

        });
        return gridDataSource;
    },
    
};

var mattforNewDashboardHelper = {

    initiateMyAttendance: function () {

        if (assembly.AssemblyInfoId == 19) {
            $("#divEarlyExit").hide();
            $("#divOutPunchMissing").hide();
            $("#divOutStation").hide();
            
           
        }
        else {
            $("#divEarlyExit").show();
            $("#divOutPunchMissing").show();
            $("#divOutStation").show();
        };


        var effectforMayAttendance = kendo.fx("#divContainerMyAttendance2").flipHorizontal($("#divMyAttendanceMain2"), $("#divMyAttendanceRelatedImage")).duration(1000),
            reverse = false;

        $(".toggleMyAttendance2").click(function () {
            effectforMayAttendance.stop();
            reverse ? effectforMayAttendance.reverse() : effectforMayAttendance.play();
            reverse = !reverse;
        });
        

        var effectforMayAttendanceDetails = kendo.fx("#divContainerMyAttendance2").flipHorizontal($("#divMyAttendanceRelatedImage"), $("#divMyAttendance2")).duration(1000),
            reverseAtdetails = false;

        $(".toggleMyAttendanceDetails").click(function () {
            effectforMayAttendanceDetails.stop();
            reverseAtdetails ? effectforMayAttendanceDetails.reverse() : effectforMayAttendanceDetails.play();
            reverseAtdetails = !reverseAtdetails;
            if (isAttendanceAlreadyLoaded == false) {
                mattforNewDashboardHelper.MyAttendanceDetailsData();
            }

        });
        
        var effectforMyOutstationDetails = kendo.fx("#divContainerMyAttendance2").flipHorizontal($("#divMyAttendanceRelatedImage"), $("#divMyOutStation")).duration(1000),
            reverseOutstation = false;

        $(".toggleOutstation").click(function () {
            effectforMyOutstationDetails.stop();
            reverseOutstation ? effectforMyOutstationDetails.reverse() : effectforMyOutstationDetails.play();
            reverseOutstation = !reverseOutstation;
            if (isOutstationAlreadyLoaded == false) {
                mattforNewDashboardHelper.MyAttendanceDetailsData();
            }
        });
        
        var effectforMyAttendanceRequestDetails = kendo.fx("#divContainerMyAttendance2").flipHorizontal($("#divMyAttendanceRelatedImage"), $("#divMyAttendanceAuthorization")).duration(1000),
            reverseAttendanceRequest = false;

        $(".toggleAttendanceRequest").click(function () {
            effectforMyAttendanceRequestDetails.stop();
            reverseAttendanceRequest ? effectforMyAttendanceRequestDetails.reverse() : effectforMyAttendanceRequestDetails.play();
            reverseAttendanceRequest = !reverseAttendanceRequest;
            if (isAttendanceRequestAlreadyLoaded == false) {
                mattforNewDashboardHelper.MyAttendanceRequestData();
            }
        });
        
        var effectforMyMovementDetails = kendo.fx("#divContainerMyAttendance2").flipHorizontal($("#divMyAttendanceRelatedImage"), $("#divMyMovement")).duration(1000),
            reverseMovementRequest = false;

        $(".toggleMovement").click(function () {
            effectforMyMovementDetails.stop();
            reverseMovementRequest ? effectforMyMovementDetails.reverse() : effectforMyMovementDetails.play();
            reverseMovementRequest = !reverseMovementRequest;
            if (isMovementAlreadyLoaded == false) {
                mattforNewDashboardHelper.MyMovementData();
            }
        });
        
        var effectforMyRosterDetails = kendo.fx("#divContainerMyAttendance2").flipHorizontal($("#divMyAttendanceRelatedImage"), $("#divRoster")).duration(1000),
            reverseRoster = false;
        $(".toggleRoster").click(function () {
            effectforMyRosterDetails.stop();
            reverseRoster ? effectforMyRosterDetails.reverse() : effectforMyRosterDetails.play();
            reverseRoster = !reverseRoster;
            if (isRosterAlreadyLoaded == false) {
                mattforNewDashboardHelper.GenerateRosterSummaryGrid();
            }
        });
        
        var effectforMyOtAllocation = kendo.fx("#divContainerMyAttendance2").flipHorizontal($("#divMyAttendanceRelatedImage"), $("#divOtAllocation")).duration(1000),
            reverseOtAllocation = false;
        $(".toggleOtAllocation").click(function () {
            effectforMyOtAllocation.stop();
            reverseOtAllocation ? effectforMyOtAllocation.reverse() : effectforMyOtAllocation.play();
            reverseOtAllocation = !reverseOtAllocation;
            if (isOtAllocationAlreadyLoaded == false) {
                mattforNewDashboardHelper.GenerateOTAllocationSummaryGrid();
            }
        });
        

    },
    
    MyAttendanceDetailsData: function() {
        
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        //var month = 4;
        var obj = mattforNewDashboardManager.GetMyAttendanceData(CurrentUser.EmployeeId, month, year);
        //debugger;
        var totalWorkingDays = 0;
        var holidayCount = 0;
        for (var i = 0; i < obj.length; i++) {
            totalWorkingDays += obj[i].data;
            if (obj[i].label == "Leave") {
                $("#spnLeave").html(obj[i].data);
            }
            else if (obj[i].label == "Outstation") {
                $("#spnOutStation").html(obj[i].data);
            }
            else if (obj[i].label == "Absent") {
                $("#spnAbsent").html(obj[i].data);
            }
            else if (obj[i].label == "Present") {
                $("#spnPresent").html(obj[i].data);
            }
            else if (obj[i].label == "Late(Present)") {
                $("#spnLate").html(obj[i].data);
            }
            else if (obj[i].label == "DayOff") {
                var prevData = parseInt($("#spnHoliday").html());
                $("#spnHoliday").html(prevData + obj[i].data);
                holidayCount += obj[i].data;
            }
            else if (obj[i].label == "Govt Holiday") {
                var prevData = parseInt($("#spnHoliday").html());
                $("#spnHoliday").html(prevData + obj[i].data);
                holidayCount += obj[i].data;
            }
            else if (obj[i].label == "Delay") {
                var prevData = parseInt($("#spnPresent").html());
                $("#spnPresent").html(prevData + obj[i].data);
            }
            else if (obj[i].label == "Early Exit") {
                var prevData = parseInt($("#spnEarlyExit").html());
                $("#spnEarlyExit").html(prevData + obj[i].data);
            }
            else if (obj[i].label == "Day-Off") {
                var prevData = parseInt($("#spnHoliday").html());
                $("#spnHoliday").html(prevData + obj[i].data);
                holidayCount += obj[i].data;
            }
            else if (obj[i].label == "Weekly Holiday") {
                var prevData = parseInt($("#spnHoliday").html());
                $("#spnHoliday").html(prevData + obj[i].data);
                holidayCount += obj[i].data;
            }
            else if (obj[i].label == "Holiday/Weekend") {
                var prevData = parseInt($("#spnHoliday").html());
                $("#spnHoliday").html(prevData + obj[i].data);
                holidayCount += obj[i].data;
            }
            else if (obj[i].label == "Training") {
                var prevData = parseInt($("#spnOutStation").html());
                $("#spnOutStation").html(prevData + obj[i].data);
            }

        }
        //debugger;
        if (assembly.AssemblyInfoId == 19) {
            totalWorkingDays =totalWorkingDays- holidayCount;
        }
        $("#spnWorkingDays").html(totalWorkingDays);
        isAttendanceAlreadyLoaded = true;
    },
    
    MyOutstationDetailsData: function() {
        var obj = mattforNewDashboardManager.OutStationAppliedStatus();
        if (obj != null) {

            $("#spnOutStationApplied").html(obj.Pending);
            $("#spnOutStationDraft").html(obj.Draft);
            $("#spnOutStationCanceled").html(obj.Canceled);
            $("#spnOutStationRejected").html(obj.Rejected);
            $("#spnOutStationApproved").html(obj.Approved);
            isOutstationAlreadyLoaded = true;
        }
    },
    
    MyAttendanceRequestData: function() {
        
        var obj = mattforNewDashboardManager.AttendanceRequestAppliedStatus();
        if (obj != null) {

            $("#spnAttendanceApplied").html(obj.Pending);
            $("#spnAttendanceDraft").html(obj.Draft);
            $("#spnAttendanceCanceled").html(obj.Canceled);
            $("#spnAttendanceRejected").html(obj.Rejected);
            $("#spnAttendanceApproved").html(obj.Approved);
            isAttendanceRequestAlreadyLoaded = true;
        }
    },
    
    MyMovementData: function() {
        var obj = mattforNewDashboardManager.MovementAppliedStatus();
        if (obj != null) {

            $("#spnMovementApplied").html(obj.Pending);
            $("#spnMovementDraft").html(obj.Draft);
            $("#spnMovementCanceled").html(obj.Canceled);
            $("#spnMovementRejected").html(obj.Rejected);
            $("#spnMovementApproved").html(obj.Approved);
            isMovementAlreadyLoaded = true;
        }

    },
    
    GenerateRosterSummaryGrid: function () {
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        var empId = CurrentUser.EmployeeId;

        $("#RosterlistView").kendoGrid({
            dataSource: mattforNewDashboardManager.gridDataSourceForIndividualRoster(year, month, empId),

            scrollable: {
                virtual: false
            },
            sortable: true,
            columns: mattforNewDashboardHelper.GenerateViewRosteColumns(),
            pageable: false,
            filterable: true,
        });

    },
    
    GenerateViewRosteColumns: function () {

        return columns = [

            { filed: "HRRecordId", title: "HRRecordId", width: 50, hidden: true, attributes: { style: "text-align: center" } },
            { filed: "UserId", title: "UserId", width: 50, hidden: true },
            { field: "DateValue", title: "Date", width: 45, filterable: false, template: "#=kendo.toString(kendo.parseDate(DateValue),'dd-MMM')#", sortable: false },
            { field: "SHIFTCODE", title: "Code", width: 30, sortable: false, filterable: false, attributes: { style: "text-align: center" } },
            { field: "ShiftName", title: "Shift", width: 70, sortable: false, hidden: true, attributes: { style: "text-align: center" } },
            { field: "DayName", title: "Week Name", width: 50, sortable: false, hidden: true },
            { field: "StartTime", title: "IN", width: 40, sortable: false, filterable: false, attributes: { style: "text-align: center" } },
            { field: "EndTime", title: "OUT", width: 40, sortable: false, filterable: false, attributes: { style: "text-align: center" } },
            { field: "IsLate", title: "IsLate", width: 100, sortable: false, hidden: true }
        ];

    },
    

    GenerateOTAllocationSummaryGrid: function () {
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        //var month = 4;
        var empId = CurrentUser.EmployeeId;

        $("#OTAllocationlistView").kendoGrid({
            dataSource: mattforNewDashboardManager.gridDataSourceForOTAllocation(year, month, empId),

            scrollable: {
                virtual: false
            },
            sortable: true,
            columns: mattforNewDashboardHelper.GenerateViewOtAllocationColumns(),
            pageable: false,
            filterable: true,
        });

    },
    
    GenerateViewOtAllocationColumns: function () {

        return columns = [

            { field: "OtFromDate", title: "Date", width: 45, filterable: false, template: "#=kendo.toString(kendo.parseDate(OtAllocatedHour),'dd-MMM')#", sortable: false },
            { field: "OtAllocatedHour", title: "Hour", width: 40, sortable: false, filterable: false, attributes: { style: "text-align: center" } },
            { field: "OtAllocationStart", title: "Type", width: 70, sortable: false, filterable: false, attributes: { style: "text-align: center" }, template: "#= mattforNewDashboardHelper.templateOfOTAllocationStart(data)  #" }
        ];

    },
    
    templateOfOTAllocationStart: function (data) {

        if (data.OtAllocationStart == 2) {
            return "After Office Time";
        }
        if (data.OtAllocationStart == 1) {
            return "Before Office Time";
        }
        if (data.OtAllocationStart == 3) {
            return "Both";
        }

    },
};