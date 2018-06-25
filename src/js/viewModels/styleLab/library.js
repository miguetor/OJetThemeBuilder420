/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'promise', 'ojs/ojknockout'],
  function(oj, ko, $) {
    var viewModel = function(params) {
      var self = this;

      if (params['ojRouter'] != null) {
        var parentRouter = params['ojRouter']['parentRouter'];
        self.docRouter = parentRouter.getChildRouter('doc');

        if (self.docRouter == null) {
          self.docRouter = parentRouter.createChildRouter('doc');
          self.docRouter.configure({
            'docintroduction': {
              label: 'Introduction'
            }
          });
        }
      }

      oj.Router.sync().then(
        function() {
          if (self.docRouter.stateId() == null) {
            var doc = sessionStorage.getItem('doc');

            if (doc == null)
              doc = 'docintroduction';

            //console.log("get " + doc);
            self.docRouter.stateId(doc);
          }

        },
        function(error) {
          oj.Logger.error('Error in root start: ' + error.message);
        }
      );
    }

    return viewModel;
  });
