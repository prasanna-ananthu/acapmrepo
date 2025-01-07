sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
  ], function (MessageBox, MessageToast) {
    "use strict";
  
    return {
      onInit:function(){
  
      },
      /**
       * Opens the Upload dialog (first triggers here)
       */
      onUploadDialog: function () {
        // Load the fragment and set the upload URL
        this.loadFragment({
            id: "headersUploadDialog",
            name: "acapm.allcapapp.ext.fragment.UploadFile",
            controller: this
        }).then(oDialog => {
            // Set the upload URL and open the dialog
            const fileUploader = sap.ui.core.Fragment.byId("headersUploadDialog", "fileUploaders");
            fileUploader.setUploadUrl(oDialog.getParent().getModel().sServiceUrl + "excelUpload/excel");
            oDialog.open();
        });
      },
  
      // ---------------------------------After dialog opened, below functions are executed
      /**
       * Destroying the event after cancel or upload..(working)
       */
      onAfterClose: function(evnt){
        evnt.getSource().destroy();
      },  
      /**
       * checking the uploading is empty?--(not working)
       */
      onFileEmpty: function(evnt) {
        console.log("File empty event triggered"); // Debugging line
        const oDialog = evnt.getSource().getParent();
        const oBundle = oDialog.getModel("i18n").getResourceBundle();
        oDialog.getBeginButton().setEnabled(true);
        MessageToast.show(oBundle.getText("emptyFile"));
      },
      
      /**
       * Allowing the file
       */
      onFileAllowed: function(evnt) {
        evnt.getSource().getParent().getBeginButton().setEnabled(true);
      },    
      /**
       * Uploading different types of files like word...(working)
       */
      onTypeMismatch: function(evnt){
        const oDialog = evnt.getSource().getParent();
        const aFileTypes = evnt.getSource().getFileType();
        const sTypes = aFileTypes.map(type => `*.${type}`).join(", ");
        const oBundle = oDialog.getModel("i18n").getResourceBundle();
        const sMessage = oBundle.getText("typeMismatch", [sTypes]);
        // Disable the begin button
        oDialog.getBeginButton().setEnabled(true);
        // Show the message toast
        MessageToast.show(sMessage);
      },
      /**
       * Closes the Upload dialog
       */
      onCloseDialog: function (evnt) {
        // Get the dialog instance from the button's parent
        const oDialog = evnt.getSource().getParent();
        if (oDialog) {
          // Use the Fragment's byId method to find the FileUploader
          const sDialogId = oDialog.getId(); // Get the dialog ID
          const fileUploader = sap.ui.core.Fragment.byId(sDialogId, "fileUploaders");
          if (fileUploader) {
            // Clear the FileUploader
            fileUploader.clear();
          }
          // Close the dialog
          oDialog.close();
        } else {
              console.error("Dialog instance not found");
        }
      }
    }
  });