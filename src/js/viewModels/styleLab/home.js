/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'promise', 'ojs/ojknockout', 'ojs/ojnavigationlist', 'ojs/ojbutton', 'ojs/ojdialog', 'ojs/ojpopup', 'ojs/ojmodule', 'ojs/ojrouter', 'ojs/ojselectcombobox', 'ojs/ojoffcanvas'],
  function(oj, ko, $) {
    function saveToSessionStorage(key, value) {
      try {
        sessionStorage.setItem(key, value);
      } catch (e) {
        console.log("exception calling sessionStorage.setItem, likely cause is private browsing mode which doesn't allow saving to sessionStorage");
      }
    }

    var viewModel = function(params) {
      var self = this;

      // ------- START TOUR RELATED---------

      self.tourParams = {};

      // create the tour stops

      // shared tour stops
      var platform = {
        modulename: 'tour/stops/platformtheme',
        launcher: '#platformPicker'
      };
      var custom = {
        modulename: 'tour/stops/customtheme',
        launcher: '#customPicker'
      };
      var variables = {
        modulename: 'tour/stops/variables',
        launcher: '#varHeader'
      };
      var mashup = {
        modulename: 'tour/stops/mashup',
        launcher: '#mashup',
        position: {
          'my': 'center top',
          'at': 'center bottom',
          'collision': 'flipfit'
        },
        // if I set the tail to none the popup ends up under the glass pane!
        tail: 'simple'
      };
      var builderInstructions = {
        modulename: 'tour/stops/builderinstructions',
        launcher: '#library',
        position: {
          'at': 'center bottom',
          'my': 'end top',
          'collision': 'flipfit'
        }
      };
      var viewerfiles = {
        modulename: 'tour/stops/viewerfiles',
        launcher: '#filesPicker'
      };


      var builderTourStops = [builderInstructions, mashup, platform, custom, viewerfiles, variables];

      self.tourStops = builderTourStops;

      self.startTour = function() {
        // todo: hack! the tour is in another module,
        // how can I tell the tour to start without knowing the popup id?
        $('#tourPop').ojPopup("open");
      }

      // whether to pulse the tour button when the page is first loaded
      self.tourPulse = false;

      try {
        var tourPulseKey = "tourPulse4";
        self.tourPulse = localStorage.getItem(tourPulseKey) == null ? true : false;
        localStorage.setItem(tourPulseKey, false);
      } catch (e) {
        console.log("exception thrown: likely cause is private browsing mode which doesn't allow saving to local or session storage");
        console.log(e);
      }




      // ------- END TOUR RELATED---------


      self.mdDownQuery = oj.ResponsiveUtils.getFrameworkQuery(
        oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_DOWN);

      self.mdDown = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(self.mdDownQuery);






      self.startDrawer = {
        "edge": "start",
        "displayMode": "push",
        "selector": "#startDrawer",
        "query": oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_UP)
      };

      self.isLaunchMenuVisible = function(edge) {
        return ($("#" + edge).css("display") !== "none");
      }

      self.isOffcanvasOpen = function(offcanvas) {
        return $(offcanvas.selector).hasClass("oj-offcanvas-open");
      }

      self._toggleOpenClose = function(edge) {}

      self.toggleStart = function() {
        var offcanvas = self.startDrawer;

        //if hamburger icon is visible then hide or show the offcanvas
        if (self.isLaunchMenuVisible('start')) {
          if (self.isOffcanvasOpen(offcanvas)) {
            return oj.OffcanvasUtils.close(offcanvas);
          } else {
            return oj.OffcanvasUtils.open(offcanvas);
          }
        }
      }

      self.handleAttached = function(info) {

        //setup the offcanvas
        oj.OffcanvasUtils.setupResponsive(self.startDrawer);
      }




      if (params['ojRouter'] != null) {
        var parentRouter = params['ojRouter']['parentRouter'];
        self.router = parentRouter.getChildRouter('view');

        if (self.router == null) {
          self.router = parentRouter.createChildRouter('view');

        }
      } else {

        // Router setup
        self.router = oj.Router.rootInstance;

        oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

        // Change the default location for the viewModel and view files
        oj.ModuleBinding.defaults.modelPath = 'viewModels/styleLab/';
        oj.ModuleBinding.defaults.viewPath = 'text!views/styleLab/';
      }

      self.router.configure({
        'comps': {
          label: 'Components',
          isDefault: true
        },
        'tutorial': {
          label: 'Files'
        }
      });

      self.compRouter = self.router.getChildRouter('comps');

      if (self.compRouter == null) {

        self.compRouter = self.router.createChildRouter('comps').configure({
          'all': {
            label: 'All',
            isDefault: true
          },
          'controls': {
            label: 'Controls'
          },
          'layout': {
            label: 'Layout & Nav'
          },
          'forms': {
            label: 'Forms'
          },
          'collections': {
            label: 'Collections'
          },
          'dvt': {
            label: 'Visualizations'
          }
          //'contrast': { label: 'Contrast' }
        });
      }

      self.routerState = ko.observable();

      self.routerState.subscribe(function(newValue) {
        var curValue = self.router.stateId();
        if (curValue != newValue) {
          self.router.stateId(newValue);
        }
      });

      oj.Router.sync().then(function() {
        if (self.router.stateId())
          self.routerState(self.router.stateId());
      });

      self.bgcolor = ko.observable(true);

      var compRouterId = sessionStorage.getItem('labitem');

      if (compRouterId == null) {
        compRouterId = 'all';
      }

      self.labitem = ko.observable(compRouterId);

      self.labitem.subscribe(function(newValue) {
        saveToSessionStorage('labitem', newValue);
      });


      /*

                  self.router.stateId.subscribe(function(oldValue) {

                    if (oldValue == 'comps')
                    {
                      var stateId = self.compRouter.stateId();
                      //console.log("comp router id saved = " + stateId);

                      if (stateId != null && stateId != compRouterDefaultState)
                        saveToSessionStorage('compRouterId', stateId);
                    }

                  }, null, "beforeChange");

                  self.router.stateId.subscribe(function(newValue) {

                      if (newValue == 'comps')
                      {

                        var compRouterId = sessionStorage.getItem('compRouterId');

                        if (compRouterId != null)
                        {
                          //console.log("comp router id to restore = " + compRouterId);
                          // clear the old saved value
                          sessionStorage.removeItem('compRouterId');
                          self.compRouter.stateId(compRouterId);
                        }
                      }

                  });
      */

    }

    return viewModel;
  });
