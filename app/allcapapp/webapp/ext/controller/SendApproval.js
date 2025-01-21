sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast"
], function (Controller, Fragment, MessageToast) {
    "use strict";

    return Controller.extend("acapm.allcapapp.ext.controller.SendApproval", {

        onInit: function () {
            // Optional: Initialization logic, if needed
        },

        onSendApproval: function () {
            // Show a message when the button is clicked (you can replace this with API logic)
            MessageToast.show("Send Approval button pressed!");

            // // Now, trigger the API logic
            // this._triggerAPI();
        }
    });
});
