# frozen_string_literal: true

# name: discourse-onedrive-picker
# about: allows to add file from onedrive
# version: 0.1
# author: Ahmed Gagan
# url: https://github.com/Ahmedgagan/discourse-rewards

enabled_site_setting :discourse_onedrive_picker_enabled

if respond_to?(:register_svg_icon)
  register_svg_icon "fa-cloud"
end

after_initialize do
  module ::DiscourseOneDrivePicker
    PLUGIN_NAME ||= 'discourse-onedrive-picker'

    class Engine < ::Rails::Engine
      engine_name PLUGIN_NAME
      isolate_namespace DiscourseOneDrivePicker
    end
  end

  Discourse::Application.routes.append do
    mount ::DiscourseOneDrivePicker::Engine, at: '/'
    get "onedrive" => "groups#index"
  end
end
