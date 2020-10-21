var DisciplineSummaryManager = {
   
    GenerateDisciplineGrid: function () {
        $("#gridDiscipline").kendoGrid({
            dataSource: DisciplineSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: DisciplineSummaryHelper.GenerateDisciplineColumns(),
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
                    url: '../CertificateType/LoadDisciplineData/',

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
var DisciplineSummaryHelper = {

    GenerateDisciplineColumns: function () {
        return columns = [
             { field: "DisciplineId", title: "DisciplineId", width: 100, hidden: true },
             { field: "DisciplineName", title: "DisciplineName", width: 100 },
             { field: "CertificateTypeId", title: "CertificateTypeId", width: 100, hidden: true },
             { field: "Certificate", title: "Certificate", width: 80 },
            { field: "IsActive", title: "IsActive", width: 50, template: "#= IsActive ? 'Active' : 'Inactive' #" },
             { field: "Edit", title: "Edit", filterable: false, width: 40, template: '<input type="button" class="k-button" value="Edit" id="btnEdit" onClick="DisciplineSummaryHelper.clickEventForEditButton()"  />', sortable: false }
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

        var entityGrid = $("#gridDiscipline").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        DisciplineDetailsHelper.FillDiciplineDataInForm(selectedItem);

    },
};