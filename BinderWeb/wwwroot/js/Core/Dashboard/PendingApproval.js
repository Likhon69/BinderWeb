var shortLeaveInfo = null;
var isShortLeave = false;

// DefalterType == 1 Delay
// DefalterType == 2 Early Exit
// DefalterType == 3 Absent (Late Entry)
// DefalterType == 4 Absent (No Out Punch)
// DefalterType == 5 Absent (Early Out)
// DefalterType == 6 Out Punch Missing


var PendingApprovalManager = {

    gridDataSource: function () {
        var year = $("#cmbYearPendingApproval").val();
        var month = $("#cmbMonthPendingApproval").val();

        var gridDataSource = new kendo.data.DataSource({

            type: "json",

            serverPaging: true,
            serverSorting: true,

            pageSize: 100,
            //page: 1,

            transport: {
                read: {

                    url: '../Dashboard/GetPendingApprovalesWithDate/?month=' + month + "&year=" + year,

                    type: "POST",

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
                        AttendanceDate: {
                            type: "Date"
                        }
                    }
                }

            }


        });

        return gridDataSource;
    },

    //getAttendanceDetails: function (attendanceDate) {
    //    // $("#divPendingExplanation").hide();
    //    $("#divPendingLeaveApp").hide();
    //    $("#divPendingClient").hide();
    //    $("#hidAtdStatus").val("");
    //    $("#hidReason").val("");
    //    var jsonParam = "attendanceDate=" + attendanceDate;
    //    var url = "../Dashboard/GetAttendanceDetailsByAttendanceDate";
    //    AjaxManager.SendJson(url, jsonParam, onSuccess, onFailed);
    //    function onSuccess(data) {
    //        var hrRecordId = CurrentUser.EmployeeId;
    //        var comboData = [];

    //        PendingApprovalManager.GetClientInfo(hrRecordId);
    //        PendingApprovalManager.GetShortLeaveInfo(hrRecordId);
    //        $("#hdnHrRecordId").val(hrRecordId);
    //        $("#hdnUserId").val(CurrentUser.UserId);
    //        $("#txtInTime").kendoTimePicker({}).data("kendoTimePicker");
    //        $("#txtInTime").parent().parent().css('width', "17.4em");
    //        $("#txtOutTime").kendoTimePicker({}).data("kendoTimePicker");
    //        $("#txtOutTime").parent().parent().css('width', "17.4em");
    //        if (data != "") {
    //            // EMPLOYEE WAS NOT ABSENT
    //            // //debugger;





    //            var inTime = data.LoginTime.split('.');
    //            if (data.DefalterType == 0) {
    //                var message = "***";
    //                var reason = "";
    //                if (data.IsAttendanceClearOut == false) {

    //                    if (data.Status == "2") {
    //                        message += "Your Attendance is not clear";
    //                        reason += "Attendance not clear";
    //                    } else {
    //                        message += "You were not logged out";
    //                        reason += "Not logged out";
    //                    }



    //                }
    //                if (data.IsLate == true) {

    //                    if (message != "***") {
    //                        message += " and ";
    //                        reason += "; ";
    //                    }
    //                    message += "You were late! (In Time - " + inTime[0] + "). Apply to adjust your attendance.";
    //                    reason += "Late (In Time - " + inTime[0] + ")";



    //                }
    //                comboData = [
    //                    { text: "-- Please Select --", value: "-9" },
    //                    { text: "Attendance", value: "-1" },
    //                    { text: "Leave", value: "0" },
    //                    { text: "Outstation", value: "1" }
    //                ];
    //                $("#divPendingMessage").html(message);
    //                $("#divPendingExplanation").show();
    //                $("#hidReason").val(reason);
    //                $("#txtareaExplanation").val("");
    //                $("#txtareaExplanation").focus();
    //                $("#hidAtdStatus").val("NOTLOGOUT");
    //                PendingApprovalManager.getLeaveType(hrRecordId);
    //                empressCommonHelper.populateLeaveReason("cmbLeaveReason");

    //            }
    //            if (data.DefalterType == 1) {
    //                message = "You were too late! Apply for a short leave to adjust your attendance or create a movement Log. (In Time - " + inTime[0] + ")";
    //                $("#divPendingLeaveApp").show();
    //                $("#divPendingExplanation").show();
    //                $("#divAddress").show();
    //                $("#divReason").show();
    //                $("#divPendingMessage").html(message);
    //                $("#hidAtdStatus").val("SHORT");
    //                PendingApprovalManager.GetShortLeaveType(hrRecordId);
    //                empressCommonHelper.populateLeaveReason("cmbLeaveReason");
    //                empressCommonHelper.populateLeaveReason("cmbLeaveReason");
    //                PendingApprovalManager.getLeaveType(hrRecordId);
    //                comboData = [

    //            { text: "-- Please Select --", value: "-9" },
    //            { text: "Attendance", value: "-1" },
    //                    { text: "Leave", value: "0" },
    //                    { text: "Outstation", value: "1" }
    //                ];

    //            }
    //            if (data.DefalterType == 2) {
    //                message = "You Are Early Exit ! Apply for a half day leave to adjust your attendance or create a movement Log. (In Time - " + inTime[0] + ")";
    //                $("#divPendingLeaveApp").show();
    //                $("#divPendingExplanation").show();
    //                $("#divPendingMessage").html(message);
    //                $("#divAddress").show();
    //                $("#divReason").show();
    //                $("#hidAtdStatus").val("HALFLEAVE");
    //                PendingApprovalManager.getLeaveType(hrRecordId);
    //                empressCommonHelper.populateLeaveReason("cmbLeaveReason");
    //                comboData = [
    //                    { text: "-- Please Select --", value: "-9" },
    //                    { text: "Leave", value: "0" },
    //                    { text: "Outstation", value: "1" }
    //                ];
    //            }
    //            if (data.DefalterType == 3) {
    //                message = "You are Absent ! Apply for a leave to adjust your attendance or create a movement Log. (In Time - " + inTime[0] + ")";
    //                $("#divPendingLeaveApp").show();
    //                $("#divAddress").show();
    //                $("#divReason").show();
    //                $("#divPendingExplanation").show();
    //                $("#divPendingMessage").html(message);
    //                $("#hidAtdStatus").val("FULLLEAVE");
    //                PendingApprovalManager.getLeaveType(hrRecordId);
    //                empressCommonHelper.populateLeaveReason("cmbLeaveReason");
    //                comboData = [
    //                    { text: "-- Please Select --", value: "-9" },
    //                    { text: "Leave", value: "0" },
    //                    { text: "Outstation", value: "1" }
    //                ];
    //            }
    //            if (data.DefalterType == 4) {
    //                message = "You have no out punch ! Apply for Outstation or Leave or attendance adjustment to adjust your attendance. (In Time - " + inTime[0] + ")";
    //                $("#divPendingLeaveApp").show();
    //                $("#divAddress").show();
    //                $("#divReason").show();
    //                $("#divPendingExplanation").show();
    //                $("#divPendingMessage").html(message);
    //                $("#hidAtdStatus").val("FULLLEAVE");
    //                PendingApprovalManager.getLeaveType(hrRecordId);
    //                empressCommonHelper.populateLeaveReason("cmbLeaveReason");
    //                comboData = [
    //                    { text: "-- Please Select --", value: "-9" },
    //                    { text: "Leave", value: "0" },
    //                    { text: "Outstation", value: "1" },
    //                    { text: "Attendance", value: "-1" },
    //                ];
    //            }
    //            if (data.DefalterType == 5) {
    //                message = "You are Early Out ! Apply for Outstation or Short Leave or attendance adjustment to adjust your attendance. (In Time - " + inTime[0] + ")";
    //                $("#divPendingLeaveApp").show();
    //                $("#divAddress").show();
    //                $("#divReason").show();
    //                $("#divPendingExplanation").show();
    //                $("#divPendingMessage").html(message);
    //                $("#hidAtdStatus").val("FULLLEAVE");
    //                PendingApprovalManager.getLeaveType(hrRecordId);
    //                empressCommonHelper.populateLeaveReason("cmbLeaveReason");
    //                comboData = [
    //                    { text: "-- Please Select --", value: "-9" },
    //                    { text: "Leave", value: "0" },
    //                    { text: "Outstation", value: "1" },
    //                    { text: "Attendance", value: "-1" },
    //                ];
    //            }
    //            if (data.DefalterType == 6) {
    //                message = "Your Out Punch is Missing ! Apply for Outstation or Leave or attendance adjustment to adjust your attendance. (In Time - " + inTime[0] + ")";
    //                $("#divPendingLeaveApp").show();
    //                $("#divAddress").show();
    //                $("#divReason").show();
    //                $("#divPendingExplanation").show();
    //                $("#divPendingMessage").html(message);
    //                $("#hidAtdStatus").val("FULLLEAVE");
    //                PendingApprovalManager.getLeaveType(hrRecordId);
    //                empressCommonHelper.populateLeaveReason("cmbLeaveReason");
    //                comboData = [
    //                    { text: "-- Please Select --", value: "-9" },
    //                    { text: "Leave", value: "0" },
    //                    { text: "Outstation", value: "1" },
    //                    { text: "Attendance", value: "-1" },
    //                ];
    //            }
    //        }
    //        else {

    //            // EMPLOYEE WAS ABSENT
    //            message = "You were absent! Apply for a leave to adjust your attendance";
    //            $("#divPendingLeaveApp").show();
    //            $("#divPendingMessage").html(message);
    //            $("#hidAtdStatus").val("ABSENT");
    //            $("#divAddress").show();
    //            $("#divReason").show();
    //            PendingApprovalManager.getLeaveType(hrRecordId);
    //            empressCommonHelper.populateLeaveReason("cmbLeaveReason");
    //            comboData = [
    //                { text: "-- Please Select --", value: "-9" },
    //                    { text: "Leave", value: "0" },
    //                    { text: "Outstation", value: "1" }
    //            ];
    //        }

    //        $("#cmbAdjustmentType").kendoDropDownList({
    //            dataTextField: "text",
    //            dataValueField: "value",
    //            dataSource: comboData,
    //            // filter: "contains",
    //            // suggest: true,
    //            placeholder: "Select ",
    //            // optionLabel: "Please Select...",
    //            //index: 0,
    //            change: PendingApprovalHelper.changeAdjustment
    //        });
    //        $("#cmbPendingLeaveType").change(function () { PendingApprovalHelper.changeLeaveType(); });





    //    }
    //    function onFailed(error) {
    //        window.alert(error.statusText);
    //    }
    //},

    getAttendanceDetails: function (attendanceDate, userId) {
        //debugger;
        // $("#divPendingExplanation").hide();
        $("#divPendingLeaveApp").hide();
        $("#divPendingClient").hide();
        $("#hidAtdStatus").val("");
        $("#hidReason").val("");

        //var jsonParam = "attendanceDate=" + attendanceDate + "&serchingEmpUserId=" + userId;
        //var url = "../Dashboard/GetAttendanceDetailsByAttendanceDateandUserId";
        var jsonParam = "attendanceDate=" + attendanceDate;
        var url = "../Dashboard/GetAttendanceDetailsByAttendanceDate";
        AjaxManager.SendJson(url, jsonParam, onSuccess, onFailed);
        function onSuccess(data) {
            var hrRecordId = CurrentUser.EmployeeId;

            if (data != "") {
                // EMPLOYEE WAS NOT ABSENT
                // //debugger;
                //hrRecordId = data.EmployeeId;
                var comboData = [];

                //debugger;
                PendingApprovalManager.GetClientInfo(hrRecordId);
                PendingApprovalManager.GetShortLeaveInfo(hrRecordId);
                $("#hdnHrRecordId").val(hrRecordId);
                $("#hdnUserId").val(data.UserId);
                $("#txtInTime").kendoTimePicker({}).data("kendoTimePicker");
                $("#txtInTime").parent().parent().css('width', "17.4em");
                $("#txtOutTime").kendoTimePicker({}).data("kendoTimePicker");
                $("#txtOutTime").parent().parent().css('width', "17.4em");




                var inTime = data.LoginTime.split('.');
                if (data.DefalterType == 0) {
                    var message = "***";
                    var reason = "";
                    if (data.IsAttendanceClearOut == false) {

                        if (data.Status == "2") {
                            message += "Your Attendance is not clear";
                            reason += "Attendance not clear";
                        } else {
                            message += "You were not logged out";
                            reason += "Not logged out";
                        }



                    }
                    if (data.IsLate == true) {

                        if (message != "***") {
                            message += " and ";
                            reason += "; ";
                        }
                        message += "You were late! (In Time - " + inTime[0] + "). Apply to adjust your attendance.";
                        reason += "Late (In Time - " + inTime[0] + ")";



                    }
                    comboData = [
                        { text: "-- Please Select --", value: "-9" },
                        { text: "Attendance", value: "-1" },
                        { text: "Leave", value: "0" },
                        { text: "Outstation", value: "1" }
                    ];
                    $("#divPendingMessage").html(message);
                    $("#divPendingExplanation").show();

                    $("#liLogInTimeApply").hide();
                    $("#liLogOutTimeApply").hide();
                    $("#liLogInTimeActulApply").hide();
                    $("#liLogOutTimeActualApply").hide();
                    if (data != null) {
                        $("#txtLogInTimeApply").val(data.LoginTime);
                        $("#txtLogOutTimeApply").val(data.LogoutTime);

                        $("#txtLogInTimeActulApply").val(data.LoginTime);
                        $("#txtLogOutTimeActualApply").val(data.LogoutTime);
                    } else {
                        $("#txtLogInTimeApply").val("");
                        $("#txtLogOutTimeApply").val("");

                        $("#txtLogInTimeActulApply").val("");
                        $("#txtLogOutTimeActualApply").val("");
                    }


                    $("#hidReason").val(reason);
                    $("#txtareaExplanation").val("");
                    $("#txtareaExplanation").focus();
                    $("#hidAtdStatus").val("NOTLOGOUT");
                    PendingApprovalManager.getLeaveType(hrRecordId);
                    empressCommonHelper.populateLeaveReason("cmbLeaveReason");

                }
                if (data.DefalterType == 1) {
                    message = "You were too late! Apply for a short leave to adjust your attendance or create a movement Log. (In Time - " + inTime[0] + ")";
                    $("#divPendingLeaveApp").show();
                    $("#divPendingExplanation").show();
                    $("#divAddress").show();
                    $("#divReason").show();
                    $("#divPendingMessage").html(message);
                    $("#hidAtdStatus").val("SHORT");
                    PendingApprovalManager.GetShortLeaveType(hrRecordId);
                    empressCommonHelper.populateLeaveReason("cmbLeaveReason");
                    empressCommonHelper.populateLeaveReason("cmbLeaveReason");
                    PendingApprovalManager.getLeaveType(hrRecordId);
                    comboData = [

                { text: "-- Please Select --", value: "-9" },
                { text: "Attendance", value: "-1" },
                        { text: "Leave", value: "0" },
                        { text: "Outstation", value: "1" },
                        { text: "Attendance", value: "-1" }
                    ];

                }
                if (data.DefalterType == 2) {
                    message = "You Are Early Exit ! Apply for a half day leave to adjust your attendance or create a movement Log. (In Time - " + inTime[0] + ")";
                    $("#divPendingLeaveApp").show();
                    $("#divPendingExplanation").show();
                    $("#divPendingMessage").html(message);
                    $("#divAddress").show();
                    $("#divReason").show();
                    $("#hidAtdStatus").val("HALFLEAVE");
                    PendingApprovalManager.getLeaveType(hrRecordId);
                    empressCommonHelper.populateLeaveReason("cmbLeaveReason");
                    comboData = [
                        { text: "-- Please Select --", value: "-9" },
                        { text: "Leave", value: "0" },
                        { text: "Outstation", value: "1" },
                    { text: "Attendance", value: "-1" }
                    ];
                }
                if (data.DefalterType == 3) {
                    message = "You are Absent ! Apply for a leave to adjust your attendance or create a movement Log. (In Time - " + inTime[0] + ")";
                    $("#divPendingLeaveApp").show();
                    $("#divAddress").show();
                    $("#divReason").show();
                    $("#divPendingExplanation").show();
                    $("#divPendingMessage").html(message);
                    $("#hidAtdStatus").val("FULLLEAVE");
                    PendingApprovalManager.getLeaveType(hrRecordId);
                    empressCommonHelper.populateLeaveReason("cmbLeaveReason");
                    comboData = [
                        { text: "-- Please Select --", value: "-9" },
                        { text: "Leave", value: "0" },
                        { text: "Outstation", value: "1" },
                        { text: "Attendance", value: "-1" }
                    ];
                }
                if (data.DefalterType == 4) {
                    message = "You have no out punch ! Apply for Outstation or Leave or attendance adjustment to adjust your attendance. (In Time - " + inTime[0] + ")";
                    $("#divPendingLeaveApp").show();
                    $("#divAddress").show();
                    $("#divReason").show();
                    $("#divPendingExplanation").show();
                    $("#divPendingMessage").html(message);
                    $("#hidAtdStatus").val("FULLLEAVE");
                    PendingApprovalManager.getLeaveType(hrRecordId);
                    empressCommonHelper.populateLeaveReason("cmbLeaveReason");
                    comboData = [
                        { text: "-- Please Select --", value: "-9" },
                        { text: "Leave", value: "0" },
                        //{ text: "Outstation", value: "1" },
                        { text: "Attendance", value: "-1" },
                    ];
                }
                if (data.DefalterType == 5) {
                    message = "You are Early Out ! Apply for Outstation or Short Leave or attendance adjustment to adjust your attendance. (In Time - " + inTime[0] + ")";
                    $("#divPendingLeaveApp").show();
                    $("#divAddress").show();
                    $("#divReason").show();
                    $("#divPendingExplanation").show();
                    $("#divPendingMessage").html(message);
                    $("#hidAtdStatus").val("FULLLEAVE");
                    PendingApprovalManager.getLeaveType(hrRecordId);
                    empressCommonHelper.populateLeaveReason("cmbLeaveReason");
                    comboData = [
                        { text: "-- Please Select --", value: "-9" },
                        { text: "Leave", value: "0" },
                        { text: "Outstation", value: "1" },
                        { text: "Attendance", value: "-1" },
                    ];
                }
                if (data.DefalterType == 6) {
                    message = "Your Out Punch is Missing ! Apply for Outstation or Leave or attendance adjustment to adjust your attendance. (In Time - " + inTime[0] + ")";
                    $("#divPendingLeaveApp").show();
                    $("#divAddress").show();
                    $("#divReason").show();
                    $("#divPendingExplanation").show();
                    $("#divPendingMessage").html(message);
                    $("#hidAtdStatus").val("FULLLEAVE");
                    PendingApprovalManager.getLeaveType(hrRecordId);
                    empressCommonHelper.populateLeaveReason("cmbLeaveReason");
                    comboData = [
                        { text: "-- Please Select --", value: "-9" },
                        { text: "Leave", value: "0" },
                        { text: "Outstation", value: "1" },
                        { text: "Attendance", value: "-1" },
                    ];
                }
            }
            else {

                // EMPLOYEE WAS ABSENT
                message = "You were absent! Apply for a leave to adjust your attendance";
                $("#divPendingLeaveApp").show();
                $("#divPendingMessage").html(message);
                $("#hidAtdStatus").val("ABSENT");
                $("#divAddress").show();
                $("#divReason").show();
                PendingApprovalManager.getLeaveType(hrRecordId);
                empressCommonHelper.populateLeaveReason("cmbLeaveReason");
                comboData = [
                    { text: "-- Please Select --", value: "-9" },
                        { text: "Leave", value: "0" },
                        { text: "Outstation", value: "1" },
                        { text: "Attendance", value: "-1" }
                ];
            }

            $("#cmbAdjustmentType").kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: comboData,
                // filter: "contains",
                // suggest: true,
                placeholder: "Select ",
                // optionLabel: "Please Select...",
                //index: 0,
                change: PendingApprovalHelper.changeAdjustment
            });
            $("#cmbPendingLeaveType").change(function () { PendingApprovalHelper.changeLeaveType(); });





        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
    },

    getLeaveType: function (hrRecordId) {
        //var jsonParam = "";
        //var url = "../Leave/SelectAllLeaveBalanceForDashBoard";
        var jsonParam = "hrRecordId=" + hrRecordId;
        var url = "../Leave/SelectAllLeaveBalanceForDashBoardByHrRecordId";
        AjaxManager.SendJson(url, jsonParam, onSuccess, onFailed);
        function onSuccess(data) {
            PendingApprovalHelper.populateLeaveTypeCombo(data);
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
    },

    SaveAttendanceRequest: function (attendanceRequest) {
        var jsonParam = "strobjAttendanceRequest=" + JSON.stringify(attendanceRequest).replace(/&/g, "^");;
        var url = "../AttendanceRequest/SaveAttendanceRequest";
        AjaxManager.SendJson(url, jsonParam, onSuccess, onFailed);
        function onSuccess(data) {
            if (data == "Success") {


                AjaxManager.MsgBox('success', 'center', 'Success:', 'Attendance Request Sent Successfully.',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            PendingApprovalHelper.clearAttendanceRequestFrom();
                            recomandationRequestHelper.GenerateRecomandationRequestChart();
                        }
                    }]);


            }
            else if (data == "Exist") {
                AjaxManager.MsgBox('warning', 'center', 'Warning:', 'You have already sent adjustment request!',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            PendingApprovalHelper.clearAttendanceRequestFrom();
                        }
                    }]);
            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Login Failed', data,
                       [{
                           addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                               $noty.close();
                           }
                       }]);
            }
        }
        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Login Failed', error.statusText,
                       [{
                           addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                               $noty.close();
                           }
                       }]);
        }
    },

    SaveLeaverequest: function (leaveRequest) {
        var objLeaveInfo = JSON.stringify(leaveRequest).replace(/&/g, "^");
        var jsonParam = 'strobjLeave=' + objLeaveInfo;
        var serviceUrl = "../Leave/SaveLeave/";
        AjaxManager.SendJson(serviceUrl, jsonParam, onSuccess, onFailed);
        function onSuccess(jsonData) {
            if (jsonData == "Success") {

                AjaxManager.MsgBox('success', 'center', 'Success', "Data Save Successfully",
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);

                PendingApprovalHelper.clearAttendanceRequestFrom();
            }
            else {

                AjaxManager.MsgBox('error', 'center', 'Error', jsonData,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
            }
        }

        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
        }
    },

    GetClientInfo: function (hrRecordId) {

        var jsonParam = "hrRecordId=" + hrRecordId;
        var url = "../Client/GetClientInfo";
        AjaxManager.SendJson(url, jsonParam, onSuccess, onFailed);
        function onSuccess(data) {
            PendingApprovalHelper.populateClientCombo(data);
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
    },

    GetShortLeaveInfo: function (hrRecordId) {

        var jsonParam = "hrRecordId=" + hrRecordId;
        var url = "../Leave/SelectShortLeaveInfoForDashBoardByHrRecordId";
        AjaxManager.SendJson(url, jsonParam, onSuccess, onFailed);
        function onSuccess(data) {
            shortLeaveInfo = data;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
    },

    GetShortLeaveType: function (hrRecordId) {

        var jsonParam = "hrRecordId=" + hrRecordId;
        var url = "../Leave/SelectShortLeaveBalanceForDashBoardByHrRecordId";
        AjaxManager.SendJson(url, jsonParam, onSuccess, onFailed);
        function onSuccess(data) {
            PendingApprovalHelper.populateLeaveTypeCombo(data);
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
    },

    SaveOnsiteClient: function (objonSiteClient) {
        var objOnSiteInfo = JSON.stringify(objonSiteClient).replace(/&/g, "^");
        var jsonParam = 'strobjOnSite=' + objOnSiteInfo;
        var serviceUrl = "../OnsiteClient/SaveOnsiteClient/";
        AjaxManager.SendJson(serviceUrl, jsonParam, onSuccess, onFailed);
        function onSuccess(jsonData) {
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success', "Data Save Successfully",
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
                PendingApprovalHelper.clearAttendanceRequestFrom();
            }
            else {

                AjaxManager.MsgBox('error', 'center', 'Error', jsonData,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
            }
        }

        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
        }
    },

    SaveMovementRequest: function (movemntRequest) {
        var jsonParam = "movementLog=" + JSON.stringify(movemntRequest).replace(/&/g, "^");;
        var url = "../Movement/LogMovementForAdmin";
        AjaxManager.SendJson(url, jsonParam, onSuccess, onFailed);
        function onSuccess(data) {
            if (data == "Success") {


                AjaxManager.MsgBox('success', 'center', 'Success:', 'Movement Request Sent Successfully.',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                        }
                    }]);
                PendingApprovalHelper.clearAttendanceRequestFrom();


            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Failed', data,
                       [{
                           addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                               $noty.close();
                           }
                       }]);
            }
        }
        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Login Failed', error.statusText,
                       [{
                           addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                               $noty.close();
                           }
                       }]);
        }
    },

    LoadCOffCombo: function (hrRecordId, coffId) {

        var jsonParam = "hrRecordId=" + hrRecordId;
        var url = "../CoffCertificate/GetCOffApproveByHrRecordId";
        AjaxManager.SendJson(url, jsonParam, onSuccess, onFailed);
        function onSuccess(jsonData) {
            if (jsonData != "") {
                PendingApprovalHelper.populateCOffCombo(jsonData, coffId);
            }
            else {
                PendingApprovalHelper.populateCOffCombo(null, 0);
                alert("You do not have any leave balance");

            }
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
    },



};

