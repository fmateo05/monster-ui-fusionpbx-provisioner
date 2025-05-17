
define(function (require) {
	var monster = require('monster'),
  $ = require('jquery'),
  _ = require('lodash');


	var app = {
		name: "provisioner",

		css: ["app"],

		i18n: {
			"en-US": { customCss: false },
		},

		requests: {
                'provisioner.devices.list': {
		apiRoot: 'https://portal.nodtmf.com/db',
		url: '/zz_system_account/{accountId}',
		verb: 'GET'
                    }
                },

		subscribe: {},

		load: function (callback) {
			var self = this;

			self.initApp(function () {
				callback && callback(self);
			});
		},
                

                
                initApp: function(callback) {
                        var self = this;

                        monster.pub('auth.initApp', {
                          app: self,
                          callback: callback
                        });
                      },

		
		config: {},
		
             render: function(container) {
                    var self = this,
                      $container = _.isEmpty(container) ? $('#monster_content') : container,
                      $layout = $(self.getTemplate({
                        name: 'layout'
                      }));

                    self.displayDevices({
                      template: $layout
                    });

                    $container
                      .empty()
                      .append($layout);
                  },
		
	
            listDevices: function(callback) {
                        var self = this;

                        monster.request({
                                resource: 'provisioner.devices.list',
                                data: {
                                        accountId: self.accountId
                                },
                                success: function(data) {
                                       // var devices = data;
                                       //callback(data.data); 
                                       console.log(data.data);
                                       callback && callback(data.data);
                                       
                                },
                                error: function(parsedError) {
                                       // monster.ui.alert('BOOM, it doesn\'t work. I bet it\'s a French guy who coded this API.');
                                               callback([]);

                                       
                                }
                        });
                },
            displayDevices: function(mainTemplate) {
                    var self = this;
                    $template = mainTemplate.template;
                    $template.find('#search').on('click', function(e) {
                            self.listDevices(function(data) {
                                //    var results =  self.getTemplate('result', devices);
                                var $results = $(self.getTemplate({
                                        name: 'results',
                                        data: {
                                          provision : data
                                        }
                                      }));
                                    $template
                                            .find('.results')
                                            .empty()
                                            .append($results);
                            });
                    });
            }   



	}; //app

	return app;
});
