import { withPluginApi } from "discourse/lib/plugin-api";
import loadScript from "discourse/lib/load-script";
import bootbox from "bootbox";
import { getAbsoluteURL } from "discourse-common/lib/get-url";

const PLUGIN_ID = "discourse-onedrive-picker";

function initializeDiscourseOneDrivePicker(api) {
  const siteSettings = api.container.lookup("site-settings:main");

  function openDrive(e) {
    if (!siteSettings.discourse_onedrive_picker_azure_client_id) {
      bootbox.alert(I18n.t("onedrive.picker.error"));

      return;
    }

    loadScript(
      "/plugins/discourse-onedrive-picker/javascripts/OneDrive.js"
    ).then(() => {
      var odOptions = {
        clientId: siteSettings.discourse_onedrive_picker_azure_client_id,
        action: "share",
        viewType: "all",
        multiSelect: true,
        advanced: {
          redirectUri: getAbsoluteURL('/onedrive-picker'),
          createLinkParameters: { 
            type: "view",
            scope: "anonymous" 
          }
        },
        success: function (files) {
          files.value.forEach(file => {
            e.addText(file.permissions[0].link.webUrl);
          });
        },
        cancel: function () {},
        error: function (error) {},
      };

      OneDrive.open(odOptions);
    });
  }

  api.onToolbarCreate(function (toolbar) {
    toolbar.addButton({
      trimLeading: true,
      id: "buttonID",
      group: "insertions",
      icon: "cloud",
      title: "onedrive.picker.title",
      perform: (e) => {
        openDrive(e);
      },
    });
  });
}

export default {
  name: "discourse-onedrive-picker",

  initialize(container) {
    const siteSettings = container.lookup("site-settings:main");
    if (siteSettings.discourse_onedrive_picker_enabled) {
      withPluginApi("0.10.1", initializeDiscourseOneDrivePicker);
    }
  },
};
