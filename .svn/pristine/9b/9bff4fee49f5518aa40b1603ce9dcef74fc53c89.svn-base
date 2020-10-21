var ProductName = "";
debugger;
var ProductInformationManager = {

    AddProductInformation: function () {

        if (ProductInformationHelper.ValidateProductsInfoForm()) {
            var objProducts = ProductInformationHelper.CreateProductsObject();
            var objProductsInfo = objProducts;
            var jsonParam = objProductsInfo;
            var serviceUrl = binderApi+"/Product/AddProductInformation";
            debugger;
            AjaxManager.Post(serviceUrl, jsonParam, function (response) {
                if (response == "Success") {
                    Message.Success("Save Successfully");
                    $("#ProductsSummaryDiv").data('kendoGrid').dataSource.read();
              

                  
                    ProductInformationHelper.clearProductsForm();
                } else {
                    Message.Warning(response);
                }

            }, function (error) {
                    Message.Warning("Your are not authorized Use!");

            });
        }


    }
};

var ProductInformationHelper = {

    UnitNameCombo: function () {

        var objUnit = AjaxManager.GetDataSource(binderApi + "/unit/getunits");
        $("#txtProductUnitName").kendoComboBox({
            placeholder: "Select Unit Name",
            dataTextField: "UnitName",
            dataValueField: "UnitId",
            dataSource: objUnit,
            filter: "contains",
            suggest: true,
            change: function () {
                var val = this.value();
                //UnitNameCombo(val);
            }
        });

    },
    clearProductsForm: function () {
        $("#hdnProductsId").val("0");
        $("#txtProductName").val("");
        //$("#txtProductModel").val("");
        $("#txtProductCode").val("");
        //$("#txtProductPrice").val("");
        $("#txtProductUnitName").data("kendoComboBox").value("");

        //$('#chkIsActive').attr('checked', false);
        //$("#ProductModelDetailsDiv").data('kendoGrid').dataSource.data("");
        $("#ProductInformationDiv > form").kendoValidator();
        $("#ProductInformationDiv").find("span.k-tooltip-validation").hide();
        var status = $(".status");

        status.text("").removeClass("invalid");

    },

    CreateProductsObject: function () {
        debugger;
        var objProducts = new Object();
        objProducts.ProductId = $("#hdnProductsId").val();
        objProducts.ProductName = $("#txtProductName").val();
        // objProducts.ProductModel = $("#txtProductModel").val();
        objProducts.ProductCode = $("#txtProductCode").val();
        //objProducts.ProductPrice = $("#txtProductPrice").val();
        // objProducts.Gender = $('input[name="rdoGender"]:checked').val();
        objProducts.UnitId = $("#txtProductUnitName").data("kendoComboBox").value();
        //objProducts.SectionId = $("#SectionDrop").data("kendoDropDownList").value();
        //objProducts.IsActive = $("#chkIsActive").is(':checked') == true ? 1 : 0;

        //var ProductModelObj = ProductInformationHelper.CreateDetails();
        //objProducts.ProductModel = ProductModelObj;

        return objProducts;
    },



    ValidateProductsInfoForm: function () {
        var data = [];

        var validator = $("#ProductInformationDiv").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            status.text("").addClass("valid");
            return true;
        } else {
            Message.Warning("There is invalid data in the form");
            return false;
        }
    },


    populateProductsDetails: function (objProducts) {

        ProductInformationHelper.clearProductsForm();
        $("#hdnProductsId").val(objProducts.ProductId);
        $("#txtProductName").val(objProducts.ProductName);

        $("#txtProductCode").val(objProducts.ProductCode);


        $("#txtProductUnitName").data("kendoComboBox").value(objProducts.UnitId);
  
           /* if (objProducts.IsActive == 1) {
              $("#chkIsActive").prop('checked', 'checked');
          } else {
              $("#chkIsActive").removeProp('checked', 'checked');
          }
  
          ProductModelDetailsHelper.GenerateProductModelGrid(objProducts.ProductId);*/

    }


};