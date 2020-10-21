var gbDepartmentArray = [];
var gbDepartmentFacilityArray = [];


var departmentSolutionManager = {
    
    GenerateDepartmentSolutionGrid: function () {
        var url = "../Department/GetDepartmentSummaryForSbuConfigaration/";
        var column = departmentSolutionHelper.GenerateDepartmentSolColumns();
        empressCommonManager.GenerateCommonGridWithPaging("divgridDepartmentSolution", url, column, 50);
    },

    GenerateDepartmentFacilityMapSolutionGrid: function () {
        var url = "../Facility/GetFacilitySummaryForSbuConfigaration/";
        var column = departmentSolutionHelper.GenerateDepartmentFacilitySolColumns();
        empressCommonManager.GenerateCommonGridWithPaging("divgriDepartmentToFacilityMapSolution", url, column, 50);
    },


    SaveDepartmentFacilityMap: function () {

        // if (companyDetailsHelper.validator()) {

        var objCompany = companyDetailsManager.GetDataFromCortolsAsA_Object();
        var departmentId = $("#hdnDepartmentFacilityId").val();
        var objCompanyInfo = JSON.stringify(objCompany).replace(/&/g, "^");
  
        var objDeptFacilityInfoList = JSON.stringify(gbDepartmentFacilityArray).replace(/&/g, "^");
        var jsonParam = "deptFacilityInfoList:" + objDeptFacilityInfoList + ",departmentId:" + JSON.stringify(departmentId) + ",objCompanyInfo:" + objCompanyInfo;
        var serviceUrl = "../Department/SaveDepartmentFacilityMap/";
        AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        //  }

        function onSuccess(jsonData) {
            if (jsonData == "Success") {
                // gbDepartmentFacilityArray = [];
                AjaxManager.MsgBox('success', 'center', 'Success', 'Dept to Facility Mapping Saved Successfully.',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();

                        }
                    }]);
                $("#divgriDepartmentToFacilityMapSolution").data("kendoGrid").dataSource.read();
            }

            else {
                AjaxManager.MsgBox('error', 'center', 'Error', jsonData,
                       [{
                           addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                               $noty.close();
                           }
                       }]);
            }
        }

        function onFailed(error) {
            window.alert(error.statusText);
        }
    },


};

