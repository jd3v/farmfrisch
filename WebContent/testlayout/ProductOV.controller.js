sap.ui.controller("testApp.testlayout.ProductOV", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf testlayout.ProductOV
*/
	onInit: function() {
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		
	},
	
	navProduct: function(oEvent){
	
		var oDataModel = this.getView().getModel()
		//get selected item
		var sPath = oEvent.getSource().getBindingContext().getPath(); 
		var oObject = oDataModel.getProperty(sPath);
				
		this._oRouter.navTo("productMaster",{prodgroupID: oObject.prodGroupID})
		
		//navigate to Detail page , this is done here because of conflict with corss navigation from farmer profie
		//create model to get first id of the list on the master page
		
		
		//create temporary jsonModel for Map
		var jsonModelProducts = new sap.ui.model.json.JSONModel();
		
		//$orderby parameter for safety reasons
		var urlForMap = "/ProductGroups('"+oObject.prodGroupID+"')/ProductsGrouped?$orderby=productID"
		oDataModel.read(urlForMap, null, null, false, 
	 			function(oData, oResponse)
	 			{	 				
	    	 		jsonModelProducts.setData(oData);    			
	 			},
	 			function()
	 			{
	 				alert("Failed to read Data");
	 	        });
		var firstProductId = jsonModelProducts.oData.results[0].productID;
		
		this._oRouter.navTo("productDetail",{prodgroupID: oObject.prodGroupID, prodID: firstProductId});
	},
	
	//relevant footer functions
	back: function() {
		
		this._oRouter.navTo("_index");
		
	},
	
	navHowItWorks: function(oEvent){
		
		this._oRouter.navTo("howItWorks") 
	},
	
	navToMainFarmer: function(oEvent){
		
		this._oRouter.navTo("mainFarmer") 
	},

	navToAnalytics: function(){
		
		this._oRouter.navTo("analyticsMaster")
	},
	
	navToLogin: function(){
		
		this._oRouter.navTo("login")
	}	
	
	
	
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf testlayout.ProductOV
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf testlayout.ProductOV
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf testlayout.ProductOV
*/
//	onExit: function() {
//
//	}

});