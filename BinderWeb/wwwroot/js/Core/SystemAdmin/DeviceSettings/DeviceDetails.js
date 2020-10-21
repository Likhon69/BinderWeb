
var DeviceDetailsManager = {
    GenerateDeviceModelCombo: function () {
        var objDeviceModel = "";
        var jsonParam = "";
        var serviceUrl = "../../DeviceSettings/GetDeviceModelForCombo/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objDeviceModel = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objDeviceModel;
    },

    SaveDeviceInformation: function () {
        if (AjaxManager.validator($("#deviceDetailsDiv"))) {

            var objDeviceInfo = DeviceDetailsHelper.CreateDeviceInfoObject();

            var deviceInfoObj = JSON.stringify(objDeviceInfo).replace(/&/g, "^");
            var jsonParam = 'objDeviceInfo:' + deviceInfoObj;
            var serviceUrl = "../DeviceSettings/SaveDeviceInformation/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);

        }
        function onSuccess(jsonData) {
            if (jsonData == "Success") {

                AjaxManager.MsgBox('success', 'center', 'Success:', 'Device Information Saved Successfully',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            DeviceDetailsHelper.ClearDeviceDetailsForm();
                            $("#gridDeviceSummary").data("kendoGrid").dataSource.read();

                        }
                    }]);
            }

            else {
                AjaxManager.MsgBox('error', 'center', 'Error', jsonData,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
            }
        }

        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
        }
    }


};


