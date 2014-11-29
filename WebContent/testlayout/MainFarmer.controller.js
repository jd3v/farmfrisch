sap.ui.controller("testApp.testlayout.MainFarmer", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf testlayout.Main
	 */
	globalStateVar : {
		state : false
	},

	onInit : function() {

		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);

		// var app = sap.ui.jsview("testApp.testlayout.App")
		// console.log(sap.ui.getCore().byId("idAppControl"));
		// new sap.m.SplitContainer("idSplitContainerControl",{height:"500px",
		// width:"500px"});
	},

	navProduct : function(oEvent) {

		// get selected item
		var sPath = oEvent.getSource().getBindingContext().getPath();
		var oObject = this.getView().getModel().getProperty(sPath);

		this._oRouter.navTo("productMaster", {
			prodgroupID : oObject.prodgroupID
		})

	},

	navFarmer : function(oEvent) {

		// get selected item
		var sPath = oEvent.getSource().getBindingContext().getPath();
		var oObject = this.getView().getModel().getProperty(sPath);

		this._oRouter.navTo("farmMaster", {
			farmerID : oObject.farmerID
		})

	},

	/* Both functions used to navigate to Overview Pages, NO Model Manipulation */
	navProductOV : function(oEvent) {

		this._oRouter.navTo("productOV")
	},

	navFarmerOV : function(oEvent) {

		this._oRouter.navTo("farmersOV")
	},

	// relevant footer functions
	back : function() {

		this._oRouter.navTo("_index");

	},

	navHowItWorks : function(oEvent) {

		this._oRouter.navTo("howItWorks")
	},

	navToMyPortfolio : function(oEvent) {

		this._oRouter.navTo("myPortfolio")
	},

	navToPricing: function(oEvent) {

		this._oRouter.navTo("myPortfolio")
	},

	navToAnalytics : function() {

		this._oRouter.navTo("analyticsMaster")
	}
/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf testlayout.Main
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf testlayout.Main
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf testlayout.Main
 */
// onExit: function() {
//
// }
});