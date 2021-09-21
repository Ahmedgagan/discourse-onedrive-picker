import { withPluginApi } from "discourse/lib/plugin-api";
import loadScript from "discourse/lib/load-script";

const PLUGIN_ID = "discourse-onedrive-picker";

function initializeDiscourseRewards(api) {
  const siteSettings = api.container.lookup("site-settings:main");

  function openDrive(e){
    loadScript("/plugins/discourse-onedrive-picker/javascripts/OneDrive.js").then(() => {
      var odOptions = {
        clientId: siteSettings.discourse_onedrive_azure_client_id,
        action: "share",
        advanced: {
          redirectUri: "http://localhost:4200/onedrive"
        },
        success: function(files) {
          e.addText(files.value[0].permissions[0].link.webUrl);
        },
        cancel: function() {
        },
        error: function(error) {
        }
      }
  
      OneDrive.open(odOptions);
    });
  }

  api.onToolbarCreate(function(toolbar) {
    toolbar.addButton({
      trimLeading: true,
      id: "buttonID",
      group: "insertions",
      icon: 'cloud',
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
    if (siteSettings.discourse_rewards_enabled) {
      withPluginApi("0.10.1", initializeDiscourseRewards);
    }
  },
};
