sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.karafi.karafisapui5.controller.home", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter(this);
                this.oRouter.attachRoutePatternMatched(this._onRouterMatch, this);
            },

            onManageUsers: function () {
                this.oRouter.navTo("UserRoute");
            },

            onManageUserDetails: function () {

            },

            onManageAddresses: function () {

            }
        });
    });
