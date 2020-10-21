
$(document).ready(function () {
    HrisSettingsDetailsHelper.initHrisSettingsDetails();
    HrisSettingsDetailsHelper.PopulateHrisSettingsDetails();
   



    $("#btnSaveHrisSettings").click(function () {
        HrisSettingsDetailsManager.SaveHrisSettingsDetails();
    });

    $("#btnClearHrisSettings").click(function () {
        HrisSettingsDetailsHelper.ClearHrisSettingsDetails();
    });

    $("#chkManualEmployeeOrder").change(function () {
        //$("#liSql").show();
       // var div = document.getElementById("liSql");
        //debugger;
        var x = document.getElementById("liSql");
        if (x.style.display === 'none') {
            $("#liSql").show();
        } else {
            $("#liSql").hide();
        }
        
    });

});