
var RecruitmentSourceSummaryManager = {

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
                    url: '../RecruitmentTS/GetRecruitmentSourceSummary/',

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

var RecruitmentSourceSummaryHelper = {

    GenerateRecruitmentSourceGrid: function () {

        $("#RecruitmentSourceSummarydiv").kendoGrid({
            dataSource: RecruitmentSourceSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            xheight: 450,
            filterable: true,
            sortable: true,
            columns: RecruitmentSourceSummaryHelper.GeneratedRecruitmentSourceColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

            //selectable: false

        });
    },

    GeneratedRecruitmentSourceColumns: function () {

        return columns = [
        { field: "RecruitmentSourceId", hidden: true },
        { field: "RecruitmentSourceCode", title: "Recruitment Source Code", width: 50 },
        { field: "RecruitmentSourceName", title: "Recruitment Source Name", width: 50, sortable: false },
        { field: "Status", title: "Status", width: 50, sortable: false, template: "#=Status==1?'Active':'In Active'#" },
        { field: "Edit", title: "Edit", filterable: false, width: 20, template: '<button type="button" class="k-button" value="Edit" id="btnEdit" onClick="RecruitmentSourceSummaryHelper.clickEventForEditButton()" ><span class="k-icon k-i-pencil"></span></button>', sortable: false }

        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#RecruitmentSourceSummarydiv").data("kendoGrid");

        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            RecruitmentSourceHelper.populateRecruitmentSourceInfo(selectedItem);


        }
    }
};