var gbGradeTypeList = [];
var gbBranchListArray = [];
var gbSBUList = [];


var DottedLineEmailConfigManager = {

    SaveDottedLineEmailConfig: function () {
        // //debugger;
        if (DottedLineEmailConfigHelper.Validator()) {

            var objDotConfig = DottedLineEmailConfigHelper.GetDottedLineEmailConfigObject();

            var mappingData = DottedLineEmailConfigHelper.GetNotificationGradeMapping();

            var notifyGrads = JSON.stringify(gbGradeTypeList).replace(/&/g, "^");
            var notifySbUs = JSON.stringify(gbSBUList).replace(/&/g, "^");
            var locationData = JSON.stringify(gbBranchListArray);

            var hrRecordId = $("#hdnHrRecordId").val();
            var sendTypeId = $("#cmbSendType").data("kendoDropDownList").value();

            Message.Confirm("Are you sure to save configuration?", function () {

                var jsonParam = 'gridData:' + JSON.stringify(objDotConfig) + ',hrRecordId:' + JSON.stringify(hrRecordId) + ',dottedLineGrades:' + notifyGrads + ',dottedLineLocation:' + locationData + ',dottedLineSbUs:' + notifySbUs + ',sendTypeId:' + sendTypeId;
                var serviceUrl = "../DottedLineEmailConfig/SaveOrUpdateDottedLineEmailConfig/";
                AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);

            }, function () {

            });
        }

        function onSuccess(jsonData) {
            if (jsonData == "Success") {

                Message.SuccessMessage("Dotted Line Email Configuration Saved/Updated Successfully", function () {
                    DottedLineEmailConfigHelper.CloseDottedLineForm();
                    $("#gridDottedLineEmailConfigEmployeeSummary").data("kendoGrid").dataSource.read();
                    $("#gridDottedLineEmailConfig").data("kendoGrid").dataSource.read();
                    $("#gridDottedLineExistingStatus").data("kendoGrid").dataSource.read();
                });

            }
            else {
                Message.Warning(jsonData);
            }
        }

        function onFailed(error) {

            Message.Error(error.statusText);
        }
    },

    RemoveAllSettings: function (hrRecordId, sendTypeId) {

        Message.Confirm("Are you sure to remove all mapping?", function () {

            var jsonParam = 'hrRecordId:' + JSON.stringify(hrRecordId) + ',sendTypeId:' + JSON.stringify(sendTypeId);
            var serviceUrl = "../DottedLineEmailConfig/RemoveAllSettingsByHrRecordId/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);

        }, function () {

        });

        function onSuccess(jsonData) {
            if (jsonData == "Success") {

                Message.SuccessMessage("All settings are removed successfully", function () {
                    DottedLineEmailConfigHelper.CloseDottedLineForm();

                    $("#gridDottedLineEmailConfigEmployeeSummary").data("kendoGrid").dataSource.read();
                    $("#gridDottedLineEmailConfig").data("kendoGrid").dataSource.read();
                    $("#gridDottedLineExistingStatus").data("kendoGrid").dataSource.read();
                });
            } else {
                Message.Warning(jsonData);
            }
        }

        function onFailed(error) {

            Message.Error(error.statusText);
        }
    },

    GridDataSourceForDottedLineEmailConfig: function (url) {

        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 1000,
            batch: true,
            transport: {
                read: {
                    url: url,
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
            }

        });
        return gridDataSource;
    },

    LocationGridDataSourceForMapping: function (companyId) {

        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 500,
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
            },

            filter: { field: "CompanyId", operator: "eq", value: companyId }

        });
        return gridDataSource;

    },

    GridDataSourceForExistingStatus: function (empId) {

        var url = '../DottedLineEmailConfig/GetDottedLineEmailConfigStatusByEmployeeId/?employeeId=' + empId;

        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 200,
            batch: true,
            group:
              [
                  { field: "SendType", dir: "asc", },
                  { field: "EmailNotificationTypeName", dir: "asc" },
                 // { field: "CompanyName", dir: "asc" },
              ],
            transport: {
                read: {
                    url: url,
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
            }

        });
        return gridDataSource;
    },


    GetAllEmailType: function () {
        //var objEmailTypeData = new Object();
        //var jsonParam = "";
        //var serviceUrl = "../DottedLineEmailConfig/GetAllEmailType/";
        //AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        //function onSuccess(jsonData) {


        //    objEmailTypeData = jsonData;
        //    //$("#cmbModuleName").kendoComboBox({
        //    //    placeholder: "Select Module...",
        //    //    dataTextField: "ModuleName",
        //    //    dataValueField: "ModuleId",
        //    //    dataSource: objModuleData
        //    //});
        //}
        //function onFailed(jqXHR, textStatus, errorThrown) {
        //    window.alert(errorThrown);
        //}

        //return objEmailTypeData;
    },

};





