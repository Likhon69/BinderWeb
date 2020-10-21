$(document).ready(function() {
    ExtraCurriculumActivitiesManager.populateExtraCurriculumActivitiesGrid();
    $("#btnSave").click(function () {
        ExtraCurriculumActivitiesManager.SaveExtraCurriculumActivitiesInformation();
    });
    $("#btnClearAll").click(function () {
        ExtraCurriculumActivitiesHelper.clearCurriculumActivitiesFields();
    });
    
    $("#txtActivitiesName").focus();

});

var ExtraCurriculumActivitiesManager = {
    populateExtraCurriculumActivitiesGrid: function () {
        var url = "../ExtraCurriculumActivities/GetExtraCurriculumActivitiesDataForGrid";
        var column = ExtraCurriculumActivitiesHelper.GenerateExtraCurriculumActivitiesGridColumns();
        empressCommonManager.GenerateCommonGrid("ExtraCurriculumActivitiesSummaryGrid", url, column);
    },
    
    SaveExtraCurriculumActivitiesInformation: function () {
        if (ExtraCurriculumActivitiesHelper.validator()) {

            var objCurriculumActivities = ExtraCurriculumActivitiesHelper.CreateCurriculumActivitiesForSaveData();

            objCurriculumActivities = JSON.stringify(objCurriculumActivities).replace(/&/g, "^");
            var jsonParam = 'strobjCurriculumActivitiesInfo=' + objCurriculumActivities;
            var serviceUrl = "../ExtraCurriculumActivities/SaveExtraCurriculumActivities/";
            AjaxManager.SendJson(serviceUrl, jsonParam, onSuccess, onFailed);

        }
        function onSuccess(jsonData) {
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', 'Extra Curriculum Activities Type Name Saved Successfully',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            ExtraCurriculumActivitiesHelper.clearCurriculumActivitiesFields();
                            $("#ExtraCurriculumActivitiesSummaryGrid").data("kendoGrid").dataSource.read();
                            $("#txtActivitiesName").focus();

                        }
                    }]);

            }
           else if (jsonData == "Exists") {
               AjaxManager.MsgBox('warning', 'center', 'Warning:', 'Extra Curriculum Activities Type Name Already Exists!!!',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                          
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
    }
};

var ExtraCurriculumActivitiesHelper = {
    GenerateExtraCurriculumActivitiesGridColumns: function () {
        return columns = [
             { field: "CurriculumActivitiesId", title: "CurriculumActivitiesId", width: 150,hidden:true },
            { field: "ActivitiesName", title: "Activities Name", width: 150 },
            { field: "IsActive", title: "Is Active", width: 100, template: '#= IsActive==1?"Active":"Inactive" #' },
             { field: "Edit", title: "Edit", filterable: false, width: 40, template: '<input type="button" class="k-button" value="Edit" id="btnEdit" onClick="ExtraCurriculumActivitiesHelper.clickEventForEditButton()"  />', sortable: false }
        ];
    },
    clickEventForEditButton:function () {
        var grid = $("#ExtraCurriculumActivitiesSummaryGrid").data('kendoGrid');
        var selectedRow = grid.dataItem(grid.select());
        ExtraCurriculumActivitiesHelper.clearCurriculumActivitiesFields();
        $("#btnSave").text("Update");

        //Filling Fields
        $("#hdExtraCirculamActivitiesId").val(selectedRow.CurriculumActivitiesId);
        $("#txtActivitiesName").val(selectedRow.ActivitiesName);
        $("#chkIsActive").prop('checked', selectedRow.IsActive ==1?true:false);
    },
    CreateCurriculumActivitiesForSaveData:function () {
        var obj = new Object();
        obj.CurriculumActivitiesId = $("#hdExtraCirculamActivitiesId").val();
        obj.ActivitiesName = $("#txtActivitiesName").val();
        obj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;

        return obj;
    },
    clearCurriculumActivitiesFields: function () {

        $("#btnSave").text("Save");

        $("#hdExtraCirculamActivitiesId").val(0);
        $("#txtActivitiesName").val("");
        $('input:checkbox').removeAttr('checked');
        

        $("#divExtraCurriculumActivitiesDetails > form").kendoValidator();
        $("#divExtraCurriculumActivitiesDetails").find("span.k-tooltip-validation").hide();

        var status = $(".status");
        status.text("").removeClass("invalid");
    },
    validator: function () {
        var data = [];
        var validator = $("#divExtraCurriculumActivitiesDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {

            var chkspAcesName = AjaxManager.checkSpecialCharacters("txtActivitiesName");
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
  
};
