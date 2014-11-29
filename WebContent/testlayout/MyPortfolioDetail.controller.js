sap.ui.controller("testApp.testlayout.MyPortfolioDetail", {

	//relevant footer functions
	navHowItWorks: function(oEvent){
		
		this._oRouter.navTo("howItWorks") 
	},
	
	navToMainFarmer: function(oEvent){
		
		this._oRouter.navTo("mainFarmer") 
	},

	navToAnalytics: function(){
		
		this._oRouter.navTo("analyticsMaster")
	}

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf testlayout.Detail
*/
//	onExit: function() {
//
//	}

});