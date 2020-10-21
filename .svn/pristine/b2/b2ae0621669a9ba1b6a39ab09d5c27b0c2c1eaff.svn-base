

var SimNumberSummaryManager = {

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
                    url: '../SimNumber/GetSimNumberSummary/',

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

var SimNumberSummaryhelper = {

    initSimNumberSummary: function () {
        SimNumberSummaryhelper.GenerateSimNumberSummaryGrid();
    },

    GenerateSimNumberSummaryGrid: function () {
       
        $("#gridSimNumberSummary").kendoGrid({
            dataSource: SimNumberSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: SimNumberSummaryhelper.SimNumberSummaryColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });
    },

    SimNumberSummaryColumns: function () {
        return columns = [
     { field: "SimNumberId", title: "SimNumberId", width: 50, hidden: true },
     { field: "SimNumber", title: "Sim Number", width: 50 },
     { field: "IsActive", title: "Is Active", width: 50, template: '#=IsActive == 0 ? "InActive" : "Active"#' },
     { field: "Edit", title: "Edit", filterable: false, width: 50, template: '<input type="button" class="k-button" value="Edit" id="btnEdit" onClick="SimNumberSummaryhelper.clickEventForEditFunction()"/>', sortable: false }
        ];
    },
    
    clickEventForEditFunction: function () {
        var gridData = $("#gridSimNumberSummary").data("kendoGrid");
        var selectedItem = gridData.dataItem(gridData.select());
        SimNumberDetailsHelper.populateSimNumberDetails(selectedItem);
    },

};