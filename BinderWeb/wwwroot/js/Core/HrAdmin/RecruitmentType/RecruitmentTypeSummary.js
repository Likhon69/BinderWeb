


var RecruitmentTypeSummaryManager = {

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
                    url: '../RecruitmentTS/GetRecruitmentTypeSummary/',

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

var RecruitmentTypeSummaryHelper = {

    GenerateRecruitmentTypeGrid: function () {

        $("#RecruitmentTypeSummarydiv").kendoGrid({
            dataSource: RecruitmentTypeSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            xheight: 450,
            filterable: true,
            sortable: true,
            columns: RecruitmentTypeSummaryHelper.GeneratedRecruitmentTypeColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

            //selectable: false

        });
    },

    GeneratedRecruitmentTypeColumns: function () {
        debugger;
        return columns = [
        { field: "RecruitmentTypeId", hidden: true },
        { field: "RecruitmentTypeCode", title: "Recruitment Type Code", width: 50 },
        { field: "RecruitmentTypeName", title: "Recruitment Type Name", width: 50, sortable: false },
        { field: "Status", title: "Status", width: 50, sortable: false, template: "#=Status==1?'Active':'In Active'#" },
        { field: "Edit", title: "Edit", filterable: false, width: 20, template: '<button type="button" class="k-button" value="Edit" id="btnEdit" onClick="RecruitmentTypeSummaryHelper.clickEventForEditButton()" ><span class="k-icon k-i-pencil"></span></button>', sortable: false }
        
        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#RecruitmentTypeSummarydiv").data("kendoGrid");

        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            RecruitmentTypeDetailsHelper.populateRecruitmentTypeInfo(selectedItem);


        }
    }
};
