

var movementStatusManager = {

    MovementAppliedStatus: function () {
        var objStatus = "";
        var jsonParam = "";
        var serviceUrl = "../Dashboard/MovementAppliedStatus";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objStatus = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objStatus;
    },
};

var movementStatusHelper = {

    initiatemovementStatus: function () {
        
    }


};