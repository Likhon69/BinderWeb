
var gbRsmRegionListArray = [];
var accessRestrictionRsmRegionManager = {
    gridDataSourceForRSMRegion: function () {

        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 1000,

            transport: {
                read: {
                    url: '../RSMRegion/GetRsmRegionSummary',
                    //  url: '../CostCentre/GetActiveCostCenterGridData/?isSelectAllCompany=' + isAllCompany + '&&gbCompanyList=' + gbSelectedCompanyList,

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

    GetRsmRegionInformation: function (hrRecordId, restrictionId) {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../AccessRestriction/GetRsmRegionInformationByHrRecordId/?hrRecordId=" + hrRecordId + "&restrictionId=" + restrictionId;
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
var accessRestrictionRsmRegionHelper = {
    GenerateRSMRegionGrid: function () {
        $("#gridRsmRegion").empty();
        var gridDataSource = accessRestrictionRsmRegionManager.gridDataSourceForRSMRegion();

        $("#gridRsmRegion").kendoGrid({
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
            columns: accessRestrictionRsmRegionHelper.GeneratedDivisionColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

            //selectable: false

        });

    },

    GeneratedDivisionColumns: function () {
        return columns = [
         { field: "check_rowForRSMRegion", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= accessRestrictionRsmRegionHelper.checkedDataForRSMRegion(data) #', headerTemplate: '<input type="checkbox" id="checkAllForRSMRegion" />' },//headerTemplate: '<input type="checkbox" id="checkAll" />s
         { field: "RSMRegionId", title: "Cost Centre", width: 50, hidden: true },
         { field: "RSMRegionName", title: "RSM Region Name", width: 100, sortable: true }
        ];
    },

    checkedDataForRSMRegion: function (data) {
        if (gbRsmRegionListArray.length > 0) {

            var result = gbRsmRegionListArray.filter(function (obj) {
                return obj.RSMRegionId == data.RSMRegionId && obj.ParentReference == selectedCompanyId;
            });
            if (result.length > 0) {
                return '<input id="check_rowForRSMRegion" class="check_rowForRSMRegion" type="checkbox" checked="checked"/>';
            }
            else {
                return '<input id="check_rowForRSMRegion" class="check_rowForRSMRegion" type="checkbox"/>';
            }

        }
        else {
            return '<input id="check_rowForRSMRegion" class="check_rowForRSMRegion" type="checkbox"/>';
        }
    },

    GetRowDataForRSMRegionGrid: function () {

        $('.check_rowForRSMRegion').click(function (e) {

            var $cb = $(this);
            var gridSummary = $("#gridRsmRegion").data("kendoGrid");
            var selectedItem = gridSummary.dataItem(gridSummary.select());//$kgrid.attr('k-state-selected');
            if ($cb.is(':checked')) {
                if (selectedItem != null) {
                    var obj = new Object();
                    obj.ReferenceId = selectedItem.RSMRegionId;
                    obj.ReferenceType = 7;
                    obj.RSMRegionId = selectedItem.RSMRegionId;
                    obj.ParentReference = selectedCompanyId;
                    obj.ChiledParentReference = 0;
                    gbRsmRegionListArray.push(obj);
                }
            } else {

                for (var i = 0; i < gbRsmRegionListArray.length; i++) {
                    var divId = selectedItem.RSMRegionId;
                    if (gbRsmRegionListArray[i].RSMRegionId == divId && gbRsmRegionListArray[i].ParentReference == selectedCompanyId) {
                        gbRsmRegionListArray.splice(i, 1);
                        break;
                    }
                }

            }


        });

        $('#checkAllForRSMRegion').click(function (e) {
            gbRsmRegionListArray = [];
            var gridSummary = $("#gridRsmRegion").data("kendoGrid");
            var selectAll = document.getElementById("checkAllForRSMRegion");
            if (selectAll.checked == true) {
                $("#gridRsmRegion tbody input:checkbox").attr("checked", this.checked);
                $("#gridRsmRegion table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var selectedItem = gridData[i];
                    var obj = new Object();
                    obj.ReferenceId = selectedItem.RSMRegionId;
                    obj.ReferenceType = 7;
                    obj.RSMRegionId = selectedItem.RSMRegionId;
                    obj.ParentReference = selectedCompanyId;
                    obj.ChiledParentReference = 0;

                    gbRsmRegionListArray.push(obj);
                }
            }
            else {
                $("#gridRsmRegion tbody input:checkbox").removeAttr("checked", this.checked);
                $("#gridRsmRegion table tr").removeClass('k-state-selected');
                gbRsmRegionListArray = $.grep(gbRsmRegionListArray, function (n) {
                    return n.ParentReference != selectedCompanyId;

                });

            }


        });

    },

    PopulateRsmRegionArray: function (data) {
        gbRsmRegionListArray = [];
        for (var i = 0; i < data.length; i++) {
            var selectedItem = data[i];
            var obj = new Object();
            obj.ReferenceId = selectedItem.ReferenceId;
            obj.ReferenceType = selectedItem.ReferenceType;
            obj.RSMRegionId = selectedItem.ReferenceId;
            obj.ParentReference = selectedItem.ParentReference;
            obj.ChiledParentReference = selectedItem.ChiledParentReference;
            gbRsmRegionListArray.push(obj);
        }
    }
};