sap.ui.controller("testApp.testlayout.Pricing", {

	onInit : function() {
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
	},

	// relevant footer functions
	back : function() {

		this._oRouter.navTo("mainFarmer");

	}

/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf testlayout.Detail
 */
// onExit: function() {
//
// }
});