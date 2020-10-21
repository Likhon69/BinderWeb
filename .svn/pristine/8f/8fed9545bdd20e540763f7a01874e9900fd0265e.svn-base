$(document).ready(function() {
    $("#tabAboutUs").kendoTabStrip({
        animation: { close: { effects: "fadeOut" }, open: { effects: "fadeIn" } }
    });
    aboutUsHelper.GenerateApplicationGrid();
    //aboutUsHelper.ShowApplicationGrid();
    //aboutUsHelper.populateLicenseInfoInFields();
});

var aboutUsManager = {
    getLicenseInfo: function () {
        var data = "";
        var jsonParam = "";
        var serviceUrl = "../AboutUs/GetAboutUsLicensefieldData/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);
        function onSuccess(jsonData) {
            data = jsonData;
        }
        function onFailed(error) {
        }
        return data;
    },
    gridDataSource: function () {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 10,

            transport: {
                read: {
                    url: '../AboutUs/GetAboutUsLicenseModuleData/',

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

var aboutUsHelper = {
    initiateAboutUs: function () {
        $("#tabAboutUs").kendoTabStrip({
            animation: { close: { effects: "fadeOut" }, open: { effects: "fadeIn" } }
        });
        var window=$("<div></div>").kendoWindow({
            title: "About Us",
            resizeable: false,
            width: "55%",
            //height:"40px",
            actions: ["Pin", "Refresh", "Maximize", "Close"],
            modal: true,
            visible: false,
            content: "../Core/AboutUs"
        }).data('kendoWindow');
        
        
        $("#liAboutUs").click(function () {
           
            window.open().center();
         
            //$("#tabAboutUs").kendoTabStrip({
            //    animation: { close: { effects: "fadeOut" }, open: { effects: "fadeIn" } }
            //});
            aboutUsHelper.populateLicenseInfoInFields();
        });
        

        
        
    },
    

    populateLicenseInfoInFields: function () {
        
        var data = aboutUsManager.getLicenseInfo();
        aboutUsHelper.fillLicenseFieldsInfo(data);
    },
    fillLicenseFieldsInfo: function (data) {
        
        $("#ProductName").html(data.ProductName +' - '+ '<a href="http://www.empresshr.com/" target="_blank">EMPRESS</a>');
        $("#CodeBaseVersion").html(data.CodeBaseVersion);
        $("#LicenseKey").html(data.LicenseKey);
        $("#LicenseType").html(data.LicenseType);
        $("#SBULicense").html(data.SBULicense);
        $("#SaaSLicense").html(data.SaaSLicense);
        $("#EmployeeLicense").html(data.EmployeeLicense);
        $("#ServerID").html(data.ServerID);
        $("#spnLicenceFor").html(data.LicenseFor);  
       
    },

    GenerateApplicationGrid: function () {
        var data = aboutUsManager.gridDataSource();
        
        $("#applicationGrid").kendoGrid({
            dataSource: data,
            //pageable: {
            //    refresh: true,
            //    serverPaging: true,
            //    serverFiltering: true,
            //    serverSorting: true
            //},
            filterable: false,
            sortable: true,
            columns: aboutUsHelper.Columns(),
            editable: false,
            navigatable: true,
            selectable: "row",
        });
    },


    //GridDataSource: function () {
        
    //    var applicationList = [
    //                    { "ApplicationName": 'Control Panel', "License": '1' },
    //        { "ApplicationName": 'Human Resource', "License": '1' },
    //        { "ApplicationName": 'Fund Management', "License": '1' },
    //        { "ApplicationName": 'Attendance', "License": '0' },
    //        { "ApplicationName": 'Project Management', "License": '0' },
    //        //{ "ApplicationName": 'Reports', "License": '1' },
    //          { "ApplicationName": 'Leave', "License": '1' },
    //        { "ApplicationName": 'DCOM', "License": '0' },
    //        { "ApplicationName": 'ACR', "License": '0' },
    //        { "ApplicationName": 'Payroll', "License": '1' },
    //        { "ApplicationName": 'Survey', "License": '1' },
    //        { "ApplicationName": 'News & Notice', "License": '1' },
    //          { "ApplicationName": 'Training', "License": '1' },
    //        { "ApplicationName": 'Recruitment', "License": '1' }
           


    //    ];

    //    var dataSource = new kendo.data.DataSource({
    //        data: applicationList,

    //    });

    //    return dataSource;
    //},


    Columns: function () {
        return [
            { field: "ApplicationName", title: "Name", width: 100 },
            { field: "License", title: "License", width: 20, template: "#= aboutUsHelper.tickOrCancelButton(data) #" }//, template: "#= aboutUsHelper.tickOrCancelButton(data) #"
       
            //{ field: "Edit", title: "Edit", filterable: false, width: 50, template: '<input type="button" class="k-button" value="Edit" id="btnEdit" onClick="UserLoginReportSummaryHelper.clickEventForEditButton()"  />', sortable: false }


        ];
    },
    tickOrCancelButton: function (data) {
    
        if (data.License == "1") {
            return '<span class="k-icon k-i-tick" ></span>';
        } else if (data.License == "0") {
            return '<span class="k-icon k-delete">';
        }
        
    },
};