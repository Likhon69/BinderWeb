
var DegreeTypeSummaryManager = {
    MealItemGridDataSource: function () {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 10,
            transport: {
                read: {
                    url: '../DegreeType/GetAllDegreeType/',

                    type: "POST",

                    dataType: "json",

                    contentType: "application/json; charset=utf-8"
                },
                //update: {
                //    url: '../Menu/GetMenuSummary/',
                //    dataType: "json"
                //},
                //destroy: {
                //    url: "../MealItemSetup/MealTypeSummery/",
                //    type: "POST",
                //    contentType: "application/json; charset=utf-8",
                //    dataType: "json",
                //},

                parameterMap: function (options) {
                    return JSON.stringify(options);
                }
            },
            schema: { data: "Items", total: "TotalCount" }
        });
        return gridDataSource;
    }
};
var DegreeTypeSummaryHelper = {
    IntitiateDegreeTypeGrid: function () {
        $("#gridDegreeType").kendoGrid({
            dataSource: DegreeTypeSummaryManager.MealItemGridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: DegreeTypeSummaryHelper.GenerateMealTypeColumns(),
            editable: false,
            //navigatable: true,
            selectable: "row",
        });
    },
    GenerateMealTypeColumns: function () {
        return columns = [
             { field: "DegreeTypeId", hidden: true },
            { field: "DegreeTypeName", title: "Degree Type Name" },
            //{ field: "IsActive", title: "Meal Code" },
            {
                field: "", title: "Actions", filterable: false, width: 160,
                template: '<input type="button" class="k-button" value="Edit" id="btnEdit" onClick="DegreeTypeSummaryHelper.clickEventForEditButton()"  /> ', sortable: false
            }
             //{ command: ["edit", "destroy"], title: "&nbsp;" },
        ];
    },
    clickEventForEditButton: function () {
        var entityGrid = $("#gridDegreeType").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        DegreeTypeDetailsHelper.FillDetailsInForm(selectedItem);
    },
}