var gbEmployeeTypeListArray = [];

$(document).ready(function () {
    AccessRestrictionHelper.initiateAccessRestriction();

    $("#btnSaveAccessRestriction").click(function () { AccessRestrictionHelper.ValidateAndSaveAccessRestrictionInformation(); });
    $("#btnClearAccessRestriction").click(function () { AccessRestrictionHelper.clearAccessRestriction(); });
    empressCommonHelper.PopulateGroup("dlGroup");
    
    $("#dlGroup").change(function () { AccessRestrictionParamHelper.PopulateExistingDataForGroup();; });
    

   

});

var AccessRestrictionManager = {
    SaveAccessRestrictionInformation: function() {
        
        AjaxManager.MsgBox('information', 'center', 'Confirmation', 'Are you want to Save Access Restriction?',
                [{
                    addClass: 'btn btn-primary',
                    text: 'Yes',
                    onClick: function ($noty) {

                        $noty.close();
                        var objAccessRestrictionCompany = JSON.stringify(gbSelectedCompanyList);
                        var objAccessRestrictionBranch = JSON.stringify(gbBranchListArray);
                        var objAccessRestrictionDepartment = JSON.stringify(gbDepartmentListArray);
                        var objAccessRestrictionEmpType = JSON.stringify(gbEmployeeTypeListArray);
                        var objAccessRestrictionDivision = JSON.stringify(gbDivisionListArray);
                        var objAccessRestrictionFunction = JSON.stringify(gbFunctionListArray);
                        //
                     
                        var objAccessRestrictiongbCostCenter = JSON.stringify(gbCostCenterListArray);
                        var objAccessRestrictionRsmRegion = JSON.stringify(gbRsmRegionListArray);
                        var objAccessRestrictionSection = JSON.stringify(gbSectionListArray);
                        var objAccessRestrictionFacility = JSON.stringify(gbRsmFacilityArray);
                        
                        var objAccessRestrictionGrade = JSON.stringify(gbGradeListArray);

                        //new
                        var hrRecordId = $("#hdnHrRecordId").val();
                        if (hrRecordId == "") {
                            hrRecordId = 0;
                        }
                        var groupId = $("#dlGroup").data("kendoComboBox").value();
                        if (groupId == "") {
                            groupId = 0;
                        }
                        var restrciton = $("#ddlRestrictionType").data("kendoDropDownList").value();
                        var jsonParam = "objListCompany:" + objAccessRestrictionCompany + ",objListBranch:" + objAccessRestrictionBranch +
                            ",objListDepartment:" + objAccessRestrictionDepartment + ",objListEmployeeType:" + objAccessRestrictionEmpType +
                            ",objListDivision:" + objAccessRestrictionDivision + ",objListFunction:" + objAccessRestrictionFunction +
                           ",objListCostCenter:" + objAccessRestrictiongbCostCenter + ",objListRsmRegion:" + objAccessRestrictionRsmRegion +
                            ",objListFacility:" + objAccessRestrictionFacility + ",objListSection:" + objAccessRestrictionSection +
                            ",objListGrade:" + objAccessRestrictionGrade +
                            ",hrRecordId:" + hrRecordId + ",restrcitonType:" + restrciton + ",groupId:" + groupId;
                        var url = "../AccessRestriction/SaveAccessRestrictionInformation";
                        AjaxManager.SendJson2(url, jsonParam, onSuccess, onFailed);
                    }
                }, {
                    addClass: 'btn btn-primary',
                    text: 'Cancel',
                    onClick: function ($noty) {
                        $noty.close();

                    }
                }
                ]);

        function onSuccess(jsonData) {

            if (jsonData == "Success") {

                AjaxManager.MsgBox('success', 'center', 'Success', "Access Restriction save successfully .",
                [{
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function ($noty) {
                        $noty.close();
                        AccessRestrictionHelper.clearAccessRestriction();
                    }
                }]);



            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Error', jsonData,
                [{
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function ($noty) {
                        $noty.close();
                    }
                }]);
            }
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
    },
    gridDataSourceForEmployeeType: function () {

        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 50,

            transport: {
                read: {
                    url: '../EmployeeType/GetEmployeeTypeSummary',

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
    //Employee Type
    GenerateEmployeeTypeGrid: function () {
        var gridDataSource = AccessRestrictionManager.gridDataSourceForEmployeeType();

        $("#gridEmployeeType").kendoGrid({
            dataSource: gridDataSource,
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
                
            },
            xheight: 250,
            filterable: true,
            sortable: true,
            columns: AccessRestrictionManager.GeneratedEmployeeTypeColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

            //selectable: false

        });

    },

    GeneratedEmployeeTypeColumns: function () {
        return columns = [
         { field: "check_rowForEmployeeType", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= AccessRestrictionManager.checkedDataForEmployeeType(data) #', headerTemplate: '<input type="checkbox" id="checkAllForEmployeeType" />' },//headerTemplate: '<input type="checkbox" id="checkAll" />s
         { field: "EmployeeTypeId", title: "EmployeeTypeId", width: 50, hidden: true },
         { field: "EmployeeTypeName", title: "Employee Type Name", width: 100, sortable: true }
       //  { field: "Edit", title: "Edit", filterable: false, width: 50, template: '<input type="button" class="k-button" value="Edit" id="btnEdit" onClick="BankBranchSummaryHelper.clickEventForEditFunction()"/>', sortable: false }
        ];
    },

    checkedDataForEmployeeType: function (data) {
        if (gbEmployeeTypeListArray.length > 0) {

            var result = gbEmployeeTypeListArray.filter(function (obj) {
                return obj.EmployeeTypeId == data.EmployeeTypeId;
            });
            if (result.length > 0) {
                return '<input id="check_rowForEmployeeType" class="check_rowForEmployeeType" type="checkbox" checked="checked"/>';
            }
            else {
                return '<input id="check_rowForEmployeeType" class="check_rowForEmployeeType" type="checkbox"/>';
            }

        }
        else {
            return '<input id="check_rowForEmployeeType" class="check_rowForEmployeeType" type="checkbox"/>';
        }
    },

    GeRowDataForEmployeeTypeGrid: function () {

        $(document).on("click",'.check_rowForEmployeeType',function (e) {
            var $cb = $(this);
            var gridSummary = $("#gridEmployeeType").data("kendoGrid");
            var selectedItem = gridSummary.dataItem(gridSummary.select());//$kgrid.attr('k-state-selected');
            if ($cb.is(':checked')) {
                if (selectedItem != null) {

                    gbEmployeeTypeListArray.push(selectedItem);
                }
            } else {
                gbEmployeeTypeListArray = $.grep(gbEmployeeTypeListArray, function (n) {
                    return n.EmployeeTypeId != selectedItem.EmployeeTypeId;

                });

            }

            // generateSalaryManager.changeSalaryParam();
        });//Indivisual row selection

        $(document).on("click", '#checkAllForEmployeeType', function (e) {
            gbEmployeeTypeListArray = [];

            var gridSummary = $("#gridEmployeeType").data("kendoGrid");
            var selectAll = document.getElementById("checkAllForEmployeeType");
            if (selectAll.checked == true) {
                $("#gridEmployeeType tbody input:checkbox").attr("checked", this.checked);
                $("#gridEmployeeType table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var emp = gridData[i];
                    gbEmployeeTypeListArray.push(emp);
                }
            }
            else {
                $("#gridEmployeeType tbody input:checkbox").removeAttr("checked", this.checked);
                $("#gridEmployeeType table tr").removeClass('k-state-selected');
                gbEmployeeTypeListArray = [];

            }

            //generateSalaryManager.changeSalaryParam();
        });// All Row Selection 

    },

};

var AccessRestrictionHelper = {
    
    initiateAccessRestriction: function() {
        AccessRestrictionParamHelper.initiateAccessRestrictionParam();
        AccessRestrictionCompanyHelper.initiateAccessRestrictionCompany();
        AccessRestrictionBranchHelper.GetRowDataForBranchGrid();
        AccessRestrictionDepartmentHelper.GetRowDataForDepartmentGrid();
        AccessRestrictionHelper.RestrictionTypeDropDownList();
        
        AccessRestrictionManager.GenerateEmployeeTypeGrid();
        AccessRestrictionManager.GeRowDataForEmployeeTypeGrid();
        
        accessRestrictionDivisionHelper.GetRowDataForDivisionGrid();
        
        accessRestrictionFunctionHelper.GetRowDataForFunctionGrid();
        //

        accessRestrictionCostCenterHelper.GetRowDataForCostCentreGrid();
        accessRestrictionRsmRegionHelper.GetRowDataForRSMRegionGrid();
        //

        accessRestrictionSectionHelper.GetRowDataForSectionGrid();
        accessRestrictionFacilityHelper.GetRowDataForFacilityGrid();
        
        accessRestrictionGradeHelper.GetRowDataForGradeGrid();
    },
    
    clearAccessRestriction: function() {

        AccessRestrictionParamHelper.clearEmploymentInformation();
        $("#gridCompany").data("kendoGrid").dataSource.read();

        $("#txtEmployeeCode").val("");
        $("#hdnHrRecordId").val("0");
        $("#dlGroup").data("kendoComboBox").value("");
        gbBranchListArray = [];
        gbDepartmentListArray = [];
        gbSelectedCompanyList = [];
        gbDivisionListArray = [];
        gbFunctionListArray = [];
        gbSectionListArray = [];
        gbRsmFacilityArray = [];
        gbCostCenterListArray = [];
        if ($("#gridDeprtment").data("kendoGrid") != undefined) {
            $("#gridDeprtment").data("kendoGrid").dataSource.data([]);
        }
        if ($("#gridBranch").data("kendoGrid") != undefined) {
            $("#gridBranch").data("kendoGrid").dataSource.data([]);
        }
        if ($("#gridDivision").data("kendoGrid") != undefined) {
            $("#gridDivision").data("kendoGrid").dataSource.data([]);
        }
        if ($("#gridFunction").data("kendoGrid") != undefined) {
            $("#gridFunction").data("kendoGrid").dataSource.data([]);
        }
        //
        if ($("#gridSection").data("kendoGrid") != undefined) {
            $("#gridSection").data("kendoGrid").dataSource.data([]);
        }

        if ($("#gridFacility").data("kendoGrid") != undefined) {
            $("#gridFacility").data("kendoGrid").dataSource.data([]);
        }

        if ($("#gridCostCenter").data("kendoGrid") != undefined) {
            $("#gridCostCenter").data("kendoGrid").dataSource.data([]);
        }


    },
    
    ValidateAndSaveAccessRestrictionInformation: function() {
        
        if (AccessRestrictionParamHelper.validateSearchItem("divAccessRestriction")) {
           if (assembly.AssemblyInfoId == 12) {
               AccessRestrictionManager.SaveAccessRestrictionInformation();
           }else{
            if (gbSelectedCompanyList.length > 0) {
                AccessRestrictionManager.SaveAccessRestrictionInformation();
            } else {
                AjaxManager.MsgBox('warning', 'center', 'Warning', "Please Select atleast one Company to Save Data",
            [{
                addClass: 'btn btn-primary',
                text: 'Ok',
                onClick: function ($noty) {
                    $noty.close();
                }
            }]);
            }
           }
        }

    },
    
    RestrictionTypeDropDownList:function() {
        $("#ddlRestrictionType").kendoDropDownList({
            optionLabel: "Select",
            dataTextField: 'text',
            dataValueField: 'id',
            dataSource: [{ id: 1, text: 'Employee Wise Restriction' }, { id: 2, text: 'Group Wise Restriction' }, ],
            change:function() {
                var val = this.value();
                if (val == 1) {
                    $("#divGroup").hide();
                    $("#divEmployee").show();
                    $("#txtEmployeeCode").attr("required", true);
                    $("#dlGroup").attr("required", false);

                } else {
                    $("#divGroup").show();
                    $("#divEmployee").hide();
                    $("#txtEmployeeCode").attr("required", false);
                    $("#dlGroup").attr("required", true);
                }
            }

        });
    }
};