
var rosterAndOtAllocationManager = {

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

var rosterAndOtAllocationHelper = {

    initiateRosterAndOtAllocation: function () {

        rosterAndOtAllocationHelper.GenerateRosterSummaryGrid();

        rosterAndOtAllocationHelper.GenerateOTAllocationSummaryGrid();
    },

    GenerateRosterSummaryGrid: function () {
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        //var month = 4;
        var empId = CurrentUser.EmployeeId;

        $("#RosterlistView").kendoGrid({
            dataSource: rosterAndOtAllocationManager.gridDataSourceForIndividualRoster(year, month, empId),

            scrollable: {
                virtual: false
            },
            sortable: true,
            columns: rosterAndOtAllocationHelper.GenerateViewRosteColumns(),
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
            dataSource: rosterAndOtAllocationManager.gridDataSourceForOTAllocation(year, month, empId),

            scrollable: {
                virtual: false
            },
            sortable: true,
            columns: rosterAndOtAllocationHelper.GenerateViewOtAllocationColumns(),
            pageable: false,
            filterable: true,
        });

    },
    GenerateViewOtAllocationColumns: function () {

        return columns = [

            { field: "OtFromDate", title: "Date", width: 45, filterable: false, template: "#=kendo.toString(kendo.parseDate(OtAllocatedHour),'dd-MMM')#", sortable: false },
            { field: "OtAllocatedHour", title: "Hour", width: 40, sortable: false, filterable: false, attributes: { style: "text-align: center" } },
            { field: "OtAllocationStart", title: "Type", width: 70, sortable: false, filterable: false, attributes: { style: "text-align: center" }, template: "#= rosterAndOtAllocationHelper.templateOfOTAllocationStart(data)  #" }
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