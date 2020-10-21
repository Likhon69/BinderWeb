

$(document).ready(function () {
    loginHelper.LogInButtonOnOff();
    //$("#btnLogin").click(function () { loginManager.LogInToSystem(); });

    $("#forgetPass").click(function () { loginHelper.forgetPassword(); });
    $("#btnSendEmail").click(function () { loginManager.SendEmail(); });

    $("#txtpassword").keypress(function (event) {
        if (event.keyCode == 13) {
            loginManager.LogInToSystem();
        }
    });

    $("#txtLoginId").keypress(function (event) {
        if (event.keyCode == 13) {
            loginManager.LogInToSystem();
        }
    });
    $("#txtLoginId").change(function (event) {
        //loginManager.GetRememberData();
    });

    $("#cmbMovementType").change(function () { loginHelper.showHideClientOption(); });
    $("#btnLogMovement").click(function () { loginManager.logMovementForLate(); });

    loginManager.GetRememberData();
    $("#txtnewPass").val('');

});

var balanceArr = [];



var loginManager = {

    GetRememberData: function () {
        var inputData = AjaxManager.GetSingleObject("../Home/GetRememberData", '');

        $("#txtLoginId").val(inputData.userid);
        $("#txtpassword").val(inputData.password);
        if (inputData.isRemember == "1") {
            $("#chkRememberMe").attr("checked", "checked");
        } else {
            $("#chkRememberMe").removeAttr("checked", "checked");

        }



    },
    btnCancelLogin: function () {
        $("#btnCancelLogin").click(function () {
            loginHelper.hideLoginPanel();
            $(".panel_button").show();
            $("#hide_button").hide();

        });
    },
    btnCancelLogin1: function () {
        $('#dbloginPanel').show();
        $('#dvChangePasswordPanel').hide();
    },
    btnCancelLogin2: function () {
        $('#dbloginPanel').show();
        $('#ForgetPassWorddiv').hide();
    },

    getCurrentUser: function (menuRefresh) {

        var jsonParam = '';
        var pathName = window.location.pathname;
        var pageName = pathName.substring(pathName.lastIndexOf('/') + 1);
        var serviceURL = "../Home/GetCurrentUser";

        AjaxManager.GetJsonResult(serviceURL, jsonParam, false, false, onSuccess, onFailed);
        //AjaxManager.SendJson(serviceURL, jsonParam, onSuccess, onFailed);
        function onSuccess(jsonData) {

            CurrentUser = jsonData;
            if (CurrentUser != undefined) {

                var userName = "Welcome " + CurrentUser.UserName;
                $("#lblWelcome").html(userName);
                if (CurrentUser.FullLogoPath != null) {
                    $("#headerLogo").attr('style', 'background-image: url("' + CurrentUser.FullLogoPath + '") !important');
                }


            }

        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
    },

    LogInToSystem: function () {

        CurrentUser = null;
        var isRememberMe = $("#chkRememberMe").is(":checked");


        var logonId = $("#txtLoginId").val();
        var pass = $("#txtpassword").val();

        if (logonId == "") {
            alert("Please enter Login ID!");
            $("#txtLoginId").focus();
            return;
        }
        if (pass == "") {
            alert("Please enter Password!");
            $("#txtpassword").focus();
            //jQuery.unblockUI({ message: '' });
            return;
        }

        $.blockUI({ message: $('#divBlockMessage') });
        var pathName = window.location.pathname;
        var pageName = pathName.substring(pathName.lastIndexOf('/') + 1);

        var obj = new Object();
        obj.loginId = logonId;
        obj.password = pass;
        obj.isRememberMe = isRememberMe;

        var serviceURL = "../Home/ValidateUserLogin";

        AjaxManager.SendJson2(serviceURL, "model:" + JSON.stringify(obj), onSuccess, onFailed);
        function onSuccess(jsonData) {
            loginHelper.leftExpireNotification(function (res) {
                if (res) {
                    $.unblockUI();
                    if (jsonData == "FAILED") {

                        AjaxManager.MsgBox('error', 'center', 'Login Failed', 'User ID or Password is incorrect. Please enter correct Login ID and Password.',
                            [{
                                addClass: 'btn btn-primary',
                                text: 'Ok',
                                onClick: function ($noty) {
                                    $noty.close();
                                    $("#txtpassword").focus();
                                }
                            }]);


                    } else if (jsonData == "INACTIVE") {


                        AjaxManager.MsgBox('error', 'center', 'Account Is Locked', 'Account is not active! \nPlease ask administrator to activate your account first then try to login.',
                            [{
                                addClass: 'btn btn-primary',
                                text: 'Ok',
                                onClick: function ($noty) {
                                    $noty.close();
                                    $("#txtpassword").focus();
                                    // noty({ dismissQueue: false, force: false, layout: layout, theme: 'defaultTheme', text: 'You clicked "Ok" button', type: 'success' });
                                }
                            }]);

                        //  window.alert('Account is not active! \nPlease ask administrator to activate your account first then try to login.');
                        // $("#txtpassword").focus();
                    } else if (jsonData == "EXPIRED") {

                        AjaxManager.MsgBox('warning', 'center', 'Password have been expired:', 'Your Password have been expired! \nYou have to either change your password or ask administrator to reset your password.',
                            [{
                                addClass: 'btn btn-primary',
                                text: 'Ok',
                                onClick: function ($noty) {
                                    $noty.close();
                                    window.location.href = "../Home/ResetPassword";
                                    // noty({ dismissQueue: false, force: false, layout: layout, theme: 'defaultTheme', text: 'You clicked "Ok" button', type: 'success' });
                                }
                            }]);

                    } else if (jsonData == "LicExpired") {

                        AjaxManager.MsgBox('warning', 'center', 'license have been expired:', 'Your license have been expired! \nPlease contact with the vendor to renew \nor email at support@azolutionse.com',
                            [{
                                addClass: 'btn btn-primary',
                                text: 'Ok',
                                onClick: function ($noty) {
                                    $noty.close();
                                    $("#txtpassword").focus();
                                }
                            }]);
                    } else if (jsonData == "CHANGE") {
                        AjaxManager.MsgBox('success', 'center', 'Chnage Password:', 'Login successful but need to change Password.',
                            [{
                                addClass: 'btn btn-primary',
                                text: 'Ok',
                                onClick: function ($noty) {
                                    $noty.close();
                                    window.location.href = "../Home/ChangePassword";
                                    // noty({ dismissQueue: false, force: false, layout: layout, theme: 'defaultTheme', text: 'You clicked "Ok" button', type: 'success' });
                                }
                            }]);
                        //  window.alert('Login successful but need to change Password.');
                        // window.location.href = "../Home/PasswordChange";
                    } else if (jsonData == "CHANGESHORT" || jsonData == "CHANGELEAVE") {
                        AjaxManager.MsgBox('success', 'center', 'Chnage Password:', 'Login successful but need to change Password.',
                            [{
                                addClass: 'btn btn-primary',
                                text: 'Ok',
                                onClick: function ($noty) {
                                    $noty.close();
                                    window.location.href = "../Home/ChangePassword";
                                    // noty({ dismissQueue: false, force: false, layout: layout, theme: 'defaultTheme', text: 'You clicked "Ok" button', type: 'success' });
                                }
                            }]);
                        //  window.alert('Login successful but need to change Password.');
                        // window.location.href = "../Home/PasswordChange";
                    } else if (jsonData == "CHANGESuccess") {

                        AjaxManager.MsgBox('success', 'center', 'Change Password:', 'Login successful but Password need to be changed',
                            [{
                                addClass: 'btn btn-primary',
                                text: 'Ok',
                                onClick: function ($noty) {
                                    $noty.close();
                                    window.location.href = "../Home/ChangePassword";
                                    // noty({ dismissQueue: false, force: false, layout: layout, theme: 'defaultTheme', text: 'You clicked "Ok" button', type: 'success' });
                                }
                            }]);

                    } else if (jsonData == "LATE") {
                        ////debugger;

                        AjaxManager.MsgBox('success', 'center', 'LATE:', 'You are LATE today! Please log your movement.',
                            [{
                                addClass: 'btn btn-primary',
                                text: 'Ok',
                                onClick: function ($noty) {
                                    $noty.close();
                                    $("#cmbMovementType option[value='7']").remove();
                                    loginHelper.hideLoginPanel();
                                    $('#toppanel').hide();
                                    MenuManager.getCurrentUser(true);
                                    loginHelper.loadMovementPopup();
                                }
                            }]);


                    } else if (jsonData == "SHORT") {
                        ////debugger;
                        //Success but LATE Need to apply Short Leave Or On Client Visit...
                        AjaxManager.MsgBox('success', 'center', 'Short Leave:', 'You are too LATE today! Please log your movement',
                            [{
                                addClass: 'btn btn-primary',
                                text: 'Ok',
                                onClick: function ($noty) {
                                    $noty.close();
                                    $("#cmbMovementType option[value='6']").remove();
                                    $("#cmbMovementType option[value='7']").remove();
                                    $("#cmbMovementType").val('5');
                                    loginHelper.hideLoginPanel();
                                    $('#toppanel').hide();
                                    loginManager.getCurrentUser(true);
                                    loginHelper.loadMovementPopup();
                                }
                            }]);

                    } else if (jsonData == "LEAVE") {
                        ////debugger;

                        //Success but LATE Need to apply Leave Or On Client Visit... because don't have enough Short leave
                        AjaxManager.MsgBox('success', 'center', 'Apply Leave:', 'You are too LATE today!. You don,t have any Short leave also. Please log your movement or Apply leave',
                            [{
                                addClass: 'btn btn-primary',
                                text: 'Ok',
                                onClick: function ($noty) {
                                    $noty.close();
                                    $("#cmbMovementType option[value='6']").remove();
                                    $("#cmbMovementType option[value='5']").remove();
                                    $("#cmbMovementType").val('7');
                                    loginHelper.hideLoginPanel();
                                    $('#toppanel').hide();
                                    MenuManager.getCurrentUser(true);
                                    loginHelper.loadMovementPopup();
                                    loginManager.getLeaveInfoForLogin();
                                    $("#divLeaveInfo").show();
                                }
                            }]);
                    } else if (jsonData == "Success") {
                        //Success
                        //loginHelper.hideLoginPanel();
                        //$('#toppanel').hide();

                        MenuManager.getCurrentUser(false);
                        //debugger;
                        //window.location.href = "../Dashboard/Dashboard";
                        if (CurrentUser.DefaultDashboard == 1) {
                            window.location.href = "../Dashboard/MyNewDashboard";
                        } else if (CurrentUser.DefaultDashboard == 2) {
                            window.location.href = "../Dashboard/Dashboard";
                        } else if (CurrentUser.DefaultDashboard == 3) {
                            window.location.href = "../Dashboard/MyNewDashboard";
                        } else if (CurrentUser.DefaultDashboard == 4) {
                            window.location.href = "../Dashboard/NormalDashboard";
                        } else {
                            window.location.href = "../Dashboard/MyNewDashboard";
                        }


                        //Need to Activate Access
                    } else if (jsonData == "lvEmail") {
                        window.location.href = "../Leave/LeaveApplication";
                    } else if (jsonData == "osEmail") {
                        window.location.href = "../Attendance/OnsiteClient";
                    } else if (jsonData == "mvEmail") {
                        window.location.href = "../Attendance/Movement";
                    } else if (jsonData == "atEmail") {
                        window.location.href = "../Attendance/AttendanceRequest";
                    } else if (jsonData == "vhcEmail") {
                        window.location.href = "../VehicleManagement/Requisition";
                    } else if (jsonData == "prEmail") {
                        window.location.href = "../Performance/PerformanceReview";
                    } else if (jsonData == "SurveyEmail") {
                        window.location.href = "../Survey/PublishSurveyForEmail";
                    } else if (jsonData == "proEmpEmail") {
                        window.location.href = "../Performance/PromotionReview";
                    } else if (jsonData == 'Suspended') {
                        AjaxManager.MsgBox('warning', 'center', 'Account Is Locked', 'Account has been suspended.',
                            [{
                                addClass: 'btn btn-primary',
                                text: 'Ok',
                                onClick: function ($noty) {
                                    $noty.close();

                                }
                            }]);
                    } else if (jsonData == 'Sacked') {
                        AjaxManager.MsgBox('warning', 'center', 'Account Is Locked', 'Account is not active! Your are Sacked.',
                            [{
                                addClass: 'btn btn-primary',
                                text: 'Ok',
                                onClick: function ($noty) {
                                    $noty.close();

                                }
                            }]);
                    } else if (jsonData == 'Retire') {
                        AjaxManager.MsgBox('warning', 'center', 'Account Is Locked', 'Account is not active! You have retired.',
                            [{
                                addClass: 'btn btn-primary',
                                text: 'Ok',
                                onClick: function ($noty) {
                                    $noty.close();

                                }
                            }]);
                    } else if (jsonData == 'In Case Of Death') {
                        AjaxManager.MsgBox('warning', 'center', 'Deactivate', 'Account has been deactivated for death of employee.',
                            [{
                                addClass: 'btn btn-primary',
                                text: 'Ok',
                                onClick: function ($noty) {
                                    $noty.close();

                                }
                            }]);
                    } else {

                        AjaxManager.MsgBox('error', 'center', 'Login Failed', jsonData,
                            [{
                                addClass: 'btn btn-primary',
                                text: 'Ok',
                                onClick: function ($noty) {
                                    $noty.close();
                                    $("#txtpassword").focus();
                                }
                            }]);
                    }
                }
            });
        }
        function onFailed(error) {
            //loginHelper.errorMessage(error);
            AjaxManager.MsgBox('error', 'center', 'Login Failed', error,
                     [{
                         addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                             $noty.close();
                             $("#txtpassword").focus();
                         }
                     }]);
        }

    },
    getLeaveInfoForLogin: function () {
        var jsonParam = "";
        var url = "../Leave/SelectAllLeaveBalanceForDashBoardWhileLogin";
        AjaxManager.SendJson(url, jsonParam, onSuccess, onFailed);

        function onSuccess(data) {

            loginHelper.populateLeaveCombo(data);
        }

        function onFailed(error) {
            window.alert(error.statusText);
        }
    },
    SendEmail: function () {
        var isSMS = false;
        var emailaddress = $('#txtEmail').val();
        if ($('#txtEmpID').val() == "") {
            alert("Please enter your Login ID");
            $('#txtEmpID').focus();
            return false;
        }
        if ($("#txtMobileNo").val() != "") {
            isSMS = true;
        }

        var obj = new Object();
        obj.EmployeeId = $("#txtEmpID").val();
        obj.Email = $("#txtEmail").val();
        obj.MobileNo = $("#txtMobileNo").val();


        var jsonParam = "model:" + JSON.stringify(obj);
        var pathName = window.location.pathname;
        var pageName = pathName.substring(pathName.lastIndexOf('/') + 1);
        if (pageName.toLowerCase() == "home" || pageName.toLowerCase() == "login" || pageName.toLowerCase() == "logoff") {
            serviceURL = "./ForgetPassword";
        }
        else {
            serviceURL = "./Home/ForgetPassword";
        }
        AjaxManager.SendJson2(serviceURL, jsonParam, onSuccess, onFailed);
        function onSuccess(jsonData) {

            if (jsonData == "Success") {
                if (isSMS) {
                    Message.Success("You will receive a SMS about your Login information shortly.");

                } else {
                    Message.Success("You will receive an email about your Login information shortly.");

                }
                $('#dbloginPanel').show();
                $('#ForgetPassWorddiv').hide();

            }
            else {
                Message.Warning(jsonData);
                // alert(jsonData);
            }
        }
        function onFailed(error) {
            Message.Error(error.statusText);
            //  window.alert(error.statusText);
        }
    },

    resetPassword: function () {
        var loginId = $('#txtLoginIdForResetPassword').val();
        var oldpass = $('#txtoldPass').val();
        var password = $('#txtnewPass').val();
        var confirmpass = $('#txtResetConfirmPass').val();

        if (loginId == "") {
            Message.Warning("Login ID cannot be blank!");
            // alert("Login ID cannot be blank!");
            $('#txtLoginId').focus();
            return false;
        }

        if (oldpass == password) {
            Message.Warning("New password must have to be different from old password!");
            //alert("New password must have to be different from old password!");
            $('#txtnewPass').val('');
            $('#txtResetConfirmPass').val('');
            $('#txtnewPass').focus();
            return false;
        }

        if (password != confirmpass) {
            Message.Warning("Password does not match");
            //alert("Password does not match");
            $('#txtResetConfirmPass').val('');
            $('#txtconfirmPass').focus();
            return false;
        }

        var jsonParam = "loginId=" + loginId + "&oldpassword=" + oldpass + "&newpassword=" + confirmpass;
        var serviceURL = "../Home/ResetUserPassword";
        AjaxManager.SendJson(serviceURL, jsonParam, onSuccess, onFailed);
        function onSuccess(jsonData) {

            //var js = jsonData.split('"');
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Reset Successfull', 'Password reset successfully, Thank you!',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            window.location.href = "../Home/Login";
                        }
                    }]);
                // alert("Password reset successfully, Thank you!");
                //                window.location.href = "../Home/Login";

            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Failed', jsonData,
                       [{
                           addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                               $noty.close();
                           }
                       }]);
            }
        }
        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Failed', error,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
        }
    },

    ChangePassword: function () {
        var password = $('#txtnewPass').val();
        var confirmpass = $('#txtconfirmPass').val();

        if (password != confirmpass) {
            alert("Password does not match");
            $('#txtconfirmPass').val('');
            $('#txtconfirmPass').focus();
            return false;
        }

        var jsonParam = "password=" + password;
        var serviceURL = "../Home/ChangePassword";
        AjaxManager.SendJson(serviceURL, jsonParam, onSuccess, onFailed);
        function onSuccess(jsonData) {

            //var js = jsonData.split('"');
            if (jsonData == "Success") {


                AjaxManager.MsgBox('success', 'center', 'Success:', 'Password Change Successfully',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            var url = "../Home/Login";
                            window.location.href = url;
                        }
                    }]);



            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Failed', jsonData,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
            }
        }
        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Failed', error,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
        }
    },
    HomeIndex: function () {
        window.location.href = "../Home/Login";
    },
    getClientList: function (oldData) {
        var jsonParam = "companyId=" + CurrentUser.CompanyID;
        var url = "../Client/GetClientList";
        AjaxManager.SendJson(url, jsonParam, onSuccess, onFailed);

        function onSuccess(jsonData) {

            if (jsonData != "") {

                loginHelper.populateClientCombo(jsonData, oldData);
            }
        }

        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Login Failed', error.statusText,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                                $.unblockUI();
                            }
                        }]);
        }
    },
    logMovementForLate: function () {
        $.blockUI({ message: $('#divBlockMessage') });
        if ($("#cmbMovementType").val() == "3") {
            if ($("#cmbClient").val() == "0") {
                alert("Please select a client!");
                return false;
            }
        }
        if ($("#cmbMovementType").val() == "7") {
            if ($("#cmbLeaveType").val() == "0") {
                alert("Please select a Leave Type!");
                return false;
            }

            var leaveType = parseInt($("#cmbLeaveType").val());

            //if (leaveType != "5") {
            for (var i = 0; i < balanceArr.length; i++) {
                if (leaveType == balanceArr[i].LeaveType) {
                    if (balanceArr[i].LeaveWithoutPay == false) {
                        if (balanceArr[i].ClosingLeaveBalance <= 0) {
                            alert("You don't have enough leave balance");
                            return false;
                        }
                    }
                }
            }
            // }

        }


        var jsonParam = "";
        var serviceURL = "";

        if ($("#cmbMovementType").val() == "6") {
            //Page.closeMovementPopup();
            //window.location.href = "../ZResource.mvc/MyeOffice";

            var remarksOriginal = $("#txtAreaRemarks").val();
            var remarks = remarksOriginal.replace(/&/g, '^');

            jsonParam = "remarks='" + remarks + "'&userId=" + CurrentUser.UserId;
            serviceURL = "../Home/UpdateAttendanceRemarks";

        } else {
            var objMovementLog = new Object();
            objMovementLog.UserId = CurrentUser.UserId;
            //objMovementLog.MovementDate = AjaxManager.changeFormattedDate($("#txtAtdAdjDate").val(), "MMDDYYYY");
            objMovementLog.MovementDate = $("#txtAtdAdjDate").val();
            objMovementLog.Status = "0";
            objMovementLog.MovementType = $("#cmbMovementType").val();
            objMovementLog.Remarks = $("#txtAreaRemarks").val();
            objMovementLog.ExpectedReturnTime = "";
            objMovementLog.ProjectCode = "";
            objMovementLog.IsBackToOffice = "True";
            objMovementLog.IsApproved = "False";
            if ($("#cmbClient").val() == "0" || $("#cmbClient").val() == "") {
                objMovementLog.ClientCode = "";
                objMovementLog.ClientName = "";
            } else {
                objMovementLog.ClientCode = $("#cmbClient").val();
                objMovementLog.ClientName = $("#cmbClient :selected").text().replace('&', '^');
            }
            objMovementLog.ConvenceAmount = "0";
            objMovementLog.LeaveType = $("#cmbLeaveType").val();

            jsonParam = "movementLog=" + JSON.stringify(objMovementLog);
            serviceURL = "../Home/LogMovementForLate";
        }
        AjaxManager.SendJson(serviceURL, jsonParam, onSuccess, onFailed);
        function onSuccess(jsonData) {
            $.unblockUI();
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', 'Your movement has been logged!',
                     [{
                         addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                             $noty.close();
                             $.unblockUI();
                             loginHelper.closeMovementPopup();
                             window.location.href = "../Dashboard/Dashboard";
                             // noty({ dismissQueue: false, force: false, layout: layout, theme: 'defaultTheme', text: 'You clicked "Ok" button', type: 'success' });
                         }
                     }]);




            } else {
                AjaxManager.MsgBox('error', 'center', 'Login Failed', jsonData,
                      [{
                          addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                              $noty.close();
                              loginHelper.closeMovementPopup();
                          }
                      }]);

            }
        }

        function onFailed(error) {

            AjaxManager.MsgBox('error', 'center', 'Login Failed', error.statusText,
                       [{
                           addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                               $noty.close();
                               $.unblockUI();
                           }
                       }]);
        }

    }

};

