var BoardInstituteSummaryManager = {
   
    GenerateBoardInstituteGrid: function () {
        $("#gridBoardInstitute").kendoGrid({
            dataSource: BoardInstituteSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: BoardInstituteSummaryHelper.GenerateBoardInstituteColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",
        });
    },

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
                    url: '../CertificateType/GetBoardInstituteData/',

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
var BoardInstituteSummaryHelper = {

    GenerateBoardInstituteColumns: function () {
        return columns = [
             { field: "BoardInstituteId", title: "BoardInstituteId", width: 100, hidden: true },
             { field: "BoardInstituteName", title: "BoardInstituteName", width: 100 },
           
            { field: "IsActive", title: "IsActive", width: 50, template: "#= IsActive ? 'Active' : 'Inactive' #" },
             { field: "Edit", title: "Edit", filterable: false, width: 40, template: '<input type="button" class="k-button" value="Edit" id="btnEdit" onClick="BoardInstituteSummaryHelper.clickEventForEditButton()"  />', sortable: false }
        ];

    },
    GeRowDataOfCertificateTypeGrid: function () {
        $('#gridCertificateType table tr').dblclick( function () {
            var entityGrid = $("#gridCertificateType").data("kendoGrid");
            var selectedItem = entityGrid.dataItem(entityGrid.select());
            DisciplineDetailsHelper.FillCertificateTypeDetailsInForm(selectedItem);
        });

    },

    clickEventForEditButton: function () {

        var entityGrid = $("#gridBoardInstitute").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        BoardInstituteDetailsHelper.FillBoardInstituteForm(selectedItem);

    },
};