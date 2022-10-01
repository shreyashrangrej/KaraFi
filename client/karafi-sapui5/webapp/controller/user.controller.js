sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("com.karafi.karafisapui5.controller.user", {
            onInit: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel("env");
                var baseUrl = oModel.getData().baseURL;
                var oUserModel = new JSONModel();
                this.getView().setModel(oUserModel, "userModel");
                $.ajax({
                    type: "GET",
                    contentType: "application/json",
                    url: baseUrl + "/api/getAuthAll",
                    dataType: "json",
                    async: true,
                    success: function (data, textStatus, jqXHR) {
                        debugger
                        oUserModel.setData(data);
                        that.getView().setModel(oUserModel, "userModel");
                    },
                    error: function (error) {
                        debugger;
                    }
                });
            },

            onAddRecord: function () {
                
            },

            onDeleteRecord: function () {

            },

        });
    });