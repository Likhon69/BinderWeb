
$(document).ready(function() {

    //PunishmentSettingDetailsManager.initPunishmentSummary();
    PunishmentSettingDetailsHelper.initPunishmentSettingDetails();

    $("#btnSavePunishmentSettingDetails").click(function () {
        PunishmentSettingDetailsManager.SavePunishmentDetails();
    });



});