

var HierarchyCompanyManager = {
    initHierarchyGrid: function () {

        HierarchyCompanyManager.GenerateCompanyGrid("gridHierarchyCompany");
        HierarchyCompanyManager.GenerateDepartmentGrid("gridDepartment");

    },
    GenerateCompanyGrid: function (gridCtrlName) {

        $("#" + gridCtrlName).kendoGrid({
            dataSource: HierarchyCompanyManager.CompanyGridDataSource(),
            pageable: {
                refresh: false,
                serverPaging: false,
                serverFiltering: false,
                serverSorting: false,

            },
            //xheight: 250,
            filterable: true,
            sortable: true,
            columns: HierarchyCompanyHelper.CompanyGridColumns(),
            editable: false,
            navigatable: true,
            scrollable: false,
            selectable: "row",
            detailInit: HierarchyCompanyManager.initLocationGrid,
            dataBound: function () {
                this.expandRow(this.tbody.find("tr.k-master-row").first());
            },

        });


    },
    initLocationGrid: function (e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: HierarchyCompanyManager.LocationGridDataSource(e.data.CompanyId),
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: HierarchyCompanyHelper.LocationGridColumns(),

        });




    },
    GenerateDepartmentGrid: function (gridCtrlName) {
        $("#" + gridCtrlName).kendoGrid({
            dataSource: [],
            sortable: {
                mode: "single",
                allowUnsort: false
            },
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,

            },
            xheight: 450,
            filterable: true,
            //sortable: true,
            columns: HierarchyCompanyHelper.DepartmentGridColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });
    },

    CompanyGridDataSource: function () {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 10,

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
            schema: {

                data: "Items", total: "TotalCount"
            }
        });
        return gridDataSource;

    },
    LocationGridDataSource: function (companyId) {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 10,
            batch: true,
            transport: {
                read: {
                    url: '../Branch/GetBranchSummary/?companyID=' + companyId,

                    type: "POST",
                    async: false,
                    cache: false,
                    dataType: "json",

                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options) {

                    return JSON.stringify(options);

                }
            },
            schema: {
                data: "Items", total: "TotalCount"
            },

            filter: { field: "CompanyId", operator: "eq", value: companyId }

        });
        return gridDataSource;

    },
    DepartmentGridDataSource: function (companyList) {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 10,

            transport: {
                read: {
                    url: '../Deparment/GetDepartmentByCompanies?companyList=' + companyList,

                    type: "POST",

                    dataType: "json",

                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options) {

                    return JSON.stringify(options);

                }
            },
            schema: {

                data: "Items", total: "TotalCount"
            }
        });
        return gridDataSource;

    },
    
};

var HierarchyCompanyHelper = {


    SetDepartmentDataSource: function (gridDepartment) {
        var companyList = [];
        var dataSource = HierarchyCompanyManager.DepartmentGridDataSource(companyList);
        $("#" + gridDepartment).data('kendoGrid').setDataSource(dataSource);


    },



    CompanyGridColumns: function () {
        return columns = [
           { field: "checkAllCompany", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= branchSummaryHelper.checkedDataForCompany(data) #' }, //, headerTemplate: '<input type="checkbox" id="checkAllForCompany" />' 
           { field: "CompanyId", title: "CompanyId", width: 50, hidden: true },
           { field: "CompanyName", title: "Company", width: 100, sortable: true },
           //  { field: "Edit", title: "Edit", filterable: false, width: 50, template: '<input type="button" class="k-button" value="Edit" id="btnEdit" onClick="BankBranchSummaryHelper.clickEventForEditFunction()"/>', sortable: false }
        ];
    },
    LocationGridColumns: function () {
        return columns = [
           { field: "checkAllLocation", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= branchSummaryHelper.checkedDataForBranch(data) #', }, //headerTemplate: '<input type="checkbox" id="checkAllForBranch" />' 
           { field: "BranchId", title: "BranchId", width: 50, hidden: true },
           { field: "BranchName", title: "Location Name", width: 100, sortable: true },
           //{ field: "SbuName", title: "SBU Name", width: 100, sortable: true },
           //{ field: "LunchHour", title: "Lunch Hour", width: 100, filterable: false, editor: branchSummaryHelper.editorLunchHour, },// template: '#= branchSummaryHelper.setLunchHour(data)#',

           //  { field: "Edit", title: "Edit", filterable: false, width: 50, template: '<input type="button" class="k-button" value="Edit" id="btnEdit" onClick="BankBranchSummaryHelper.clickEventForEditFunction()"/>', sortable: false }
        ];
    },
    DepartmentGridColumns: function () {
        return columns = [
           { field: "checkAllDepartment", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= branchSummaryHelper.checkedDataForBranch(data) #', }, //headerTemplate: '<input type="checkbox" id="checkAllForBranch" />' 
           { field: "DepartmentName", title: "Department Name", width: 100 },
           //{ field: "CompanyName", title: "Company Name", width: 100 },
           //{ field: "DepartmentHeadName", title: "Department Head", width: 100, sortable: false },
           //{ field: "DepartmentId", hidden: true },
           //{ field: "CompanyId", hidden: true },
           //{ field: "DepartmentHeadId", hidden: true },
           //{ field: "Edit", title: "Edit", filterable: false, width: 60, template: '<input type="button" class="k-button" value="Edit" id="btnEdit" onClick="departmentSummaryHelper.clickEventForEditButton()"  />', sortable: false }
        ];
    }
};
