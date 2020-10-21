

var AttendenceRemarksSummaryManager = {

    gridDataSource: function () {

        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 10,

            transport: {
                read: {
                    url: '../AttendenceRemarks/GetAttendenceRemarksSummary/',

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
    }
};


//helper

var AttendenceRemarksSummaryhelper = {

    initAttendenceRemarksSummary: function () {
        AttendenceRemarksSummaryhelper.GenerateAttendenceRemarksSummaryGrid();
    },

    GenerateAttendenceRemarksSummaryGrid: function () {
       
        $("#gridAttendenceRemarksSummary").kendoGrid({
            dataSource: AttendenceRemarksSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: AttendenceRemarksSummaryhelper.AttendenceRemarksSummaryColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });
    },

    AttendenceRemarksSummaryColumns: function () {
        return columns = [
     { field: "AttendenceRemarksId", title: "AttendenceRemarksId", width: 50, hidden: true },
     { field: "RemarksCode", title: "Remarks Code", width: 60 },
     { field: "RemarksName", title: "Remarks Name", width: 50 },
     { field: "IsActive", title: "Is Active", width: 50, template: '#=IsActive == 0 ? "InActive" : "Active"#' },
     { field: "Edit", title: "Edit", filterable: false, width: 50, template: '<input type="button" class="k-button" value="Edit" id="btnEdit" onClick="AttendenceRemarksSummaryhelper.clickEventForEditFunction()"/>', sortable: false }
        ];
    },
    
    clickEventForEditFunction: function () {
        var gridData = $("#gridAttendenceRemarksSummary").data("kendoGrid");
        var selectedItem = gridData.dataItem(gridData.select());
        AttendenceRemarksDetailsHelper.populateAttendenceRemarksDetails(selectedItem);
    },

};