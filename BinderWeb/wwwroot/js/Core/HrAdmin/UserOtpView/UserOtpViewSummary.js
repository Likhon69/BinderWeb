var UserOtpSummaryManager = {

    gridDataSource: function (searchKey) {
        
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 10,

            transport: {
                read: {
                    url: '../UserOtpView/GetUserOtpViewSummary/?searchKey=' + searchKey,

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
    }

};

var UserOtpSummaryHelper = {
    GenerateUserOtpGrid: function () {
      
        $("#UserOTpViewSummaryDiv").kendoGrid({
            dataSource: UserOtpSummaryManager.gridDataSource(""),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            xheight: 450,
            filterable: true,
            sortable: true,
            columns: UserOtpSummaryHelper.GeneratedUserOtpColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

            //selectable: false

        });
    },

    GeneratedUserOtpColumns: function () {
        return columns = [
        { field: "hdnHrRecordId", hidden: true },
        { field: "EmployeeId", title: "EMP ID", width: 50, sortable: false },
        { field: "LoginId", title: "Login Id", width: 50, sortable: false },
        { field: "EmployeeName", title: "Name", width: 50, sortable: false },
        { field: "Email", title: "Email", width: 50, sortable: false },
        { field: "MobileNo", title: "Mobile No", width: 50, sortable: false },
        { field: "Designation", title: "Designation", width: 50, sortable: false },
        { field: "GenerateTime", title: "Generate Time", width: 50, filterable: false, template: '#=kendo.toString( kendo.parseDate(GenerateTime),"dd-MMM-yyyy hh:mm tt") # ' },
        { field: "Password", title: "OTP", width: 50, filterable: false },
        { field: "Status", title: "Email/SMS", width: 50, filterable: false },


        ];
    },

    CallUserOtpSummaryBySearch: function () {

        var employeeName = $("#txtSearchEmployee").val();

        $("#UserOTpViewSummaryDiv").empty();
        $("#UserOTpViewSummaryDiv").kendoGrid();

        //UserOtpSummaryHelper.GenerateUserOtpGrid();
    },


};