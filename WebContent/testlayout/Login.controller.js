sap.ui.controller("testApp.testlayout.Login", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf testlayout.Main
*/
	onInit: function() {
		
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
	
	},
	
	handleLogon: function(){
		
		that = this;
		
		var localUsername = this.getView().byId("userNameField").getValue();
		var localPassword = this.getView().byId("passwordField").getValue();
		
		//simple validation
		if (!localUsername){alert("Please insert your username"); return;}
		if (!localPassword){alert("Please insert your password"); return;}
		
		var jURL = 'https://s7hanaxs.hanatrial.ondemand.com/p1914487387trial/jtrial/lunaTrial/services/userLogon.xsjs';
	    jQuery.ajax({
	        url:jURL,
	        //jsonpCallback: 'myCallback',
	        dataType: 'json',
	        data: {uName : localUsername, PW: localPassword},
	        type: 'GET',
	        success: function(data){
	        	console.log(data.username)
	        	if(data.username == "none")
	        		{alert("This User / Password Combination does not exist")}
	        	//console.log(jQuery.parseJSON( data ));
	        	else {that.handleSuccessLogon(data);}
	        
	        },
	        error: function(xhr, description, error) { console.log(xhr, description, error); },
		
	    });
	    
	    var localUsername = this.getView().byId("userNameField").setValue("");
		var localPassword = this.getView().byId("passwordField").setValue("");
	    
	    
	},
		
	handleSuccessLogon: function(data){
		
		//set global login state
		username = data.username;
		type = data.type;
		
		//set button invisible for all footers		
		
		var sButtonIdDetail = globalMainView.getId() + "--footerProfileBtn"		
		console.log(sButtonIdDetail)
		sap.ui.getCore().byId(sButtonIdDetail).setVisible(true);
		
		sap.ui.getCore().byId("Shell").getUser().setUsername(username)
		
		this._oRouter.navTo("_index");
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
	}


});