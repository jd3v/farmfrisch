jQuery.sap.require("testApp.util.Formatter");

sap.ui.controller("testApp.testlayout.MyPortfolioMaster", {
	
	onInit : function() {

		// get Router
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		this._oRouter.attachRoutePatternMatched(this._handleRouteMatched, this);
		
		//initialize fragments
		this.addNewProd = sap.ui.xmlfragment(
                "testApp.testlayout.fragments.AddNewProduct",
                this.getView().getController() // associate controller with the fragment            
          );	
		
		//associate different model with this fragment's selector
		this.ProductModel =  new sap.ui.model.odata.ODataModel("https://s7hanaxs.hanatrial.ondemand.com/p1914487387trial/jtrial/lunaTrial/services/Products.xsodata", false);
		this.ProductModel.setDefaultCountMode(); 
		console.log(this.ProductModel)
		sap.ui.getCore().byId("productSelect").setModel(this.ProductModel)
		
		
	},
	//used to attach and detach for odata service, helpful for synchronous calls
	odataHandler: function(){
		
		detailController = globalProfileDetailView.getController();		
		var view = globalProfileDetailView.byId("detailPageProfile");
		var firstProduct = sap.ui.getCore().byId("productSelect").getFirstItem().getKey();
		view.insertContent(detailController.prodDescription,1);
		detailController.prodDescription.bindElement("/ProductsProdGroup('"+firstProduct+"')");
		
	},
	

	_handleRouteMatched: function(evt){
		if("myPortfolio" !== evt.getParameter("name")){			
			return;
		}
		
		//using passed instead of global object
		this.farmerID = evt.getParameter("arguments").farmerID;	
		
		var sPath = "/Producers('"+this.farmerID+"')";	
		
		var oModel = this.getView().getModel();
		
		var oContext = new sap.ui.model.Context(oModel, sPath);		
		this.getView().setBindingContext(oContext);			
		
		//Temporary JSON Model
		var jsonModelProducts = new sap.ui.model.json.JSONModel();
		//get first product in list
		var urlForFirstItem = "/Producers('"+this.farmerID+"')/ProducersProducts?$orderby=productID"
		oModel.read(urlForFirstItem, null, null, false, 
	 			function(oData, oResponse)
	 			{	 				
	    	 		jsonModelProducts.setData(oData);    			
	 			},
	 			function()
	 			{
	 				alert("Failed to read Data");
	 	        });
		var firstProductId = jsonModelProducts.oData.results[0].productID;
		
		this._oRouter.navTo("myPortfolioDetail",{farmerID: this.farmerID, prodID: firstProductId});
	},
	
	handleAddProduct: function(){
		
		this.ProductModel.detachRequestCompleted(this.odataHandler,this);
		
		
		detailController = globalProfileDetailView.getController()
		//remove fragments first
		var view = globalProfileDetailView.byId("detailPageProfile");	    		
		view.removeAllContent();

		
		//add prod change fragment
		view.insertContent(this.addNewProd,0);

		var productSelector = sap.ui.getCore().byId("productSelect");
		
		//odata call to product selector model, hard code for 1st product group
		//dynamic call is done once you change the productgroup
		var sPath = "/ProductGroups('PG1')";	
		var oContext = new sap.ui.model.Context(this.ProductModel, sPath);		
		productSelector.setBindingContext(oContext);
		
				
	},	
	
	handleSelectProdGroup: function(){
		
		var productSelector = sap.ui.getCore().byId("productSelect");
		
		var selectedProdGroup = sap.ui.getCore().byId("prodGroupSelect").getSelectedKey();
		
		detailController = globalProfileDetailView.getController()
		//remove fragments first
		var view = globalProfileDetailView.byId("detailPageProfile");
		
		//make model for product selector	
		var sPath = "/ProductGroups('"+selectedProdGroup+"')";	
		var oContext = new sap.ui.model.Context(this.ProductModel, sPath);		
		productSelector.setBindingContext(oContext);
		
		
		
		//done so when product group is changed the first product of that product group is selected
		//have to wait until odata call is done before picking "getFristItem"
		this.ProductModel.attachRequestCompleted(this.odataHandler,this);
		console.log(this.ProductModel)
		
	
	},
	
	handleDeleteProduct: function(oEvent){
		
		that = this; 
		
		var prodList = this.getView().byId("productProfileMasterList");
		
		
		//get selected item
		var sPath = oEvent.getParameters().listItem.getBindingContext().getPath();		
		var oObject = this.getView().getModel().getProperty(sPath);		
		
		var jURL = 'https://s7hanaxs.hanatrial.ondemand.com/p1914487387trial/jtrial/lunaTrial/services/DeleteProduct.xsjs';
	    jQuery.ajax({
	    	
	        url:jURL,	        
	        dataType: 'text',
	        data: {user: loggedInFarmer, prodID: oObject.productID},
	        type: 'GET',
	        success: function(data){
	        
	        	alert("Das Product wurde gelöscht!")
	        	
	    		
	        	
	        	var firstItem  = prodList.getItems()[0]; 	        	
	    		var itemsPath = firstItem.getBindingContext().getPath();	    		
	        	var oObjectItem = that.getView().getModel().getProperty(itemsPath);	
	    		
	        	that._oRouter.navTo("myPortfolioDetail",{farmerID: loggedInFarmer, prodID: oObjectItem.productID});
	        
	        	//refresh bindings
	    		that.getView().getModel().refresh();
	        },
	        error: function(xhr, description, error) { 
	        
	        	console.log(xhr, description, error); },
		
	    });
		
		
		
	},
	
	
	handleInsertProduct: function(){
		
		that = this;
		//selected product
		var selectedProduct = sap.ui.getCore().byId("productSelect").getSelectedKey();
		var newPrice = sap.ui.getCore().byId("newProdPrice").getValue();
		
		//first make sure strings like 123ab don't work
		if(isFinite(newPrice) == false){alert("Geben sie bitte eine Zahl ein als Preis"); return;}
		
		//now make sure whitespace and empty strings don't work
		if (isNaN(parseInt(newPrice)) == true){alert("Geben sie bitte eine Zahl ein als Preis"); return;}
	
		var jURL = 'https://s7hanaxs.hanatrial.ondemand.com/p1914487387trial/jtrial/lunaTrial/services/InsertProduct.xsjs';
	    jQuery.ajax({
	    	
	        url:jURL,	        
	        dataType: 'text',
	        data: {price : newPrice, user: loggedInFarmer, prodID: selectedProduct},
	        type: 'GET',
	        success: function(data){
	        
	        	alert("Ihr Preis wurde geupdated")
	        	
	    		//refresh bindings
	    		that.getView().getModel().refresh();
	        	
	        	that._oRouter.navTo("myPortfolioDetail",{farmerID: loggedInFarmer, prodID: selectedProduct});
	        
	        },
	        error: function(xhr, description, error) { 
	        	alert("Diese Product bieten Sie bereits an!")
	        	console.log(xhr, description, error); },
		
	    });
		
	},
	
	
	
	handleSelectProduct: function(){
		
		//get selected product	
		var selectedProduct = sap.ui.getCore().byId("productSelect").getSelectedKey();
		
		detailController = globalProfileDetailView.getController()
		//remove fragments first
		var view = globalProfileDetailView.byId("detailPageProfile");
		
		view.insertContent(detailController.prodDescription,1);
		
		
		detailController.prodDescription.bindElement("/ProductsProdGroup('"+selectedProduct+"')");		
	},
	
	handleListPress: function(oEvent){
		
		this.ProductModel.detachRequestCompleted(this.odataHandler,this);
		
		var sPath = oEvent.getSource().getBindingContext().getPath(); 
		var oObject = this.getView().getModel().getProperty(sPath);
		
		
		this._oRouter.navTo("myPortfolioDetail",{farmerID: this.farmerID, prodID: oObject.productID});
	
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