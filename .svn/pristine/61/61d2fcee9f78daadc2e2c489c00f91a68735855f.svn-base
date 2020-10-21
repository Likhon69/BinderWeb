

var FacilitySummaryManager = {

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
                    url: '../Facility/GetFacilitySummary/',

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

var FacilitySummaryhelper = {

    initFacilitySummary: function () {
        FacilitySummaryhelper.GenerateFacilitySummaryGrid();
    },

    GenerateFacilitySummaryGrid: function () {
       
        $("#gridFacilitySummary").kendoGrid({
            dataSource: FacilitySummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: FacilitySummaryhelper.FacilitySummaryColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });
    },

    FacilitySummaryColumns: function () {
        return columns = [
     { field: "FacilityId", title: "FacilityId", width: 50, hidden: true },
     { field: "FacilityCode", title: "Facility Code", width: 60 },
     { field: "FacilityName", title: "Facility Name", width: 50 },
     { field: "IsActive", title: "Is Active", width: 50, template: '#=IsActive == 0 ? "InActive" : "Active"#' },
     { field: "Edit", title: "Edit", filterable: false, width: 50, template: "<button class='k-button' type='button' onClick='FacilitySummaryhelper.clickEventForEditFunction()' ><span class='k-icon k-i-pencil'></span> &nbsp;Edit</button>", sortable: false }
        ];
    },

    

    clickEventForEditFunction: function () {
        var gridData = $("#gridFacilitySummary").data("kendoGrid");
        var selectedItem = gridData.dataItem(gridData.select());
        FacilityDetailsHelper.populateFacilityDetails(selectedItem);
    },

};