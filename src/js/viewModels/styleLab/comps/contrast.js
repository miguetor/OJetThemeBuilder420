/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'promise', 'ojs/ojknockout'],

function(oj, ko, $)
{

    var viewModel = function()
    {

      var self = this;

        self.varMap = oj.ThemeUtils.parseJSONFromFontFamily("demo-theming-contrast-map");

        self.compcolors = self.varMap['contrastCompColors'];
        self.colors = self.varMap['paletteGeneralBg'];
        self.textcolors = self.varMap['paletteGeneralText'];


    }

    return viewModel;
});
