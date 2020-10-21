
var gbCompanyListArray = [];
var gbBranchListArray = [];

$(document).ready(function () {

    EmailNotificationConfigHelper.GenerateEmailNotificationConfigGrid();

    $("#btnSaveNotificationConfig").click(function () {
        EmailNotificationConfigHelper.UpdateEmailNotificationConfig();
    });

    $("#btnSaveMapping").click(function () {
        EmailNotificationConfigHelper.SaveEmailNotificationConfigMapWithCompanyBranch();
    });

    $("#btnSearchEmployeeId").click(function () {
        var employeeId = $("#txtEmployeeId").val();
        if (employeeId != '') {
            var data = empressCommonManager.SearchEmploymentInformationByEmployeeCode(employeeId);
            if (data != null) {
                $("#liEmpDetails").show();
                $("#hdnHrRecordId").val(data.HrRecordId);
                $("#lblEmployeeName").html(data.EmployeeName);
                $("#lblLocation").html(data.BranchName);
            } else {
                Message.Warning("No employee found by this employee id");
                return false;
            }
        }
        else {
            Message.Warning("Please enter employee id");
            return false;
        }
    });

    $("#txtEmployeeId").keypress(function (event) {
        if (event.keyCode == 13) {
            var employeeId = $("#txtEmployeeId").val();
            if (employeeId != '') {
                var data = empressCommonManager.SearchEmploymentInformationByEmployeeCode(employeeId);
                if (data != null) {
                    $("#liEmpDetails").show();
                    $("#hdnHrRecordId").val(data.HrRecordId);
                    $("#lblEmployeeName").html(data.EmployeeName);
                    $("#lblLocation").html(data.BranchName);
                } else {
                    Message.Warning("No employee found by this employee id");
                    return false;
                }
            }
            else {
                Message.Warning("Please enter employee id");
                return false;
            }
        }
    });

    $("#btnAddExceptionList").click(function () {
        var employeeId = $("#txtEmployeeId").val();
        if (employeeId != '') {
            var data = empressCommonManager.SearchEmploymentInformationByEmployeeCode(employeeId);
            if (data != null) {
                $("#liEmpDetails").show();
                $("#hdnHrRecordId").val(data.HrRecordId);
                $("#lblEmployeeName").html(data.EmployeeName);
                $("#lblLocation").html(data.BranchName);
                EmailNotificationConfigHelper.SaveEmployeeInExceptionList(data.HrRecordId);

            } else {
                Message.Warning("No employee found by this employee id");
                return false;
            }
        }
        else {
            Message.Warning("Please enter employee id");
            return false;
        }
    });
    $("#divMappingPopUp").kendoWindow({
        title: "Mapping With Company and Location",
        resizeable: true,
        width: "90%",
        actions: ["Pin", "Maximize", "Close"],
        modal: true,
        visible: false,
    });

});

var emailNotificationArray = [];


