sap.ui.controller("testApp.testlayout.AnalyticsCustomer", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf testlayout.AnalyticsCustomer
*/
	onInit: function() {
		var jsonString = {
			socialMedia : [ {
				ActivityId : "0",
				Website : "Facebook",
				Postings: "90",
				Icon : "img/facebookLogo.jpg"
			} ,
			
			{
				ActivityId : "1",
				Website : "Twitter",
				Postings: "22",
				Icon : "img/twitterLogo.jpg"
			} ,
		]}
		this.oModel1 = new sap.ui.model.json.JSONModel();
		this.oModel1.setData(jsonString);
	    this.getView().setModel(this.oModel1); // set model to entire Application
	},
	onPress: function (evt) {

		
		   jQuery.sap.require("sap.m.MessageToast");
		   var button = evt.getSource().getId() ;
		   var length = button.length;
		   var offset = length - 7;
		   button = button.substring(offset, length );
		   var element;

		   var reviews5 =[{
				"ReviewId" : "0",
				"Sender" : "Claudia Thomann",
				"Icon" : "img/Customers/Sender1.jpg",
				"Info" : "Request",
				"Timestamp" : "November 11, 2014",
				"Text" :"Die Waren sind super frisch! Auch der nette Plausch am Marktstand wertet einfach jedes Mal wieder meinen Samstagmorgen auf."
			} ,
			
			{
				"ReviewId" : "1",
				"Sender" : "Johanna Schmidt",
				"Icon" : "img/Customers/Sender A.jpg",
				"Info" : "Reply",
				"Timestamp" : "October 10, 2014",
				"Text" :"Das beste Gemüse Mannheims! Wer qualitativ hochwertiges Gemüse oder Zutaten für einen frischen Salat sucht ist hier genau richtig!"
			}

		];
		  
		 		

		var reviews4 =               [{
			"ReviewId" : "0",
			"Sender" : "Carlolin Müller",
			"Icon" : "img/Customers/Sender B.jpg",
			"Info" : "Request",
			"Timestamp" : "August 15, 2014",
			"Text" :"Tolle Waren und nette Mitarbeiter. Als Stammkunde bekommt sogar hin und wieder ein kleines Goodie gratis dazu :)"	
		} ,

		{
			"ReviewId" : "1",
			"Sender" : "Jason Paulheim",
			"Icon" : "img/Customers/Sender C.jpg",
			"Info" : "Reply",
			"Timestamp" : "September 08, 2014",
			"Text" :"Zuverlässige Qualität!"	
		}

		];	

		var reviews3 = [{
			"ReviewId" : "0",
			"Sender" : "Kathy Uhlmann",
			"Icon" : "img/Customers/Sender A.jpg",
			"Info" : "Request",
			"Timestamp" : "March 03, 2013",
			"Text" :"Vielen Dank."	
		} ,

		{
			"ReviewId" : "1",
			"Sender" : "Ching Chong",
			"Icon" : "img/Customers/Sender D.jpg",
			"Info" : "Reply",
			"Timestamp" : "March 04, 2013",
			"Text" :"Letztes Mal hatte ich etwas Pech mit meinen Äpfeln, einer war schon angefault. Wenigstens ist es ein Indiz für die biologische Anbauweise und den Verzicht auf Pestizide ;)"	
		}

		];	

		var reviews2        =        [{
			"ReviewId" : "0",
			"Sender" : "David Meyer",
			"Icon" : "img/Customers/Sender C.jpg",
			"Info" : "Request",
			"Timestamp" : "March 03, 2013",
			"Text" :"Ich war nicht zufrieden mit der Auswahl. Außerdem entsprach der Preis nicht dem angegebenen. Hier bitte in Zukunft mehr Sorgfalt walten lassen."	
		}];
		
		 var reviews1 = [{
				"ReviewId" : "0",
				"Sender" : "Anna Bitter",
				"Icon" : "img/Customers/Sender B.jpg",
				"Info" : "Request",
				"Timestamp" : "March 03, 2013",
				"Text" :"Das Angebot entsprach leider nicht den Informationen auf ihrem Portfolio, bitte in Zukunft hier etwas mehr aufpassen! :("	
			}];
		  

		switch (button)
		   {
		     case "Button1": reviews = reviews5 ;break;
		     case "Button2": reviews = reviews4 ;break;
		     case "Button3": reviews = reviews3 ;break;
		     case "Button4": reviews = reviews2 ;break;
		     case "Button5": reviews = reviews1 ;break;
		
		   }	
		   
		   var model = new sap.ui.model.json.JSONModel(reviews);
		   
		   
			   if (! this._oPopover) {
				      this._oPopover = sap.ui.xmlfragment("testApp.testlayout.fragments.Popover", this);
				      this.getView().addDependent(this._oPopover);
				     
				      
			      
			   }
			   
			   this._oPopover.setModel(model);
			   var oButton = evt.getSource();
			   this._oPopover.openBy(oButton);
			   

			    
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
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf testlayout.AnalyticsCustomer
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf testlayout.AnalyticsCustomer
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf testlayout.AnalyticsCustomer
*/
//	onExit: function() {
//
//	}

});