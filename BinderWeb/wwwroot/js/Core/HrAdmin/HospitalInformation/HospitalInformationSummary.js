var hospitalInfoSummaryManager = {
    populateHospitalInfoSummaryGrid:function () {
        var url = "../HospitalInformation/GetHospitalInformationSummaryDataForGrid";
        var column = hospitalInfoSummaryHelper.hospitalInfoColumn();
        empressCommonManager.GenerateCommonGrid("gridHospitalInformationSummary",url,column);
    },
};

var hospitalInfoSummaryHelper = {
    hospitalInfoColumn:function () {
        return columns = [
            { field: "HospitalId", title: "HospitalId", width: 100, hidden: true },
            { field: "HospitalName", title: "Hospital Name", width: 100, hidden: false },
            { field: "IsActive", title: "Status", width: 80, hidden: false, template: "#= IsActive==1?'Active':'Inactive' #" },
            { field: "Edit", title: "Edit", filterable: false, width: 40, template: '<input type="button" class="k-button" value="Edit" id="btnEdit" onClick="hospitalInfoSummaryHelper.clickEventForEditButton()"  />', sortable: false }
        ];
    },
    clickEventForEditButton:function () {
        var grid = $("#gridHospitalInformationSummary").data('kendoGrid');
        var selectedRowData = grid.dataItem(grid.select());
        
        //filling data on field
        hospitalinfoDetailsHelper.fillHospitalInfoDataInForm(selectedRowData);
    }
};