var EmailNotificationConfigHelper = {

    UpdateEmailNotificationConfig: function () {

        var obj = EmailNotificationConfigHelper.CreateEmailNotificationConfigObject();


        AjaxManager.MsgBox('information', 'center', 'Confirmation', 'Are you sure to update email notification configuration?',
            [{
                addClass: 'btn btn-primary',
                text: 'Yes',
                onClick: function ($noty) {
                    $noty.close();
                    if (obj != null) {
                        var jsonParam = "objEmailNotification:" + JSON.stringify(emailNotificationArray);
                        var url = "../EmailNotificationConfig/UpdateEmailNotificationConfig";

                        AjaxManager.SendJson2(url, jsonParam, onSuccess, onFailed);
                    }
                }
            }, {
                addClass: 'btn',
                text: 'Cancel',
                onClick: function ($noty) {
                    $noty.close();
                }
            }]);


        function onSuccess(jsonData) {

            if (jsonData == "Success") {
                $("#gridEmailNotificationConfig").data('kendoGrid').dataSource.read();

                AjaxManager.MsgBox('success', 'center', 'Success', "Successfully updated",
                    [{
                        addClass: 'btn btn-primary',
                        text: 'OK',
                        onClick: function ($noty) {
                            $noty.close();
                        }
                    }]);

            } else {
                AjaxManager.MsgBox('error', 'center', 'Failed', jsonData,
                    [{
                        addClass: 'btn btn-primary',
                        text: 'OK',
                        onClick: function ($noty) {
                            $noty.close();
                        }
                    }]);
            }
        }

        function onFailed(error) {
            window.alert(error.statusText);
        }
    },

    CreateEmailNotificationConfigObject: function () {
        emailNotificationArray = [];

        var gridNotifications = $("#gridEmailNotificationConfig").data("kendoGrid");
        var gridData = gridNotifications.dataSource.data();
        for (var i = 0; i < gridData.length; i++) {
            var notification = gridData[i];

            var objNotification = new Object();


            objNotification.EmailNotificationConfigId = notification.EmailNotificationConfigId;
            objNotification.NotificationTypeId = notification.NotificationTypeId;
            objNotification.NotificationTitle = notification.NotificationTitle;
            objNotification.NotificationKey = notification.NotificationKey;
            objNotification.IsManualRunning = notification.IsManualRunning;
            objNotification.ManualRunningDate = notification.ManualRunningDate;
            objNotification.IsEnable = notification.IsEnable;
            objNotification.IsFirstReminder = notification.IsFirstReminder;
            objNotification.FirstReminderBeforeDays = notification.FirstReminderBeforeDays;
            objNotification.IsSecondReminder = notification.IsSecondReminder;
            objNotification.SecondReminderSendBeforeDays = notification.SecondReminderSendBeforeDays;
            objNotification.IsThirdReminder = notification.IsThirdReminder;
            objNotification.ThirdReminderSendBeforeDays = notification.ThirdReminderSendBeforeDays;
            objNotification.ServiceRunningTimeSchedule = kendo.toString(notification.ServiceRunningTimeSchedule, "HH:mm");
            objNotification.EmailProcessAfterSendingHour = notification.EmailProcessAfterSendingHour;
            objNotification.ScheduleType = notification.ScheduleType;

            emailNotificationArray.push(objNotification);

        }
        return emailNotificationArray;
    },

    GenerateEmailNotificationConfigGrid: function () {

        $("#gridEmailNotificationConfig").kendoGrid({
            dataSource: EmailNotificationConfigHelper.EmailNotificationConfigGridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },
            filterable: false,
            sortable: true,
            columns: EmailNotificationConfigHelper.GenerateEmailNotificationConfigColumns(),
            editable: true,
            navigatable: true,
            selectable: "row"
        });
    },

    GenerateEmailNotificationConfigColumns: function () {

        return columns = [
            { field: "EmailNotificationConfigId", title: "Email Notification<br>Config Id", width: 50, hidden: true },
            { field: "NotificationTypeId", title: "Notification<br>Type Id", width: 50, hidden: true },
            { field: "NotificationTitle", title: "Notification Title", width: 70, hidden: false, editable: false },
            { field: "NotificationKey", title: "Notification Key", width: 50, hidden: true, editable: false },
            { field: "IsManualRunning", title: "Is Manual<br>Running", width: 30, hidden: false },
            { field: "ManualRunningDate", title: "Manual Running<br>Date", width: 40, format: "dd-MM-yyyy", template: "#=kendo.toString(ManualRunningDate,'dd/MM/yyyy')=='01/01/0001'?'': kendo.toString(ManualRunningDate,'dd/MM/yyyy')#", hidden: false },
            { field: "IsEnable", title: "Is Enable", width: 30, hidden: false },
            { field: "IsFirstReminder", title: "Is First<br>Reminder", width: 30, hidden: false },
            { field: "FirstReminderBeforeDays", title: "Days", width: 30, hidden: false },
            { field: "IsSecondReminder", title: "Is Second<br>Reminder", width: 30, hidden: false },
            { field: "SecondReminderSendBeforeDays", title: "Days", width: 30, hidden: false },
            { field: "IsThirdReminder", title: "Is Third<br>Reminder", width: 30, hidden: false },
            { field: "ThirdReminderSendBeforeDays", title: "Days", width: 30, hidden: false },
            { field: "ServiceRunningTimeSchedule", title: "Service Running<br>Time", width: 40, hidden: false, format: "{0:HH:mm}", editor: EmailNotificationConfigHelper.EditorTemplateForTimePicker, },
            { field: "EmailProcessAfterSendingHour", title: "Email Process<br>After Sending<br>(Minute)", width: 35, hidden: false, },
            { field: "ScheduleType", title: "Schedule Type", width: 35, hidden: false, editor: EmailNotificationConfigHelper.ScheduleTypeDropDownEditor, template: "#=ScheduleType != null ? ScheduleType : '-Select-'#" },
            { field: "Edit", title: "Action", filterable: false, width: 20, editable: false, sortable: false, template: '<button type="button" class="k-button " id="btnMapping" onClick="EmailNotificationConfigHelper.ClickEventForMapping()"><span class="k-icon k-i-custom"></span></button>' }

        ];
    },

    EmailNotificationConfigGridDataSource: function () {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 500,
            transport: {
                read: {
                    url: '../EmailNotificationConfig/GetEmailNotificationConfigGridData/',
                    type: "post",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options) {
                    return JSON.stringify(options);
                }
            },
            schema: {
                data: "Items",
                total: "TotalCount",
                model: {
                    fields: {
                        NotificationTitle: {
                            type: "text",
                            editable: false,
                        },
                        NotificationKey: {
                            type: "text",
                            editable: false,
                        },
                        ManualRunningDate: {
                            type: "date",
                            // format: "dd/MM/yyyy"
                        },
                        IsManualRunning: {
                            type: "boolean",
                        },
                        IsEnable: {
                            type: "boolean",
                        },
                        IsFirstReminder: {
                            type: "boolean",
                        },
                        FirstReminderBeforeDays: {
                            type: "number",
                        },
                        IsSecondReminder: {
                            type: "boolean",
                        },
                        SecondReminderSendBeforeDays: {
                            type: "number",
                        },
                        IsThirdReminder: {
                            type: "boolean",
                        },
                        ThirdReminderSendBeforeDays: {
                            type: "number",
                        },
                        ServiceRunningTimeSchedule: {
                            type: "time",
                            // format: "HH:mm"
                        },
                        EmailProcessAfterSendingHour: {
                            type: "number",
                        },
                        Edit: {
                            editable: false,
                        },
                    },
                },

            }
        });
        return gridDataSource;
    },

    ScheduleTypeDropDownEditor: function (container, options) {

        var obj = [
            { ScheduleTypeText: "Daily", value: "Daily" },
            { ScheduleTypeText: "Monthly", value: "Monthly" },
            { ScheduleTypeText: "Yearly", value: "Yearly" }
        ];

        $('<input required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                autoBind: false,
                dataSource: obj,
                dataTextField: "ScheduleTypeText",
                dataValueField: "ScheduleType",
                optionLabel: '-Select-',

            });
    },

    EditorTemplateForTimePicker: function (container, options) {

        $('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
                .appendTo(container)
                .kendoTimePicker({});
    },



    GetEmailNotificationConfig: function () {
        var objNotification = [];
        var jsonParam = "";
        var serviceUrl = "../EmailNotificationConfig/GetEmailNotificationConfigGridData/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objNotification = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objNotification;
    },

    ClickEventForMapping: function () {
        gbBranchListArray = [];

        var gridData = $("#gridEmailNotificationConfig").data("kendoGrid");
        var data = gridData.dataItem(gridData.select());
        if (data != null) {
            $("#hdnNotificationTypeId").val(data.NotificationTypeId);
            $("#hdnEmailNotificationConfigId").val(data.EmailNotificationConfigId);
            //var notificationTypeId = $("#hdnNotificationTypeId").val();
            //var emailNotificationConfigId = $("#hdnEmailNotificationConfigId").val();

            EmailNotificationConfigHelper.GetBranchMappintData(data.EmailNotificationConfigId);

            EmailNotificationConfigHelper.GenerateCompanyGrid(data.EmailNotificationConfigId);
            EmailNotificationConfigHelper.GetRowDataForCompanyGrid();

            EmailNotificationConfigHelper.GenerateEmployeeExceptionListGrid();

            $("#divMappingPopUp").data("kendoWindow").open().center();
        }

    },

    SaveEmployeeInExceptionList: function (hrRecordId) {
        var obj = new Object();
        obj.HrRecordId = hrRecordId;
        obj.NotificationTypeId = $("#hdnNotificationTypeId").val();

        var objExceptionList = JSON.stringify(obj).replace('&', '^');
        var jsonParam = 'objExceptionList:' + objExceptionList;
        var serviceUrl = "../EmailNotificationConfig/SaveEmployeeInExceptionList";
        AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);

        function onSuccess(jsonData) {
            if (jsonData == "Success") {

                Message.SuccessMessage("Employee successfully added in exception list", function () {
                    //EmailNotificationConfigHelper.GenerateEmployeeExceptionListGrid();
                    $("#gridEmployeeExceptionList").data("kendoGrid").dataSource.read();
                    EmailNotificationConfigHelper.ClearEmployeeDetails();
                });

            } else {
                Message.Error(jsonData);
            }
        }
        function onFailed(error) {
            Message.Error(error);
        }
    },

    DeleteEmployeeFromExceptionList: function () {
        //debugger;
        var gridData = $("#gridEmployeeExceptionList").data("kendoGrid");
        var data = gridData.dataItem(gridData.select());
        if (data != null) {
            var hrRecordId = data.HrRecordId;
            var notificationTypeId = $("#hdnNotificationTypeId").val();
            var jsonParam = 'hrRecordId:' + hrRecordId + ',notificationTypeId:' + notificationTypeId;
            var serviceUrl = "../EmailNotificationConfig/DeleteEmployeeFromExceptionList";

            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }

        function onSuccess(jsonData) {
            if (jsonData == "Success") {

                Message.SuccessMessage("Employee successfully removed from exception list", function () {
                    $("#gridEmployeeExceptionList").data("kendoGrid").dataSource.read();
                });
            } else {
                Message.Error(jsonData);
            }
        }
        function onFailed(error) {
            Message.Error(error);
        }
    },

    GenerateEmployeeExceptionListGrid: function () {
        var notificationTypeId = $("#hdnNotificationTypeId").val();
        $("#gridEmployeeExceptionList").kendoGrid({
            dataSource: EmailNotificationConfigHelper.EmployeeExceptionListGridDataSource(notificationTypeId),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },
            filterable: true,
            sortable: true,
            columns: EmailNotificationConfigHelper.GenerateEmployeeExceptionListColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });
    },

    EmployeeExceptionListGridDataSource: function (notificationTypeId) {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 50,
            transport: {
                read: {
                    url: '../EmailNotificationConfig/GetEmployeeExceptionListGridData/?notificationTypeId=' + notificationTypeId,
                    type: "post",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options) {
                    return JSON.stringify(options);
                }
            },
            schema: {
                data: "Items",
                total: "TotalCount",
            }
        });
        return gridDataSource;
    },

    GenerateEmployeeExceptionListColumns: function () {

        return columns = [
            { field: "HrRecordId", title: "HrRecordId", width: 50, hidden: true },
            { field: "EmployeeId", title: "Employee Id", width: 50, hidden: false },
            { field: "EmployeeName", title: "Employee Name", width: 70, hidden: false },
            { field: "BranchName", title: "Location", width: 70, hidden: false },
            { field: "DesignationName", title: "Designation", width: 70, hidden: false },
            { field: "Edit", title: "Action", filterable: false, width: 40, editable: false, sortable: false, template: '<button type="button" class="k-button " id="btnRemove" onClick="EmailNotificationConfigHelper.DeleteEmployeeFromExceptionList()">Remove</button>' }
        ];
    },

    ClearEmployeeDetails: function () {
        $("#hdnHrRecordId").val("0");
        $("#txtEmployeeId").val("");
        $("#lblEmployeeName").html("");
        $("#lblLocation").html("");
        $("#liEmpDetails").hide();
    },



    //Company Part

    GenerateCompanyGrid: function (emailNotificationConfigId) {
        var gridDataSource = EmailNotificationConfigHelper.GridDataSourceForCompany();
        var grid = $("#gridCompanyForMapping").data("kendoGrid");
        if (grid != null) {
            grid.destroy();
            $("#gridCompanyForMapping").empty();
        }


        $("#gridCompanyForMapping").kendoGrid({
            dataSource: gridDataSource,
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
                pageSizes: [10, 20, 50, 100, 150, 200, 500, 1000]
            },
            xheight: 250,
            filterable: true,
            sortable: true,
            columns: EmailNotificationConfigHelper.GeneratedCompanyColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",
            detailInit: function (e) {
                EmailNotificationConfigHelper.InitLocationGrid(e, emailNotificationConfigId);
            },
            dataBound: function () {
                this.expandRow(this.tbody.find("tr.k-master-row").first());
            },

            detailExpand: function (e) {

                if (gbBranchListArray.length > 0) {
                    for (var i = 0; i < gbBranchListArray.length; i++) {
                        $("#check_rowForBranch" + gbBranchListArray[i].BranchId + 'CompanyId' + gbBranchListArray[i].CompanyId + 'ConfigId' + gbBranchListArray[i].EmailNotificationConfigId).attr('checked', true);
                    }
                }
            }
        });
    },

    GridDataSourceForCompany: function () {

        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 50,
            transport: {
                read: {
                    url: '../Company/GetActiveCompanyGridData',
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options) {
                    return JSON.stringify(options);
                }
            },
            schema: { data: "Items", total: "TotalCount" }
        });
        return gridDataSource;
    },

    GeneratedCompanyColumns: function () {
        return columns = [
            //{ field: "check_rowForCompany", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= EmailNotificationConfigHelper.CheckedDataForCompany(data) #' },
            { field: "CompanyId", title: "CompanyId", width: 50, hidden: true },
            { field: "CompanyName", title: "Company Name", width: 100, sortable: true }
        ];
    },

    CheckedDataForCompany: function (data) {

        if (gbCompanyListArray.length > 0) {

            var result = gbCompanyListArray.filter(function (obj) {
                return obj.CompanyId == data.CompanyId;
            });
            if (result.length > 0) {
                return '<input id="check_rowForCompany' + data.CompanyId + '" class="check_rowForCompany" type="checkbox" checked="checked"/>';
            } else {
                return '<input id="check_rowForCompany' + data.CompanyId + '" class="check_rowForCompany" type="checkbox"/>';
            }

        } else {
            return '<input id="check_rowForCompany' + data.CompanyId + '" class="check_rowForCompany" type="checkbox"/>';
        }
    },

    GetRowDataForCompanyGrid: function () {

        $('.check_rowForCompany').click(function (e) {

            var $cb = $(this);
            var gridSummary = $("#gridCompanyForMapping").data("kendoGrid");
            var selectedItem = gridSummary.dataItem(gridSummary.select()); //$kgrid.attr('k-state-selected');
            if ($cb.is(':checked')) {
                if (selectedItem != null) {
                    var objCo = new Object();
                    objCo.CompanyId = selectedItem.CompanyId;
                    gbCompanyListArray.push(objCo);
                }
            } else {
                gbCompanyListArray = $.grep(gbCompanyListArray, function (n) {
                    return n.CompanyId != selectedItem.CompanyId;

                });

                gbBranchListArray = $.grep(gbBranchListArray, function (n) {
                    return n.CompanyId != selectedItem.CompanyId;

                });
            }
        });
    },



    //Location Part

    InitLocationGrid: function (e, emailNotificationConfigId) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: EmailNotificationConfigHelper.LocationGridDataSource(e.data.CompanyId),
            scrollable: true,
            sortable: true,
            xheight: 200,
            pageable: true,
            editable: true,
            navigatable: true,
            selectable: "row",
            columns: EmailNotificationConfigHelper.GeneratedBranchColumns(e.data.CompanyId, emailNotificationConfigId),

        });
    },

    LocationGridDataSource: function (CompanyId) {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 50,
            batch: true,
            transport: {
                read: {
                    url: '../Branch/GetBranchForSubgridData',
                    type: "POST",
                    async: false,
                    cache: false,
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
                        check_rowForBranch: { editable: false },
                        LunchHour: { type: 'number', defaultValue: "0", validation: { min: 0, max: 2 } },
                        BranchName: { editable: false },
                        SbuName: { editable: false }
                    }
                },
            },

            filter: { field: "CompanyId", operator: "eq", value: CompanyId }

        });
        return gridDataSource;

    },

    GeneratedBranchColumns: function (CompanyId, emailNotificationConfigId) {
        return columns = [
            { field: "check_rowForBranch", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= EmailNotificationConfigHelper.CheckedDataForBranch(data' + ',' + CompanyId + ',' + emailNotificationConfigId + ') #' },
            { field: "BranchId", title: "BranchId", width: 50, hidden: true },
            { field: "BranchName", title: "Location Name", width: 100, sortable: true }
        ];
    },

    CheckedDataForBranch: function (data, CompanyId, emailNotificationConfigId) {
        var lnk = '<input id="check_rowForBranch' + data.BranchId + 'CompanyId' + CompanyId + 'ConfigId' + emailNotificationConfigId + '"  type="checkbox" class="check_rowForBranch" onclick="EmailNotificationConfigHelper.CheckEventForBranch(' + data.BranchId + ',' + CompanyId + ',' + emailNotificationConfigId + ')"/>';

        var result = gbBranchListArray.filter(function (obj) {
            return obj.BranchId == data.BranchId && obj.CompanyId == CompanyId && obj.EmailNotificationConfigId == emailNotificationConfigId;
        });

        if (result.length > 0) {
            $("#check_rowForBranch" + data.BranchId + 'CompanyId' + CompanyId + 'ConfigId' + emailNotificationConfigId).attr('checked', true);
        } else {
            $("#check_rowForBranch" + data.BranchId + 'CompanyId' + CompanyId + 'ConfigId' + emailNotificationConfigId).attr('checked', false);
        }
        return lnk;
    },

    CheckEventForBranch: function (branchId, companyId, emailNotificationConfigId) {

        var elm = $("#check_rowForBranch" + branchId + 'CompanyId' + companyId + 'ConfigId' + emailNotificationConfigId);
        if (elm.is(':checked')) {
            var objBr = new Object();
            objBr.EmailNotificationConfigId = emailNotificationConfigId;
            objBr.CompanyId = companyId;
            objBr.BranchId = branchId;
            gbBranchListArray.add(objBr);
        } else {

            gbBranchListArray = $.grep(gbBranchListArray, function (n) {
                return n.BranchId != branchId && n.CompanyId != CompanyId && obj.EmailNotificationConfigId != emailNotificationConfigId;;

            });
        }
    },



    SaveEmailNotificationConfigMapWithCompanyBranch: function () {

        var object = EmailNotificationConfigHelper.CreateMappingWithCompanyBranchObject();

        Message.Confirm("Are you sure to save mapping?", function () {
            var jsonParam = "objMapCompanyBranch:" + JSON.stringify(object);
            var url = "../EmailNotificationConfig/SaveMappingWithCompanyBranch";

            AjaxManager.SendJson2(url, jsonParam, onSuccess, onFailed);

        }, function () {

        });


        function onSuccess(jsonData) {

            if (jsonData == "Success") {

                Message.SuccessMessage("Mapping saved successfully", function () {
                    $("#gridEmailNotificationConfig").data('kendoGrid').dataSource.read();
                });

            } else {
                Message.Error(jsonData);
            }
        }

        function onFailed(error) {
            window.alert(error.statusText);
        }

    },

    CreateMappingWithCompanyBranchObject: function () {

        var companyMaps = [];
        var companyBranchMaps = [];

        //for (var j = 0; j < gbCompanyListArray.length; j++) {
        //    var objMap1 = new Object();

        //    objMap1.CompanyId = gbCompanyListArray[j].CompanyId;

        //    companyMaps.add(objMap1);
        //}

        for (var i = 0; i < gbBranchListArray.length; i++) {

            var objMap = new Object();

            objMap.CompanyId = gbBranchListArray[i].CompanyId;
            objMap.BranchId = gbBranchListArray[i].BranchId;

            companyBranchMaps.add(objMap);
        }

        var obj = new Object();

        obj.EmailNotificationConfigId = $("#hdnEmailNotificationConfigId").val();
        //obj.Companies = companyMaps;
        obj.CompanyBranchMaps = companyBranchMaps;

        return obj;

    },

    GetBranchMappintData: function (emailNotificationConfigId) {
        var serviceUrl = "../EmailNotificationConfig/GetEmailConfigBranchMappintData/";
        var data = AjaxManager.GetJsonResults(serviceUrl, "emailConfigId=" + emailNotificationConfigId);
        gbBranchListArray = data;
    }



}