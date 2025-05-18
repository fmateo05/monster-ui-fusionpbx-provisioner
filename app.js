define(function (require) {
	var monster = require('monster'),
  $ = require('jquery'),
  _ = require('lodash');

		//generate random number/ID
		//const genRandHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

	var app = {
		name: "provisioner",

		css: ["app"],

		i18n: {
			"en-US": { customCss: false },
		},

		// Defines API requests not included in the SDK
		requests: {
                'provisioner.devices.list': {
		//apiRoot: 'https://portal.nodtmf.com/db',
                apiRoot: 'https://portal.nodtmf.com/v2',
		url: '/accounts/{accountId}',
		verb: 'GET'
                    }
                },

		// Define the events available for other apps
		subscribe: {},

		// Method used by the Monster-UI Framework, shouldn't be touched unless you're doing some advanced kind of stuff!
		load: function (callback) {
			var self = this;

			self.initApp(function () {
				callback && callback(self);
			});
		},
                

		// Method used by the Monster-UI Framework, shouldn't be touched unless you're doing some advanced kind of stuff!
//		initApp: function (callback) {
//			var self = this;
//
//			self.initConfig(() => {
//				console.log("Initialized config.");
//				//console.log(self.config);
//			});
//
//			// Used to init the auth token and account ID of this app
//			monster.pub("auth.initApp", {
//				app: self,
//				callback: callback
//			});
//		},
                
                initApp: function(callback) {
                        var self = this;

                        monster.pub('auth.initApp', {
                          app: self,
                          callback: callback
                        });
                      },

		////////////////////////////////////////////////////////////////////
		// Initiailize the config object
		////////////////////////////////////////////////////////////////////
//		initConfig: function(callback) {
//			var self = this;
//			if (_.isEmpty(self.config)) {
//				if (!_.isEmpty(monster.config.provisioner)) {
//					self.config = monster.config.provisioner;
//					Object.keys(self.configDefault).forEach((configItem) => {
//						if (typeof self.config[configItem] === 'undefined') {
//							self.config[configItem] = self.configDefault[configItem];
//						}
//					});
//				} else {
//					self.config = self.configDefault;
//				}
//			}
//			return callback();
//		},
		
		config: {}, //fill this object up with config from js/config.js switchboard object, or default config
		
		////////////////////////////////////////////////////////////////////
		// DEFAULT APP CONFIGURATION - set 'switchboard' object
		// in {MONSTER-UI-WEB-DIR}/js/config.js to change these defaults.
		////////////////////////////////////////////////////////////////////
//		configDefault: {
//			features: {},
//			deviceNameLengthLimit: 12,
//			deviceNameUseExtension: false,
//		},
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
                                       console.log(data);
                                       callback && callback(data);
                                       
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
