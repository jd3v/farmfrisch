sap.ui.controller("testApp.testlayout.FarmersOV", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf testlayout.FarmersOV
*/
	onInit: function() {
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
	},
	
	navFarmer: function(oEvent){
		
		//get model
		var oDataModel = this.getView().getModel();
		//get selected item
		var sPath = oEvent.getSource().getBindingContext().getPath(); 
		var oObject = oDataModel.getProperty(sPath);
		

		this._oRouter.navTo("farmMaster",{farmerID: oObject.producerID}) 
		
	
		
	},
	
	backToLandingPage: function() {
		
		this._oRouter.navTo("_index");
		
	}
	

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf testlayout.FarmersOV
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf testlayout.FarmersOV
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf testlayout.FarmersOV
*/
//	onExit: function() {
//
//	}

});