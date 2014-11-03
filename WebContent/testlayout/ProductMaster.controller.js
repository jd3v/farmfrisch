sap.ui.controller("testApp.testlayout.ProductMaster", {

	
	
	onInit: function() {
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		this._oRouter.attachRoutePatternMatched(this._handleRouteMatched, this);
	},
	

	_handleRouteMatched: function(evt){
		if("productMaster" !== evt.getParameter("name")){			
			return;
		}
		
		this.prodGroupID = evt.getParameter("arguments").prodgroupID;	
		
		var sPath = "/Farmfrisch/ProductGroups/"+this.prodGroupID+"";	
		
		var oModel = this.getView().getModel();
		
		var oContext = new sap.ui.model.Context(oModel, sPath);		
		this.getView().setBindingContext(oContext);	
		
		//make sure the detail page always displays the first item in the master list
		//this._oRouter.navTo("productDetail",{prodgroupID: this.prodGroupID, prodID: "0"});
	},
	
	navToProdProfile: function(oEvent){
		
		//get selected item
		var sPath = oEvent.getSource().getBindingContext().getPath(); 
		var oObject = this.getView().getModel().getProperty(sPath);
		
		//navigate to detail, giving prodGroupID and prodID (see path in Component.js)
		console.log(oObject.prodID)
		this._oRouter.navTo("productDetail",{prodgroupID: this.prodGroupID, prodID: oObject.prodID}) 
		
	},
	
	back: function(){
		
		
		this._oRouter.navTo("productOV");
	}

});