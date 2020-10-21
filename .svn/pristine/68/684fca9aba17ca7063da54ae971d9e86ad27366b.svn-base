var DealerSummary = "";
var DealerSummaryManager = {
    gridDataSource: function () {


        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 100,

            transport: {
                read: {
                    url: binderApi + '/Dealer/GetDealerInfo/?access_token=' + sessionStorage.getItem("token"),

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
var DealerSummaryHelper = {

    GenerateDealerGrid: function () {
        debugger;
        $("#DealerSummaryDiv").kendoGrid({
            dataSource: DealerSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            xheight: 450,
            filterable: true,
            sortable: true,
            columns: DealerSummaryHelper.GeneratedDealerColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

            //selectable: false

        });
    },
    GeneratedDealerColumns: function () {
        return columns = [
            { field: "DealerId", hidden: true },
            { field: "DealerName", title: "Dealer Name", width: 50 },
            { field: "MobileNo", title: "Mobile No", width: 50, sortable: false },
            { field: "DealerCode", title: "Dealer Code", width: 50, sortable: true },
            { field: "EmailAddress", title: "Email Address", width: 50, sortable: true },
            { field: "DealerTypeName", title: "Dealer Type Name", width: 50, sortable: false },

            //{ field: "IsActive", title: "Status", width: 50, sortable: false, template: "#=IsActive==1?'Active':'In Active'#" },
            { field: "Edit", title: "Edit", filterable: false, width: 50, template: '<button type="button" class="k-button" value="Edit" id="btnEdit" onClick="DealerSummaryHelper.clickEventForEditButton()" ><span class="k-icon k-i-pencil"></span></button>', sortable: false }

        ];
    },
    clickEventForEditButton: function () {
        debugger;
        var entityGrid = $("#DealerSummaryDiv").data("kendoGrid");

        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            DealerInformationHelper.populateDealerDetails(selectedItem);
        }


    }
};