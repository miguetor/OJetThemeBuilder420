/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'jquery',
        'promise',
        'ojs/ojknockout',
        'ojs/ojtreeview',
        'ojs/ojjsontreedatasource',
        'ojs/ojoffcanvas',
        'ojs/ojtable',
        'ojs/ojpagingcontrol',
        'ojs/ojlistview',
        'ojs/ojindexer',
        'ojs/ojindexermodeltreedatasource',
        'ojs/ojpulltorefresh',
        'ojs/ojswipetoreveal',
        'ojs/ojdatagrid',
        'ojs/ojindexermodeltreedatasource',
        'ojs/ojpagingtabledatasource',
        'ojs/ojarraytabledatasource',
        'ojs/ojarraydatagriddatasource',],

function(oj, ko, $)
{
    var viewModel = function()
    {
        var self = this;

        var deptArray = [{DepartmentId: 1001, DepartmentName: 'ADFPM 1001 neverending', LocationId: 200},
            {DepartmentId: 556, DepartmentName: 'BB', LocationId: 200},
            {DepartmentId: 10, DepartmentName: 'Administration', LocationId: 200},
            {DepartmentId: 20, DepartmentName: 'Marketing', LocationId: 200},
            {DepartmentId: 30, DepartmentName: 'Purchasing', LocationId: 200},
            {DepartmentId: 40, DepartmentName: 'Human Resources1', LocationId: 200},
            {DepartmentId: 50, DepartmentName: 'Administration2', LocationId: 200},
            {DepartmentId: 60, DepartmentName: 'Marketing3', LocationId: 200},
            {DepartmentId: 70, DepartmentName: 'Purchasing4', LocationId: 200},
            {DepartmentId: 80, DepartmentName: 'Human Resources5', LocationId: 200}];
        this.datasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(deptArray, {idAttribute: 'DepartmentId'}));
        this.datagriddatasource = new oj.ArrayDataGridDataSource(deptArray, {rowHeader: 'DepartmentId'});

        var jsonData = [
          {
            "attr": {"title": "Links", "id": "links"},
            "children": [
              {
                "attr": {"title": "Oracle","id": "oracle"}
              },
              {
                "attr": {"title": "IBM","id": "ibm"}
              },
              {
                "attr": {"title": "Microsoft","id": "ms"},
                "children": [
                  {
                    "attr": {"title": "USA","id": "msusa"},
                    "children": [
                        {
                          "attr": {"title": "North", "id": "msusanorth"}
                        },
                        {
                          "attr": {"title": "South","id": "msusasouth"}
                        },
                        {
                          "attr": {"title": "East","id": "msusaeast"}
                        },
                        {
                          "attr": {"title": "West","id": "msusawest"}
                        }
                    ]
                  },
                  {
                    "attr": {"title": "Europe","id": "msuerope"}
                  },
                  {
                    "attr": {"title": "Asia","id": "msasia"},
                    "children": [
                      {
                        "attr": {"title": "Japan","id": "asiajap"}
                      },
                      {
                        "attr": {"title": "China","id": "asiachina"}
                      },
                      {
                        "attr": {"title": "India","id": "asiaindia"}
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ];

        this.treeDataSourceRenderer = oj.KnockoutTemplateUtils.getRenderer('item_template', true);
        this.treeDataSource = new oj.JsonTreeDataSource(jsonData);

        this.getIndexerModel = function()
        {
            if (!self.indexerModel)
            {
                var data = [{'id': 1, 'first': 'Simon', 'last': 'Austin'},
                            {'id': 2, 'first': 'Douglas', 'last': 'Grant'},
                            {'id': 3, 'first': 'Nancy', 'last': 'Greenberg'},
                            {'id': 4, 'first': 'Luis', 'last': 'Popp'}];
                var handleSectionClick = function(section)
                {
                    return new Promise(function(resolve, reject)
                    {
                        resolve(section);
                    });
                };
                var indexerModel = new oj.IndexerModelTreeDataSource(data, 'id', handleSectionClick, {'groupingAttribute': 'last'});
                self.indexerModel = indexerModel;
            }
            return self.indexerModel;
        }

        this.handleAttached = function(params)
        {
          $("#listviewindexer").on("ojready", function()
          {
              oj.PullToRefreshUtils.setupPullToRefresh($("#listviewContainer").get(0), function()
              {
                  return new Promise(function(resolve, reject)
                  {
                      setTimeout(function()
                      {
                          resolve();
                      }, 3000);
                  });
              }, {'primaryText': 'Primary Text', 'secondaryText': 'secondary text'});
          });

          var startOffcanvas = $('#listviewindexer').find(".oj-offcanvas-start").first();
          var endOffcanvas = $('#listviewindexer').find(".oj-offcanvas-end").first();

          // setup swipe actions
          oj.SwipeToRevealUtils.setupSwipeActions(startOffcanvas);
          oj.SwipeToRevealUtils.setupSwipeActions(endOffcanvas);
      }
    }

    return viewModel;
});

