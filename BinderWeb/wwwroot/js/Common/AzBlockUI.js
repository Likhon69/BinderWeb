$(document).ready(function () {

    $("#azBlockUi").kendoWindow({
       title:false,
        resizeable: false,
        width: "30%",
        actions:false,
        modal: true,
        visible: false,
    });
});
var AzBlockUI = {
    Start: function () {
       
        $("#azBlockUi").data("kendoWindow").open().center();
    },
    Close: function() {
        $("#azBlockUi").data("kendoWindow").close();
    }
};
