var TrainingListManager = {


    TrainingBookingDataSource: function () {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: false,
            serverFiltering: false,
            allowUnsort: true,
            pageSize: 10,
            transport: {
                read: {
                    url: '../TrainingBooking/GetTrainingScheduleForOpenApply/',
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

    ApplyForTrainingRecomendation: function (trainingScheduleId, trainingId, trainingPlanningId) {

        Message.Confirm("Do you want to apply for this training?", function () {

            var jsonParam = 'trainingScheduleId:' + trainingScheduleId + ',trainingId:' + trainingId + ',trainingPlanningId:' + trainingPlanningId;

            var serviceUrl = "../TrainingBooking/ApplyForTrainingRecomendation/";

            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);

        }, function () {
            return false;
        });


        function onSuccess(jsonData) {
            if (jsonData == "Success") {
                Message.SuccessMessage("Successfully Applied for Recommendation", function() {
                    $("#divTrainingGrid").data('kendoGrid').dataSource.read();
                });

            } else {
                Message.Warning(jsonData);
            }
        }

        function onFailed(error) {
            Message.Warning(error.statusText);
        }


    },

};


var TrainingListHelper = {

    init: function () {
        TrainingScheduleViewManager.init();
        TrainingListHelper.GenerateTrainingBookingGrid();
    },

    GenerateTrainingBookingGrid: function () {
        $("#divTrainingGrid").kendoGrid({
            dataSource: TrainingListManager.TrainingBookingDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: false,
            sortable: true,
            columns: TrainingListHelper.TrainingBookingColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",
        });
    },

    TrainingBookingColumns: function () {
        var columns;
        return columns = [
            { field: "TrainingScheduleId", title: "TrainingScheduleId", width: 20, hidden: true, },
            { field: "TrainingPlanningId", title: "TrainingPlanningId", width: 20, hidden: true, },
            { field: "TrainingInfoId", title: "TrainingInfoId", width: 20, hidden: true, },
            { field: "TrainingInfo.TrainingName", title: "Training Name", width: 100 },
            { field: "TrainingInfo.LearnObjective", title: "Learning  Objective", width: 120, hidden: true, },
            { field: "Status", title: "Status", width: 30, hidden: true },
            { field: "TrainingSchedule.VenueName", title: "Venue", width: 30, hidden: false },
            { field: "FeedbackId", title: "FeedbackId", width: 10, hidden: true },
            { field: "FeedbackTitle", title: "FeedbackTitle", width: 10, hidden: true },
            { field: "TrainingSchedule.Duration", title: "Duration", width: 30, template: "#=TrainingSchedule.Duration# (hours)" },
            { field: "TrainingSchedule.TrainingFromDate", title: "Start Date", width: 40, template: "#=kendo.toString(kendo.parseDate(TrainingSchedule.TrainingFromDate),'dd-MMM-yyyy')#" },
            { field: "TrainingSchedule.TrainingToDate", title: "End Date", width: 40, template: "#=kendo.toString(kendo.parseDate(TrainingSchedule.TrainingToDate),'dd-MMM-yyyy')#" },
            { field: "Status", title: "Status", filterable: false, width: 45, template: '#=TrainingListHelper.TemplateApplyButton(data)#', sortable: false },
            { field: "Action", title: "View Details", filterable: false, width: 40, template: '<input type="button" class="k-button" value="View Details" onClick="TrainingListHelper.ViewTraining()"  />', sortable: false }
        ];

    },

    TemplateApplyButton: function (dataItem) {
        //debugger;
        if (dataItem.Status == -3) {
            return '<input type="button" class="k-button" value="Apply" onClick="TrainingListHelper.ApplyForTrainigRecomendation(' + dataItem.FeedbackId + ')"  />';
        }
        else if (dataItem.Status == 152) {
            return '<span>Waiting For Recomendation</span>';
        }
        else if (dataItem.Status == 153) {
            return '<span>Recommended</span>';
        }
        else if (dataItem.Status == 154) { //Cancel

            return '<span>Cancelled</span>';
        }
        else if (dataItem.Status == 155) { //Approve

            return '<span>Approved</span>';
        }
        else if (dataItem.Status == 156) { //Reject

            return '<span>Rejected</span>';
        }
        else if (dataItem.Status == 157) { //Nominated

            return '<span>Nominated</span>';
        }
        else if (dataItem.Status == 158) { //Booked

            return '<span>Booked</span>';
        }
        else if (dataItem.Status == 159) { //Enrolled

            return '<span>Enrolled</span>';
        }
        else {
            return '<span class="k-icon k-cancel"></span>';
        }
    },

    ViewTraining: function () {
        //debugger;
        var grid = $("#divTrainingGrid").data().kendoGrid;
        var selectItem = grid.dataItem(grid.select());
        if (selectItem != null) {
            var scheduleId = selectItem.TrainingScheduleId;
            var date = kendo.parseDate(selectItem.TrainingSchedule.TrainingFromDate);
            TrainingScheduleViewManager.SetSchedulerEventData(scheduleId, date);
        }
    },

    ApplyForTrainigRecomendation: function () {

        var grid = $("#divTrainingGrid").data().kendoGrid;
        var selectItem = grid.dataItem(grid.select());
        if (selectItem != null) {
            var scheduleId = selectItem.TrainingScheduleId;
            var trainingId = selectItem.TrainingInfoId;
            var trainingPlanningId = selectItem.TrainingPlanningId;
            TrainingListManager.ApplyForTrainingRecomendation(scheduleId, trainingId, trainingPlanningId);
        }

    },

};

