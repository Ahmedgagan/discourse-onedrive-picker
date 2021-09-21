# Discourse OneDrive Picker
This plugin enables user to pick file from onedrive & insert file links to composer using onedrive file picker

## Setup Guide
### Register An Azure App
 - visit https://aka.ms/AppRegistrations
 - Click `+ New registration` on the top left side of your screen
 - Fill Name of your app
 - Select `Supported account types`
Here you will get 4 options select according to your requirements:
1. Accounts in this organizational directory only (icm only - Single tenant):
This will only allow people of your organization to sign in to the one drive picker
2. Accounts in any organizational directory (Any Azure AD directory - Multitenant):
This will only allow people of any organization to sign in to the one drive picker. No personal account user will be able to sign in to one drive picker.
3. Accounts in any organizational directory (Any Azure AD directory - Multitenant) and personal Microsoft accounts (e.g. Skype, Xbox):
This will allow people of any organization to sign in to the one drive picker. The personal account user will be able to sign in to one drive picker.
4. Personal Microsoft accounts only
This will allow only personal accounts user to sign in to the one drive picker.
 - Scroll down, you will get an option to add `Redirect URL`:
Here add your `domain name/onedrive`. eg: `https:meta.discourse.com/onedrive`

- Click Register, your app will be created.

- Now Copy the **Application Id** for your application & paste it in discourse site setting, `discourse_onedrive_azure_client_id`

- After this, go to **Authentication** tab on the left navigation bar & check both these options.
  - Check `Access tokens (used for implicit flows)`
  - Check `ID tokens (used for implicit and hybrid flows)`
  - Click **Save**, on the left side.

- Now, go to **Certificates & secrets** tab on the left navigation bar and create a New client secret.
  - Add Any description & select the expiry date & click **Add**

You are done setting up one drive picker.

Now, Open Composer & click to **Cloud** Icon & Go with the flow to enjoy your OneDrive Picker In discourse composer.

## Site Settings
- **discourse_onedrive_picker_azure_client_id**: Add Azure Application Client ID
- **discourse_onedrive_picker_site_base_url**: Add base url of your website. eg: http://localhost:4200. Make sure you add full url including http/https.
