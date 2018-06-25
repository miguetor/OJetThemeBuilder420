/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'navigation', 'ojs/ojrouter', 'ojs/ojdialog', 'ojs/ojoffcanvas', 'ojs/ojknockout'],
  function(oj, ko, nav) {
    /*
     * Your application specific code will go here
     */
    function AppControllerViewModel() {
      var self = this;

      // Router setup
      self.router = oj.Router.rootInstance;
      self.router.configure({
        'home': {
          label: 'Home',
          isDefault: true
        },
        'library': {
          label: 'Library'
        }
      });

      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      // Change the default location for the viewModel and view files
      oj.ModuleBinding.defaults.modelPath = 'viewModels/styleLab/';
      oj.ModuleBinding.defaults.viewPath = 'text!views/styleLab/';


      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

      // Navigation and Offcanvas
      self.drawerParams = {
        displayMode: 'push',
        selector: '#offcanvas',
        content: '#pageContent'
      };
      // Called by navigation drawer toggle button and after selection of nav drawer item
      self.toggleDrawer = function() {
        return oj.OffcanvasUtils.toggle(self.drawerParams);
      };
      // Close offcanvas on medium and larger screens
      self.mdScreen.subscribe(function() {
        oj.OffcanvasUtils.close(self.drawerParams);
      });
      self.navDataSource = nav.dataSource;
      // Called by nav drawer option change events so we can close drawer after selection
      self.navChange = function(event) {
        if (event.detail.value !== self.router.stateId()) {
          self.toggleDrawer();
        }
      };

    }

    return new AppControllerViewModel();
  }
);
