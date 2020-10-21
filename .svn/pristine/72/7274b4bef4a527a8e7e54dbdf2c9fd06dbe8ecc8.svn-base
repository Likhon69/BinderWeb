$(document).ready(function () {
    TabPermissionHelper.initiatTabPermission();
    $("#btnSaveTabPermission").click(function () {
        TabPermissionHelper.SaveTabPermission();

    });
    $("#btnLoad").click(function () {
        TabPermissionHelper.SetGridData();
    });
    $("#cmbGroup").change(function () {
        TabPermissionHelper.SetGridData();

    });

    //$("#gridTabPermission .k-grid-content").on("change", "input.chkbx", function (e) {
    //    var grid = $("#gridTabPermission").data("kendoGrid"),
    //        dataItem = grid.dataItem($(e.target).closest("tr"));

    //    dataItem.set("IsVisible", this.checked);
    //});

});

var TabPermissionHelper = {
    initiatTabPermission: function () {
        TabPermissionHelper.gridTabPermission();
        var jsonParam = "companyId=" + 0;
        empressCommonHelper.PopulateCommonCombo('cmbGroup', 'GroupName', 'GroupId', 'select', jsonParam, "../Group/GetGroupByCompanyId/");


    },
    gridTabPermission: function () {
        var groupId = 0;
        $("#gridTabPermission").kendoGrid({
            dataSource: TabPermissionHelper.dataSourceTabPermission(groupId),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
                messages: {
                    display: "{2} items"
                },
                previousNext: false,
                numeric: false,

            },
            filterable: true,
            sortable: false,
            columns: TabPermissionHelper.cloumnTabPermission(),
            editable: true,
            navigatable: true,
            selectable: "row,cell",
        });

    },
    cloumnTabPermission: function () {
        return columns = [
            { field: "TabPermissionId", title: "TabPermissionId", width: 100, hidden: true },
            { field: "TabId", title: "TabId", width: 30 },
            { field: "ParentTabName", title: "Parent Tab", width: 80 },
            { field: "TabName", title: "Tab/Panel", width: 80 },
            { field: "IsVisible", title: "View", width: 80, filterable: false, template: '<input type="checkbox" onclick="TabPermissionHelper.editorVisible(this)" #=IsVisible?checked="checked":""#/>', headerTemplate: '<input type="checkbox" onclick="TabPermissionHelper.clickAllCheckedView(this)" /> Visible' },
            //{ field: "IsRead", title: "Read", width: 80, filterable: false, template: '<input type="checkbox" onclick="TabPermissionHelper.editorVisible(this)" #=IsRead?checked="checked":""#/>', headerTemplate: '<input type="checkbox" onclick="TabPermissionHelper.clickAllCheckedRead(this)" /> Read Only' },
            { field: "IsWrite", title: "Editable", width: 80, filterable: false, template: '<input type="checkbox" onclick="TabPermissionHelper.editorVisible(this)" #=IsWrite?checked="checked":""#/>', headerTemplate: '<input type="checkbox" onclick="TabPermissionHelper.clickAllCheckedWrite(this)" /> Editable' },
        ];
    },
    dataSourceTabPermission: function (groupId) {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            //pageSize: 50,
            batch: true,
            transport: {
                read: {
                    url: '../EmployeeTabPermission/GridDataSourceTabPermission/?groupId=' + groupId,

                    type: "POST",

                    dataType: "json",

                    contentType: "application/json; charset=utf-8"
                },

                parameterMap: function (options) {

                    return JSON.stringify(options);

                }
            },

            schema: {
                model: {
                    id: "TabPermissionId",
                    fields: {
                        TabPermissionId: {
                            type: 'number', editable: false
                        },
                        TabId: { type: 'number', editable: false },
                        TabName: { type: 'string', editable: false },
                        ParentTabName: { type: 'string', editable: false },
                        IsVisible: { type: 'boolean' },
                        //IsRead: { type: 'boolean' },
                        IsWrite: { type: 'boolean' },

                    }
                },
                data: "Items", total: "TotalCount",

            }

        });

        return gridDataSource;
    },
    editorVisible: function (element) {
        var isChecked = element.checked,
        cell = $(element).parent(), /* you have to find cell containing check box*/
        grid = $("#gridTabPermission").data("kendoGrid");
        grid.editCell(cell);


    },
    SaveTabPermission: function () {
        var groupId = $("#cmbGroup").data('kendoComboBox').value();
        if (groupId > 0) {
            var grid = $("#gridTabPermission").data('kendoGrid');
            var data = grid.dataSource.data();
            var url = "../EmployeeTabPermission/SaveEmployeeTabPermission";
            var param = "empTabPermission:" + JSON.stringify(data) + ',groupId:' + groupId;
            AjaxManager.SaveObject(url, param, function(response) {
                if (response.Status) {
                    Message.Show("Success", "Save Changes Successfully", function() {

                    });
                }

            });
        } else {
            Message.Warning("Please Select a group");
        }
       

    },
    SetGridData: function () {
        //debugger;
        var groupId = $("#cmbGroup").val();
        var grid = $("#gridTabPermission").data('kendoGrid');
        var dataSource = TabPermissionHelper.dataSourceTabPermission(groupId);
        grid.setDataSource(dataSource);
    },
    clickAllCheckedView: function (element) {
        var isChecked = element.checked,
       grid = $("#gridTabPermission").data("kendoGrid");
        var data = grid.dataSource.data();
        for (var i = 0; i < data.length; i++) {
            if (isChecked) {
                data[i].IsVisible = true;
            } else {
                data[i].IsVisible = false;
            }
        }
        grid.refresh();
    },
    clickAllCheckedWrite: function (element) {
        var isChecked = element.checked,
       grid = $("#gridTabPermission").data("kendoGrid");
        var data = grid.dataSource.data();
        for (var i = 0; i < data.length; i++) {
            if (isChecked) {
                data[i].IsWrite = true;
            } else {
                data[i].IsWrite = false;
            }
        }
        grid.refresh();
    },
    clickAllCheckedRead: function (element) {
        var isChecked = element.checked,
       grid = $("#gridTabPermission").data("kendoGrid");
        var data = grid.dataSource.data();
        for (var i = 0; i < data.length; i++) {
            if (isChecked) {
                data[i].IsRead = true;
            } else {
                data[i].IsRead = false;
            }
        }
        grid.refresh();
    }
}