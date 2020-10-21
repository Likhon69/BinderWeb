var certificateTypeSummaryManager = {
    GenerateCertificateTypeGrid: function () {
        $("#gridCertificateType").kendoGrid({
            dataSource: certificateTypeSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: certificateTypeSummaryHelper.GenerateCertificateTypeColumns(),
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
                    url: '../CertificateType/LoadCertificateTypeGridData/',

                    type: "POST",

                    dataType: "json",

                    contentType: "application/json; charset=utf-8"
                },
                update: {
                    url: '../CertificateType/LoadCertificateTypeGridData/',
                    dataType: "json"
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
var certificateTypeSummaryHelper = {

    GenerateCertificateTypeColumns: function () {
        return columns = [
             { field: "CertificateTypeName", title: "Certificate Name/Title", width: 100 },
             { field: "DegreeTypeName", title: "Degree Type Name", width: 80 },
            { field: "IS_ACTIVE", title: "Isactive", width: 50, template: "#= IS_ACTIVE ? 'Active' : 'Inactive' #" },
             { field: "Edit", title: "Edit", filterable: false, width: 40, template: '<input type="button" class="k-button" value="Edit" id="btnEdit" onClick="certificateTypeSummaryHelper.clickEventForEditButton()"  />', sortable: false }
        ];

    },
    GeRowDataOfCertificateTypeGrid: function () {
        $('#gridCertificateType table tr').dblclick( function () {
            var entityGrid = $("#gridCertificateType").data("kendoGrid");
            var selectedItem = entityGrid.dataItem(entityGrid.select());
            certificateTypeDetailsHelper.FillCertificateTypeDetailsInForm(selectedItem);
        });

    },

    clickEventForEditButton: function () {

        var entityGrid = $("#gridCertificateType").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        certificateTypeDetailsHelper.FillCertificateTypeDetailsInForm(selectedItem);

    },
};