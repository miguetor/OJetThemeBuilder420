/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'jquery',
        './MockProgressItem',
        'promise', 'ojs/ojknockout',
        'ojs/ojcollapsible',
        'ojs/ojbutton',
        'ojs/ojmenu',
        'ojs/ojprogress',
        'ojs/ojconveyorbelt',
        'ojs/ojaccordion',
        'ojs/ojtrain',
        'ojs/ojfilepicker',
        'ojs/ojarraytabledatasource',
        'ojs/ojprogresslist',
        'ojs/ojavatar'
],

function(oj, ko, $, ProgressItem)
{
  var viewModel = function()
  {
    var self = this;
    self.disableButtons = ko.observable(false);

    //For the Progress list
    self.dataSource = new oj.ArrayTableDataSource([], {idAttribute: 'name'});
    self.itemQ = new ProgressItem({name: "item-q", total: 100});
    self.itemP = new ProgressItem({name: "item-p", total: 100});
    self.itemD = new ProgressItem({name: "item-d", total: 20});
    self.itemE = new ProgressItem({name: "item-e", total: 50});

    self.dataSource.add(self.itemQ);
    self.dataSource.add(self.itemP);
    self.dataSource.add(self.itemD);
    self.dataSource.add(self.itemE);

    function updateStatus(progressItem, loaded, status, error) {
      var stateInfo = {
        "loaded": loaded,
        "status": status
      }

      if (error) {
        stateInfo["error"] = error;

        //clear file items from the progress status
        window.clearInterval(self.timerID);
      }
      progressItem.updateStates(stateInfo);
    };

    self.timerID = window.setInterval(function() {
      updateStatus(self.itemP, 40);
      updateStatus(self.itemD, 20, oj.ProgressItem.Status['LOADED']);
      updateStatus(self.itemE, 20, oj.ProgressItem.Status['ERRORED'], new Error("Error"));
    }, 30);

  }

  return viewModel;

});
