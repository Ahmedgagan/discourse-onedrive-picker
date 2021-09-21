import { withPluginApi } from "discourse/lib/plugin-api";
import loadScript from "discourse/lib/load-script";
import bootbox from "bootbox";

const PLUGIN_ID = "discourse-onedrive-picker";

function initializeDiscourseOneDrivePicker(api) {
  const siteSettings = api.container.lookup("site-settings:main");

  function openDrive(e) {
    if (!siteSettings.discourse_onedrive_picker_azure_client_id || !siteSettings.discourse_onedrive_picker_site_base_url) {
      bootbox.alert(I18n.t("onedrive.picker.error"));

      return;
    }

    loadScript(
      "/plugins/discourse-onedrive-picker/javascripts/OneDrive.js"
    ).then(() => {
      var odOptions = {
        clientId: siteSettings.discourse_onedrive_picker_azure_client_id,
        action: "share",
        advanced: {
          redirectUri: `${siteSettings.discourse_onedrive_picker_site_base_url}/onedrive-picker`,
        },
        success: function (files) {
          e.addText(files.value[0].permissions[0].link.webUrl);
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
