var gbCompanyName = "";
var companyDetailsManager = {

    SaveCompany: function () {
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        var isToUpdateOrCreate = $("#hfCompanyId").val();
        if (companyDetailsHelper.validator()) {

            var objCompany = companyDetailsManager.GetDataFromCortolsAsA_Object();
            var objCompanyInfo = JSON.stringify(objCompany).replace(/&/g, "^");
            var objBranchInfo = JSON.stringify(gbSelectedBranchList).replace(/&/g, "^");
            var objDepartmentInfo = JSON.stringify(gbDepartmentArray).replace(/&/g, "^");
            var objDesignationInfo = JSON.stringify(gbDesignationArray).replace(/&/g, "^");
            var objDivisionInfo = JSON.stringify(gbDivisionArray).replace(/&/g, "^");
            var jsonParam = 'strObjCompanyInfo=' + objCompanyInfo + "&strObjBranchInfo=" + objBranchInfo + "&strObjDepartmentInfo=" + objDepartmentInfo + "&strObjDesignationInfo=" + objDesignationInfo + "&strObjDivisionInfo=" + objDivisionInfo;
            var serviceUrl = "../Company/Create/";
            AjaxManager.SendJson(serviceUrl, jsonParam, onSuccess, onFailed);
        }

        function onSuccess(jsonData) {
            if (jsonData == "Success") {
                companyDetailsHelper.clearCompanyForm();
                companyDetailsHelper.closeSbuCompanyDetails();
                if (isToUpdateOrCreate == 0) {
                    AjaxManager.MsgBox('success', 'center', 'Success', 'New Company Saved Successfully.',
                      [{
                          addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                              $noty.close();
                              $("#txtCompanyName").focus();
                             
                          }
                      }]);
                } else {
                    AjaxManager.MsgBox('success', 'center', 'Update', 'Company Information Updated Successfully.',
                      [{
                          addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                              $noty.close();
                              $("#txtCompanyName").focus();
                          }
                      }]);
                }
                $("#gridCompany").data("kendoGrid").dataSource.read();
            }
            else if (jsonData == "Already Exist") {


                AjaxManager.MsgBox('warning', 'center', 'Alresady Exist:', 'Company Name already exist.',
                      [{
                          addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                              $noty.close();
                          }
                      }]);
            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Error', jsonData,
                       [{
                           addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                               $noty.close();
                           }
                       }]);
            }
        }

        function onFailed(error) {
            window.alert(error.statusText);
        }
    },

    GetDataFromCortolsAsA_Object: function () {
        var objCompany = new Object();
        objCompany.CompanyId = $('#hfCompanyId').val();
        objCompany.CompanyName = $("#txtCompanyName").val();
        objCompany.CompanyCode = $("#txtSbuCode").val();
        objCompany.Address = $("#txtAddress").val();
        objCompany.Phone = $("#txtPhone").val();
        objCompany.Fax = $("#txtFax").val();
        objCompany.Email = $("#txtEmail").val();
        objCompany.PrimaryContact = $("#txtPrimaryContact").val();
        objCompany.ExpenseGL = $("#txtExpenseGL").val();

        var motherId = $("#cmbMotherCompany").val();
        if (motherId == -1 || motherId == "" || objCompany.CompanyId == motherId) {
            //Do nothing the EF will consider as Null vall
        } else {
            objCompany.MotherId = motherId;
        }

        var ddlFiscalYearStart = $("#ddlFiscalYearStart").data("kendoDropDownList");
        objCompany.FiscalYearStart = ddlFiscalYearStart.value();
        objCompany.FullLogoPath = $("#hfFullLogoPath").val();
        objCompany.FullLogoPathForReport = $("#hfFullLogoPathForReport").val();
        objCompany.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;
        
        return objCompany;
    },

    GetMotherCompany: function () {
        var objCompany = "";
        var jsonParam = "";
        var serviceUrl = "../Company/GetMotherCompany/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCompany = jsonData;
        }

        //function onFailed(error) {
        //    window.alert(error.statusText);
        //}
        function onFailed(jqXHR, textStatus, errorThrown) {
            window.alert(errorThrown);
        }
        return objCompany;
    },

    GetMotherCompanyForEditCompanyCombo: function (companyId) {
        var objCompany = "";
        var jsonParam = "companyId=" + companyId;
        var serviceUrl = "../Company/GetMotherCompanyForEditCompanyCombo/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCompany = jsonData;
        }

        //function onFailed(error) {
        //    window.alert(error.statusText);
        //}
        function onFailed(jqXHR, textStatus, errorThrown) {
            window.alert(errorThrown);
        }
        return objCompany;
    },

    logoUpload: function () {


        $("#files").kendoUpload({
            upload: onUpload,
            multiple: false,
            success: onSuccess,
            error: onError,
            select: onSelect,

            async: {
                saveUrl: "../Company/save",
                removeUrl: "../Company/remove",
                autoUpload: true,
            },
            localization: {
                select: "<span class='k-icon k-i-folder-up'></span>Browse SBU banner",
                uploadSelectedFiles: "Upload Banner"
            }
        });

        function onUpload(e) {
            // Array with information about the uploaded files
            var files = e.files;
            if (companyDetailsHelper.validator()) {

               // Check the extension of each file and abort the upload if it is not .jpg
                $.each(files, function () {
 
                    if ((this.extension.toLowerCase() != ".jpg") && (this.extension.toLowerCase() != ".png")) {
                        if (!(Math.ceil(this.size / 1024) <= 500)) {
                            AjaxManager.MsgBox('warning', 'center', 'Warning', "Only .jpg/.png files and up to file size 500 kb can be uploaded as Company logo.",
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
                        e.preventDefault();
                    }
                });

            } else {
                var msg = "Please input required company information then upload your comapny banner.";
                AjaxManager.MsgBox('warning', 'center', 'Warning', msg,
                  [
                      {
                          addClass: 'btn btn-primary',
                          text: 'Ok',
                          onClick: function ($noty) {
                              $noty.close();
                          }
                      }
                  ]);

                e.preventDefault();

            }
        }

        function onSuccess(e) {
            // Array with information about the uploaded files

            var files = e.files;
            if (e.operation == "upload") {
                var msg = "";
                if (e.response == "Success") {
                    msg = "Company Banner Successfully uploaded. Thank you.";
                    AjaxManager.MsgBox('success', 'center', 'File Upload', msg,
                    [
                        {
                            addClass: 'btn btn-primary',
                            text: 'Ok',
                            onClick: function ($noty) {
                                $noty.close();
                            }
                        }
                    ]);
                } else {
                    msg = "Failed to uploaded " + files.length + " files";
                    AjaxManager.MsgBox('warning', 'center', 'Warning', msg,
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


                e.preventDefault();
            }
        }
        function onError(e) {
            // Array with information about the uploaded files
            var files = e.files;

            if (e.operation == "upload") {
                var msg = "Failed to uploaded " + files.length + " files";

                AjaxManager.MsgBox('error', 'center', 'Error', msg,
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
        }
        function onSelect(e) {
          
        }

    },
    logoUploadForReport: function () {


        $("#reportFiles").kendoUpload({
            upload: onUpload,
            multiple: false,
            success: onSuccess,
            error: onError,
            select: onSelect,

            async: {
                saveUrl: "../Company/SaveReportLogo",
                removeUrl: "../Company/RemoveReportLogo",
                autoUpload: true,
            },
            localization: {
                select: " <span class='k-icon k-i-folder-up'></span> Browse report logo",
                uploadSelectedFiles: "Upload report logo"
            }
        });

        function onUpload(e) {
            // Array with information about the uploaded files
            var files = e.files;
            if (companyDetailsHelper.validator()) { 
                // Check the extension of each file and abort the upload if it is not .jpg
                $.each(files, function () {

                    if ((this.extension.toLowerCase() != ".bmp")) {
                        if (!(Math.ceil(this.size / 1024) <= 500)) {
                            AjaxManager.MsgBox('warning', 'center', 'Warning', "Only .bmp files and up to file size 500 kb can be uploaded as Company report logo.",
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
                        e.preventDefault();
                    }
                });

            } else {
                var msg = "Please input required company information then upload your comapny banner.";
                AjaxManager.MsgBox('warning', 'center', 'Warning', msg,
                  [
                      {
                          addClass: 'btn btn-primary',
                          text: 'Ok',
                          onClick: function ($noty) {
                              $noty.close();
                          }
                      }
                  ]);

                e.preventDefault();

            }
        }

        function onSuccess(e) {
            // Array with information about the uploaded files

            var files = e.files;
            if (e.operation == "upload") {
                var msg = "";
                if (e.response == "Success") {
                    msg = "Company Report Banner Successfully uploaded. Thank you.";
                    AjaxManager.MsgBox('success', 'center', 'File Upload', msg,
                    [
                        {
                            addClass: 'btn btn-primary',
                            text: 'Ok',
                            onClick: function ($noty) {
                                $noty.close();
                            }
                        }
                    ]);
                } else {
                    msg = "Failed to uploaded " + files.length + " files";
                    AjaxManager.MsgBox('warning', 'center', 'Warning', msg,
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


                e.preventDefault();
            }
        }
        function onError(e) {
            // Array with information about the uploaded files
            var files = e.files;

            if (e.operation == "upload") {
                var msg = "Failed to uploaded " + files.length + " files";

                AjaxManager.MsgBox('error', 'center', 'Error', msg,
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
        }
        function onSelect(e) {

        }

    },

};

var companyDetailsHelper = {
    validator: function() {
        var data = [];
        var validator = $("#companyDetailsDiv").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            status.text("").addClass("valid");
            return true;
        } else {
            status.text("Oops! There is invalid data in the form.").addClass("invalid");
            return false;
        }

    },

    GenerateFiscalYearCombo: function() {
        var data = [
            { text: "January", value: "1" },
            { text: "February", value: "2" },
            { text: "March", value: "3" },
            { text: "April", value: "4" },
            { text: "May", value: "5" },
            { text: "June", value: "6" },
            { text: "July", value: "7" },
            { text: "August", value: "8" },
            { text: "September", value: "9" },
            { text: "October", value: "10" },
            { text: "November", value: "11" },
            { text: "December", value: "12" }
        ];

        $("#ddlFiscalYearStart").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: data
        });
    },

    GenerateMotherCompanyCombo: function() {
        var objCompany = new Object();
        objCompany = companyDetailsManager.GetMotherCompany();

        $("#cmbMotherCompany").kendoComboBox({
            placeholder: "Select Company...",
            dataTextField: "CompanyName",
            dataValueField: "CompanyId",
            dataSource: objCompany,
            suggest: true,
            change: function() {

                var value = this.value();
                AjaxManager.isValidItem("cmbMotherCompany", true);
            }
        });

    },

    GetMotherCompanyForEditCompanyCombo: function(companyId) {
        var objCompany = new Object();
        objCompany = companyDetailsManager.GetMotherCompanyForEditCompanyCombo(companyId);

        $("#cmbMotherCompany").kendoComboBox({
            placeholder: "Select Company...",
            dataTextField: "CompanyName",
            dataValueField: "CompanyId",
            dataSource: objCompany,
            suggest: true,
            change: function() {

                var value = this.value();
                AjaxManager.isValidItem("cmbMotherCompany");
            }
        });

    },

    clearCompanyForm: function() {
        $("#btnSave").text("Save");
     
        $('#hfCompanyId').val('0');
        $('#txtCompanyName').val('');
        $('#txtSbuCode').val('');
        // $('#cmbMotherCompany').val('0');
        $('#txtAddress').val('');
        $('#txtPhone').val('');
        $('#txtFax').val('');
        $('#txtEmail').val('');
        $('#txtExpenseGL').val('');
        $('#txtPrimaryContact').val('');

        gbSelectedBranchList = [];
        gbDivisionArray = [];
        gbDepartmentArray = [];
        gbFacilityArray = [];
        gbDesignationArray = [];
        $("#divgridBranchSolution").data("kendoGrid").dataSource.read();
        $("#divgridDivisionSolution").data("kendoGrid").dataSource.read();
        $("#divgridDepartmentSolution").data("kendoGrid").dataSource.read();
        $("#divgridFacilitySolution").data("kendoGrid").dataSource.read();
        $("#divgridDesignationSolution").data("kendoGrid").dataSource.read();

        // $('#ddlFiscalYearStart').val('');
        // $('#fBannerFileUploade').val('1');
        var cmbMotherCompany = $("#cmbMotherCompany").data("kendoComboBox");
        cmbMotherCompany.value('');
        var combobox = $("#cmbMotherCompany").data("kendoComboBox");
        combobox.destroy();

        companyDetailsHelper.GenerateMotherCompanyCombo();

        var ddlFiscalYearStart = $("#ddlFiscalYearStart").data("kendoDropDownList");
        ddlFiscalYearStart.value(0);

        $("#hfFullLogoPath").val('');
        $("#hfFullLogoPathForReport").val('');
        $("#companyDetailsDiv > form").kendoValidator();
        $("#companyDetailsDiv").find("span.k-tooltip-validation").hide();
        var status = $(".status");

        status.text("").removeClass("invalid");


    },

    showHideSbuComanySummaryEdit: function() {
        $("#divSbuCompanySummary").hide();
        $("#divsbucompanyMappingDetails").show();
    },

    closeSbuCompanyDetails: function() {

        $("#divSbuCompanySummary").show();
        $("#divsbucompanyMappingDetails").hide();
    }

};