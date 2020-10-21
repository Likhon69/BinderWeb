/// <reference path="GroupSummary.js" />

$(document).ready(function () {
    groupDetailsHelper.createTab();
    groupInfoHelper.GenerateModuleForGroupInfo();
    groupSummaryManager.GenerateGroupGrid();
    groupSummaryHelper.clickEventForEditGroup();
    reportPermissionHelper.GetReportInformation();
});

var groupSettingsManager = {};

var groupSettingsHelper = { };