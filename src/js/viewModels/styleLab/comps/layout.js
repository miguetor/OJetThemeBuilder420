/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'promise', 'ojs/ojknockout',
        'ojs/ojcollapsible',
        'ojs/ojaccordion',
        'ojs/ojpopup',
        'ojs/ojdialog',
        'ojs/ojradioset',
        'ojs/ojnavigationlist',
        'ojs/ojswitch'],
       
function(oj, ko, $)
{    
    
    var viewModel = function()
    {
        
        
        self.navlistSelectedItem = ko.observable("item2");
        self.navlistdisplay = ko.observable('all');
        self.isContrastBackground = ko.observable(false);
        self.isContrastBackground.subscribe(function(newValue){
                if(newValue){
                    $("#navlistdisplay").addClass("oj-contrast-background oj-contrast-marker");
                    $("#navtabsdisplay").addClass("oj-contrast-background oj-contrast-marker");
                    $("#horizontalnavlistdisplay").addClass("oj-contrast-background oj-contrast-marker");
                    $("#horizontalnavtabsdisplay").addClass("oj-contrast-background oj-contrast-marker");
                }else{
                    $("#navlistdisplay").removeClass("oj-contrast-background oj-contrast-marker");
                    $("#navtabsdisplay").removeClass("oj-contrast-background oj-contrast-marker");
                    $("#horizontalnavlistdisplay").removeClass("oj-contrast-background oj-contrast-marker");
                    $("#horizontalnavtabsdisplay").removeClass("oj-contrast-background oj-contrast-marker");
                } 
        });

    }

    return viewModel;
}); 

