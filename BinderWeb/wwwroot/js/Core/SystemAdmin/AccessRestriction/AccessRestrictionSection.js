
var gbSectionListArray = [];
var accessRestrictionSectionManager = {
    gridDataSourceForSection: function () {

        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 1000,

            transport: {
                read: {
                    url: '../Section/GetSectionSummary',
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

    GetSectionInformation: function (hrRecordId, restrictionId) {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../AccessRestriction/GetSectionInformationByHrRecordId/?hrRecordId=" + hrRecordId + "&restrictionId=" + restrictionId;
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
//accessRestrictionSectionHelper.GenerateSectionGrid();
var accessRestrictionSectionHelper = {
    GenerateSectionGrid: function () {
        $("#gridSection").empty();
        var gridDataSource = accessRestrictionSectionManager.gridDataSourceForSection();

        $("#gridSection").kendoGrid({
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
            columns: accessRestrictionSectionHelper.GeneratedSectionColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

            //selectable: false

        });

    },

    GeneratedSectionColumns: function () {
        return columns = [
         { field: "check_rowForSection", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= accessRestrictionSectionHelper.checkedDataForSection(data) #', headerTemplate: '<input type="checkbox" id="checkAllForSection" />' },//headerTemplate: '<input type="checkbox" id="checkAll" />s
         { field: "SectionId", title: "SectionId", width: 50, hidden: true },
         { field: "SectionName", title: "Section Name", width: 100, sortable: true }
        ];
    },

    checkedDataForSection: function (data) {
        if (gbSectionListArray.length > 0) {

            var result = gbSectionListArray.filter(function (obj) {
                return obj.SectionId == data.SectionId && obj.ParentReference == selectedCompanyId;
            });
            if (result.length > 0) {
                return '<input id="check_rowForSection" class="check_rowForSection" type="checkbox" checked="checked"/>';
            }
            else {
                return '<input id="check_rowForSection" class="check_rowForSection" type="checkbox"/>';
            }

        }
        else {
            return '<input id="check_rowForSection" class="check_rowForSection" type="checkbox"/>';
        }
    },

    GetRowDataForSectionGrid: function () {

        $('.check_rowForSection').click(function (e) {
            //debugger;
            var $cb = $(this);
            var gridSummary = $("#gridSection").data("kendoGrid");
            var selectedItem = gridSummary.dataItem(gridSummary.select());//$kgrid.attr('k-state-selected');
            if ($cb.is(':checked')) {
                if (selectedItem != null) {
                    var obj = new Object();
                    obj.ReferenceId = selectedItem.SectionId;
                    obj.ReferenceType = 9;
                    obj.SectionId = selectedItem.SectionId;
                    obj.ParentReference = selectedCompanyId;
                    obj.ChiledParentReference = 0;
                    gbSectionListArray.push(obj);
                }
            } else {

                for (var i = 0; i < gbSectionListArray.length; i++) {
                    var divId = selectedItem.SectionId;
                    if (gbSectionListArray[i].SectionId == divId && gbSectionListArray[i].ParentReference == selectedCompanyId) {
                        gbSectionListArray.splice(i, 1);
                        break;
                    }
                }

            }


        });

        $('#checkAllForSection').click(function (e) {
            gbSectionListArray = [];
            var gridSummary = $("#gridSection").data("kendoGrid");
            var selectAll = document.getElementById("checkAllForSection");
            if (selectAll.checked == true) {
                $("#gridSection tbody input:checkbox").attr("checked", this.checked);
                $("#gridSection table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var selectedItem = gridData[i];
                    var obj = new Object();
                    obj.ReferenceId = selectedItem.SectionId;
                    obj.ReferenceType = 9;
                    obj.SectionId = selectedItem.SectionId;
                    obj.ParentReference = selectedCompanyId;
                    obj.ChiledParentReference = 0;

                    gbSectionListArray.push(obj);
                }
            }
            else {
                $("#gridSection tbody input:checkbox").removeAttr("checked", this.checked);
                $("#gridSection table tr").removeClass('k-state-selected');
                gbSectionListArray = $.grep(gbSectionListArray, function (n) {
                    return n.ParentReference != selectedCompanyId;

                });

            }


        });

    },

    PopulateSectionArray: function (data) {
        gbSectionListArray = [];
        for (var i = 0; i < data.length; i++) {
            var selectedItem = data[i];
            var obj = new Object();
            obj.ReferenceId = selectedItem.ReferenceId;
            obj.ReferenceType = selectedItem.ReferenceType;
            obj.SectionId = selectedItem.ReferenceId;
            obj.ParentReference = selectedItem.ParentReference;
            obj.ChiledParentReference = selectedItem.ChiledParentReference;
            gbSectionListArray.push(obj);
        }
    }
};