var DisciplineDetailsManager = {

   
    SaveDisciplineInformation: function () {
        //debugger;
        //var validator = $("#certificateTypeDetailsDiv").kendoValidator().data("kendoValidator"),
        //    status = $(".status");
        var objDiscipline = DisciplineDetailsHelper.GetObjDiscipline();

        if (objDiscipline.DisciplineName != "" && objDiscipline.CertificateTypeId != "") {


            objDiscipline = JSON.stringify(objDiscipline);
            var jsonParam = 'objDisciplineInfo:' + objDiscipline;
            var serviceUrl = "../CertificateType/SaveDiscipline/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        } else {
            AjaxManager.MsgBox('warning', 'center', 'Warning:', 'Please enter valid information.',
                   [{
                       addClass: 'btn btn-primary', text: 'OK', onClick: function ($noty) {
                           $noty.close();
                        
                         
                       }
                   }]);
        }
        
        function onSuccess(jsonData) {
            //debugger;
            if (jsonData === "Success") {

                AjaxManager.MsgBox('success', 'center', 'Success:', 'Discipline (Group/Subject) saved Successfully',
                    [{
                        addClass: 'btn btn-primary', text: 'OK', onClick: function ($noty) {
                            $noty.close();
                            $("#gridDiscipline").data("kendoGrid").dataSource.read();
                            DisciplineDetailsHelper.clearDisciplineForm();
                          //  DisciplineSummaryManager.GenerateDisciplineGrid();
                        }
                    }]);
                return;
            }
            if (jsonData === "Update") {

                AjaxManager.MsgBox('success', 'center', 'Success:', 'Discipline (Group/Subject) Updated Successfully',
                    [{
                        addClass: 'btn btn-primary', text: 'OK', onClick: function ($noty) {
                            $noty.close();
                            $("#gridDiscipline").data("kendoGrid").dataSource.read();
                            DisciplineDetailsHelper.clearDisciplineForm();
                          //  DisciplineSummaryManager.GenerateDisciplineGrid();
                        }
                    }]);
                return;
            }
            if (jsonData === "Exist") {

                AjaxManager.MsgBox('warning', 'center', 'Success:', 'Discipline (Group/Subject) Already Exist',
                    [{
                        addClass: 'btn btn-primary', text: 'OK', onClick: function ($noty) {
                            $noty.close();
                          //      $("#gridDiscipline").data("kendoGrid").dataSource.read();
                          //  DisciplineDetailsHelper.clearDisciplineForm();
                            //  DisciplineSummaryManager.GenerateDisciplineGrid();
                        }
                    }]);
                return;
            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Error', jsonData,
                        [{
                            addClass: 'btn btn-primary', text: 'OK', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
            }
        }

        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText,
                        [{
                            addClass: 'btn btn-primary', text: 'OK', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
        }
    },

    GetAllDegree: function () {

        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../CertificateType/GetAllDegree/";
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

var DisciplineDetailsHelper = {
    
    GetObjDiscipline : function () {
        var objDisciplineInfo = new Object();
 
        objDisciplineInfo.DisciplineId = $("#hdDisciplineId").val();
        objDisciplineInfo.DisciplineName = $("#txtDisciplineName").val();
        objDisciplineInfo.CertificateTypeId = $("#cmbDegree").data("kendoComboBox").value();
        objDisciplineInfo.IsActive = $('#txtIsActive').is(":checked") == true ? 1 : 0;
        return objDisciplineInfo;
    },
   
    clearDisciplineForm: function () {
        $("#btnSave").text("Save");
        
        $("#hdDisciplineId").val("0");
        $("#txtDisciplineName").val("");
        $("#cmbDegree").data("kendoComboBox").value("");
        $("#txtIsActive").removeAttr("checked", false);
        $("#btnSave").text("Save");

    },
    
    FillDiciplineDataInForm: function (aData) {
        DisciplineDetailsHelper.clearDisciplineForm();
        $("#btnSave").text("Update");
       
        $("#hdDisciplineId").val(aData.DisciplineId);
        $("#txtDisciplineName").val(aData.DisciplineName);
        $("#cmbDegree").data("kendoComboBox").value(aData.CertificateTypeId <= 0 ? "" : aData.CertificateTypeId);
        $('#txtIsActive').prop('checked', aData.IsActive == 1 ? true : false);
        //if (obj.IsActive == 1) {
        //    $("#chkColorIsActive").prop('checked', 'checked');
        //} else {
        //    $("#chkColorIsActive").removeProp('checked', 'checked');
        //}
    },

    populateDegereeCombo: function () {
        var obj = new Object();
        obj = DisciplineDetailsManager.GetAllDegree();
        $("#cmbDegree").kendoComboBox({
            placeholder: "Select Degree Name",
            dataTextField: "CertificateTypeName",
            dataValueField: "CertificateTypeId",
            dataSource: obj,
            change: function () {

                //var value = this.value();
                //AjaxManager.isValidItem("cmbDegreeType", true);
            }

        });
    },
};