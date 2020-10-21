
var gbCostCenterListArray = [];
var accessRestrictionCostCenterManager = {

    gridDataSourceForCostCenter: function () {
       
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 1000,

            transport: {
                read: {
                    url: '../CostCentre/GetActiveCostCenterGridData/?isSelectAllCompany=1&&gbCompanyList=',
                    //  here isSelectAllCompany=1 means this will select all company
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
    },

    GetCostCenterInformation: function (hrRecordId, restrictionId) {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../AccessRestriction/GetCostCenterInformationByHrRecordId/?hrRecordId=" + hrRecordId + "&restrictionId=" + restrictionId;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    }

};
var accessRestrictionCostCenterHelper = {
    GenerateCostCenterGrid: function () {
        $("#gridCostCenter").empty();
        var gridDataSource = accessRestrictionCostCenterManager.gridDataSourceForCostCenter();

        $("#gridCostCenter").kendoGrid({
            dataSource: gridDataSource,
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
                pageSizes: [10, 20, 50, 100, 150, 200, 500, 1000]
            },
            filterable: true,
            sortable: true,
            columns: accessRestrictionCostCenterHelper.GeneratedDivisionColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

            //selectable: false

        });

    },

    GeneratedDivisionColumns: function () {
        return columns = [
         { field: "check_rowForCostCenter", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= accessRestrictionCostCenterHelper.checkedDataForCostCentre(data) #', headerTemplate: '<input type="checkbox" id="checkAllForCostCenter" />' },//headerTemplate: '<input type="checkbox" id="checkAll" />s
         { field: "CostCentreId", title: "Cost Centre", width: 50, hidden: true },
         { field: "CostCentreName", title: "CostCentre Name", width: 100, sortable: true }
        ];
    },

    checkedDataForCostCentre: function (data) {
        if (gbCostCenterListArray.length > 0) {

            var result = gbCostCenterListArray.filter(function (obj) {
                return obj.CostCentreId == data.CostCentreId && obj.ParentReference == selectedCompanyId;
            });
            if (result.length > 0) {
                return '<input id="check_rowForCostCenter" class="check_rowForCostCenter" type="checkbox" checked="checked"/>';
            }
            else {
                return '<input id="check_rowForCostCenter" class="check_rowForCostCenter" type="checkbox"/>';
            }

        }
        else {
            return '<input id="check_rowForCostCenter" class="check_rowForCostCenter" type="checkbox"/>';
        }
    },

    GetRowDataForCostCentreGrid: function () {

        $('.check_rowForCostCenter').click(function (e) {

            var $cb = $(this);
            var gridSummary = $("#gridCostCenter").data("kendoGrid");
            var selectedItem = gridSummary.dataItem(gridSummary.select());//$kgrid.attr('k-state-selected');
            if ($cb.is(':checked')) {
                if (selectedItem != null) {
                    var obj = new Object();
                    obj.ReferenceId = selectedItem.CostCentreId;
                    obj.ReferenceType = 6;
                    obj.CostCentreId = selectedItem.CostCentreId;
                    obj.ParentReference = selectedCompanyId;
                    obj.ChiledParentReference = 0;
                    gbCostCenterListArray.push(obj);
                }
            } else {

                for (var i = 0; i < gbCostCenterListArray.length; i++) {
                    var divId = selectedItem.CostCentreId;
                    if (gbCostCenterListArray[i].CostCentreId == divId && gbCostCenterListArray[i].ParentReference == selectedCompanyId) {
                        gbCostCenterListArray.splice(i, 1);
                        break;
                    }
                }

            }


        });

        $('#checkAllForCostCenter').click(function (e) {
            gbCostCenterListArray = [];
            var gridSummary = $("#gridCostCenter").data("kendoGrid");
            var selectAll = document.getElementById("checkAllForCostCenter");
            if (selectAll.checked == true) {
                $("#gridCostCenter tbody input:checkbox").attr("checked", this.checked);
                $("#gridCostCenter table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var selectedItem = gridData[i];
                    var obj = new Object();
                    obj.ReferenceId = selectedItem.CostCentreId;
                    obj.ReferenceType = 6;
                    obj.CostCentreId = selectedItem.CostCentreId;
                    obj.ParentReference = selectedCompanyId;
                    obj.ChiledParentReference = 0;

                    gbCostCenterListArray.push(obj);
                }
            }
            else {
                $("#gridCostCenter tbody input:checkbox").removeAttr("checked", this.checked);
                $("#gridCostCenter table tr").removeClass('k-state-selected');
                gbCostCenterListArray = $.grep(gbCostCenterListArray, function (n) {
                    return n.ParentReference != selectedCompanyId;

                });

            }


        });

    },

    PopulateCostCenterArray: function (data) {
        gbCostCenterListArray = [];
        for (var i = 0; i < data.length; i++) {
            var selectedItem = data[i];
            var obj = new Object();
            obj.ReferenceId = selectedItem.ReferenceId;
            obj.ReferenceType = selectedItem.ReferenceType;
            obj.CostCentreId = selectedItem.ReferenceId;
            obj.ParentReference = selectedItem.ParentReference;
            obj.ChiledParentReference = selectedItem.ChiledParentReference;
            gbCostCenterListArray.push(obj);
        }
    }
};