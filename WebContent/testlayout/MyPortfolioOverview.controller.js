jQuery.sap.require("testApp.util.Formatter");

sap.ui.controller("testApp.testlayout.MyPortfolioMaster", {

	
	
	onInit: function() {
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		this._oRouter.attachRoutePatternMatched(this._handleRouteMatched, this);
	},
	

	_handleRouteMatched: function(evt){
		if("productMaster" !== evt.getParameter("name")){			
			return;
		}
		
		this.prodGroupID = evt.getParameter("arguments").prodgroupID;	
		
		var sPath = "/ProductGroups('"+this.prodGroupID+"')";	
		
		var oModel = this.getView().getModel();
		
		var oContext = new sap.ui.model.Context(oModel, sPath);		
		this.getView().setBindingContext(oContext);	
		console.log(oContext);
		
		
		//make sure the detail page always displays the first item in the master list
		//this._oRouter.navTo("productDetail",{prodgroupID: this.prodGroupID, prodID: "0"});
	},
	
	afterListUpdated: function(){
		
		//navigate to detail page after the list is updated so you can get the productID of the first item in the list
		//will present problem with back navigation
		
		var productList = this.getView().byId("productProfileMasterList");
		
		var firstProductId = productList.getItems()[0];
		
		productList.setSelectedItem(firstProductId,true);
	},

	navToProdProfile: function(oEvent){
		
		//get selected item
		var sPath = oEvent.getSource().getBindingContext().getPath(); 
		var oObject = this.getView().getModel().getProperty(sPath);
		
		//navigate to detail, giving prodGroupID and prodID (see path in Component.js)
		console.log(oObject.productID)
		this._oRouter.navTo("productDetail",{prodgroupID: this.prodGroupID, prodID: oObject.productID}) 
		
	},
	
	back: function(){
		
		
		this._oRouter.navTo("productOV");
	}

});