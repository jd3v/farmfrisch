sap.ui.controller("testApp.testlayout.Main", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf testlayout.Main
*/
	
	
	onInit: function() {
		
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);	
		
		//intialize Footer
		var mainFooter = sap.ui.xmlfragment(
                "testApp.testlayout.fragments.MainFooter",
                this.getView().getController() // associate controller with the fragment            
          );	
		
		globalMainView = this.getView();
	},
	
	
	navProduct: function(oEvent){
		
		if(!oEvent.getSource().getBindingContext()){return;}
		//get selected item
		var sPath = oEvent.getSource().getBindingContext().getPath(); 
		
		var oObject = this.getView().getModel().getProperty(sPath);
				
		this._oRouter.navTo("productMaster",{prodgroupID: oObject.prodgroupID}) 
	
	},

	
	navFarmer: function(oEvent){
		
		if(!oEvent.getSource().getBindingContext()){return;}
		//get selected item
		var sPath = oEvent.getSource().getBindingContext().getPath(); 
		var oObject = this.getView().getModel().getProperty(sPath);
				
		this._oRouter.navTo("farmMaster",{farmerID: oObject.farmerID}) 
		
	},
	
	/*Both functions used to navigate to Overview Pages, NO Model Manipulation*/
	navProductOV: function(oEvent){
		
		this._oRouter.navTo("productOV") 
	},
	
	navFarmerOV: function(oEvent){
		
		this._oRouter.navTo("farmersOV") 
	},
	
	navHowItWorks: function(oEvent){
		
		this._oRouter.navTo("howItWorks") 
	},
	
	navToMainFarmer: function(oEvent){
		
		this._oRouter.navTo("mainFarmer") 
	},

	navToAnalytics: function(){
		
		this._oRouter.navTo("analyticsMaster")
	}

});