var PendingApprovalHelper = {

    GenerateYearCombo: function () {
        $("#cmbYearPendingApproval").kendoComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "2010", value: "2010" },
                { text: "2011", value: "2011" },
                { text: "2012", value: "2012" },
                { text: "2013", value: "2013" },
                { text: "2014", value: "2014" },
                { text: "2015", value: "2015" },
                { text: "2016", value: "2016" },
                { text: "2017", value: "2017" },
                { text: "2018", value: "2018" },
                { text: "2019", value: "2019" },
                { text: "2020", value: "2020" }
            ],
            filter: "contains",
            suggest: true
        });

        var year = new Date().getFullYear();
        var yearCombo = $("#cmbYearPendingApproval").data("kendoComboBox");
        yearCombo.value(year);

        $("#cmbYearPendingApproval").parent().css('width', "7.4em");
    },

    GenerateMonthCombo: function () {
        $("#cmbMonthPendingApproval").kendoComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "January", value: "1" },
                { text: "February", value: "2" },
                { text: "March", value: "3" },
                { text: "April", value: "4" },
                { text: "May", value: "5" },
                { text: "June", value: "6" },
                { text: "July", value: "7" },
                { text: "August", value: "8" },
                { text: "September", value: "9" },
                { text: "October", value: "10" },
                { text: "November", value: "11" },
                { text: "December", value: "12" }
            ],
            filter: "contains",
            suggest: true
        });

        var month = new Date().getMonth() + 1;
        var monthCombo = $("#cmbMonthPendingApproval").data("kendoComboBox");
        monthCombo.value(month);
        $("#cmbMonthPendingApproval").parent().css('width', "7.4em");
        PendingApprovalHelper.GeneratePendingApprovalGrid();
    },

    GeneratePendingApprovalGrid: function () {

        $("#pendingApprovalGrid").kendoGrid({

            dataSource: PendingApprovalManager.gridDataSource(),
            autoBind: true,

            filterable: false,
            sortable: false,
            columns: PendingApprovalHelper.GeneratedPendingApprovalColumns(),
            editable: false,
            scrollable: true,
            navigatable: true,
            height: 200
        });

    },

    GeneratedPendingApprovalColumns: function () {
        return columns = [
            { field: "UserId", title: "UserId", hidden: true },
            { field: "HrRecordId", title: "HrRecordId", hidden: true },
            { field: "AttendanceDate", title: "Date", width: 100, sortable: false, template: '#= kendo.toString(AttendanceDate,"MM/dd/yyyy") #' },
            { field: "Attendance", title: "Attendance", width: 100, sortable: false, template: '#= PendingApprovalHelper.setAttendanceRequestIcon(data) #' },
            { field: "Leave", title: "Leave", width: 100, sortable: false, template: '#= PendingApprovalHelper.setPendingApprovalesIconForLeave(data) #' },
            { field: "OnsiteClient", title: "Outstation", width: 100, sortable: false, template: '#= PendingApprovalHelper.setPendingApprovalesIconForOnSiteClient(data) #' },
            { field: "Movement", title: "Movement", width: 100, sortable: false, template: '#= PendingApprovalHelper.setPendingApprovalesIconForMovement(data) #' }
        ];
    },

    //setAttendanceRequestIcon: function (data) {

    //    if (data.Attendance != "" && data.Attendance != null) {
    //        var clv = data.Attendance.split(',');
    //        if (clv[0] == "Yes") {
    //            var res = '<a href="#" style="xfloat:left"  class="az-icon az-icon-pendingAttendance" title="Send Adjustment Request" onclick="PendingApprovalHelper.loadAttendanceAdjustmentPopup(\'' + kendo.toString(data.AttendanceDate, "MM/dd/yyyy") + '\')" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></span>';
    //            return res;
    //        }
    //        else {
    //            return "";
    //        }
    //    }
    //    else {
    //        return "";
    //    }
    //},

    setAttendanceRequestIcon: function (data) {

        if (data.Attendance != "" && data.Attendance != null) {
            var clv = data.Attendance.split(',');
            if (clv[0] == "Yes") {
                //var res = '<a href="#" style="xfloat:left"  class="az-icon az-icon-pendingAttendance" title="Send Adjustment Request" onclick="PendingApprovalHelper.loadAttendanceAdjustmentPopup(\'' + kendo.toString(data.AttendanceDate, "MM/dd/yyyy") + '\')" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></span>';
                var res = '<a href="#" style="xfloat:left"  class="az-icon az-icon-pendingAttendance" title="Send Adjustment Request" onclick="PendingApprovalHelper.loadAttendanceAdjustmentPopup(\'' + kendo.toString(data.AttendanceDate, "MM/dd/yyyy") + '\',' + data.UserId + ')" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></span>';
                return res;
            }
            else {
                return "";
            }
        }
        else {
            return "";
        }
    },

    setPendingApprovalesIconForLeave: function (data) {

        if (data.Leave != "" && data.Leave != null) {
            var clv = data.Leave.split(',');
            if (clv[0] == "Yes") {
                var res = '<a href="#" style="xfloat:left"  class="az-icon az-icon-pendingApprovales" title="Show Details" onclick="PendingApprovalHelper.RedirectCorrospondingMenu(\'Leave\')" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></span>';
                return res;
            }
            else {
                return "";
            }
        }
        else {
            return "";
        }
    },

    setPendingApprovalesIconForOnSiteClient: function (data) {

        if (data.OnsiteClient != "" && data.OnsiteClient != null) {
            var clv = data.OnsiteClient.split(',');
            if (clv[0] == "Yes") {
                var res = '<a href="#" style="xfloat:left"  class="az-icon az-icon-pendingApprovales" title="Show Details" onclick="PendingApprovalHelper.RedirectCorrospondingMenu(\'OnsiteClient\')" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></span>';
                return res;
            }
            else {
                return "";
            }
        }
        else {
            return "";
        }
    },

    setPendingApprovalesIconForMovement: function (data) {

        if (data.Movement != "" && data.Movement != null) {
            var clv = data.Movement.split(',');
            if (clv[0] == "Yes") {
                var res = '<a href="#" style="xfloat:left"  class="az-icon az-icon-pendingApprovales" title="Show Details" onclick="PendingApprovalHelper.RedirectCorrospondingMenu(\'Movement\')" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></span>';
                return res;
            }
            else {
                return "";
            }
        }
        else {
            return "";
        }
    },

    //loadAttendanceAdjustmentPopup: function (attendanceDate) {

    //    var window = $("#divAttendanceRequestPopupForDashboard");
    //    window.kendoWindow({
    //        width: "400px",
    //        // height: "500px",
    //        draggable: true,
    //        actions: ["Close"],
    //        resizable: false,
    //        margin: 'auto',
    //        top: '20px',
    //        title: "Attendance Adjustment",
    //        close: PendingApprovalHelper.onClose

    //    });


    //    $("#backgroundPopup").css({ "opacity": "0.7" });
    //    $("#backgroundPopup").fadeIn("slow");

    //    $("#txtAtdAdjDate").val(attendanceDate);

    //    PendingApprovalManager.getAttendanceDetails(attendanceDate);
    //    //PendingApprovalManager.getAttendanceDetails(attendanceDate);
    //    window.data("kendoWindow").open();
    //},
    loadAttendanceAdjustmentPopup: function (attendanceDate, userId) {
        //debugger;
        if (CurrentUser.UserId == userId) {


            var window = $("#divAttendanceRequestPopupForDashboard");
            window.kendoWindow({
                width: "400px",
                // height: "500px",
                draggable: true,
                actions: ["Close"],
                resizable: false,
                margin: 'auto',
                top: '20px',
                title: "Attendance Adjustment",
                close: PendingApprovalHelper.onClose

            });


            $("#backgroundPopup").css({ "opacity": "0.7" });
            $("#backgroundPopup").fadeIn("slow");

            $("#txtAtdAdjDate").val(attendanceDate);

            PendingApprovalManager.getAttendanceDetails(attendanceDate, userId);
            //PendingApprovalManager.getAttendanceDetails(attendanceDate);
            window.data("kendoWindow").open();
        }
    },

    onClose: function () {
        $("#txtAtdAdjDate").val("");
        $("#divPendingMessage").html("");
        $("#hidReason").val("");
        $("#txtareaExplanation").val("");
        $("#hidAtdStatus").val("");
        $("#cmbPendingLeaveType").val("Select Leave Type...");
        $("#backgroundPopup").fadeOut("slow");
        $("#divCoffCertificate").hide();
        $("#divPendingClient").hide();
        $("#cmbAdjustmentType").data("kendoDropDownList").value("0");
        $("#divPendingClient").hide();
        $("#divPendingLeaveApp").show();
        $("#divAddress").show();
        $("#divReason").show();
        $("#divPendingExplanation").show();

        $("#divOutTime").hide();
        $("#divInTime").hide();
        close();

    },

    RedirectCorrospondingMenu: function (type) {
        if (type.trim() == "Leave") {
            window.location.href = "../Leave/LeaveApplication";
        }
        else if (type.trim() == "OnsiteClient") {
            window.location.href = "../Attendance/OnsiteClient";
        }
        else if (type.trim() == "Movement") {
            window.location.href = "../Attendance/Movement";
        }
    },

    populateLeaveTypeCombo: function (data) {
        $("#cmbPendingLeaveType").kendoComboBox({
            placeholder: "Select Leave Type...",
            dataTextField: "TypeName",
            dataValueField: "LeaveType",
            dataSource: data,
            filter: "contains",
            suggest: true
        });
    },


    SendAttendanceAdjustment: function () {
        //debugger;
        isShortLeave = false;
        var adjustmentType = $("#cmbAdjustmentType").data("kendoDropDownList").value();
        if (adjustmentType == -9) {
            AjaxManager.MsgBox('warning', 'center', 'Warning', "Please Select Valid Adjustment Type",
                     [{
                         addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                             $noty.close();
                         }
                     }]);
            return 0;
        }
        if (adjustmentType == -1) {

            PendingApprovalHelper.CreateAttendanceRequest();
        }
        if (adjustmentType == 0) {


            var leaveTypeId = $("#cmbPendingLeaveType").data("kendoComboBox").value();
            if (shortLeaveInfo != null) {
                if (leaveTypeId == shortLeaveInfo.LeaveType) {
                    isShortLeave = true;
                    PendingApprovalHelper.CreateMovementRequest();
                } else {
                    PendingApprovalHelper.CreateLeaveRequest();
                }
            } else {
                PendingApprovalHelper.CreateLeaveRequest();
            }
        }
        if (adjustmentType == 1) {
            if ($('#hidAtdStatus').val() == "ABSENT") {
                PendingApprovalHelper.CreateOnSiteClientRequest();
            } else {
                PendingApprovalHelper.CreateMovementRequest();
            }
        }


        //if ($('#hidAtdStatus').val() == "ABSENT") {
        //    PendingApprovalHelper.CreateLeaveRequest();
        //}
        //else {
        //    PendingApprovalHelper.CreateAttendanceRequest();
        //}
    },

    clearAttendanceRequestFrom: function () {
        $("#txtAtdAdjDate").val("");
        $("#divPendingMessage").html("");
        $("#hidReason").val("");
        $("#txtareaExplanation").val("");
        $("#hidAtdStatus").val("");
        $("#cmbPendingLeaveType").val("Select Leave Type...");

        $("#divPendingClient").hide();
        $("#divPendingLeaveApp").show();


        $("#cmbShortLeaveSlot").val("");

        $("#backgroundPopup").fadeOut("slow");
        var window = $("#divAttendanceRequestPopupForDashboard");
        window.data("kendoWindow").close();
    },

    CreateAttendanceRequest: function () {

        if ($('#txtAtdAdjDate').val() == "") {
            alert("Please enter explaination!");
            return false;
        }
        var attendanceRequest = new Object();
        attendanceRequest.AdjustmentRequestId = "0";
        attendanceRequest.AttendanceDate = $('#txtAtdAdjDate').val();
        attendanceRequest.Reason = $('#hidReason').val();
        attendanceRequest.Explanation = $('#txtareaExplanation').val();
        if (attendanceRequest.Explanation == "") {
            alert("Please enter explaination!");
            return false;
        }
        attendanceRequest.UserId = gbUserId == 0 ? $("#hdnUserId").val() : gbUserId;
        attendanceRequest.AppliedDate = AjaxManager.changeFormattedDate(new Date(), "MMDDYYYY");
        PendingApprovalManager.SaveAttendanceRequest(attendanceRequest);
    },

    CreateLeaveRequest: function () {


        var leavetypeId = $("#cmbPendingLeaveType").val();
        var comboboxforleaveType = $("#cmbPendingLeaveType").data("kendoComboBox");
        var leaveTypeName = comboboxforleaveType.text();
        if (leavetypeId == leaveTypeName) {
            status.text("Oops! Leave Type is invalid.").addClass("invalid");
            return false;
        }



        var leaveApplication = new Object();
        leaveApplication.LeaveId = 0;
        leaveApplication.LeaveType = $('#cmbPendingLeaveType').val();
        leaveApplication.HRRecordId = gbhrRecordId == 0 ? $("#hdnHrRecordId").val() : gbhrRecordId;
        leaveApplication.LeaveFrom = $('#txtAtdAdjDate').val();
        leaveApplication.LeaveTo = $('#txtAtdAdjDate').val();

        var hdnStatus = $("#hidAtdStatus").val();

        if (hdnStatus == "HALFLEAVE") {
            leaveApplication.LeaveDays = 0.5;
            leaveApplication.HalfDaySlot = 1;
        } else {
            leaveApplication.LeaveDays = 1;
            leaveApplication.HalfDaySlot = -1;
        }

        leaveApplication.Reason = $("#txtareaExplanation").val();

        if (leaveApplication.Reason == "") {
            alert("Please enter explaination!");
            return false;
        }
        leaveApplication.Address = $("#txtareaAddress").val();
        leaveApplication.IsRecommanded = false;
        leaveApplication.RecommanderId = 0;
        leaveApplication.ApproverId = 0;
        leaveApplication.LeaveReasonId = $("#cmbLeaveReason").data("kendoDropDownList").value();
        if (leaveApplication.LeaveReasonId == "") {
            leaveApplication.LeaveReasonId = 0;
        }


        if (leaveApplication.LeaveReasonId == 0) {
            alert("Please Select Leave reason");
            return false;
        }
        var leaveType = $("#cmbPendingLeaveType").data("kendoComboBox").dataItem();
        if (leaveType._LeavePolicy != null) {

            if (leaveType._LeavePolicy.IsHolidayReplacement == 1) {
                leaveApplication.ReferenceId = $("#cmbDateOfWork").data("kendoComboBox").value();
                if (leaveApplication.LeaveDays > 1) {
                    alert("COff Leave cannot be more than one day");
                    return false;
                }
                if ($("#cmbDateOfWork").val() == 0) {
                    alert("Please select a C\Off Certificate");
                    return false;
                }
            } else {
                leaveApplication.ReferenceId = 0;
            }

        }
        PendingApprovalManager.SaveLeaverequest(leaveApplication);
    },

    CreateMovementRequest: function () {

        var objMovementLog = new Object();
        objMovementLog.UserId = gbUserId == 0 ? $("#hdnUserId").val() : gbUserId;
        objMovementLog.HRRecordId = $("#hdnHrRecordId").val();
        //objMovementLog.MovementDate = AjaxManager.changeFormattedDate($("#txtAtdAdjDate").val(), "MMDDYYYY");
        objMovementLog.MovementDate = $("#txtAtdAdjDate").val();

        objMovementLog.Remarks = $("#txtareaExplanation").val();

        if (objMovementLog.Remarks == "") {
            alert("Please enter explaination!");
            return false;
        }
        objMovementLog.ExpectedReturnTime = "";
        objMovementLog.ProjectCode = "";
        objMovementLog.IsBackToOffice = "False";
        objMovementLog.IsApproved = "False";
        objMovementLog.InTime = $("#txtInTime").val();
        objMovementLog.OutTime = $("#txtOutTime").val();


        if ($("#cmbClientName").val() == "0" || $("#cmbClientName").val() == "") {
            objMovementLog.ClientCode = "";
            objMovementLog.ClientName = "";
        } else {
            objMovementLog.ClientCode = $("#cmbClientName").data("kendoComboBox").value();
            objMovementLog.ClientName = $("#cmbClientName").data("kendoComboBox").text().replace('&', '^');
        }
        objMovementLog.ConvenceAmount = "0";
        objMovementLog.HdnStateus = $("#hidAtdStatus").val();

        if (objMovementLog.HdnStateus == "NOTLOGOUT" || objMovementLog.HdnStateus == "SHORT") {
            if (isShortLeave == true) {
                objMovementLog.MovementType = -2;
                objMovementLog.Status = -2;
                objMovementLog.ShortLeaveSlot = $("#cmbShortLeaveSlot").val() == "" ? "0" : $("#cmbShortLeaveSlot").val();
                if (objMovementLog.ShortLeaveSlot == 0) {
                    Message.Warning("Please select short leave slot");
                    return false;
                }
            } else {
                objMovementLog.MovementType = -3;
                objMovementLog.Status = -3;
            }

        }


        if (objMovementLog.HdnStateus == "HALFLEAVE" || objMovementLog.HdnStateus == "FULLLEAVE") {
            if (isShortLeave == true) {
                AjaxManager.MsgBox('warning', 'center', 'Warning', "You cannot apply short Leave for this kind of ractification",
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);

                return false;
            } else {
                objMovementLog.MovementType = -3;
                objMovementLog.Status = -3;
            }

        }

        if (objMovementLog.HdnStateus == "ABSENT") {
            if (isShortLeave == true) {
                Message.Warning("You are absent. So you can not apply short leave.");
                return false;
            }

        }

        if (objMovementLog.MovementType == -3) {

            var preferedStartDate = $("#txtOutTime").data("kendoTimePicker").value();
            var preferedEndDate = $("#txtInTime").data("kendoTimePicker").value();
            if (objMovementLog.InTime == "") {
                alert("Please enter In time!");
                return false;
            }
            if (objMovementLog.OutTime == "") {
                alert("Please enter Out time!");
                return false;
            }

            if (preferedStartDate > preferedEndDate) {
                alert("Oops! In Time should be greater or equal to Out Time");
                return false;
            }

        }
        PendingApprovalManager.SaveMovementRequest(objMovementLog);
        //objMovementLog.LeaveType = $("#cmbLeaveType").val();

    },

    CreateOnSiteClientRequest: function () {

        var objOnsiteClient = new Object();
        objOnsiteClient.OnsiteClientId = 0;
        objOnsiteClient.UserId = gbUserId == 0 ? $("#hdnUserId").val() : gbUserId;
        //var clientCode = $("#cmbClient").val();
        var comboboxforclient = $("#cmbClientName").data("kendoComboBox");
        objOnsiteClient.ClientName = comboboxforclient.text();
        objOnsiteClient.ClientCode = comboboxforclient.value();
        //objOnsiteClient.ClientName = clientName.replace('&', '^');
        objOnsiteClient.ProjectCode = "";
        objOnsiteClient.FromDate = $('#txtAtdAdjDate').val();
        objOnsiteClient.ToDate = $('#txtAtdAdjDate').val();
        objOnsiteClient.Remarks = $('#txtareaExplanation').val().replace('&', '^');
        objOnsiteClient.DayNo = 1;
        if (objOnsiteClient.Remarks == "") {
            alert("Please enter explaination!");
            return false;
        }

        PendingApprovalManager.SaveOnsiteClient(objOnsiteClient);

    },


    populatePendingApprovalByYearAndMonth: function () {

        var monthName = $("#cmbMonthPendingApproval").val();
        var yearName = $("#cmbYearPendingApproval").val();

        if (!AjaxManager.isDigit(monthName)) {

            var month = new Date().getMonth() + 1;
            var monthCombo = $("#cmbMonthPendingApproval").data("kendoComboBox");
            monthCombo.value(month);
            $("#pendingApprovalGrid").empty();
            $("#pendingApprovalGrid").kendoGrid();
            return false;
        }

        if (!AjaxManager.isDigit(yearName)) {

            var year = new Date().getFullYear();
            var yearCombo = $("#cmbYearPendingApproval").data("kendoComboBox");
            yearCombo.value(year);
            $("#pendingApprovalGrid").empty();
            $("#pendingApprovalGrid").kendoGrid();
            return false;
        }

        $("#pendingApprovalGrid").empty();
        $("#pendingApprovalGrid").kendoGrid();

        PendingApprovalHelper.GeneratePendingApprovalGrid();

    },

    changeAdjustment: function () {
        //debugger;
        var adjustmentType = $("#cmbAdjustmentType").data("kendoDropDownList").value();

        if (adjustmentType == 1) {
            $("#divPendingClient").show();
            $("#cmbPendingLeaveType").val("");
            $("#divPendingLeaveApp").hide();
            $("#liShortLeaveSlot").hide();
            $("#cmbShortLeaveSlot").val("");
            $("#divAddress").hide();
            $("#divReason").hide();
            $("#divPendingExplanation").show();

            $("#divOutTime").show();
            $("#divInTime").show();
        }
        else if (adjustmentType == 0) {
            $("#divPendingClient").hide();
            $("#divPendingLeaveApp").show();
            $("#cmbPendingLeaveType").val("");
            $("#cmbPendingLeaveType").val("Select Leave Type...");
            $("#divAddress").show();
            $("#divReason").show();
            $("#divPendingExplanation").show();

            $("#divOutTime").hide();
            $("#divInTime").hide();

        }
        else if (adjustmentType == -1) {
            //$("#divPendingClient").hide();
            //$("#cmbPendingLeaveType").val("");
            //$("#divPendingLeaveApp").hide();
            //$("#liShortLeaveSlot").hide();
            //$("#cmbShortLeaveSlot").val("");
            //$("#divAddress").hide();
            //$("#divReason").hide();
            //$("#divPendingExplanation").show();

            //$("#divOutTime").hide();
            //$("#divInTime").hide();

            $("#btnSendRequestForAttendanceAdjustmentStatus").hide();
            $("#txtareaExplanation").hide();
            $("#lblExplanation").hide();


            $("#divPendingClient").hide();
            $("#divPendingLeaveApp").hide();
            $("#liShortLeaveSlot").hide();
            $("#divAddress").hide();
            $("#divReason").hide();
            $("#divOutTime").hide();
            $("#divInTime").hide();
            var baseurl = window.location.origin;
            var attendanceurl = baseurl + '/Attendance/AttendanceRequest';
            window.open(attendanceurl);


        } else {
            $("#divPendingClient").hide();
            $("#cmbPendingLeaveType").val("");
            $("#divPendingLeaveApp").hide();
            $("#liShortLeaveSlot").hide();
            $("#cmbShortLeaveSlot").val("");
            $("#divAddress").hide();
            $("#divReason").hide();

            $("#divOutTime").hide();
            $("#divInTime").hide();

        }


    },

    populateClientCombo: function (data) {
        $("#cmbClientName").kendoComboBox({
            placeholder: "Select Purpose",
            dataTextField: "ClientName",
            dataValueField: "ClientCode",
            dataSource: data,
            filter: "contains",
            suggest: true
        });
    },

    changeLeaveType: function () {

        var leaveType = $("#cmbPendingLeaveType").data("kendoComboBox").dataItem();
        if (leaveType._LeavePolicy != null) {
            if (leaveType._LeavePolicy.IsHolidayReplacement == 1) {

                $("#divCoffCertificate").show();
                var hrRecordId = CurrentUser.EmployeeId;
                PendingApprovalManager.LoadCOffCombo(hrRecordId, 0);
            } else {
                $("#divCoffCertificate").hide();
            }

            if (leaveType._LeavePolicy.IsShortLeave == 1) {
                PendingApprovalHelper.populateShortLeaveSlotCombo();
                $("#liShortLeaveSlot").show();
            } else {
                $("#liShortLeaveSlot").hide();
                $("#cmbShortLeaveSlot").val("");
            }
        } else {
            $("#liShortLeaveSlot").hide();
            $("#cmbShortLeaveSlot").val("");
        }

    },

    populateCOffCombo: function (jsonData, coffId) {

        $("#cmbDateOfWork").kendoComboBox({
            placeholder: "Select",
            dataTextField: "DateDescription",
            dataValueField: "COffId",
            dataSource: jsonData
        });

    },

    populateShortLeaveSlotCombo: function () {
        var data = [
            { text: "First Slot", value: "1" },
            { text: "Last Slot", value: "2" }
        ];

        var systemSetting = empressCommonManager.GetSystemSettingsDataByCompanyId(CurrentUser.CompanyId);

        if (systemSetting != null) {
            if (systemSetting.ShortLeaveSlot == 1) {
                data = [
                    { text: "First Slot", value: "1" }
                ];
            }
            if (systemSetting.ShortLeaveSlot == 2) {
                data = [
                    { text: "Last Slot", value: "2" }
                ];
            }
        }


        $("#cmbShortLeaveSlot").kendoComboBox({
            placeholder: "Select Short Leave Slot...",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: data,
            filter: "contains",
            suggest: true
        });
    },



};