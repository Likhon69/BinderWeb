var gbSelectedBranchList = [];

var branchSolutionManager = {
    
    GenerateBranchSolutionGrid: function() {
       
        var url = "../Branch/GetActiveBranchSummaryForSbuConfigaration/";
        var column = branchSolutionHelper.GenerateBranchColumns();
        empressCommonManager.GenerateCommonGridWithPaging("divgridBranchSolution", url, column, 50);
    }
};

var branchSolutionHelper = {
    
    initiateBranchSolution: function() {
        
        branchSolutionManager.GenerateBranchSolutionGrid();
        $("#btnAddBranchSol").click(function () {
            branchSolutionHelper.AddBranchSolutionpopInfo();
            
        });
        branchSolutionHelper.createBranchList();
        branchSummaryManager.GenerateBranchGrid();
        branchSummaryHelper.clickEventForEditBranch();
        $("#txtBranchCode").focus();
        branchDetailsHelper.DivisionNameCombo();
        empressCommonHelper.PopulateRegionComboByZoneId(0, "cmbRegion");
        empressCommonHelper.PopulateAreaComboByRegionId(0, "cmbArea");
        $("#cmbDivision").change(function () {
            $("#cmbRegion").data("kendoComboBox").value("");
            $("#cmbArea").data("kendoComboBox").value("");

            var zoneId = $("#cmbDivision").data("kendoComboBox").value();
            if (zoneId == "") {
                zoneId = 0;
            }
            empressCommonHelper.PopulateRegionComboByZoneId(zoneId, "cmbRegion");
        });

        $("#cmbRegion").change(function () {

            $("#cmbArea").data("kendoComboBox").value("");

            var regionId = $("#cmbRegion").data("kendoComboBox").value();
            if (regionId == "") {
                regionId = 0;
            }
            empressCommonHelper.PopulateAreaComboByRegionId(regionId, "cmbArea");
        });


        $("#chkContraEntryApplicable").click(function () { branchSolutionHelper.IsContractEntryApplicable(); });
    },
    
    AddBranchSolutionpopInfo: function () {
        var initPopup = $("#branchDiv").kendoWindow({
            title: 'Add New Branch',
            resizeable: false,
            width: "90%",
            actions: ["Pin", "Refresh", "Maximize", "Close"],
            modal: true,
            visible: false,
        });
        initPopup.data("kendoWindow").open().center();
    },
    
    GenerateBranchColumns: function() {
        return columns = [
        { field: "check_rowForBranch", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= branchSolutionHelper.checkedDataForBranch(data) #', headerTemplate: '<input type="checkbox" id="checkAllForBranch" />' },
        { filed: "BranchId", title: "BranchId", width: 50, hidden: true },
        { field: "BranchCode", title: "Branch Code", width: 100, sortable: true },
        { field: "BranchName", title: "Branch Name", width: 200, sortable: true },
        { field: "BranchAddress", title: "Address", width: 200, sortable: true }
        ];

    },
    
    createBranchList: function () {
        
        $('#checkAllForBranch').click('click', function (e) {

            gbSelectedBranchList = [];

            var gridSummary = $("#divgridBranchSolution").data("kendoGrid");

            var selectAll = document.getElementById("checkAllForBranch");
            if (selectAll.checked == true) {
                $("#divgridBranchSolution tbody input:checkbox").attr("checked", this.checked);
                $("#divgridBranchSolution table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var obj = gridData[i];
                    gbSelectedBranchList.push(obj);
                }
            }
            else {
                $("#divgridBranchSolution tbody input:checkbox").removeAttr("checked", this.checked);
                $("#divgridBranchSolution table tr").removeClass('k-state-selected');
                gbSelectedBranchList = [];
            }
        });// All Row Selection 



        $('#divgridBranchSolution').on('change', '.check_rowForBranch', function (e) {

            var $target = $(e.currentTarget);
            var grid = $("#divgridBranchSolution").data("kendoGrid");
            var dataItem = grid.dataItem($(this).closest('tr'));
            if ($target.prop("checked")) {
                gbSelectedBranchList.push(dataItem);
            } else {
                for (var i = 0; i < gbSelectedBranchList.length; i++) {
                    if (gbSelectedBranchList[i].BranchId == dataItem.BranchId) {
                        gbSelectedBranchList.splice(i, 1);
                        break;
                    }
                }

            }
        });


    },
    
    checkedDataForBranch: function (data) {

        if (gbSelectedBranchList.length > 0) {

            var result = gbSelectedBranchList.filter(function (obj) {
                return obj.BranchId == data.BranchId;
            });
            if (result.length > 0) {
                return '<input id="check_rowForBranch" class="check_rowForBranch" type="checkbox" checked="checked"/>';
            }
            else {
                return '<input id="check_rowForBranch" class="check_rowForBranch" type="checkbox"/>';
                //if (data.CompanyId > 0) {

                //    gbSelectedBranchList.push(data);

                //    return '<input id="check_row" class="check_row" type="checkbox" checked="checked"/>';
                //} else {
                //    return '<input id="check_row" class="check_row" type="checkbox"/>';
                //}
            }

        }
        else {
            //if (data.CompanyId > 0) {

            //    gbSelectedBranchList.push(data);

            //    return '<input id="check_row" class="check_row" type="checkbox" checked="checked"/>';
            //} else {
            //    return '<input id="check_row" class="check_row" type="checkbox"/>';
            //}
            return '<input id="check_rowForBranch" class="check_rowForBranch" type="checkbox"/>';
        }


    },
    
    PopulateBranchArray: function(objBranchList) {
        gbSelectedBranchList = [];
        for (var i = 0; i < objBranchList.length; i++) {
            gbSelectedBranchList.push(objBranchList[i]);
        }
        if (objBranchList.length > 0) {
            $("#divgridBranchSolution").data("kendoGrid").dataSource.read();
        }
    },

    IsContractEntryApplicable: function () {

        if ($("#chkContraEntryApplicable").is(':checked') == true) {
            $("#liDebitAccHead").show();
            $("#liCreditAccHead").show();
        }
        else {
            $("#liDebitAccHead").hide();
            $("#liCreditAccHead").hide();
        }
    }
};