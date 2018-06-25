/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'promise', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojdialog', 'ojs/ojpopup', 'ojs/ojrouter'],
  function(oj, ko, $) {
    var viewModel = function(params) {
      var self = this;
      self.theme = {};

      self.themeTargetPlatform = oj.ThemeUtils.getThemeTargetPlatform();

      self.theme.baseTheme = ko.observable(theme.baseTheme);
      self.theme.demoTheme = ko.observable(theme.demoTheme);

      self.theme.baseTheme.subscribe(function(newValue) {
        theme.baseTheme = newValue;

        if (theme.demoTheme == 'projector') {
          theme.demoTheme = 'none';
        }

        saveThemeSettings();
        // stuff is bound to the base and demo theme, so just
        // reload the page so that css is set before binding applied
        window.location.reload()
      });

      self.theme.demoTheme.subscribe(function(newValue) {
        if (newValue != "none") {
          theme.compatibility = false;
        }

        theme.demoTheme = newValue;
        saveThemeSettings();
        // stuff is bound to the base and demo theme, so just
        // reload the page so that css is set before binding applied
        window.location.reload()
      });
    }

    return viewModel;
  });
