

var allAccountHeadArray = [];
var accountHeadArray = [];

var accountHeadMappingManager = {

    RenderAccountHead: function () {
        var objAccountHead = "";
        var jsonParam = "";
        var serviceUrl = "../AccountHeadSetup/RenderAccountHead/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objAccountHead = jsonData;
            allAccountHeadArray = [];
            for (var i = 0; i < objAccountHead.length; i++) {
                allAccountHeadArray.push(objAccountHead[i]);
            }
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objAccountHead;

    },

    ApplyAccountHead: function () {


        var costCenterId = $("#hdnCostCenterForAccountHeadMap").val();
        var jsonParams = 'costCenterId=' + costCenterId + '&objAccountHeadListStr=' + JSON.stringify(accountHeadArray);

        var serverUrl = "../CostCentre/ApplyAccountHead/";
        Message.Confirm('Are you sure you want to map account Head with This Costcentre?', function () {
            AjaxManager.SendJson(serverUrl, jsonParams, onSuccess, onFailed);
        }, function () { });


        function onSuccess(jsonData) {
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success', 'Account Head Mapped Successfully.',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#lblCostCenterName").html("");
                            $("#hdnCostCenterForAccountHeadMap").val("0");
                            accountHeadArray = [];
                            $("#CostcentreDetailsAccountHeadPopupWindow").data("kendoWindow").close();
                        }
                    }]);
            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Error', jsonData, [{ addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) { $noty.close(); } }]);
            }
        }

        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText, [{ addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) { $noty.close(); } }]);
        }
    },

    GetAccountHeadInfoByCostCenterId: function (costCenterId) {
        var objAccountHead = "";
        var jsonParam = "costCenterId=" + costCenterId;
        var serviceUrl = "../CostCentre/GetAccountHeadInfoByCostCenterId/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {

            accountHeadArray = [];
            for (var i = 0; i < jsonData.length; i++) {
                var obj = new Object();
                obj.AccountHeadId = jsonData[i].AccountHeadId;
                $('#chkAccountHead' + jsonData[i].AccountHeadId).attr('checked', true);
                accountHeadArray.push(obj);
            }
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objAccountHead;

    }

};

