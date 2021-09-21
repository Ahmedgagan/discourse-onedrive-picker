import Controller from "@ember/controller";
import loadScript from "discourse/lib/load-script";

export default Controller.extend({
  init() {
    this._super(...arguments);
    loadScript("/plugins/discourse-onedrive-picker/javascripts/OneDrive.js")
  }
});
