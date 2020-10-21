

var RecruitmentManager = {
    
    gridDataSource: function (year) {
      
        var gridDataSource = new kendo.data.DataSource({

            type: "json",

            serverPaging: true,
            serverSorting: true,

            pageSize: 100,

            transport: {
                read: {

                    url: '../JobVacancy/GetJobVacancyGridDataForDashboard/?year=' + year,

                    type: "POST",

                    dataType: "json",

                    contentType: "application/json; charset=utf-8"
                },

                parameterMap: function (options) {

                    return JSON.stringify(options);

                }
            },
            schema: {
                data: "Items", total: "TotalCount",
                model: {
                    fields: {
                        
                    }
                }
            }
        });

        return gridDataSource;
    },
    

    ExportToExcelRecruitmentDashboard: function() {
        
        var year = $("#cmbYear").data("kendoComboBox").value() == "" ? 0 : $("#cmbYear").data("kendoComboBox").value();

        var gridSummary = $("#divJobVacancyGrid").data("kendoGrid");
        var gridData = gridSummary.dataSource.data();

        if (gridData.length > 0) {
            var param = "year:" + JSON.stringify(year);
            var serviceUrl = "../RecruitmentReport/ExportToExcelRecruitmentDashboard/";

            $.blockUI({
                message: $('#divBlockMessage'),
                onBlock: function () {
                    AjaxManager.SendJson2(serviceUrl, param, onSuccess, onFailed);
                }
            });

        } else {
            AjaxManager.MsgBox('warning', 'center', 'Warning', 'No Result found!',
                     [{
                         addClass: 'btn btn-primary',
                         text: 'Ok',
                         onClick: function ($noty) {
                             $noty.close();
                         }
                     }]);
        }

        function onSuccess(jsonData) {
            $.unblockUI();
            if (jsonData == "Data not Exist") {
                AjaxManager.MsgBox('warning', 'center', 'Warning', 'No data found for this Year!',
                   [{
                       addClass: 'btn btn-primary',
                       text: 'Ok',
                       onClick: function ($noty) {
                           $noty.close();
                       }
                   }]);
            }
            else if (jsonData == "No Result found") {
                AjaxManager.MsgBox('warning', 'center', 'Warning', 'No Result found!',
                   [{
                       addClass: 'btn btn-primary',
                       text: 'Ok',
                       onClick: function ($noty) {
                           $noty.close();
                       }
                   }]);
            }
            else {
                window.open(jsonData, '_blank');
            }
        }
        function onFailed(error) {
            $.unblockUI();
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText,
                [{
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function ($noty) {
                        $noty.close();
                    }
                }]);
        }

    }
 
};



var RecruitmentHelper = {

    initRecruitment: function() {
        RecruitmentHelper.populateYearCombo();
        RecruitmentHelper.GenerateJobVacancyGrid();
       
        $("#cmbYear").change(function() {
            RecruitmentHelper.GenerateJobVacancyGrid();
        });
    },
     
    GenerateJobVacancyGrid: function () {
        var year = $("#cmbYear").data("kendoComboBox").text() == "" ? 0 : $("#cmbYear").data("kendoComboBox").text();
        
        $("#divJobVacancyGrid").kendoGrid({

            dataSource: RecruitmentManager.gridDataSource(year),
            autoBind: true,
            filterable: false,
            sortable: false,
            columns: RecruitmentHelper.GeneratedJobVacancyColumns(),
            editable: false,
            scrollable: true,
            navigatable: true,
            height: 200
        });

    },

    GeneratedJobVacancyColumns: function () {
        
        return columns = [
            { field: "JobTitle", title: "Position", hidden: false },
            { field: "JobAnnounceDate", title: "Announce Date", hidden: false, template: '#= kendo.toString(kendo.parseDate(JobAnnounceDate,"dd/MM/yyyy"),"dd/MM/yyyy") #' },
            { field: "JobAnnounceExpireDate", title: "Expire Date", hidden: false, template: '#= kendo.toString(kendo.parseDate(JobAnnounceExpireDate,"dd/MM/yyyy"),"dd/MM/yyyy") #' },
            { field: "NoOfVacancy", title: "Vacancy No", hidden: false },
            { title: "Recruitment", hidden: false, template: "#= JoinRecruitment==0?'': JoinRecruitment + ' (' + RecruitmentPercentage + '%)' #" },
            { field: "ShortageNoRecruitment", title: "Shortage No <br> Of Recruitment", hidden: false },
            { field: "DivisionName", title: "Division", hidden: false },
            { field: "DepartmentName", title: "Department", hidden: false },
            { field: "BranchName", title: "Location", hidden: false },
            { field: "TotalCandidate", title: "Num of <br>Candidate", hidden: false },
            { title: "Written Test", hidden: false, template: "#= AttendWrittenTest==0?'': AttendWrittenTest + ' (' + AttendWrittenTestPercentage + '%)' #" },
            { title: "1st <br>Interview", hidden: false, template: "#= AttendFirstInterview==0?'': AttendFirstInterview + ' (' + AttendFirstInterviewPercentage + '%)' #" },
            { title: "2nd <br>Interview", hidden: false, template: "#= AttendSecondInterview==0?'': AttendSecondInterview + ' (' + AttendSecondInterviewPercentage + '%)' #" },
            { field: "StateName", title: "Status", hidden: false }
        ];
    },
    

    populateYearCombo: function () {
        $("#cmbYear").kendoComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [{ text: "2012", value: '2012' },
                         { text: "2013", value: '2013' },
                         { text: "2014", value: '2014' },
                         { text: "2015", value: '2015' },
                         { text: "2016", value: '2016' },
                         { text: "2017", value: '2017' },
                         { text: "2018", value: '2018' },
                         { text: "2019", value: '2019' },
                         { text: "2020", value: '2020' },
                         { text: "2021", value: '2021' },
                         { text: "2022", value: '2022' },
                         { text: "2023", value: '2023' },
                         { text: "2024", value: '2024' },
                         { text: "2025", value: '2025' },
                         { text: "2026", value: '2026' },
                         { text: "2028", value: '2028' },
                         { text: "2029", value: '2029' },
                         { text: "2030", value: '2030' },
                         { text: "2031", value: '2031' },
                         { text: "2032", value: '2032' }],

            filter: "startswith",
            suggest: true,
            // index: 0,
        });
        
        var year = new Date().getFullYear();
        var yearCombo = $("#cmbYear").data("kendoComboBox");
        yearCombo.value(year);
    },


};