var loginHelper = {
    errorMessage: function (error) {
        AjaxManager.MsgBox('error', 'center', 'Error:', error.statusText,
                     [{
                         addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                             $noty.close();
                         }
                     }]);
    },

    LogInButtonOnOff: function () {
        $("div.panel_button").click(function () {
            //$("#txtLoginId").val('');
            $("#txtLoginId").focus();
            //$("#txtpassword").val('');

            $("div#panel").animate({
                height: "500px"
            })
                .animate({
                    height: "100%"
                }, "fast");
            $("div.panel_button").toggle();
            $("#dbloginPanel").show();

        });
        $("div.hide_button").click(function () {
            loginHelper.hideLoginPanel();
        });
        loginManager.btnCancelLogin();
    },
    hideLoginPanel: function () {
        $("div#panel").animate({
            height: "0px"
        }, "fast");
        $("#ForgetPassWorddiv").hide();
    },

    forgetPassword: function () {
        $('#dbloginPanel').hide();
        $('#ForgetPassWorddiv').show();
    },
    loadMovementPopup: function () {
        AjaxManager.centerPopup('#divMovementPopup');
        $("#backgroundPopup").css({ "opacity": "0.7" });
        $("#backgroundPopup").fadeIn("slow");
        $("#divMovementPopup").fadeIn("slow");
        $("#txtAtdAdjDate").val(AjaxManager.changeFormattedDate(new Date(), "MMDDYYYY"));
    },

    populateLeaveCombo: function (jsonData) {
        balanceArr = [];

        var link = '<option value="0">Select a Leave Type</option>';
        $.each(jsonData, function () {
            //if (this.LeaveType == 1 || this.LeaveType == 2 || this.LeaveType == 3) {
            //if (this.LeaveType == 1 || this.LeaveType == 2) {
            link += '<option value=\"' + this.LeaveType + '\" >' + this.TypeName + '</option>'; //+ ' (Balance Remaining: ' + this.ClosingLeaveBalance + ')</option>';
            var obj = new Object();
            obj.LeaveType = this.LeaveType;
            obj.ClosingLeaveBalance = this.ClosingLeaveBalance;
            obj.LeaveWithoutPay = this.LeaveWithoutPay;
            balanceArr.push(obj);
            //}
        });
        //link += '<option value=\"' + 5 + '\" >' + 'Without Pay' + '</option>';
        $("#cmbLeaveType").html(link);
    },

    showHideClientOption: function () {
        var movementValue = $("#cmbMovementType").val();

        if (movementValue == 3) {
            $("#divClientInfo").attr("style", "display:block");
            $("#divLeaveInfo").attr("style", "display:none");
            loginManager.getClientList("");
        }
        else if (movementValue == 7) {
            $("#divLeaveInfo").attr("style", "display:block");
            $("#divClientInfo").attr("style", "display:none");
        }
        else {
            $("#divClientInfo").attr("style", "display:none");
            $("#divClientInfo").attr("style", "display:none");
        }
    },
    populateClientCombo: function (data, oldData) {
        var link = '<option value="0">Select a client</option>';
        $.each(data, function () {
            link += '<option value=\"' + this.ClientCode + '\" >' + this.ClientName + '</option>';
        });
        $("#cmbClient").html(link);
        if (oldData != "") {
            $("#cmbClient").val(oldData);
        }
    },

    closeMovementPopup: function () {
        $("#txtAtdAdjDate").val('');
        $("#cmbClient").val('');
        $("#txtAreaRemarks").val('');
        AjaxManager.disablePopup("#divMovementPopup", "#backgroundPopup");
    },

    leftExpireNotification: function (callback) {
        var jsonParam = "";
        var url = "../Home/GetLeftExpiration";
        var jsonData = AjaxManager.GetJsonResults(url, jsonParam);
        if (jsonData != "") {
            AjaxManager.MsgBox('error', 'center', 'Error:', jsonData,
                     [{
                         addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                             $noty.close();
                             callback(true);
                         }
                     }]);
        } else {
            callback(true);
        }

    },

};