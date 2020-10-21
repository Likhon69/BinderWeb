
var gbRsmFacilityArray = [];
var accessRestrictionFacililtyManager = {
    gridDataSourceForFacilty: function () {

        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 1000,

            transport: {
                read: {
                    url: '../Facility/GetFacilitySummary',
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

    GetFacililtyInformation: function (hrRecordId, restrictionId) {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../AccessRestriction/GetFacililtyInformationByHrRecordId/?hrRecordId=" + hrRecordId + "&restrictionId=" + restrictionId;
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
//accessRestrictionFacilityHelper.GenerateFacilityGrid();
var accessRestrictionFacilityHelper = {
    GenerateFacilityGrid: function () {
        $("#gridFacility").empty();
        var gridDataSource = accessRestrictionFacililtyManager.gridDataSourceForFacilty();

        $("#gridFacility").kendoGrid({
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
            columns: accessRestrictionFacilityHelper.GeneratedFacilityColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

            //selectable: false

        });

    },

    GeneratedFacilityColumns: function () {
        return columns = [
         { field: "check_rowForFacility", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= accessRestrictionFacilityHelper.checkedDataForFacility(data) #', headerTemplate: '<input type="checkbox" id="checkAllForFacility" />' },//headerTemplate: '<input type="checkbox" id="checkAll" />s
         { field: "FacilityId", title: "Cost Centre", width: 50, hidden: true },
         { field: "FacilityName", title: "Facility Name", width: 100, sortable: true }
        ];
    },

    checkedDataForFacility: function (data) {
        if (gbRsmFacilityArray.length > 0) {

            var result = gbRsmFacilityArray.filter(function (obj) {
                return obj.FacilityId == data.FacilityId && obj.ParentReference == selectedCompanyId;
            });
            if (result.length > 0) {
                return '<input id="check_rowForFacility" class="check_rowForFacility" type="checkbox" checked="checked"/>';
            }
            else {
                return '<input id="check_rowForFacility" class="check_rowForFacility" type="checkbox"/>';
            }

        }
        else {
            return '<input id="check_rowForFacility" class="check_rowForFacility" type="checkbox"/>';
        }
    },

    GetRowDataForFacilityGrid: function () {

        $(document).on("click",'.check_rowForFacility',function (e) {

            var $cb = $(this);
            var gridSummary = $("#gridFacility").data("kendoGrid");
            var selectedItem = gridSummary.dataItem(gridSummary.select());//$kgrid.attr('k-state-selected');
            if ($cb.is(':checked')) {
                if (selectedItem != null) {
                    var obj = new Object();
                    obj.ReferenceId = selectedItem.FacilityId;
                    obj.ReferenceType = 8;
                    obj.FacilityId = selectedItem.FacilityId;
                    obj.ParentReference = selectedCompanyId;
                    obj.ChiledParentReference = 0;
                    gbRsmFacilityArray.push(obj);
                }
            } else {

                for (var i = 0; i < gbRsmFacilityArray.length; i++) {
                    var divId = selectedItem.FacilityId;
                    if (gbRsmFacilityArray[i].FacilityId == divId && gbRsmFacilityArray[i].ParentReference == selectedCompanyId) {
                        gbRsmFacilityArray.splice(i, 1);
                        break;
                    }
                }

            }


        });

        $('#checkAllForFacility').click(function (e) {
            gbRsmFacilityArray = [];
            var gridSummary = $("#gridFacility").data("kendoGrid");
            var selectAll = document.getElementById("checkAllForFacility");
            if (selectAll.checked == true) {
                $("#gridFacility tbody input:checkbox").attr("checked", this.checked);
                $("#gridFacility table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var selectedItem = gridData[i];
                    var obj = new Object();
                    obj.ReferenceId = selectedItem.FacilityId;
                    obj.ReferenceType = 8;
                    obj.FacilityId = selectedItem.FacilityId;
                    obj.ParentReference = selectedCompanyId;
                    obj.ChiledParentReference = 0;

                    gbRsmFacilityArray.push(obj);
                }
            }
            else {
                $("#gridFacility tbody input:checkbox").removeAttr("checked", this.checked);
                $("#gridFacility table tr").removeClass('k-state-selected');
                gbRsmFacilityArray = $.grep(gbRsmFacilityArray, function (n) {
                    return n.ParentReference != selectedCompanyId;

                });

            }


        });

    },

    PopulateFacilityArray: function (data) {
        gbRsmFacilityArray = [];
        for (var i = 0; i < data.length; i++) {
            var selectedItem = data[i];
            var obj = new Object();
            obj.ReferenceId = selectedItem.ReferenceId;
            obj.ReferenceType = selectedItem.ReferenceType;
            obj.FacilityId = selectedItem.ReferenceId;
            obj.ParentReference = selectedItem.ParentReference;
            obj.ChiledParentReference = selectedItem.ChiledParentReference;
            gbRsmFacilityArray.push(obj);
        }
    }
};