var DottedLineEmailConfigHelper = {

    InitDottedLineEmailConfig: function () {
        DottedLineEmailConfigHelper.DottedLineEmailConfigGrid();
        DottedLineEmailConfigHelper.InitCompanyGridForMapping();
        DottedLineEmailConfigHelper.PopulateSendTypeDropdownList();
        DottedLineEmailConfigHelper.EmployeeWiseDottedLineExistingStatusGrid("");
        $("#cmbSendType").parent().css('width', "100px");

        peerGroupHelper.init();

    },


    AddNewDottedLineForm: function () {
        DottedLineEmailConfigHelper.ClearFields();
        $("#divDottedLineEmailConfigEmployeeSummary").hide();
        $("#divDottedLineEmailConfigEmployeeDetails").show();
    },

    CloseDottedLineForm: function () {
        $("#divDottedLineEmailConfigEmployeeSummary").show();
        $("#divDottedLineEmailConfigEmployeeDetails").hide();
        DottedLineEmailConfigHelper.ClearFields();
    },

    PopulateSendTypeDropdownList: function () {

        var data = [
            { text: "Email as To", value: '1' },
            { text: "Email as CC", value: '2' }
        ];

        $("#cmbSendType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: data,
            filter: "startswith",
            suggest: true,
            index: 0,
            change: function () {

                DottedLineEmailConfigHelper.PopulatePreviousSettingsForEmployee();
            }
        });
    },

    DottedLineEmailConfigGrid: function () {
        $("#gridDottedLineEmailConfig").kendoGrid({
            dataSource: DottedLineEmailConfigManager.GridDataSourceForDottedLineEmailConfig(""),
            pageable: {
                refresh: true,
                serverPaging: false,
                serverFiltering: false,
                serverSorting: false
            },
            xheight: 450,
            filterable: false,
            sortable: false,
            columns: DottedLineEmailConfigHelper.DottedLineEmailConfigHelperColumns(),
            editable: false,
            selectable: "row",
        });
    },

    DottedLineEmailConfigHelperColumns: function () {
        var columns;
        return columns = [
            { field: "ENT", title: "Select", width: 30, template: '#= DottedLineEmailConfigHelper.CheckBoxTemplateNotifyType(data) #' },
            { field: "EmailNotificationTypeId", title: "EmailNotificationTypeId", width: 10, hidden: true },
            { field: "EmailNotificationTypeName", title: "Email Type", width: 200 },
            { field: "Action", title: "Add Peer Group", width: 50, template: '<button type="button" class="k-button" onclick="DottedLineEmailConfigHelper.AddPeerGroupWindo()" >Add Peer Group</button>', hidden: true },
            { field: "Map", title: "Mapping", width: 50, template: '<button type="button" class="k-button" onclick="DottedLineEmailConfigHelper.ClickEventLocationMapping()" >Location Mapping</button>' }

        ];
    },

    CheckBoxTemplateNotifyType: function (data) {
        // //debugger;
        var isChedcked = "";
        if (data.HrRecordId > 0) {
            isChedcked = 'checked = "checked"';

        } else {
            isChedcked = "";
        }
        var dat = '<input id="check_row_NotifyType' + data.EmailNotificationTypeId + '"  type="checkbox"  ' + isChedcked + '"/>';
        return dat;
    },

    ClickEventLocationMapping: function () {
        var grid = $("#gridDottedLineEmailConfig").data('kendoGrid');
        var item = grid.dataItem(grid.select());
        if (item != null) {

            var win = $("#windCompanyLocation").data('kendoWindow');
            win.open().center();

            var hrRecordId = $("#hdnHrRecordId").val();
            var emailNotificationTypeId = item.EmailNotificationTypeId;
            var sendTypeId = $("#cmbSendType").data("kendoDropDownList").value();

            var sendas = sendTypeId == 1 ? "To" : "CC";

            $("#spSendAs").html(sendas);
            $("#spNotificationType").html(item.EmailNotificationTypeName);

            var compGrid = $("#gridCompany").data('kendoGrid');
            var url = "../Company/GetAllActiveCompaniesWithPaging";
            var dataSource = DottedLineEmailConfigManager.GridDataSourceForDottedLineEmailConfig(url);
            compGrid.setDataSource(dataSource);
        }
    },

    InitCompanyGridForMapping: function (e) {

        $("#gridCompany").kendoGrid({

            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
                { field: "CompanyId", width: "110px", hidden: true },
                { field: "CompanyName", title: "SBU", width: "110px" },
            ],
            detailInit: function (e) {

                return DottedLineEmailConfigHelper.InitLocationGridForMapping(e);
            },
            dataBound: function () {
                this.expandRow(this.tbody.find("tr.k-master-row").first());
            },

            detailExpand: function (e) {

                if (gbBranchListArray.length > 0) {
                    for (var i = 0; i < gbBranchListArray.length; i++) {
                        $("#check_rowForBranch" + gbBranchListArray[i].BranchId + 'companyId' + gbBranchListArray[i].CompanyId + 'notify' + gbBranchListArray[i].EmailNotificationTypeId).attr('checked', true);
                    }
                }
            }
        });
    },

    InitLocationGridForMapping: function (e) {

        var emailNotificationTypeId = 0;
        var grid = $("#gridDottedLineEmailConfig").data('kendoGrid');
        var item = grid.dataItem(grid.select());
        if (item != null) {
            emailNotificationTypeId = item.EmailNotificationTypeId;
        }

        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: DottedLineEmailConfigManager.LocationGridDataSourceForMapping(e.data.CompanyId),
            scrollable: true,
            sortable: true,
            xheight: 200,
            pageable: false,
            editable: false,
            navigatable: false,
            selectable: "row",
            columns: [
                { field: "check_rowForBranch", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= DottedLineEmailConfigHelper.CheckedDataForBranch(data' + ',' + e.data.CompanyId + ',' + emailNotificationTypeId + ') #' },
                { field: "BranchId", title: "BranchId", width: 50, hidden: true },
                { field: "BranchName", title: "Location Name", width: 100, sortable: true }
            ],
        });
    },

    CheckedDataForBranch: function (data, companyId, emailNotificationTypeId) {
        // //debugger;
        var id = 'check_rowForBranch' + data.BranchId + 'companyId' + companyId + 'notify' + emailNotificationTypeId;

        var lnk = '<input id="' + id + '"  type="checkbox" class="check_rowForBranch" onclick="DottedLineEmailConfigHelper.GetRowDataForBranchMap(' + data.BranchId + ',' + companyId + ',' + emailNotificationTypeId + ')"/>';

        var result = gbBranchListArray.filter(function (obj) {
            return obj.BranchId == data.BranchId && obj.CompanyId == companyId && obj.EmailNotificationTypeId == emailNotificationTypeId;
        });

        if (result.length > 0) {
            $("#" + id).attr('checked', true);
        } else {
            $("#" + id).attr('checked', false);
        }
        return lnk;
    },

    GetRowDataForBranchMap: function (branchId, companyId, emailNotificationTypeId) {
        // //debugger;
        var elm = $("#check_rowForBranch" + branchId + 'companyId' + companyId + 'notify' + emailNotificationTypeId);
        if (elm.is(':checked')) {

            var objBr = new Object();

            objBr.EmailNotificationTypeId = emailNotificationTypeId;
            objBr.CompanyId = companyId;
            objBr.BranchId = branchId;

            gbBranchListArray.add(objBr);

        } else {
            var result = gbBranchListArray.filter(function (obj) {
                return obj.BranchId === branchId && obj.CompanyId === companyId && obj.EmailNotificationTypeId === emailNotificationTypeId;
            });
            gbBranchListArray = $.grep(gbBranchListArray, function (n) {
                return (n !== result[0]);
            });
        }
    },

    GetDottedLineEmailConfigObject: function () {
        var notificationType = [];

        var gridData = $("#gridDottedLineEmailConfig").data("kendoGrid").dataSource.data();
        for (var i = 0; i < gridData.length; i++) {
            var chk = $("#check_row_NotifyType" + gridData[i].EmailNotificationTypeId);
            if (chk.is(":checked")) {
                gridData[i].IsActive = true;

                notificationType.push(gridData[i]);
            } else {
                gridData[i].IsActive = false;
            }
        }

        return notificationType;
    },

    ClearFields: function () {

        $("#hdnHrRecordId").val(0);
        $("#txtEmployeeId").val("");
        $("#txtEmployeeName").val("");
        $("#btnRemoveAll").hide();
        $("input[type='checkbox']").removeAttr("checked", "checked");

        $("#cmbSendType").data("kendoDropDownList").value("");

        gbGradeTypeList = [];
        gbSBUList = [];
        gbBranchListArray = [];
        DottedLineEmailConfigHelper.EmployeeWiseDottedLineExistingStatusGrid("");
        $("#spEmpName").html("");
    },

    PopulateDottedLineEmailConfigData: function (selectedItem) {
        $("#txtEmployeeId").val(selectedItem.EmployeeId);
        DottedLineEmailConfigHelper.PopulatePreviousSettingsForEmployee();
    },

    PopulatePreviousSettingsForEmployee: function () {
        gbGradeTypeList = [];
        gbSBUList = [];
        gbBranchListArray = [];

        var empId = $("#txtEmployeeId").val();
        var sendTypeId = $("#cmbSendType").data("kendoDropDownList").value();

        var emplyee = DottedLineEmailConfigHelper.GetEmployeeById(empId);
        if (emplyee != null && emplyee != "") {
            $("#txtEmployeeName").val(emplyee.EmployeeName);
            $("#hdnHrRecordId").val(emplyee.HrRecordId);
            DottedLineEmailConfigHelper.PreviousSelectedNotificationByEmployee(empId, sendTypeId);
            // gbSBUList = AjaxManager.GetSingleObject("../DottedLineEmailConfig/GetDottedLineCompanyMapping/?", "hrRecordId=" + emplyee.HrRecordId);
            // gbGradeTypeList = AjaxManager.GetSingleObject("../DottedLineEmailConfig/GetDottedLineGradeMapping/?", "hrRecordId=" + emplyee.HrRecordId);
            // gbBranchListArray = AjaxManager.GetSingleObject("../DottedLineEmailConfig/GetDottedLineLocationMapping/?", "hrRecordId=" + emplyee.HrRecordId);

            var jsonParams = "hrRecordId=" + emplyee.HrRecordId + "&sendTypeId=" + sendTypeId;

            gbBranchListArray = AjaxManager.GetSingleObject("../DottedLineEmailConfig/GetDottedLineLocationMappingByParams/?", jsonParams);

            $("#btnRemoveAll").show();
            $("#spEmpName").html(emplyee.EmployeeName + " (" + empId + ")");

            DottedLineEmailConfigHelper.EmployeeWiseDottedLineExistingStatusGrid(empId);

        }
    },

    GetEmployeeById: function (employeeId) {
        var empData = "";
        var jsonParam = "employeeId=" + employeeId;
        var serviceUrl = "../DottedLineEmailConfig/GetEmployeeById/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            if (jsonData == null) {

                Message.Warning("There have no employee related this id");
                return 0;
            } else {
                empData = jsonData;
            }
        }

        function onFailed(error) {
        }

        return empData;
    },

    PreviousSelectedNotificationByEmployee: function (empId, sendTypeId) {

        var data = DottedLineEmailConfigManager.GridDataSourceForDottedLineEmailConfig("../DottedLineEmailConfig/GetDottedLineEmailConfigByEmployeeId/?employeeId=" + empId + "&sendTypeId=" + sendTypeId);
        var grid = $('#gridDottedLineEmailConfig').data('kendoGrid');
        grid.setDataSource(data);
    },

    EmployeeWiseDottedLineExistingStatusGrid: function (empId) {

        $("#gridDottedLineExistingStatus").kendoGrid({
            dataSource: DottedLineEmailConfigManager.GridDataSourceForExistingStatus(empId),
            pageable: false,
            xheight: 450,
            filterable: false,
            sortable: false,
            columns: DottedLineEmailConfigHelper.ExistingStatusColumns(),
            editable: false,
            selectable: "row",
        });
    },

    ExistingStatusColumns: function () {
        var columns;
        return columns = [

            { field: "HrRecordId", title: "HrRecordId", width: 10, hidden: true },
            { field: "SendTypeId", title: "SendTypeId", width: 10, hidden: true },
            { field: "SendType", title: "Send Type", width: 50, hidden: true },
            { field: "EmailNotificationTypeId", title: "EmailNotificationTypeId", width: 10, hidden: true },
            { field: "EmailNotificationTypeName", title: "Notification Type", width: 200, hidden: true },
            { field: "CompanyId", title: "CompanyId", width: 200, hidden: true },
            { field: "CompanyName", title: "Company", width: 200, hidden: true },
            { field: "BranchId", title: "BranchId", width: 200, hidden: true },
            { field: "BranchName", title: "Location", width: 200 }

        ];
    },

    Validator: function () {

        var status = $(".status");

        var gridData = $("#gridDottedLineEmailConfig").data("kendoGrid").dataSource.data();
        //var moduleId = $("#cmbModuleName").data('kendoComboBox').value();
        var hrRecordId = $("#hdnHrRecordId").val();
        if (gridData.length == 0 || hrRecordId == 0) {

            Message.Warning("Employee Id can not be blank.");
            return false;
        } else {
            return true;
        }
    },

    ClickEventForRemoveAll: function () {
        var empId = $("#hdnHrRecordId").val();
        var sendTypeId = $("#cmbSendType").data("kendoDropDownList").value();
        if (empId != 0 && sendTypeId != 0) {
            DottedLineEmailConfigManager.RemoveAllSettings(empId, sendTypeId);
        }
    },









    CommentedFunctions: function () {

        //checkBoxTemplateForSBU: function (selectedItem, emailNotificationTypeId) {

        //    var isChedcked = "";
        //    var mainGrid = $("#gridDottedLineEmailConfig").data("kendoGrid");
        //    var gridDate = mainGrid.dataItem(mainGrid.select());


        //    if (gbSBUList.length != 0) {

        //        var gbArray = jQuery.grep(gbSBUList, function (n, i) {
        //            return (n.CompanyId == selectedItem.CompanyId && n.EmailNotificationTypeId == emailNotificationTypeId);
        //        });


        //        if (gbArray[0] != undefined) {
        //            isChedcked = 'checked = "checked"';
        //        } else {
        //            isChedcked = '';
        //        }
        //    }

        //    return '<input id="check_row_SBU' + gridDate.EmailNotificationTypeId + selectedItem.CompanyId + '" class="check_row_SBU' + gridDate.EmailNotificationTypeId + '" type="checkbox"  ' + isChedcked + ' title="Select Individual SBU" onClick="DottedLineEmailConfigHelper.checkedSBURow(' + selectedItem.CompanyId + ')"/>';
        //    //return '<input id="check_row_SBU' + gridDate.EmailNotificationTypeId + selectedItem.CompanyId + '" class="check_row_SBU' + gridDate.EmailNotificationTypeId + '" type="checkbox"  ' + isChedcked + ' title="Select Individual SBU"/>';


        //},

        //checkedSBURow: function (companyId) {


        //    var mainGrid = $("#gridDottedLineEmailConfig").data("kendoGrid");
        //    var gridDate = mainGrid.dataItem(mainGrid.select());
        //    if (gridDate != null) {
        //        if ($("#check_row_SBU" + gridDate.EmailNotificationTypeId + companyId).is(":checked")) {
        //            var objSBU = new Object();
        //            objSBU.CompanyId = companyId;
        //            objSBU.EmailNotificationTypeId = gridDate.EmailNotificationTypeId;
        //            gbSBUList.push(objSBU);
        //        } else {
        //            if (gbSBUList.length != 0) {

        //                for (var k = 0; k < gbSBUList.length; k++) {
        //                    if (gbSBUList[k].CompanyId == companyId && gbSBUList[k].EmailNotificationTypeId == gridDate.EmailNotificationTypeId) {
        //                        gbSBUList.splice(k, 1);
        //                        break;
        //                    }
        //                }
        //            }
        //        }
        //    }

        //},

        //clickCheckAllSBU: function (emailNotificationTypeId) {

        //    var mainGrid = $("#gridDottedLineEmailConfig").data("kendoGrid");
        //    var gridDate = mainGrid.dataItem(mainGrid.select());
        //    if (gridDate != null) {

        //        var grid = $("#subGrid" + emailNotificationTypeId).data('kendoGrid');
        //        var data = grid.dataSource.data();
        //        if ($("#checkAllSBU" + emailNotificationTypeId).is(":checked")) {
        //            if (gbSBUList.length != 0) {

        //                for (var k = 0; k < gbSBUList.length; k++) {
        //                    if (gbSBUList[k].EmailNotificationTypeId == emailNotificationTypeId) {
        //                        gbSBUList.splice(k, 1);

        //                    }
        //                }
        //            }
        //            for (var i = 0; i < data.length; i++) {
        //                var objSBU = new Object();
        //                objSBU.CompanyId = data[i].CompanyId;
        //                objSBU.EmailNotificationTypeId = gridDate.EmailNotificationTypeId;
        //                gbSBUList.push(objSBU);
        //                $("#check_row_SBU" + gridDate.EmailNotificationTypeId + data[i].CompanyId).prop('checked', 'checked');

        //            }
        //        } else {
        //            if (gbSBUList.length != 0) {

        //                for (var k = 0; k < gbSBUList.length; k++) {
        //                    if (gbSBUList[k].EmailNotificationTypeId == emailNotificationTypeId) {
        //                        gbSBUList.splice(k, 1);

        //                    }
        //                }
        //            }
        //            $(".check_row_SBU" + gridDate.EmailNotificationTypeId).removeProp('checked', 'checked');

        //        }
        //    }

        //},

    },

    detailInitGradeTypeGrid: function (e, emailNotificationTypeId) {

        var urlInfo = "../GradeType/GetGradeTypeGridByCompany/?companyId=" + e.data.CompanyId;

        $("<div id='subGrid" + emailNotificationTypeId + e.data.CompanyId + "'><div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: {
                type: "json",
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                pageSize: 200,
                transport: {
                    read: {

                        url: urlInfo,

                        type: "POST",

                        dataType: "json",

                        contentType: "application/json; charset=utf-8"
                    },
                    parameterMap: function (options) {

                        return JSON.stringify(options);

                    }
                },
                schema: { data: "Items", total: "TotalCount" },

            },
            scrollable: false,
            sortable: true,
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
                pageSizes: [100, 200, 300, 400, 500],
            },
            filterable: true,
            selectable: "row",
            columns: [
                { field: "select_grade", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= DottedLineEmailConfigHelper.checkBoxTemplateGradeType(data,' + e.data.CompanyId + ',' + emailNotificationTypeId + ') #', headerTemplate: '<input type="checkbox" id="checkAllGradeType' + emailNotificationTypeId + e.data.CompanyId + '" onclick="DottedLineEmailConfigHelper.clickCheckAllGrade(' + e.data.CompanyId + ',' + emailNotificationTypeId + ')"' },
                { field: "GradeTypeId", title: "GradeTypeId", width: "70px", hidden: true },
                { field: "GradeTypeName", title: "Grade", width: "200" }
            ],

        });


    },

    checkBoxTemplateGradeType: function (selectedItem, companyId, emailNotificationTypeId) {
        var isChedcked = "";
        var mainGrid = $("#gridDottedLineEmailConfig").data("kendoGrid");
        var gridDate = mainGrid.dataItem(mainGrid.select());


        if (gbGradeTypeList.length != 0) {

            var gbArray = jQuery.grep(gbGradeTypeList, function (n, i) {
                return (n.GradeTypeId == selectedItem.GradeTypeId && n.CompanyId == companyId && n.EmailNotificationTypeId == emailNotificationTypeId);
            });

            if (gbArray[0] != undefined) {
                isChedcked = 'checked = "checked"';
            } else {
                isChedcked = '';
            }
        }

        return '<input id="check_row_GradeType' + gridDate.EmailNotificationTypeId + companyId + selectedItem.GradeTypeId + '" class="check_row_GradeType' + gridDate.EmailNotificationTypeId + companyId + '" type="checkbox"  ' + isChedcked + ' title="Select Individual Grade Type" onClick="DottedLineEmailConfigHelper.checkedGradeTypeRow(' + selectedItem.GradeTypeId + "," + companyId + ')"/>';
        //return '<input id="check_row_GradeType' + gridDate.EmailNotificationTypeId + companyId + selectedItem.GradeTypeId + '" class="check_row_GradeType' + gridDate.EmailNotificationTypeId + companyId + '" type="checkbox"  ' + isChedcked + ' title="Select Individual Grade Type"/>';
    },

    checkedGradeTypeRow: function (gradeType, companyId) {

        var mainGrid = $("#gridDottedLineEmailConfig").data("kendoGrid");
        var gridDate = mainGrid.dataItem(mainGrid.select());
        if (gridDate != null) {
            if ($("#check_row_GradeType" + gridDate.EmailNotificationTypeId + companyId + gradeType).is(":checked")) {
                var objGrade = new Object();
                objGrade.GradeTypeId = gradeType;
                objGrade.CompanyId = companyId;
                objGrade.EmailNotificationTypeId = gridDate.EmailNotificationTypeId;
                gbGradeTypeList.push(objGrade);
            } else {
                if (gbGradeTypeList.length != 0) {

                    for (var k = 0; k < gbGradeTypeList.length; k++) {
                        if (gbGradeTypeList[k].CompanyId == companyId && gbGradeTypeList[k].GradeTypeId == gradeType && gbGradeTypeList[k].EmailNotificationTypeId == gridDate.EmailNotificationTypeId) {
                            gbGradeTypeList.splice(k, 1);
                            break;
                        }
                    }
                }
            }
        }

    },

    clickCheckAllGrade: function (companyId, emailNotificationTypeId) {
        var mainGrid = $("#gridDottedLineEmailConfig").data("kendoGrid");
        var gridDate = mainGrid.dataItem(mainGrid.select());
        if (gridDate != null) {

            var grid = $("#subGrid" + emailNotificationTypeId + companyId).data('kendoGrid');
            var data = grid.dataSource.data();
            if ($("#checkAllGradeType" + emailNotificationTypeId + companyId).is(":checked")) {
                if (gbGradeTypeList.length != 0) {

                    for (var k = 0; k < gbGradeTypeList.length; k++) {
                        if (gbGradeTypeList[k].CompanyId == companyId && gbGradeTypeList[k].EmailNotificationTypeId == gridDate.EmailNotificationTypeId) {
                            gbGradeTypeList.splice(k, 1);
                        }
                    }
                }
                for (var i = 0; i < data.length; i++) {
                    var objGrade = new Object();
                    objGrade.GradeTypeId = data[i].GradeTypeId;
                    objGrade.CompanyId = companyId;
                    objGrade.EmailNotificationTypeId = gridDate.EmailNotificationTypeId;
                    gbGradeTypeList.push(objGrade);
                    $("#check_row_GradeType" + gridDate.EmailNotificationTypeId + companyId + data[i].GradeTypeId).prop('checked', 'checked');
                }
            } else {
                if (gbGradeTypeList.length != 0) {

                    for (var k = 0; k < gbGradeTypeList.length; k++) {
                        if (gbGradeTypeList[k].CompanyId == companyId && gbGradeTypeList[k].EmailNotificationTypeId == gridDate.EmailNotificationTypeId) {
                            gbGradeTypeList.splice(k, 1);
                        }
                    }
                }
                $(".check_row_GradeType" + gridDate.EmailNotificationTypeId + companyId).removeProp('checked', 'checked');
            }
        }
    },

    GetNotificationGradeMapping: function () {
        var gradTypes = [];
        var gridData = $("#gridDottedLineEmailConfig").data("kendoGrid").dataSource.data();
        for (var i = 0; i < gridData.length; i++) {
            var notifyId = gridData[i].EmailNotificationTypeId;
            var companyGrid = $('#SbuGrid' + notifyId).data('kendoGrid');
            if (companyGrid != undefined) {

                var companydata = companyGrid.dataSource.data();
                for (var j = 0; j < companydata.length; j++) {
                    var companyId = companydata[j].CompanyId;
                    var gradeGrid = $('#subGrid' + notifyId + companyId).data('kendoGrid');
                    if (gradeGrid != undefined) {
                        var gradData = gradeGrid.dataSource.data();

                        for (var k = 0; k < gradData.length; k++) {
                            var gradeTypeId = gradData[k].GradeTypeId;
                            var chk = $("#check_row_GradeType" + notifyId + companyId + gradeTypeId);
                            if (chk.is(":checked")) {
                                var objGrade = new Object();
                                objGrade.GradeTypeId = gradeTypeId;
                                objGrade.CompanyId = companyId;
                                objGrade.EmailNotificationTypeId = notifyId;
                                gradTypes.push(objGrade);

                            }

                        }
                    }
                }
            }

        }

        return gradTypes;

    },

    GetNotificationSBUMapping: function () {

        var sbus = [];
        var gridData = $("#gridDottedLineEmailConfig").data("kendoGrid").dataSource.data();
        for (var i = 0; i < gridData.length; i++) {
            var notifyId = gridData[i].EmailNotificationTypeId;

            if (notifyId != undefined) {
                var sbuGrid = $('#subGrid' + notifyId).data('kendoGrid');
                if (sbuGrid != undefined) {
                    var sbuData = sbuGrid.dataSource.data();

                    for (var k = 0; k < sbuData.length; k++) {
                        var companyId = sbuData[k].CompanyId;
                        var chk = $("#check_row_SBU" + notifyId + companyId);
                        if (chk.is(":checked")) {
                            var objSBU = new Object();
                            objSBU.CompanyId = companyId;
                            objSBU.EmailNotificationTypeId = notifyId;
                            sbus.push(objSBU);
                        }
                    }
                }
            }
        }

        return sbus;

    },

    AddPeerGroupWindo: function () {

        var grid = $("#gridDottedLineEmailConfig").data('kendoGrid');
        var item = grid.dataItem(grid.select());
        if (item != null) {

            var win = $("#windPeerGroup").data('kendoWindow');
            win.open().center();
            //var urlInfo = "../Company/LoadAllCompanies";
            //var ds = peerGroupHelper.gridDataSource(urlInfo);
            //var gridEmp = $("#gridPeerGroupEmployee").data('kendoGrid');
            //gridEmp.setDataSource(ds);

        }

    },



};


