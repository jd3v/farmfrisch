sap.ui.controller("testApp.testlayout.Main", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf testlayout.Main
*/
	
	
	onInit: function() {
		
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);	
		
		this.detailFooter = sap.ui.xmlfragment(
                "testApp.testlayout.fragments.DetailFooter",
                this.getView().getController() // associate controller with the fragment            
          );
		
		
		//var app = sap.ui.jsview("testApp.testlayout.App")
	//	console.log(sap.ui.getCore().byId("idAppControl"));
//		new sap.m.SplitContainer("idSplitContainerControl",{height:"500px", width:"500px"});
	},
	
	
	navProduct: function(oEvent){
		
		//get selected item
		var sPath = oEvent.getSource().getBindingContext().getPath(); 
		var oObject = this.getView().getModel().getProperty(sPath);
				
		this._oRouter.navTo("productMaster",{prodgroupID: oObject.prodgroupID}) 
	
	},

	
	navFarmer: function(oEvent){
		
		//get selected item
		var sPath = oEvent.getSource().getBindingContext().getPath(); 
		var oObject = this.getView().getModel().getProperty(sPath);
				
		this._oRouter.navTo("farmMaster",{farmerID: oObject.farmerID}) 
		
	},
	
	/*Both functions used to navigate to Overview Pages, NO Model Manipulation*/
	navProductOV: function(oEvent){
		
//		
//		
//		console.log(sap.ui.getCore().byId("footerDetailProfile"))
//		sap.ui.getCore().byId("footerDetailProfile").addStyleClass("FooterButtonHide")
//		this.detailFooter.rerender()
		
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