var departmentSolutionHelper = {
    
    initiateDepartmentSolution: function() {

        departmentSolutionManager.GenerateDepartmentSolutionGrid();
        departmentSolutionManager.GenerateDepartmentFacilityMapSolutionGrid();
        SectionSolutionManager.GenerateDeptSectionMapSolutionGrid();

        $("#btnAddDepartmentSol").click(function () {
            departmentSolutionHelper.AddDepartmentSolutionpopInfo();

        });
        
        departmentSolutionHelper.createDepartmentList();
        departmentSolutionHelper.createDepartmentFacilityList();
        SectionSolutionHelper.createDeptSectionMapList();
  
        departmentSummaryManager.GenerateDepartmentGridSummary();
        departmentSummaryHelper.clickEventForEditButton();

        $("#txtDepartmentCode").focus();
    },
    
    AddDepartmentSolutionpopInfo: function () {
        var initPopup = $("#departmentDiv").kendoWindow({
            title: 'Add New Department',
            resizeable: false,
            width: "90%",
            actions: ["Pin", "Refresh", "Maximize", "Close"],
            modal: true,
            visible: true,
        });
        initPopup.data("kendoWindow").open().center();
    },
    
    GenerateDepartmentSolColumns: function () {
        return columns = [
            { field: "check_rowForDepartment", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= departmentSolutionHelper.checkedDataForDepartment(data) #', headerTemplate: '<input type="checkbox" id="checkAllForDepartment" />' },
            { field: "DepartmentCode", title: "Department Code", width: 100 },
            { field: "DepartmentName", title: "Department Name", width: 200 },
            { field: "DepartmentId", hidden: true },
            { field: "Edit", title: "Action Name", filterable: false, width: 90, template: '<input type="button" class="k-button" value="Mapping to Facility" id="btnEdit" onClick="departmentSolutionHelper.clickEventForDeptFacilityMappingFunction()"/><input type="button" class="k-button" value="Mapping to Section" id="btnEdit" onClick="SectionSolutionHelper.clickEventForDeptSectionMappingFunction()"/>', sortable: false },
        ];
    },

    clickEventForDeptFacilityMappingFunction: function () {
     
        var entityGrid = $("#gridCompany").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());

        var entityGridDept = $("#divgridDepartmentSolution").data("kendoGrid");
        var selectedItemDept = entityGridDept.dataItem(entityGridDept.select());

        if (selectedItem != null && selectedItemDept != null) {
            var objDeptFacilityList = empressCommonManager.GetDepartmentFacilityByDepartmentId(selectedItemDept.DepartmentId);
            $("#divgriDepartmentToFacilityMapSolution").data("kendoGrid").dataSource.data([]);
            gbDepartmentFacilityArray = [];
            departmentSolutionManager.GenerateDepartmentFacilityMapSolutionGrid();
            departmentSolutionHelper.PopulateDeptFacilityArray(objDeptFacilityList);
            AjaxManager.PopupWindow("divDepartmentToFacilityMap", "Facility List", "80%");
            $("#hdnDepartmentFacilityId").val(selectedItemDept.DepartmentId);
        }
    },

    PopulateDeptFacilityArray: function (objDeptFacilityList) {
        gbDepartmentFacilityArray = [];
        for (var i = 0; i < objDeptFacilityList.length; i++) {
            gbDepartmentFacilityArray.push(objDeptFacilityList[i]);
        }
        if (objDeptFacilityList.length > 0) {
            $("#divgriDepartmentToFacilityMapSolution").data("kendoGrid").dataSource.read();
        }
    },
    
    checkedDataForDepartment: function (data) {

        if (gbDepartmentArray.length > 0) {

            var result = gbDepartmentArray.filter(function (obj) {
                return obj.DepartmentId == data.DepartmentId;
            });
            if (result.length > 0) {
                return '<input id="check_rowForDepartment" class="check_rowForDepartment" type="checkbox" checked="checked"/>';
            }
            else {
                return '<input id="check_rowForDepartment" class="check_rowForDepartment" type="checkbox"/>';
            }

        }
        else {
            return '<input id="check_rowForDepartment" class="check_rowForDepartment" type="checkbox"/>';
        }


    },
    
    createDepartmentList: function () {

        $('#checkAllForDepartment').click('click', function (e) { 
            gbDepartmentArray = [];

            var gridSummary = $("#divgridDepartmentSolution").data("kendoGrid");


            var selectAll = document.getElementById("checkAllForDepartment");
            if (selectAll.checked == true) {
                $("#divgridDepartmentSolution tbody input:checkbox").attr("checked", this.checked);
                $("#divgridDepartmentSolution table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var obj = gridData[i];
                    gbDepartmentArray.push(obj);
                }
            }
            else {
                $("#divgridDepartmentSolution tbody input:checkbox").removeAttr("checked", this.checked);
                $("#divgridDepartmentSolution table tr").removeClass('k-state-selected');
                gbDepartmentArray = [];


            }
        });// All Row Selection 



        $('#divgridDepartmentSolution').on('change', '.check_rowForDepartment', function (e) {

            var $target = $(e.currentTarget);
            var grid = $("#divgridDepartmentSolution").data("kendoGrid");
            var dataItem = grid.dataItem($(this).closest('tr'));
            if ($target.prop("checked")) {
                gbDepartmentArray.push(dataItem);
            } else {
                for (var i = 0; i < gbDepartmentArray.length; i++) {
                    if (gbDepartmentArray[i].DepartmentId == dataItem.DepartmentId) {
                        gbDepartmentArray.splice(i, 1);
                        break;
                    }
                }

            }
        });


    },
    
    PopulateDepartmentArray: function(objDepartmentList) {
        gbDepartmentArray = [];
        for (var i = 0; i < objDepartmentList.length; i++) {
            gbDepartmentArray.push(objDepartmentList[i]);
        }
        if (objDepartmentList.length > 0) {
            $("#divgridDepartmentSolution").data("kendoGrid").dataSource.read();
        }
    },

    GenerateDepartmentFacilitySolColumns: function () {
        return columns = [
            { field: "check_rowForDepartmentFacility", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= departmentSolutionHelper.checkedDataForDepartmentFacility(data) #', headerTemplate: '<input type="checkbox" id="checkAllForDepartmentFacility" />' },
            { field: "FacilityCode", title: "Facility Code", width: 100 },
            { field: "FacilityName", title: "Facility Name", width: 200 },
            { field: "FacilityId", hidden: true },
            { field: "CompanyId", hidden: true }
        ];
    },

    checkedDataForDepartmentFacility: function (data) {

        if (gbDepartmentFacilityArray.length > 0) {

            var result = gbDepartmentFacilityArray.filter(function (obj) {
                return obj.FacilityId == data.FacilityId;
            });
            if (result.length > 0) {
                return '<input id="check_rowForDepartmentFacility" class="check_rowForDepartmentFacility" type="checkbox" checked="checked"/>';
            }
            else {
                return '<input id="check_rowForDepartmentFacility" class="check_rowForDepartmentFacility" type="checkbox"/>';
            }

        }
        else {
            return '<input id="check_rowForDepartmentFacility" class="check_rowForDepartmentFacility" type="checkbox"/>';
        }


    },


    createDepartmentFacilityList: function () {

        $('#checkAllForDepartmentFacility').click('click', function (e) {
            
            gbDepartmentFacilityArray = [];

            var gridSummary = $("#divgridDepartmentFacilitySolution").data("kendoGrid");

            var selectAll = document.getElementById("checkAllForDepartmentFacility");
            if (selectAll.checked == true) {
                $("#divgriDepartmentToFacilityMapSolution tbody input:checkbox").attr("checked", this.checked);
                $("#divgriDepartmentToFacilityMapSolution table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var obj = gridData[i];
                    gbDepartmentFacilityArray.push(obj);
                }
            }
            else {
                $("#divgridDepartmentFacilitySolution tbody input:checkbox").removeAttr("checked", this.checked);
                $("#divgridDepartmentFacilitySolution table tr").removeClass('k-state-selected');
                gbDepartmentFacilityArray = [];


            }
        });// All Row Selection 



        $('#divgriDepartmentToFacilityMapSolution').on('change', '.check_rowForDepartmentFacility', function (e) {
       
            var $target = $(e.currentTarget);
            var grid = $("#divgriDepartmentToFacilityMapSolution").data("kendoGrid");
            var dataItem = grid.dataItem($(this).closest('tr'));
            if ($target.prop("checked")) {
                gbDepartmentFacilityArray.push(dataItem);
            } else {
                for (var i = 0; i < gbDepartmentFacilityArray.length; i++) {
                    if (gbDepartmentFacilityArray[i].FacilityId == dataItem.FacilityId) {
                        gbDepartmentFacilityArray.splice(i, 1);
                        break;
                    }
                }

            }
        });


    },

    closeDeptFacilityPopUp: function () {
        gbDepartmentFacilityArray = [];
        $("#divDepartmentToFacilityMap").data("kendoWindow").close();
    }


};