var peerGroupHelper = {

    init: function () {
        AjaxManager.initPopupWindow("windPeerGroup", 'Add Peer Group Employee', "50%");

        $("#txtPeerEmployeeId").keypress(function (e) {
            if (e.keyCode == 13) {
                gbGradeTypeList = [];
                var empId = $("#txtPeerEmployeeId").val();
                var emplyee = DottedLineEmailConfigHelper.GetEmployeeById(empId);
                $("#txtPeerEmployeeName").val(emplyee.EmployeeName);
                $("#hdnPeerHrRecordId").val(emplyee.HrRecordId);

            }

        });


        $("#btnAddPeerEmployee").click(function () {
            var empId = $("#txtPeerEmployeeId").val();
            var emplyee = DottedLineEmailConfigHelper.GetEmployeeById(empId);
            var grid = $("#gridDottedLineEmailConfig").data('kendoGrid');
            var item = grid.dataItem(grid.select());
            if (item != null) {
                var hrRecordId = $("#hdnHrRecordId").val();

                if (emplyee != null) {
                    var obj = new Object();
                    obj.HrRecordId = $("#hdnPeerHrRecordId").val();
                    obj.NotificationTypeId = item.EmailNotificationTypeId;
                    obj.ForHrRecordId = hrRecordId;

                    AjaxManager.SaveObject('../DottedLineEmailConfig/SavePeerGroupEmployee', 'peerGroup:' + JSON.stringify(obj), function (response) {
                        if (response == "Success") {
                            Message.Success("Employee added to peer group");
                            $("#gridPeerGroupEmployee").data('kendoGrid').dataSource.read();
                            $("#hdnPeerHrRecordId").val(0);
                            $("#txtPeerEmployeeId").val('');
                            $("#txtPeerEmployeeName").val('');

                        } else {
                            Message.Warning("Already exists");
                        }

                    });

                }
            }

        });
        peerGroupHelper.InitEmployeePeerGroupGrid();

    },

    InitEmployeePeerGroupGrid: function () {

        $("#gridPeerGroupEmployee").kendoGrid({
            dataSource: [],
            scrollable: false,
            sortable: true,
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
                //pageSizes: [10, 20, 50, 100, 500],
            },
            filterable: true,
            selectable: "row",
            columns: [
                { field: "EmployeeId", title: "EmployeeId", width: "70px", },
                { field: "EmployeeName", title: "Employee Name", width: "100" },
                { field: "Delete", title: "Delete", width: "100", template: '<input type="button" value="Delete" class="k-button" onclick="peerGroupHelper.DeletePeerGroup()" />' }
            ],

        });


    },

    gridDataSource: function (url) {

        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 200,

            batch: true,

            transport: {
                read: {

                    url: url,
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
            }

        });
        return gridDataSource;
    },

    DeletePeerGroup: function () {
        var grid = $("#gridPeerGroupEmployee").data('kendoGrid');

        var item = grid.dataItem(grid.select());
        if (item != null) {
            Message.Confirm("Are you sure to delete?", function () {
                var param = "peerGroup:" + JSON.stringify(item);
                var url = "../DottedLineEmailConfig/DeletePeerGroupEmployee";
                AjaxManager.SendJson2(url, param, function (response) {
                    if (response == 'Success') {
                        $("#gridPeerGroupEmployee").data('kendoGrid').read();
                    }

                }, function () {

                });

            });
        }
    },

}