var accountHeadMappingHelper = {

    PopulateAccountHeadTreeByAccountHead: function () {

        $("#treeview").remove();

        $('#treeviewAccountHead').html('<div id="treeview"></div>');
        var objAccountHeadList = new Object();
        var newAccountHeadArray = [];
        objAccountHeadList = accountHeadMappingManager.RenderAccountHead();
        var treeview = $("#treeview").kendoTreeView({
            checkboxes: {
                checkChildren: true,
                template: "<input type='checkbox' id='chkAccountHead#= item.id #' onclick='accountHeadMappingHelper.onSelect(#= item.id #,event)' />"
            },
            select: accountHeadMappingHelper.changeAccountHead,
            dataSource: {},
        }).data("kendoTreeView");

        treeview.remove();


        var chiledMenuArray = [];

        for (var i = 0; i < objAccountHeadList.length; i++) {

            if (objAccountHeadList[i].ParentAccountHeadId == null || objAccountHeadList[i].ParentAccountHeadId == 0) {

                chiledMenuArray = [];
                var obj = new Object();
                obj.id = objAccountHeadList[i].AccountHeadId;
                obj.itemId = objAccountHeadList[i].AccountHeadId;
                obj.text = objAccountHeadList[i].AccountHeadName + "(" + objAccountHeadList[i].AccountHeadCode + ")";
                obj.value = objAccountHeadList[i].AccountHeadId;
                //obj.items = chiledMenuArray;
                //obj.items = accountHeadMappingHelper.chiledAccountHead(obj, objAccountHeadList[i].AccountHeadId, objAccountHeadList);
                chiledMenuArray = accountHeadMappingHelper.chiledAccountHead(obj, objAccountHeadList[i].AccountHeadId, objAccountHeadList);

                if (chiledMenuArray.length > 0) {
                    obj.expanded = true;
                }
                else {
                    obj.spriteCssClass = "html";
                    obj.items = chiledMenuArray;
                    //obj.items = [];
                    obj.items.expanded = true;

                }
                obj.itemValue = objAccountHeadList[i].ParentAccountHeadId;
                newAccountHeadArray.push(obj);

            }
        }

        var dataSource = new kendo.data.HierarchicalDataSource({
            data: newAccountHeadArray
        });

        $("#treeview").data("kendoTreeView").setDataSource(dataSource);

        //menuPermisionHelper.autoSelectExistingMenu();


    },

    chiledAccountHead: function (objAccountHeadOrginal, accountHeadId, objAccountHeadList) {

        var chiledArray = [];
        var newArray = [];
        for (var j = 0; j < objAccountHeadList.length; j++) {
            if (objAccountHeadList[j].ParentAccountHeadId == accountHeadId) {
                var obj = new Object();
                obj = objAccountHeadOrginal;
                var objChiled = new Object();
                objChiled.id = objAccountHeadList[j].AccountHeadId;
                objChiled.itemId = objAccountHeadList[j].AccountHeadId;
                objChiled.text = objAccountHeadList[j].AccountHeadName + "(" + objAccountHeadList[j].AccountHeadCode + ")";
                objChiled.itemValue = objAccountHeadList[j].AccountHeadId;
                //objChiledMenu.spriteCssClass = "html";
                chiledArray = objAccountHeadOrginal.items;

                if (chiledArray == undefined || chiledArray.length == 0) {
                    chiledArray = [];
                    chiledArray.expanded = false;
                }
                else {
                    chiledArray.expanded = true;
                }
                newArray = accountHeadMappingHelper.chiledAccountHead(objChiled, objAccountHeadList[j].AccountHeadId, objAccountHeadList);

                if (newArray == undefined || newArray.length == 0) {
                    newArray = [];
                    newArray.expanded = false;
                    objChiled.spriteCssClass = "html";
                    // obj.items = [];
                    objChiled.expanded = false;
                }
                else {
                    objChiled.items = newArray;
                    objChiled.items.expanded = true;
                    newArray.expanded = true;
                }



                chiledArray.push(objChiled);

                obj.items = chiledArray;
                if (obj.items.length > 0) {
                    obj.expanded = true;
                }
                else {
                    obj.spriteCssClass = "html";
                    // obj.items = [];
                    obj.expanded = false;

                }
            }
        }
        return chiledArray;
    },

    changeAccountHead: function (e) {

        var acccountHeadName = e.node.textContent.trim();
        var accountHeadId = 0;
        for (var i = 0; i < allAccountHeadArray.length; i++) {

            var alnm = allAccountHeadArray[i].AccountHeadName.trim() + "(" + allAccountHeadArray[i].AccountHeadCode.trim() + ")";

            if (acccountHeadName == alnm) {
                accountHeadId = allAccountHeadArray[i].AccountHeadId;
            }
        }

        accountHeadMappingHelper.onSelect(accountHeadId);
    },

    onSelect: function (accountHeadId) {
        var chiledExist = false;
        if ($("#chkAccountHead" + accountHeadId).is(':checked') == true) {

            var alreadyadded = accountHeadMappingHelper.checkAlreadyAddedthisAccountHead(accountHeadId);
            if (alreadyadded == false) {
                accountHeadMappingHelper.createAccountHeadArray(accountHeadId);

            }
            for (var p = 0; p < allAccountHeadArray.length; p++) {
                if (allAccountHeadArray[p].ParentAccountHeadId == accountHeadId) {
                    alreadyadded = accountHeadMappingHelper.checkAlreadyAddedthisAccountHead(allAccountHeadArray[p].AccountHeadId);
                    if (alreadyadded == false) {
                        accountHeadMappingHelper.createAccountHeadArray(allAccountHeadArray[p].AccountHeadId);
                    }
                    chiledExist = true;
                }
            }

            if (chiledExist) {
                for (var k = 0; k < accountHeadArray.length; k++) {
                    if (accountHeadArray[k].AccountHeadId == accountHeadId) {
                        accountHeadArray.splice(k, 1);
                    }
                }
            }
        }
        else {

            for (var j = 0; j < accountHeadArray.length; j++) {
                if (accountHeadArray[j].AccountHeadId == accountHeadId) {
                    accountHeadArray.splice(j, 1);
                }
            }
            var result = allAccountHeadArray.filter(function (obj) {
                return obj.ParentAccountHeadId == accountHeadId;
            });
            if (result.length > 0) {

                for (var m = 0; m < result.length; m++) {

                    accountHeadArray = accountHeadArray.filter(function (obj) {
                        return obj.AccountHeadId != result[m].AccountHeadId;
                    });
                }
            }

        }
    },

    checkAlreadyAddedthisAccountHead: function (accountHeadId) {
        var alreadyadded = false;
        for (var i = 0; i < accountHeadArray.length; i++) {
            if (accountHeadArray[i].AccountHeadId == accountHeadId) {
                alreadyadded = true;
                break;
            }
        }
        return alreadyadded;
    },

    createAccountHeadArray: function (accountHeadId) {
        var obj = new Object();
        obj.AccountHeadId = accountHeadId;
        accountHeadArray.push(obj);
    }
};