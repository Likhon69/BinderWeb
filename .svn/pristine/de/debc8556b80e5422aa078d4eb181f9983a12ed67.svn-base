var certificateTypeDetailsManager = {
    SaveCertificateTypeInformation: function () {

        var validator = $("#certificateTypeDetailsDiv").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if(validator.validate()) {
            var objCertificateType = certificateTypeDetailsHelper.CreateCertificateTypeForSaveData();

            objCertificateType = JSON.stringify(objCertificateType).replace(/&/g, "^");
            var jsonParam = 'strobjCertificateTypeInfo=' + objCertificateType;
            var serviceUrl = "../CertificateType/SaveCertificateType/";
            AjaxManager.SendJson(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        
        function onSuccess(jsonData) {

            if (jsonData == "Success") {
                certificateTypeDetailsHelper.clearCertificateTypeForm();
                //if (isToUpdateOrCreate == 0) {
                    AjaxManager.MsgBox('success', 'center', 'Success', 'Certificate Type Saved Successfully.',
                        [{
                            addClass: 'btn btn-primary',
                            text: 'Ok',
                            onClick: function ($noty) {
                                $noty.close();
                                $("#gridCertificateType").data("kendoGrid").dataSource.read();
                                certificateTypeDetailsHelper.clearCertificateTypeForm();
                                $("#txtCertificateTypeName").focus();
                                
                            }
                        }]);
                //}
            } else if (jsonData == "Update") {
                certificateTypeDetailsHelper.clearCertificateTypeForm();
                AjaxManager.MsgBox('success', 'center', 'Update', 'Certificate Type information updated successfully.',
                  [{
                      addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                          $noty.close();
                          $("#gridCertificateType").data("kendoGrid").dataSource.read();
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
            AjaxManager.MsgBox('error', 'center', 'Failed', error.statusText,
                         [{
                             addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                 $noty.close();
                             }
                         }]);
        }
    },

    GetAllDegreeType: function () {

        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../CertificateType/GetAllDegreeType/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }

        return obj;
    },
};


var certificateTypeDetailsHelper = {
    
    CreateCertificateTypeForSaveData : function () {
        var objCertificateType = new Object();
        objCertificateType.CertificateTypeId = $("#hdCertificateTypeId").val();
        objCertificateType.CertificateTypeName = $("#txtCertificateTypeName").val();
        objCertificateType.DegreeTypeId = $("#cmbDegreeType").data("kendoComboBox").value();
        objCertificateType.IS_ACTIVE = $('#txtIsActive').is(":checked") == true ? 1 : 0;
        return objCertificateType;
    },
    clearCertificateTypeForm: function () {
        $("#btnSave").text("Save");
        
        $("#hdCertificateTypeId").val("0");
        $("#txtCertificateTypeName").val("");
        $("#cmbDegreeType").data("kendoComboBox").value("");

        $("#certificateTypeDetailsDiv > form").kendoValidator();
        $("#certificateTypeDetailsDiv").find("span.k-tooltip-validation").hide();
        var status = $(".status");

        status.text("").removeClass("invalid");

    },
    validator: function () {
        var data = [];
        var validator = $("#certificateTypeDetailsDiv").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {

            var chkspAcesName = AjaxManager.checkSpecialCharacters("txtCertificateTypeName");
            if (!chkspAcesName) {
                status.text("Oops! There is invalid data in the form.").addClass("invalid");
                return false;
            }
            status.text("").addClass("valid");
            return true;
        } else {
            status.text("Oops! There is invalid data in the form.").addClass("invalid");
            return false;
        }
    },
    FillCertificateTypeDetailsInForm: function (certificateType) {

        certificateTypeDetailsHelper.clearCertificateTypeForm();
        $("#btnSave").text("Update");
       
        $("#hdCertificateTypeId").val(certificateType.CertificateTypeId);
        $("#txtCertificateTypeName").val(certificateType.CertificateTypeName);
        $("#cmbDegreeType").data("kendoComboBox").value(certificateType.DegreeTypeId <= 0 ? "" : certificateType.DegreeTypeId);
        $('#txtIsActive').prop('checked', certificateType.IS_ACTIVE == 1 ? true : false);
    },

    populateDegereeTypeCombo: function () {
        var obj = new Object();
        obj = certificateTypeDetailsManager.GetAllDegreeType();
        $("#cmbDegreeType").kendoComboBox({
            placeholder: "Select Degree Name",
            dataTextField: "DegreeTypeName",
            dataValueField: "DegreeTypeId",
            dataSource: obj,
            change: function () {

                var value = this.value();
                AjaxManager.isValidItem("cmbDegreeType", true);
            }

        });
    },
};