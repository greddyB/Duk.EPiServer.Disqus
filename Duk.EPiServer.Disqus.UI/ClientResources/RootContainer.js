﻿define([
"dojo/_base/declare",
"dojo/string",

"dijit/_WidgetBase",
"dijit/_Container",

"./SettingsSection",
"./GeneralSettings",
"./Admin",
"./GeneralSettingsViewModel",
"./AreaSettings",
"./AreaSettingsViewModel",
       
"dojo/i18n!./nls/Settings"
],

function (declare, string, _WidgetBase, _Container,
    SettingsSection, GeneralSettings, Admin, GeneralSettingsViewModel, AreaSettings, AreaSettingsViewModel, i18n) {

    return declare([_WidgetBase, _Container], {
        //  summary:
        //      Root container for Disqus UI component.
        //  description:
        //      Creates and initializes main widgets.

        startup: function () {
            // tags: Creates settings widgets
            //      public

            if (this._started) {
                return;
            }
            
            this.inherited(arguments);
            
            var generalSettingsModel = new GeneralSettingsViewModel();

            var generalSection = new SettingsSection({
                settingsWidget: new GeneralSettings({ model: generalSettingsModel }),
                title: i18n.generalSettingsTitle,
                description: "<span>" +
                    string.substitute(i18n.generalSettingsDescription, {
                        disqusLink: "<a class='epi-visibleLink' href='http://disqus.com/profile/signup/' target='_blank'>disqus.com</a>"
                    }) +
                    "</span>"
            });
            this.addChild(generalSection);
            
            var adminSection = new SettingsSection({
                settingsWidget: new Admin({ model: generalSettingsModel }),
                title: i18n.adminTitle,
                description: "<span>" + i18n.adminDescription + "</span>"
            });
            this.addChild(adminSection);
          
            var areaSettingsSection = new SettingsSection({
                settingsWidget: new AreaSettings({ model: new AreaSettingsViewModel() }),
                title: i18n.areaSettingsTitle,
                description: "<span>" + 
                    string.substitute(i18n.areaSettingsDescription, {
                        sdkLink: "<a class='epi-visibleLink' href='http://world.episerver.com/Documentation/Items/Developers-Guide/EPiServer-CMS/7/Client-Resources/Client-Resource-Management/' target='_blank'>EPiServer CMS SDK</a>"
                    }) + 
                    "</span>"
            });
            this.addChild(areaSettingsSection);
        }
    });

});