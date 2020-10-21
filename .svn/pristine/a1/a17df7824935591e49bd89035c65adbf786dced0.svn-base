var BoardInstituteDetailsManager = {
 
   
    SaveBoardInstituteInformation: function () {
        //debugger;
        //var validator = $("#certificateTypeDetailsDiv").kendoValidator().data("kendoValidator"),
        //    status = $(".status");
        var objBoardInstitute = BoardInstituteDetailsHelper.GetObjBoardInstitute();

        if (objBoardInstitute.BoardInstituteName != "") {


            objBoardInstitute = JSON.stringify(objBoardInstitute);
            var jsonParam = 'objBoardInstitute:' + objBoardInstitute;
            var serviceUrl = "../CertificateType/SaveBoardInstituteInformation/";
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

                AjaxManager.MsgBox('success', 'center', 'Success:', 'Board/Institute Information Saved Successfully',
                    [{
                        addClass: 'btn btn-primary', text: 'OK', onClick: function ($noty) {
                            $noty.close();
                            $("#gridBoardInstitute").data("kendoGrid").dataSource.read();
                            BoardInstituteDetailsHelper.cleanBoardInstituteForm();
                          //  DisciplineSummaryManager.GenerateDisciplineGrid();
                        }
                    }]);
                return;
            }
            if (jsonData === "Update") {

                AjaxManager.MsgBox('success', 'center', 'Success:', 'Board/Institute Information Updated Successfully',
                    [{
                        addClass: 'btn btn-primary', text: 'OK', onClick: function ($noty) {
                            $noty.close();
                            $("#gridBoardInstitute").data("kendoGrid").dataSource.read();
                            BoardInstituteDetailsHelper.cleanBoardInstituteForm();
                          //  DisciplineSummaryManager.GenerateDisciplineGrid();
                        }
                    }]);
                return;
            }
            if (jsonData === "Exist") {

                AjaxManager.MsgBox('warning', 'center', 'Success:', 'Board/Institute Information Already Exist',
                    [{
                        addClass: 'btn btn-primary', text: 'OK', onClick: function ($noty) {
                            $noty.close();
                           // $("#gridBoardInstitute").data("kendoGrid").dataSource.read();
                           // BoardInstituteDetailsHelper.cleanBoardInstituteForm();
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

var BoardInstituteDetailsHelper = {
    
    GetObjBoardInstitute : function () {
        var objBoardInstitute = new Object();
 
        objBoardInstitute.BoardInstituteId = $("#hdnBoardInstituteId").val();
        objBoardInstitute.BoardInstituteName = $("#txtBoardInstituteName").val();
        objBoardInstitute.IsActive = $('#txtIsActive').is(":checked") == true ? 1 : 0;
        return objBoardInstitute;
    },
   
    cleanBoardInstituteForm: function () {
        //debugger;
        $("#btnSave").text("Save");
        
        $("#hdnBoardInstituteId").val("0");
        $("#txtBoardInstituteName").val("");
        $("#txtIsActive").removeAttr("checked", false);
        $("#btnSave").text("Save");

    },
    
    FillBoardInstituteForm: function (aData) {
        BoardInstituteDetailsHelper.cleanBoardInstituteForm();
        $("#btnSave").text("Update");
       
        $("#hdnBoardInstituteId").val(aData.BoardInstituteId);
        $("#txtBoardInstituteName").val(aData.BoardInstituteName);
        $('#txtIsActive').prop('checked', aData.IsActive == 1 ? true : false);
        //if (obj.IsActive == 1) {
        //    $("#chkColorIsActive").prop('checked', 'checked');
        //} else {
        //    $("#chkColorIsActive").removeProp('checked', 'checked');
        //}
    },

    //populateDegereeCombo: function () {
    //    var obj = new Object();
    //    obj = BoardInstituteDetailsManager.GetAllDegree();
    //    $("#cmbDegree").kendoComboBox({
    //        placeholder: "Select Degree Name",
    //        dataTextField: "CertificateTypeName",
    //        dataValueField: "CertificateTypeId",
    //        dataSource: obj,
    //        change: function () {

    //            //var value = this.value();
    //            //AjaxManager.isValidItem("cmbDegreeType", true);
    //        }

    //    });
    //},
};