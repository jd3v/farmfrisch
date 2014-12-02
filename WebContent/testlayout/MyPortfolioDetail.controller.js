jQuery.sap.require("testApp.util.Formatter");

sap.ui.controller("testApp.testlayout.MyPortfolioDetail", {

	onInit: function() {
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		this._oRouter.attachRoutePatternMatched(this._handleRouteMatched, this);
		
		//define global variable for markers in product map
		markersProd = []; 
		
		//initialize fragments
		this.displayProd = sap.ui.xmlfragment(
                "testApp.testlayout.fragments.DisplayProd",
                this.getView().getController() // associate controller with the fragment            
          );	
		
		this.changeProd = sap.ui.xmlfragment(
                "testApp.testlayout.fragments.ChangeProd",
                this.getView().getController() // associate controller with the fragment            
          );
		
		this.prodDescription = sap.ui.xmlfragment(
                "testApp.testlayout.fragments.ProdDescription",
                this.getView().getController() // associate controller with the fragment            
          );
		
		globalProfileDetailView = this.getView();

		
	},	
	

	_handleRouteMatched: function(evt){			
		
		
		if("myPortfolioDetail" !== evt.getParameter("name")){
			
			return;
		}	
		console.log("inhandleroutemached")
		//remove change content
		var view = this.getView().byId("detailPageProfile");		
		view.removeAllContent();
		
		this.getView().byId("detailPageProfile").insertContent(this.displayProd,0);
		this.getView().byId("detailPageProfile").insertContent(this.prodDescription,1);
		
		this.prodID = evt.getParameter("arguments").prodID;
		this.farmerID = evt.getParameter("arguments").farmerID;
//		//specific bind for object header otherwise odata will not integrate this binding

		//set bindings
		this.setBindings();

	},
	
	setBindings: function(){
		
		var productForm = sap.ui.getCore().byId("facetOverview");
		var productChange = sap.ui.getCore().byId("facetOverviewChange");
		var productDescr = sap.ui.getCore().byId("facetOverviewDescr");
		
		
		productForm.bindElement("/ProducersProducts(producerID='"+this.farmerID+"',productID='"+this.prodID+"')");	
		productDescr.bindElement("/ProductsProdGroup('"+this.prodID+"')");			
		productChange.bindElement("/ProductsProdGroup('"+this.prodID+"')");
		
	},
	
	handleEditPress: function(){
		
		var view = this.getView().byId("detailPageProfile");		
		
		view.removeContent("facetOverview");
		view.insertContent(this.changeProd,0);
		
	},
	
	handleDonePress: function(){
		
		//used in success function
		that = this;
		
		//get new price and validate		
		var newPrice = sap.ui.getCore().byId("priceInputId").getValue();		
		
		//first make sure strings like 123ab don't work
		if(isFinite(newPrice) == false){alert("Geben sie bitte eine Zahl ein als Preis"); return;}
		
		//now make sure whitespace and empty strings don't work
		if (isNaN(parseInt(newPrice)) == true){alert("Geben sie bitte eine Zahl ein als Preis"); return;}
		
		//call service to update new price in the database
		var jURL = 'https://s7hanaxs.hanatrial.ondemand.com/p1914487387trial/jtrial/lunaTrial/services/UpdateProduct.xsjs';
	    jQuery.ajax({
	        url:jURL,	        
	        dataType: 'text',
	        data: {price : newPrice, user: this.farmerID, prodID: this.prodID },
	        type: 'GET',
	        success: function(data){
	        
	        	alert("Ihr Preis wurde geupdated")
	        	var view = that.getView().byId("detailPageProfile");	    		
	    		view.removeContent("facetOverviewChange");
	    		view.insertContent(that.displayProd,0);
	    		
	    		//set value back to empty
	    		sap.ui.getCore().byId("priceInputId").setValue("")
	    		//refresh bindings
	    		that.getView().getModel().refresh();
	        
	        },
	        error: function(xhr, description, error) { console.log(xhr, description, error); },
		
	    });
		
		
		
		
	},
	
	
	
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