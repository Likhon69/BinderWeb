var gbBranchListArray = [];

var selectedBranchId = 0;

var AccessRestrictionBranchManager = {
    
    gridDataSourceForBranch: function (companyId) {

        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 1000,

            transport: {
                read: {
                    url: '../Branch/GetActiveBranchGridDataByCompanyId/?companyId=' + companyId,

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
    
    GetBranchInformation: function (hrRecordId, restrictionId) {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../AccessRestriction/GetBranchInformationByHrRecordId/?hrRecordId=" + hrRecordId + "&restrictionId=" + restrictionId;
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

var AccessRestrictionBranchHelper = {
    
    GenerateBranchGrid: function (companyId) {
        $("#gridBranch").empty();

        var gridDataSource = AccessRestrictionBranchManager.gridDataSourceForBranch(companyId);

        $("#gridBranch").kendoGrid({
            dataSource: gridDataSource,
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
                pageSizes: [10, 20, 50, 100, 150, 200, 500, 1000]
            },
            xheight: 250,
            filterable: true,
            sortable: true,
            columns: AccessRestrictionBranchHelper.GeneratedBranchColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

            //selectable: false

        });

    },

    GeneratedBranchColumns: function () {
        return columns = [
         { field: "check_rowForBranch", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= AccessRestrictionBranchHelper.checkedDataForBranch(data) #', headerTemplate: '<input type="checkbox" id="checkAllForBranch" />' },//headerTemplate: '<input type="checkbox" id="checkAll" />s
         { field: "BranchId", title: "BranchId", width: 50, hidden: true },
         { field: "BranchName", title: "Location Name", width: 100, sortable: true },
            { filed: "View", title: "View", width: 20, sortable: false, template: '#= AccessRestrictionBranchHelper.setDepartmentDetailsIcon(data) #' }
        ];
    },

    setDepartmentDetailsIcon: function (data) {
        var res = '<a href="#" style="xfloat:left"  class="az-icon az-icon-viewDetails" title="View Details" onclick="AccessRestrictionBranchHelper.ShowDepartmentDetails(\'' + data.HRRecordId + "\',\'" + data.BranchId + '\')" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></span>';
        return res;
    },
    
    ShowDepartmentDetails: function(hrRecordId, branchId) {
        selectedBranchId = branchId;
        AccessRestrictionDepartmentHelper.GenerateDepartmentGrid(selectedCompanyId);
     
    },
    
    checkedDataForBranch: function (data) {
        if (gbBranchListArray.length > 0) {

            var result = gbBranchListArray.filter(function (obj) {
                return obj.BranchId == data.BranchId && obj.ParentReference == selectedCompanyId;
            });
            if (result.length > 0) {
                return '<input id="check_rowForBranch" class="check_rowForBranch" type="checkbox" checked="checked"/>';
            }
            else {
                return '<input id="check_rowForBranch" class="check_rowForBranch" type="checkbox"/>';
            }

        }
        else {
            return '<input id="check_rowForBranch" class="check_rowForBranch" type="checkbox"/>';
        }
    },

    GetRowDataForBranchGrid: function () {
        //$('.check_rowForBranch').click(function (e) {
        $(document).on('click', '.check_rowForBranch', function (e) {
            var $cb = $(this);
            var gridSummary = $("#gridBranch").data("kendoGrid");
            var selectedItem = gridSummary.dataItem(gridSummary.select());//$kgrid.attr('k-state-selected');
            if ($cb.is(':checked')) {
                if (selectedItem != null) {
                    var obj = new Object();
                    obj.ReferenceId = selectedItem.BranchId;
                    obj.ReferenceType = 2;
                    obj.BranchId = selectedItem.BranchId;
                    obj.ParentReference = selectedCompanyId;
                    gbBranchListArray.push(obj);

                    selectedBranchId = selectedItem.BranchId;
                }
            } else {
                for (var i = 0; i < gbBranchListArray.length; i++) {
                    var brId = selectedItem.BranchId;
                    if (gbBranchListArray[i].BranchId == brId && gbBranchListArray[i].ParentReference == selectedCompanyId) {
                        gbBranchListArray.splice(i, 1);
                        break;
                    }
                }
                
                gbDepartmentListArray = $.grep(gbDepartmentListArray, function (n) {
                    return n.ParentReference != selectedCompanyId && n.ChiledParentReference == selectedItem.BranchId;
                });
                
                selectedBranchId = 0;
            }
            if (selectedBranchId > 0) {
                AccessRestrictionDepartmentHelper.GenerateDepartmentGrid(selectedCompanyId);
            }
            
        });//Indivisual row selection

        //$('#checkAllForBranch').click(function (e) {
        $(document).on('click', '#checkAllForBranch', function (e) {
            
            gbBranchListArray = [];
            var gridSummary = $("#gridBranch").data("kendoGrid");
            var selectAll = document.getElementById("checkAllForBranch");
            if (selectAll.checked == true) {
                $("#gridBranch tbody input:checkbox").attr("checked", this.checked);
                $("#gridBranch table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var selectedItem = gridData[i];
                    var obj = new Object();
                    obj.ReferenceId = selectedItem.BranchId;
                    obj.ReferenceType = 2;
                    obj.BranchId = selectedItem.BranchId;
                    obj.ParentReference = selectedCompanyId;
                    gbBranchListArray.push(obj);
                }
            }
            else {
                $("#gridBranch tbody input:checkbox").removeAttr("checked", this.checked);
                $("#gridBranch table tr").removeClass('k-state-selected');
                
                gbBranchListArray = $.grep(gbBranchListArray, function (n) {
                    return n.ParentReference != selectedCompanyId;
                });
                
                gbDepartmentListArray = $.grep(gbDepartmentListArray, function (n) {
                    return n.ParentReference != selectedCompanyId;
                });

            }

            //generateSalaryManager.changeSalaryParam();
        });// All Row Selection 

    },
    
    PolulateBranchArray: function (data) {
        gbBranchListArray = [];
        for (var i = 0; i < data.length; i++) {
            var selectedItem = data[i];
            var obj = new Object();
            obj.ReferenceId = selectedItem.ReferenceId;
            obj.ReferenceType = selectedItem.ReferenceType;
            obj.BranchId = selectedItem.ReferenceId;
            obj.ParentReference = selectedItem.ParentReference;
            gbBranchListArray.push(obj);
        }
    }
    
};