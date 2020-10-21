
var isTaskListAlreadyLoaded = false;

var myTaskManager = {
    
    GetMyTaskListGenerate: function() {
        
        var objStatus = "";
        var jsonParam = "";
        var serviceUrl = "../Dashboard/GetMyTaskListGenerate";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objStatus = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objStatus;
    }
};

var myTaskHelper = {

    initiatemyTaskStatus: function () {

        var effectforMayAttendance = kendo.fx("#divMyTask").flipHorizontal($("#divMyTaskMain"), $("#divMyTaskDetails")).duration(1000),
            reverse = false;

        $(".toggleMyTask").click(function () {
            effectforMayAttendance.stop();
            reverse ? effectforMayAttendance.reverse() : effectforMayAttendance.play();
            reverse = !reverse;
            if (isTaskListAlreadyLoaded == false) {
                myTaskHelper.myTaskListGenerate();
            }
        });
    },

    myTaskListGenerate: function() {
        
        var obj = myTaskManager.GetMyTaskListGenerate();
        if (obj != null) {

            $("#spnLeavePending").html(obj.LeavePending);
            $("#spnOutStationPending").html(obj.OutstationPending);
            $("#spnMovement").html(obj.MovementPending);
            $("#spnAdjustmentPening").html(obj.AttendancePending);
            $("#spnCplPening").html(obj.CplPending);
            $("#spnManpowerPlanningPening").html(obj.ManPowerPlaningPending);
            $("#spnManpowerRequision").html(obj.ManPowerRequisitionPending);
            isTaskListAlreadyLoaded = true;
        }
    }

};