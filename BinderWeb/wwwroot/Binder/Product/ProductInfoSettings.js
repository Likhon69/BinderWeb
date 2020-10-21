$(document).ready(function () {
    debugger;
    ProductInformationHelper.UnitNameCombo();

    $("#btnSave").click(function () {

        ProductInformationManager.AddProductInformation();
    });
    $("#btnClearAll").click(function () {
        ProductInformationHelper.clearProductsForm();
    });

    ProductsSummaryHelper.GenerateProductsGrid();
});

    