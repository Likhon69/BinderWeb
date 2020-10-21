

var SectionSummaryManager = {

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
                    url: '../Section/GetSectionSummary/',

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

var SectionSummaryhelper = {

    initSectionSummary: function () {
        SectionSummaryhelper.GenerateSectionSummaryGrid();
    },

    GenerateSectionSummaryGrid: function () {
       
        $("#gridSectionSummary").kendoGrid({
            dataSource: SectionSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: SectionSummaryhelper.SectionSummaryColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });
    },

    SectionSummaryColumns: function () {
        return columns = [
     { field: "SectionId", title: "SectionId", width: 50, hidden: true },
     { field: "SectionCode", title: "Section Code", width: 60 },
     { field: "SectionName", title: "Section Name", width: 50 },
     { field: "IsActive", title: "Is Active", width: 50, template: '#=IsActive == 0 ? "InActive" : "Active"#' },
     { field: "Edit", title: "Edit", filterable: false, width: 50, template: '<input type="button" class="k-button" value="Edit" id="btnEdit" onClick="SectionSummaryhelper.clickEventForEditFunction()"/>', sortable: false }
        ];
    },
    
    clickEventForEditFunction: function () {
        var gridData = $("#gridSectionSummary").data("kendoGrid");
        var selectedItem = gridData.dataItem(gridData.select());
        SectionDetailsHelper.populateSectionDetails(selectedItem);
    },

};