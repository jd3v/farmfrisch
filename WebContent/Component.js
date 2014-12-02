jQuery.sap.declare("testApp.Component");
jQuery.sap.require("testApp.Router");

sap.ui.core.UIComponent
		.extend(
				"testApp.Component",
				{

					metadata : {
						rootView : "testApp.testlayout.App",
						config : {
							resourceBundle : "i18n/messageBundle.properties",
							serviceConfig : {
								// name : "Northwind",
								serviceUrl : "https://s7hanaxs.hanatrial.ondemand.com/p1914487387trial/jtrial/lunaTrial/services/Products.xsodata"
							}
						},
						routing : {
							config : {
								routerClass : testApp.Router,
								viewType : "XML",
								viewPath : "testApp.testlayout",
								targetControl : "idAppControl",
								clearTarget : false
							},
							routes : [
									{
										pattern : "",
										name : "_index",
										view : "Main",
										viewType : "XML",
										targetAggregation : "pages",
										targetControl : "idAppControl",
									},
									{
										pattern : "mainFarmer",
										name : "mainFarmer",
										view : "MainFarmer",
										viewType : "XML",
										targetAggregation : "pages",
										targetControl : "idAppControl",
									},
									{
										pattern : "farmers",
										name : "farmersOV",
										view : "FarmersOV",
										viewType : "XML",
										targetAggregation : "pages",
										targetControl : "idAppControl",
									},
									{
										pattern : "products",
										name : "productOV",
										view : "ProductOV",
										viewType : "XML",
										targetAggregation : "pages",
										targetControl : "idAppControl",
									},
									{
										pattern : "howItWorks",
										name : "howItWorks",
										view : "HowItWorks",
										viewType : "XML",
										targetAggregation : "pages",
										targetControl : "idAppControl",
									},
									{
										pattern : "pricing",
										name : "pricing",
										view : "Pricing",
										viewType : "XML",
										targetAggregation : "pages",
										targetControl : "idAppControl",
									},
									{
										pattern : "login",
										name : "login",
										view : "Login",
										viewType : "XML",
										targetAggregation : "pages",
										targetControl : "idAppControl",
									},
									{
										pattern : "foo",
										name : "_foo",
										view : "SplitContainer",
										viewType : "JS",
										targetAggregation : "pages",
										targetControl : "idAppControl",
										subroutes : [
												{
													pattern : "ProductProfile/{prodgroupID}",
													name : "productMaster",
													view : "ProductMaster",
													viewType : "XML",
													targetAggregation : "masterPages",
													targetControl : "idSplitContainerControl",
													subroutes : [ {
														pattern : "ProductProfile/{prodgroupID}/product/{prodID}",
														name : "productDetail",
														view : "ProductDetail",
														viewType : "XML",
														targetAggregation : "detailPages",
														targetControl : "idSplitContainerControl"

													} ]
												},
												{
													pattern : "FarmerProfile/{farmerID}",
													name : "farmMaster",
													view : "FarmMaster",
													viewType : "XML",
													targetAggregation : "masterPages",
													targetControl : "idSplitContainerControl",
													subroutes : [ {
														pattern : "FarmerProfile/{farmerID}/Detail",
														name : "farmDetail",
														view : "FarmDetail",
														viewType : "XML",
														targetAggregation : "detailPages",
														targetControl : "idSplitContainerControl"

													} ]
												},
												{
													pattern : "MyPortfolio/{farmerID}",
													name : "myPortfolio",
													view : "MyPortfolioMaster",
													viewType : "XML",
													targetAggregation : "masterPages",
													targetControl : "idSplitContainerControl",
													subroutes : [
															{
																pattern : "MyPortfolio/{farmerID}/MyPortfolioDetail/{prodID}",
																name : "myPortfolioDetail",
																view : "MyPortfolioDetail",
																viewType : "XML",
																targetAggregation : "detailPages",
																targetControl : "idSplitContainerControl"

															} 
															]
												},
												{
													pattern : "Analytics",
													name : "analyticsMaster",
													view : "AnalyticsMaster",
													viewType : "XML",
													targetAggregation : "masterPages",
													targetControl : "idSplitContainerControl",
													subroutes : [
															{
																pattern : "Analytics/DetailGeneral",
																name : "analyticsGeneral",
																view : "AnalyticsGeneral",
																viewType : "XML",
																targetAggregation : "detailPages",
																targetControl : "idSplitContainerControl"

															},
															{
																pattern : "Analytics/DetailProduct",
																name : "analyticsProducts",
																view : "AnalyticsProducts",
																viewType : "XML",
																targetAggregation : "detailPages",
																targetControl : "idSplitContainerControl"

															},
															{
																pattern : "Analytics/DetailCustomer",
																name : "analyticsCustomer",
																view : "AnalyticsCustomer",
																viewType : "XML",
																targetAggregation : "detailPages",
																targetControl : "idSplitContainerControl"

															} ]
												}

										]
									} ]

						}
					},
					init : function() {

						console.log("in init component")
						sap.ui.core.UIComponent.prototype.init.apply(this,
								arguments);

						var mConfig = this.getMetadata().getConfig();

						// always use absolute paths relative to our own
						// component
						// (relative paths will fail if running in the Fiori
						// Launchpad)
						var oRootPath = jQuery.sap.getModulePath("testApp");

						// set i18n model
						var i18nModel = new sap.ui.model.resource.ResourceModel(
								{
									bundleUrl : [ oRootPath,
											mConfig.resourceBundle ].join("/")
								});
						this.setModel(i18nModel, "i18n");

						var sServiceUrl = mConfig.serviceConfig.serviceUrl;

						// Odata Model
						/**Hana Connection**/
						var mainOdataModel = new sap.ui.model.odata.ODataModel(
								sServiceUrl, false);						
						// // Create and set domain model to the component
						
						this.setModel(mainOdataModel);
					

						// set device model
						var oDeviceModel = new sap.ui.model.json.JSONModel(
								{
									isTouch : sap.ui.Device.support.touch,
									isNoTouch : !sap.ui.Device.support.touch,
									isPhone : sap.ui.Device.system.phone,
									isNoPhone : !sap.ui.Device.system.phone,
									listMode : sap.ui.Device.system.phone ? "None"
											: "SingleSelectMaster",
									listItemType : sap.ui.Device.system.phone ? "Active"
											: "Inactive"
								});
						oDeviceModel.setDefaultBindingMode("OneWay");
						this.setModel(oDeviceModel, "device");

						this.getRouter().initialize();
						console.log("router is init")
					},

				});
