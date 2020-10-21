var layoutManager = {
    GetAssembly: function () {

        var jsonParam = '';
        var serviceUrl = "../Assembly/GetAssemblyInfoResult/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, onSuccess, onFailed);

        function onSuccess(jsonData) {

            //var js = jsonData.split('"');
            if (jsonData == "Success") {


            }
        }

        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Failed', 'Assembly informatiom missing',
            [
                {
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function ($noty) {
                        $noty.close();
                    }
                }
            ]);
        }
    },
   
}