var DeviceDetailsHelper = {
    InitDeviceDetails: function () {
        DeviceDetailsHelper.createTab();
        empressCommonHelper.GenerareHierarchyCompanyCombo("cmbCompanyName");
        empressCommonHelper.GenerateBranchCombo(0, "cmbLocationName");
        $("#cmbCompanyName").change(function () {
            DeviceDetailsHelper.changeCompanyName();
        });
        // DeviceDetailsHelper.GenerateDeviceModelCombo();
        DeviceDetailsHelper.GenerateConnectionTypeCombo();
        DeviceDetailsHelper.GenerateServiceTypeCombo();
        DeviceDetailsHelper.GenerateDeviceTypeCombo();


        $("#btnSaveDeviceInfo").click(function () {
            DeviceDetailsManager.SaveDeviceInformation();
        });
    },


    createTab: function () {
        $("#tabstripDeviceInfo").kendoTabStrip({});
    },

    changeCompanyName: function () {

        var comboboxbranch = $("#cmbLocationName").data("kendoComboBox");

        var companyData = $("#cmbCompanyName").data("kendoComboBox");
        var companyId = companyData.value();
        var companyName = companyData.text();
        if (companyId == companyName) {
            companyData.value('');
            comboboxbranch.value('');
            comboboxbranch.destroy();

            empressCommonHelper.GenerateBranchCombo(0, "cmbLocationName");


            return false;
        }
        if (comboboxbranch != undefined) {
            comboboxbranch.value('');
            comboboxbranch.destroy();
        }

        empressCommonHelper.GenerateBranchCombo(companyId, "cmbLocationName");
    },

    GenerateDeviceModelCombo: function () {
        var objDeviceModel = new Object();

        // objDeviceModel = DeviceDetailsManager.GenerateDeviceModelCombo();

        $("#cmbDeviceModel").kendoComboBox({
            placeholder: "All",
            //dataTextField: "DeviceModelName",
            //dataValueField: "DeviceModelId",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [{ "text": "Model1", "value": "1" }, { "text": "Model2", "value": "2" }],
        });

    },

    GenerateConnectionTypeCombo: function () {
        // var objConnectionType = new Object();

        // objDeviceModel = DeviceDetailsManager.GenerateDeviceModelCombo();

        $("#cmbConnectionType").kendoComboBox({
            placeholder: "Select",
            //dataTextField: "DeviceModelName",
            //dataValueField: "DeviceModelId",
            dataTextField: "text",
            dataValueField: "value",
            index:1,
            dataSource: [{ "text": "None", "value": "0" }, { "text": "IP", "value": "ip" }, { "text": "COM", "value": "com" }],
            change: function () {
                DeviceDetailsHelper.ChangeEventForConnectionType();
            }
        });

    },

    GenerateServiceTypeCombo: function () {

        $("#cmbServiceType").kendoDropDownList({
            //placeholder: "Select",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [{ "text": "SDK", "value": "SDK" }, { "text": "API", "value": "API" }, { "text": "DB", "value": "DB" }],
            index:0,
            change: function () {
                DeviceDetailsHelper.ChangeEventForServiceType();
            }
        });

    },

    GenerateDeviceTypeCombo: function () {

        $("#txtDeviceType").kendoComboBox({
            //placeholder: "Select",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [{ "text": "None", "value": "" }, { "text": "Time Attendance", "value": "TA" }, { "text": "Time Attendance SSR", "value": "SSR" }],
            index: 0,
            
        });

    },

    ChangeEventForServiceType: function () {

        var conType = $("#cmbServiceType").val();
        if (conType == "DB") {
            $("#liCatalogName").show();
            
        }  
        else {
           
            $("#liCatalogName").hide();
        }
    },

    ChangeEventForConnectionType: function () {

        var conType = $("#cmbConnectionType").val();
        if (conType == "ip") {
            $("#liIpAddress").show();
            $("#liTclPort").show();
            $("#liCOMPort").hide();
        } else if (conType == 0) {
            $("#liIpAddress").hide();
            $("#liCOMPort").hide();
            $("#liTclPort").hide();

        }
        else {
            $("#liCOMPort").show();
            $("#liIpAddress").hide();
            $("#liTclPort").hide();
        }
    },

    CreateDeviceInfoObject: function () {
        var objDevice = new Object();
        objDevice.DeviceSetupId = $("#hdnDeviceSetupId").val();
        objDevice.CompanyId = $("#cmbCompanyName").val();
        objDevice.LocationId = $("#cmbLocationName").val();
        objDevice.DeviceId = $("#txtDeviceId").val();
        objDevice.DeviceType = $("#txtDeviceType").val();
        objDevice.DeviceModel = $("#txtDeviceModle").val();
        objDevice.DeviceDescription = $("#txtDeviceDesc").val();
        objDevice.DevicePort = $("#txtDevicePort").val();
        objDevice.ConnectionType = $("#cmbConnectionType").val();
        objDevice.IsThereSingleDevice = $("#chkIsThereSingleDevice").is(":checked") == true ? 1 : 0;
        objDevice.IPAddress = $("#txtServerOrIpAddress").val();
        objDevice.COMPort = $("#txtComPort").val();
        objDevice.DeviceUser = $("#txtDeviceUser").val();
        objDevice.DevicePassword = $("#txtDevicePassword").val();
        objDevice.Status = $("#chkIsActive").is(":checked") == true ? 1 : 0;
        objDevice.Manufacturer = $("#txtManufacturer").val();
        objDevice.ServiceType = $("#cmbServiceType").val();
        objDevice.CatalogName = $("#txtCatalogName").val();

        return objDevice;
    },

    ClearDeviceDetailsForm: function () {
        $("#hdnDeviceSetupId").val(0);
        $("#cmbCompanyName").data("kendoComboBox").value("");
        $("#cmbLocationName").data("kendoComboBox").value("");
        $("#txtDeviceId").val("");
        $("#txtDeviceType").val("");
        $("#txtDeviceModle").val("");
        $("#txtDeviceDesc").val("");
        $("#txtDevicePort").val("");
        $("#txtManufacturer").val("");
        $("#cmbConnectionType").data("kendoComboBox").value("");
        $("#chkIsThereSingleDevice").removeProp('checked', 'checked');
        $("#chkIsActive").removeProp('checked', 'checked');
        $("#txtServerOrIpAddress").val("");
        $("#txtComPort").val("");
        $("#txtDeviceUser").val("");
        $("#txtDevicePassword").val("");
       
        $("#txtCatalogName").val("");

    },
    PopulateDeviceDetails: function (obj) {
        $("#hdnDeviceSetupId").val(obj.DeviceSetupId);
        $("#cmbCompanyName").data("kendoComboBox").value(obj.CompanyId);


        empressCommonHelper.GenerateBranchCombo(obj.CompanyId, "cmbLocationName");
        $("#cmbLocationName").data("kendoComboBox").value(obj.LocationId);

        $("#txtDeviceId").val(obj.DeviceId);
        //$("#txtDeviceType").val(obj.DeviceType);
        $("#txtDeviceModle").val(obj.DeviceModel);
        $("#txtDeviceDesc").val(obj.DeviceDescription);
        $("#txtDevicePort").val(obj.DevicePort);

        if (obj.ConnectionType == "ip") {
            $("#liIpAddress").show();
            $("#liCOMPort").hide();
        } else if (obj.ConnectionType == 0) {
            $("#liIpAddress").hide();
            $("#liCOMPort").hide();
        }
        else if (obj.ConnectionType == "com") {
            $("#liCOMPort").show();
            $("#liIpAddress").hide();
        }

        $("#cmbConnectionType").data("kendoComboBox").value(obj.ConnectionType);

        if (obj.IsThereSingleDevice == 1) {
            $("#chkIsThereSingleDevice").prop('checked', 'checked');
        } else {
            $("#chkIsThereSingleDevice").removeProp('checked', 'checked');
        }
        if (obj.Status == 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else {
            $("#chkIsActive").removeProp('checked', 'checked');
        }

        $("#txtServerOrIpAddress").val(obj.IPAddress);
        $("#txtComPort").val(obj.COMPort);
        $("#txtDeviceUser").val(obj.DeviceUser);
        $("#txtDevicePassword").val(obj.DevicePassword);
        $("#txtManufacturer").val(obj.Manufacturer);
        $("#cmbServiceType").data("kendoDropDownList").value(obj.ServiceType);
        $("#txtDeviceType").data("kendoComboBox").value(obj.DeviceType);
        $("#txtCatalogName").val(obj.CatalogName);

        DeviceDetailsHelper.ChangeEventForConnectionType();
        DeviceDetailsHelper.ChangeEventForServiceType();
    }
};