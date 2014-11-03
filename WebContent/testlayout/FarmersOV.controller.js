sap.ui.controller("testApp.testlayout.FarmersOV", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf testlayout.FarmersOV
*/
	onInit: function() {
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		this._oRouter.attachRoutePatternMatched(this._handleRouteMatched, this);
	},
	
	
	_handleRouteMatched:function(evt){
		console.log(evt)
		if("farmers" !== evt.getParameter("name")){
			return;
		}
		var id = evt.getParameter("arguments").id;
		var model = new sap.ui.model.json.JSONModel({id:id});
		this.getView().setModel(model,"data");
	},
	
	navFarmer: function(oEvent){
		
		//get selected item
		var sPath = oEvent.getSource().getBindingContext().getPath(); 
		var oObject = this.getView().getModel().getProperty(sPath);
		
		if (window.map !== undefined) {
			console.log(map)
			google.maps.event.trigger(map, "resize");
		}
		this._oRouter.navTo("farmMaster",{farmerID: oObject.farmerID}) 
		
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