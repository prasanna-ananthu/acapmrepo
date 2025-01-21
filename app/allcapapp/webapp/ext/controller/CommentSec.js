sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("acapm.allcapapp.ext.controller.CommentSec", {

        onInit: function () {
            this.loadFragment({
                id: "vboxid",
                name: "acapm.allcapapp.ext.fragment.CommentSec",
                controller: this
            }).then(function (oFragment) {
                this._oCommentFragment = oFragment;
        
                // Dynamically add the fragment to the UI
                var oRoot = sap.ui.getCore().byId("vboxid");
                if (oRoot) {
                    oRoot.addItem(oFragment);
                } else {
                    console.error("Root container not found.");
                }
            });
        },

        // Handle the "Post" button press to submit the comment
        onPostComment: function () {
            console.log("Post button pressed"); // Debugging
            var oInput = this.byId("newCommentInput"); // Get the input field
            var sComment = oInput.getValue(); // Get the value of the input field

            // Validate that a comment was entered
            if (!sComment) {
                MessageToast.show("Please enter a comment before posting.");
                return;
            }

            // Simulate posting the comment to backend (mocked logic here)
            this._postCommentToBackend(sComment)
                .then(function () {
                    // Clear the input field after posting
                    oInput.setValue("");
                    MessageToast.show("Comment posted successfully!");
                })
                .catch(function () {
                    MessageToast.show("Failed to post comment.");
                });
        },

        // Mock function to simulate posting the comment to the backend (replace with real logic)
        _postCommentToBackend: function (sComment) {
            return new Promise(function (resolve, reject) {
                // Simulate a successful backend call
                setTimeout(function () {
                    console.log("Comment posted:", sComment);
                    resolve();
                }, 1000);
            });
        }
    });
});
