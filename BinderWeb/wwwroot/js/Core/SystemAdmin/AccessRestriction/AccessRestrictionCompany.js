
var gbSelectedCompanyList = [];

var selectedCompanyId = 0;

var AccessRestrictionCompanyManager = {
    
    gridDataSourceForCompany: function () {

        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 100,

            transport: {
                read: {
                    url: '../Company/GetActiveCompanyGridData',

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
    
    GetCompanyData: function(hrRecordId,restrictionId) {
        
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../AccessRestriction/GetCompanyInformationByHrRecordId/?hrRecordId=" + hrRecordId + "&restrictionId=" + restrictionId;
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

var AccessRestrictionCompanyHelper = {
    initiateAccessRestrictionCompany: function () {
        gbSelectedCompanyList = [];
        AccessRestrictionCompanyHelper.GenerateCompanyGrid();
        AccessRestrictionCompanyHelper.GeRowDataForCompanyGrid();
    },
    
    GenerateCompanyGrid: function () {
        var gridDataSource = AccessRestrictionCompanyManager.gridDataSourceForCompany();

        $("#gridCompany").kendoGrid({
            dataSource: gridDataSource,
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            xheight: 450,
            filterable: true,
            sortable: true,
            columns: AccessRestrictionCompanyHelper.GeneratedCompanyColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

            //selectable: false

        });

    },
    
    GeneratedCompanyColumns: function () {
        return columns = [
         { field: "check_rowForCompany", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= AccessRestrictionCompanyHelper.checkedDataForCompany(data) #', headerTemplate: '<input type="checkbox" id="checkAllForCompany" />' },//, headerTemplate: '<input type="checkbox" id="checkAllForCompany" />'
         { field: "CompanyId", title: "CompanyId", width: 50, hidden: true },
         { field: "CompanyName", title: "SBU Name", width:120, sortable: true },
         { filed: "View", title: "View", width: 20, sortable: false, template: '#= AccessRestrictionCompanyHelper.setBranchDetailsIcon(data) #' }
        ];
    },
    
    checkedDataForCompany: function (data) {
        if (gbSelectedCompanyList.length > 0) {

            var result = gbSelectedCompanyList.filter(function (obj) {
                return obj.CompanyId == data.CompanyId;
            });
            if (result.length > 0) {
                return '<input id="check_rowForCompany" class="check_rowForCompany" type="checkbox" checked="checked"/>';
            }
            else {
                return '<input id="check_rowForCompany" class="check_rowForCompany" type="checkbox"/>';
            }

        }
        else {
            return '<input id="check_rowForCompany" class="check_rowForCompany" type="checkbox"/>';
        }
    },
    
    GeRowDataForCompanyGrid: function () {
        $(document).on('click', '.check_rowForCompany', function (e) {
            var $cb = $(this);
            var gridSummary = $("#gridCompany").data("kendoGrid");
            var selectedItem = gridSummary.dataItem(gridSummary.select());//$kgrid.attr('k-state-selected');
            if ($cb.is(':checked')) {
                if (selectedItem != null) {
                    var obj = new Object();
                    obj.ReferenceId = selectedItem.CompanyId;
                    obj.ReferenceType = 1;
                    obj.CompanyId = selectedItem.CompanyId;
                    obj.ParentReference = 0;
                    gbSelectedCompanyList.push(obj);
                    
                    selectedCompanyId = selectedItem.CompanyId;
                }
            } else {
                gbSelectedCompanyList = $.grep(gbSelectedCompanyList, function (n) {
                    return n.CompanyId != selectedItem.CompanyId;
                });
                
                var bList = $.grep(gbSelectedCompanyList, function (n) {
                    return n.ParentReference == selectedItem.CompanyId;
                });
                for (var i = 0; i < bList.length; i++) {
                    gbDepartmentListArray = $.grep(gbDepartmentListArray, function (n) {
                        return n.ParentReference != selectedItem.CompanyId && n.ChiledParentReference == bList[i].BranchId;
                    });
                }
                
                gbBranchListArray = $.grep(gbBranchListArray, function (n) {
                    return n.ParentReference != selectedItem.CompanyId;
                });
                
                gbDivisionListArray = $.grep(gbDivisionListArray, function (n) {
                    return n.ParentReference != selectedItem.CompanyId;
                });
                gbFunctionListArray = $.grep(gbFunctionListArray, function (n) {
                    return n.ParentReference != selectedItem.CompanyId;
                });
                gbCostCenterListArray = $.grep(gbCostCenterListArray, function (n) {
                    return n.ParentReference != selectedItem.CompanyId;
                });
                gbRsmRegionListArray = $.grep(gbRsmRegionListArray, function (n) {
                    return n.ParentReference != selectedItem.CompanyId;
                });
                gbSectionListArray = $.grep(gbSectionListArray, function (n) {
                    return n.ParentReference != selectedItem.CompanyId;
                });
                gbRsmFacilityArray = $.grep(gbRsmFacilityArray, function (n) {
                    return n.ParentReference != selectedItem.CompanyId;
                });
                
                gbGradeListArray = $.grep(gbGradeListArray, function (n) {
                    return n.ParentReference != selectedItem.CompanyId;
                });
              

                selectedCompanyId = 0;
            }
            if (selectedCompanyId > 0) {
                AccessRestrictionCompanyHelper.ChangeCompanyInformation();
            }
        });
        
        $(document).on('click', '#checkAllForCompany', function (e) {

            gbSelectedCompanyList = [];
            var gridSummary = $("#gridCompany").data("kendoGrid");
            var selectAll = document.getElementById("checkAllForCompany");
            if (selectAll.checked == true) {
                $("#gridCompany tbody input:checkbox").attr("checked", this.checked);
                $("#gridCompany table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var selectedItem = gridData[i];
                    var obj = new Object();
                    obj.ReferenceId = selectedItem.CompanyId;
                    obj.ReferenceType = 1;
                    obj.CompanyId = selectedItem.CompanyId;
                    obj.ParentReference = 0;
                    gbSelectedCompanyList.push(obj);
                }
            }
            else {
                $("#gridCompany tbody input:checkbox").removeAttr("checked", this.checked);
                $("#gridCompany table tr").removeClass('k-state-selected');
                gbSelectedCompanyList = [];
                gbBranchListArray = [];
                gbDepartmentListArray = [];
                gbDivisionListArray = [];
                gbFunctionListArray = [];
                gbCostCenterListArray = [];
                gbRsmRegionListArray = [];
                gbGradeListArray = [];
            }

            //generateSalaryManager.changeSalaryParam();
        });// All Row Selection 

    },

    ChangeCompanyInformation: function() {
     AccessRestrictionBranchHelper.GenerateBranchGrid(selectedCompanyId);
        accessRestrictionDivisionHelper.GenerateDivisionGrid(selectedCompanyId);
        accessRestrictionFunctionHelper.GenerateFunctionGrid();
        
        accessRestrictionGradeHelper.GenerateGradeGrid();

        if ($("#gridBranch").data("kendoGrid") != undefined) {
            $("#gridBranch").data("kendoGrid").dataSource.data([]);
        }
        
        if ($("#gridDivision").data("kendoGrid") != undefined) {
            $("#gridDivision").data("kendoGrid").dataSource.data([]);
        }
        if ($("#gridFunction").data("kendoGrid") != undefined) {
            $("#gridFunction").data("kendoGrid").dataSource.data([]);
        }
        
        if ($("#gridGrade").data("kendoGrid") != undefined) {
            $("#gridGrade").data("kendoGrid").dataSource.data([]);
        }


        accessRestrictionCostCenterHelper.GenerateCostCenterGrid();
        accessRestrictionRsmRegionHelper.GenerateRSMRegionGrid();
        if ($("#gridCostCenter").data("kendoGrid") != undefined) {
            $("#gridCostCenter").data("kendoGrid").dataSource.data([]);
        }
        if ($("#gridRsmRegion").data("kendoGrid") != undefined) {
            $("#gridRsmRegion").data("kendoGrid").dataSource.data([]);
        }
        //
        if ($("#gridSection").data("kendoGrid") != undefined) {
            $("#gridSection").data("kendoGrid").dataSource.data([]);
        }
        if ($("#gridFacility").data("kendoGrid") != undefined) {
            $("#gridFacility").data("kendoGrid").dataSource.data([]);
        }
        accessRestrictionSectionHelper.GenerateSectionGrid();
        accessRestrictionFacilityHelper.GenerateFacilityGrid();

    },
    
    PolulateCompanyArray: function (data) {
        gbSelectedCompanyList = [];
        for (var i = 0; i < data.length; i++) {
            var selectedItem = data[i];
            var obj = new Object();
            obj.ReferenceId = selectedItem.ReferenceId;
            obj.ReferenceType = selectedItem.ReferenceType;
            obj.CompanyId = selectedItem.ReferenceId;
            obj.ParentReference = selectedItem.ParentReference;
            gbSelectedCompanyList.push(obj);
        }
        $("#gridCompany").data("kendoGrid").dataSource.read();
    },
    
    setBranchDetailsIcon: function(data) {
        var res = '<a href="#" style="xfloat:left"  class="az-icon az-icon-viewDetails" title="View Details" onclick="AccessRestrictionCompanyHelper.ShowBranchDetails(\'' + data.HRRecordId + "\',\'" + data.CompanyId + '\')" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></span>';
        return res;

    },
    
    ShowBranchDetails: function (hrRecordId, companyId) {
       selectedCompanyId = companyId;
        AccessRestrictionBranchHelper.GenerateBranchGrid(companyId);
      //  GetDivisionInformation
        accessRestrictionDivisionHelper.GenerateDivisionGrid(companyId);
        accessRestrictionFunctionHelper.GenerateFunctionGrid();
        //
        accessRestrictionCostCenterHelper.GenerateCostCenterGrid();
        accessRestrictionRsmRegionHelper.GenerateRSMRegionGrid();
        //new
        accessRestrictionSectionHelper.GenerateSectionGrid();
        accessRestrictionFacilityHelper.GenerateFacilityGrid();
        
        accessRestrictionGradeHelper.GenerateGradeGrid();
    }

};