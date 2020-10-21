

var GradeTypeSummaryManager = {
    

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
                    url: '../GradeTypeSettings/GetGradeTypeSummary',
                    type: "post",
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

};

var GradeTypeSummaryHepler = {
    initGradeTypeSummary: function () {
        GradeTypeSummaryHepler.GenerateGradeTypeSummaryGrid();
    },
    
    GenerateGradeTypeSummaryGrid: function () {
        $("#gridGradeTypeSummary").kendoGrid({
            dataSource: GradeTypeSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },
            filterable: true,
            sortable: true,
            columns: GradeTypeSummaryHepler.GradeTypeSummaryColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });
    },


   GradeTypeSummaryColumns: function () {
        return columns = [
            { field: "GradeTypeInfoId", title: "GradeTypeId", width: 50, hidden: true },
            { field: "GradeTypeName", title: "Grade Type Name", width: 70 },
            { field: "IsActive", title: "Is Active", width: 50, template: '#= IsActive == 0 ? "InActive" :"Active" #' },
            { field: "Edit", title: "Edit", filterable: false, width: 50, template: '<input type="button" class="k-button" value="Edit" id="btnEdit" onclick="GradeTypeSummaryHepler.clickEventForEditGradeTypeFunction()"/>', sortable: false }
        ];
    },

   clickEventForEditGradeTypeFunction: function () {
       var gridData = $("#gridGradeTypeSummary").data("kendoGrid");
        var selectedItem = gridData.dataItem(gridData.select());
        GradeTypeDetailsHelper.populateGradeType(selectedItem);

        }
};