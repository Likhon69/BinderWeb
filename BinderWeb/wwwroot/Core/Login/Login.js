var authenticateUser = new Object();
$(document).ready(function () {


    $("#btnSubmit").click(function () {

        LoginManager.Login();
    });
 

});

var LoginManager = {

    Login: function () {
       
        if (LoginHelper.ValidateLoginForm()) {
            var objLogin = LoginHelper.CreateLoginObject();
            var objLoginInfo = objLogin;
            var jsonParam = objLoginInfo;
            var serviceUrl = coreApi + "/oAuth/Token";
           
            AjaxManager.Post(serviceUrl, jsonParam, function (response) {
                
                if (response) {
                    // href = "http://localhost:34023/Home/Index";
                    // window.location.href = "../home/index";
                   var data= JSON.parse(response);
                   
                  
                    window.location.href = "../home/index";
                }


            }, function (error) {
                    
                  //  Message.Warning(error.statusText);
                    window.location.href = "../home/index";

                Message.Warning(error.responseJSON.message);
            });
        }
    },
    GetAuthorizeUser: function () {
   
        AjaxManager.GetApiData(coreApi + '/Users/GetAuthoriseUser', '', function (response) {
           
            authenticateUser = response;

            $("#lblWelcome").html("Welcome " + response.UserName);
        });
    }

}


var LoginHelper = {

    CreateLoginObject: function () {
        debugger;
        var objLogin = new Object();
        objLogin.LoginId = $("#txtUserName").val();
        objLogin.Password = $("#txtPassword").val();

        return objLogin;
    },
    ValidateLoginForm: function () {
        var data = [];

        var validator = $("#LoginDiv").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            status.text("").addClass("valid");
            return true;
        } else {
            status.text("Oops! There is invalid data in the form.").addClass("invalid");
            return false;
        }
    }
}