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
		if (!localUsername){alert("Username ist nicht korrekt"); return;}
		if (!localPassword){alert("Password ist nicht korrekt"); return;}
		
		var jURL = 'https://s7hanaxs.hanatrial.ondemand.com/p1914487387trial/jtrial/lunaTrial/services/userLogon.xsjs';
	    jQuery.ajax({
	        url:jURL,
	        //jsonpCallback: 'myCallback',
	        dataType: 'json',
	        data: {uName : localUsername, PW: localPassword},
	        type: 'GET',
	        success: function(data){
	        	
	        	if(data.username == "none")
	        		{alert("This User / Password Kombination existiert nicht")}
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
		loggedInFarmer = data.farmerID;
		profilePic = data.profilePic
		
		//set button invisible for all footers		
		
		var sButtonIdDetail = globalMainView.getId() + "--footerProfileBtn"		
		console.log(sButtonIdDetail)
		sap.ui.getCore().byId(sButtonIdDetail).setVisible(true);
		
		sap.ui.getCore().byId("Shell").getUser().setUsername(username)
		sap.ui.getCore().byId("Shell").getUser().setImage(profilePic)
		
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