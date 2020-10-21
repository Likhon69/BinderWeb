var ProductName = "";

debugger;
var DealerInformationManager = {

    AddDealerInformation: function () {

        if (DealerInformationHelper.ValidateDealerInfoForm()) {
            var objProducts = DealerInformationHelper.CreateDealerObject();
            var objProductsInfo = objProducts;
            var jsonParam = objProductsInfo;
            var serviceUrl = binderApi + "/Dealer/AddDealerInformtion";
            debugger;
            AjaxManager.Post(serviceUrl, jsonParam, function (response) {
                if (response == "Success") {
                    Message.Success("Save Successfully");
                    $("#DealerSummaryDiv").data('kendoGrid').dataSource.read();
                    $("#LocationSummaryDiv").data('kendoGrid').clearSelection();

                    selectedItems = [];
                    DealerInformationHelper.clearDealersForm();
                } else {
                    Message.Warning(response);
                }
            }, function (error) {

            });
        }


    }
};

var DealerInformationHelper = {

    DealerTypeNameCombo: function () {

        var objUnit = AjaxManager.GetDataSource(binderApi + "/Dealer/GetDealerType");
        $("#txtDealerTypeName").kendoComboBox({
            placeholder: "Select Dealer Type Name",
            dataTextField: "DealerTypeName",
            dataValueField: "DealerTypeId",
            dataSource: objUnit,
            filter: "contains",
            suggest: true,
            change: function () {
                var val = this.value();
                //UnitNameCombo(val);
            }
        });

    },
    clearDealersForm: function () {
        $("#hdnDealerId").val("0");
        $("#txtDealerName").val("");
        $("#txtMobileNo").val("");
        $("#txtDealerCode").val("");
        $("#txtEmailAddress").val("");
        $("#txtAgrementFile").kendoUpload();
        $("#txtDealerTypeName").data("kendoComboBox").value("");

        //$('#chkIsActive').attr('checked', false);
        //$("#ProductModelDetailsDiv").data('kendoGrid').dataSource.data("");
        $("#DealerInformationDiv > form").kendoValidator();
        $("#DealerInformationDiv").find("span.k-tooltip-validation").hide();
        var status = $(".status");

        status.text("").removeClass("invalid");

    },

    CreateDealerObject: function () {
        debugger;
        var objDealers = new Object();
        objDealers.DealerId = $("#hdnDealerId").val();
        objDealers.DealerName = $("#txtDealerName").val();
        objDealers.MobileNo = $("#txtMobileNo").val();
        objDealers.DealerCode = $("#txtDealerCode").val();
        objDealers.EmailAddress = $("#txtEmailAddress").val();
        objDealers.Agrementfile = $("#FileAttachment").val();
        // objProducts.Gender = $('input[name="rdoGender"]:checked').val();
        objDealers.DealerTypeId = $("#txtDealerTypeName").data("kendoComboBox").value();
        //objProducts.SectionId = $("#SectionDrop").data("kendoDropDownList").value();
        //objProducts.IsActive = $("#chkIsActive").is(':checked') == true ? 1 : 0;

        var SelectedtItem = DealerInformationHelper.CreateDetails();
        objDealers.SelectedtItems = SelectedtItem;

        return objDealers;
    },

    CreateDetails: function () {
        var selectedItems = [];
        selectedItems = items;
        return selectedItems;
    },

    ValidateDealerInfoForm: function () {
        var data = [];
       /* var email = $("#txtEmailAddress").val();
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var rv = re.test(email);
        if (!rv) {
            Message.Warning("Enter valid email address");
            return false;
        } */
       


        var validator = $("#DealerInformationDiv").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            status.text("").addClass("valid");
            return true;
        } else {
            Message.Warning("There is invalid data in the form");
            return false;
        }
    },


    populateDealerDetails: function (objDealers) {

        debugger;
        DealerInformationHelper.clearDealersForm();
        $("#hdnDealerId").val(objDealers.DealerId);
        $("#txtDealerName").val(objDealers.DealerName);
        $("#txtMobileNo").val(objDealers.MobileNo);
        $("#txtEmailAddress").val(objDealers.EmailAddress);

        $("#txtDealerCode").val(objDealers.DealerCode);

        $("#FileAttachment").val(objDealers.Agrementfile);

        $("#txtDealerTypeName").data("kendoComboBox").value(objDealers.DealerTypeId);
        $("#lnkAttachment").attr("href", objDealers.Agrementfile);
        /* if (objProducts.IsActive == 1) {
           $("#chkIsActive").prop('checked', 'checked');
       } else {
           $("#chkIsActive").removeProp('checked', 'checked');
       }*/


        LocationGridManager.SetSelectedItems(objDealers.DealerId);

    },

    fileUploder: function () {
        //var uplod = $("#txtAgrementFile").data('kendoUpload');
        //if (uplod != undefined) {
        //    uplod.destroy();
        //    $("#txtAgrementFile").empty();
        //}

        $("#txtAgrementFile").kendoUpload({
            upload: onUpload,
            multiple: false,
            success: onSuccess,
            error: onError,
            select: onSelect,
            async: {
                saveUrl: "../DealerInformation/PostAttachment",
                removeUrl: "../DealerInformation/RemoveAttachment",
                autoUpload: true
            },
            localization: {
                select: "Browse File",

            }
        });

        function onUpload(e) {

            var files = e.files;
            //alert("Image file ratio should be 174*176");
            //// Check the extension of each file and abort the upload if it is not .jpg
            $.each(files, function () {
                if ((this.extension.toLowerCase() != ".jpg") && (this.extension.toLowerCase() != ".pdf") && (this.extension.toLowerCase() != ".jpeg") && (this.extension.toLowerCase() != ".png")) {
                    //alert("Only .jpg/.png files can be uploaded as Company logo.");
                    Message.Warning("Supported file extensions: jpg,jpeg and pdf");
                    e.preventDefault();
                }
            });
        }

        function onSuccess(e) {

            // Array with information about the uploaded files

            var files = e.files;
            if (e.operation == "upload") {
                if (e.response != "") {
                    debugger;
                    e.files[0].name = e.response.fileName;
                    $("#FileAttachment").val(e.response.path);
                    $("#lnkAttachment").attr("href", e.response.path);

                } else {
                    $("#FileAttachment").val('');
                    $("#lnkAttachment").attr("href", '');

                }
            }
        }
        function onError(e) {

            // Array with information about the uploaded files
            var files = e.files;

            if (e.operation == "upload") {
                // alert("Failed to uploaded " + files.length + " files");
            }
        }
        function onSelect(e) {
            // Array with information about the uploaded files

        }
    }


};