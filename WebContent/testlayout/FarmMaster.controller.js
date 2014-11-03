sap.ui.controller("testApp.testlayout.FarmMaster", {

	onInit: function() {
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		this._oRouter.attachRoutePatternMatched(this._handleRouteMatched, this);
	},
	

	_handleRouteMatched: function(evt){
		
		if("farmMaster" !== evt.getParameter("name")){			
			
			return;
		}
		
		this.farmerID = evt.getParameter("arguments").farmerID;	
		
		
		var sPath = "/Farmfrisch/Farmers/"+this.farmerID;	
		
		var oModel = this.getView().getModel();
		
		var oContext = new sap.ui.model.Context(oModel, sPath);		
		this.getView().setBindingContext(oContext);	
		
		 
		var oObject = this.getView().getModel().getProperty(sPath);
		console.log(oObject)
		
		//have to navigate to detail view so it also gets the binding context or updates it, note: same URI does not work
		this._oRouter.navTo("farmDetail",{farmerID: this.farmerID});
	},
	
//	navToProdProfile: function(oEvent){
//		
//		//get selected item
//		var sPath = oEvent.getSource().getBindingContext().getPath(); 
//		var oObject = this.getView().getModel().getProperty(sPath);
//		
//		//navigate to detail, giving prodGroupID and prodID (see path in Component.js)
//		this._oRouter.navTo("productDetail",{prodgroupID: this.prodGroupID, prodID: oObject.prodID}) 
//		
//	},
	markLoc: function(oEvent){
		
		var sPath = oEvent.getSource().getBindingContext().getPath(); 
		var oObject = this.getView().getModel().getProperty(sPath);
		
		var position = {lat: parseFloat(oObject.lat), lng: parseFloat(oObject.lng)}
		var test ={lat: 49.4882017, lng: 8.4661298};
		sap.ui.controller("testApp.testlayout.FarmDetail").zoomIntoLoc(position);
		
	},
	
	
	back: function(){
		
		
		this._oRouter.navTo("farmersOV");
	}

});