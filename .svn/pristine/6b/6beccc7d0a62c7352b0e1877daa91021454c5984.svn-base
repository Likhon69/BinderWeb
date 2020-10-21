var LanguageSummaryManager = {

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
                    url: '../Language/GetLanguageSummary/',

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

var LanguageSummaryHelper = {

    GenerateLanguageGrid: function () {

        $("#LanguageSummaryDiv").kendoGrid({
            dataSource: LanguageSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            xheight: 450,
            filterable: true,
            sortable: true,
            columns: LanguageSummaryHelper.GeneratedLanguageColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

            //selectable: false

        });
    },

    GeneratedLanguageColumns: function () {
        return columns = [
        { field: "LanguageId", hidden: true },
        { field: "LanguageCode", title: "Language Code", width: 50 },
        { field: "LanguageName", title: "Language Name", width: 50, sortable: false },
        { field: "Status", title: "Status", width: 50, sortable: false, template: "#=Status==1?'Active':'In Active'#" },
        { field: "Edit", title: "Edit", filterable: false, width: 20, template: '<button type="button" class="k-button" value="Edit" id="btnEdit" onClick="LanguageSummaryHelper.clickEventForEditButton()" ><span class="k-icon k-i-pencil"></span></button>', sortable: false }

        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#LanguageSummaryDiv").data("kendoGrid");

        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            LanguageDetailsHelper.populateLanguageInfo(selectedItem);
        }
    }
};