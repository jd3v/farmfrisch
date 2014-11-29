jQuery.sap.require("testApp.util.Formatter");

sap.ui.controller("testApp.testlayout.MyPortfolioMaster", {
	
	onInit : function() {

		// get Router
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		this._oRouter.attachRoutePatternMatched(this._handleRouteMatched, this);
//		// Local ListModel
//		var jsonString = {
//			ListItems : [ {
//				listId : "0",
//				listName : "Übersicht",
//				navLink: "analyticsGeneral"
//			}, {
//				listId : "1",
//				listName : "Produkte",
//				navLink: "analyticsProducts"
//			}, {
//				listId : "2",
//				listName : "Kunden",
//				navLink: "analyticsCustomer"
//			} ]
//		};
//		this.listModel = new sap.ui.model.json.JSONModel();
//		this.listModel.setData(jsonString);
//		this.getView().setModel(this.listModel);
		
		this._oRouter.navTo("myPortfolioDetail");		
		
	},
	
	_handleRouteMatched: function(evt){
		
		if("analyticsMaster" !== evt.getParameter("name")){			
			
			return;
		}
		
		
		
		//navigate
		this._oRouter.navTo("analyticsGeneral");
	},
	
	navigateToDetail: function(oEvent){
		
		var item = oEvent.getParameter("listItem");		
		var sPath = item.getBindingContext().getPath(); 		
		var oObject = this.getView().getModel().getProperty(sPath);		
		this._oRouter.navTo(oObject.navLink);
	},
	
	back: function(){
		
		
		this._oRouter.navTo("mainFarmer");
	}

});