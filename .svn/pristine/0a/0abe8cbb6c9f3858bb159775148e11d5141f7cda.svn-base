

var DottedLineEmailConfigSummaryManager = {


    GenerateDottedLineEmailConfigEmployeeSummaryGrid: function () {
        var url = "../DottedLineEmailConfig/GetDottedLineEmailConfigEmployeeSummaryGrid/";
        var column = DottedLineEmailConfigSummaryHelper.DottedLineHrRecordsColumns();
        empressCommonManager.GenerateCommonGrid("gridDottedLineEmailConfigEmployeeSummary", url, column);
    },

};

var DottedLineEmailConfigSummaryHelper = {

    InitDottedLineEmailConfigSummary: function () {
        DottedLineEmailConfigSummaryManager.GenerateDottedLineEmailConfigEmployeeSummaryGrid();
    },

    DottedLineHrRecordsColumns: function () {
        var columns = [
            { field: "HrRecordId", title: "HRRecordId", hidden: true },
            { field: "ProfilePicture", title: "Photo", width: 40, hidden: false, template: '#= DottedLineEmailConfigSummaryHelper.GenerateProfilePicture(data) #', sortable: false, filterable: false, },
            { field: "EmployeeId", title: "Emp ID", width: 70 },
            { field: "FullName", title: "Name", width: 100 },
            { field: "SendTypeId", title: "Type", width: 70, hidden: true, template: '#=SendTypeId==1?"Email as TO":"Email as CC"#' },
            { field: "CurrentPosition", title: "Designation", width: 100 },
            { field: "CompanyName", title: "Company Name", width: 100, hidden: false },
            { field: "BranchName", title: "Location", width: 100, hidden: false },
            { field: "DivisionName", title: "Division", width: 100, hidden: false },
            { field: "DepartmentName", title: "Department", width: 100, hidden: false },
            { field: "EmploymentDate", title: "Employment<br>Date", width: 70, hidden: true, template: '#= kendo.toString(EmploymentDate,"dd MMM yyyy") #' },
            { field: "Edit", title: "#", filterable: false, width: 50, template: '<input type="button" class="k-button" value="View" id="btnEdit" onClick="DottedLineEmailConfigSummaryHelper.ClickEventForEditButtonForDottedLine()"  />', sortable: false }

        ];

        return columns;
    },

    GenerateProfilePicture: function (data) {
        var pathImg = "";
        if (data.ProfilePicture != "") {
            pathImg = data.ProfilePicture;
        } else {
            if (data.Gender == 1) {
                pathImg = '../Images/male.png';
            } else {
                pathImg = '../Images/female.png';
            }
        }

        return "<img id=\"imgProfilePicturegrid\" alt='Photo' src=\"" + pathImg + "\" style=\"height:50px; width:50px; border-radius:150px;-webkit-border-radius:150px; -moz-border-radius: 150px;box-shadow:0 0 8px rgba(0, 0, 0, .8); -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, .8); -moz-box-shadow: 0 0 8px rgba(0, 0, 0, .8; \" /> ";
    },

    ClickEventForEditButtonForDottedLine: function () {

        var entityGrid = $("#gridDottedLineEmailConfigEmployeeSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            $("#cmbSendType").data("kendoDropDownList").value(1);
            DottedLineEmailConfigHelper.PopulateDottedLineEmailConfigData(selectedItem);

            DottedLineEmailConfigHelper.EmployeeWiseDottedLineExistingStatusGrid(selectedItem.EmployeeId);
        }
        $("#divDottedLineEmailConfigEmployeeSummary").hide();
        $("#divDottedLineEmailConfigEmployeeDetails").show();
    },

};