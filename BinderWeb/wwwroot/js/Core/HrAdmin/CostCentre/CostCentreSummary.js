CostCentreSummaryManager = {

    gridDataSource: function (identity, identityType) {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 20,
            //pageSize: 10,

            transport: {
                read: {
                    url: '../CostCentre/GetCostCentreGridData/?identity=' + identity + "&identityType=" + identityType,

                    type: "POST",

                    dataType: "json",

                    contentType: "application/json; charset=utf-8"
                },

                parameterMap: function (options) {

                    return JSON.stringify(options);

                }
            },
            schema: {
                model: {
                    fields: {

                    }
                },
                data: "Items",
                total: "TotalCount"
            },


        });

        return gridDataSource;
    },
};

CostCentreSummaryHelper = {
    GenerateCostCentreGrid: function (identity, identityType) {
        $("#gridCostCentre").kendoGrid({
            dataSource: CostCentreSummaryManager.gridDataSource(identity, identityType),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            xheight: 450,
            filterable: true,
            sortable: true,
            columns: CostCentreSummaryHelper.GeneratedCostCentreColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

            //selectable: false

        });

    },

    GeneratedCostCentreColumns: function () {
        return columns = [
        { field: "CostCentreId", title: "Cost Centre Id", width: 50, hidden: true },
        { field: "CostCentreName", title: "CC Name", width: 100 },
        { field: "CostCentreCode", title: "CC Code", width: 70 },
        { field: "ParentCostCentreName", title: "Parent Cost Centre", width: 110, sortable: true },
        { field: "CcDescription", title: "Description", width: 100, sortable: false },
        { field: "ChiledCostRation", title: "ChiledCostRation", width: 100, sortable: false, hidden: true},
        { field: "Edit", title: "Edit", filterable: false, width: 70, template: '<input type="button" class="k-button" value="Edit" id="btnEdit" onClick="CostCentreSummaryHelper.clickEventForEditFunction()"/><input type="button" class="k-button" value="Apply Account Head" id="btnEdit" onClick="CostCentreSummaryHelper.clickEventForAccountHead()"  />', sortable: false }
        ];
    },

    clickEventForEditFunction: function () {



        var entityGrid = $("#gridCostCentre").data("kendoGrid");

        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != undefined) {
            CostCentreHelper.FillCostCentreDetailsForm(selectedItem);
        }

    },
    
    clickEventForAccountHead: function () {
        var entityGrid = $("#gridCostCentre").data("kendoGrid");

        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            accountHeadArray = [];
            accountHeadMappingHelper.PopulateAccountHeadTreeByAccountHead();
            accountHeadMappingManager.GetAccountHeadInfoByCostCenterId(selectedItem.CostCentreId);

            $("#lblCostCenterName").html("Cost Centre Name : " + selectedItem.CostCentreName);
            $("#hdnCostCenterForAccountHeadMap").val(selectedItem.CostCentreId);

            var win = $("#CostcentreDetailsAccountHeadPopupWindow").kendoWindow({
                visible: true,
                width: 500,
                modal: true,
                title: 'Account Head Mapping'
            }).data("kendoWindow").center();
            ;
            win.open();
        }
    }

};