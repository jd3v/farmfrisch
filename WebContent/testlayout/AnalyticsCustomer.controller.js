sap.ui.controller("testApp.testlayout.AnalyticsCustomer", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf testlayout.AnalyticsCustomer
*/
//	onInit: function() {
//
//	},
	onPress: function (evt) {

		
		   jQuery.sap.require("sap.m.MessageToast");
		   var button = evt.getSource().getId() ;
		   var element;

		   var reviews5 =[{
				"ReviewId" : "0",
				"Sender" : "Giselle Ashante-Ramirez",
				"Icon" : "img/Customers/Sender1.jpg",
				"Info" : "Request",
				"Timestamp" : "November 11, 2014",
				"Text" :"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat. At vero eos et accusam et justo duo dolores et ea rebum."	
			} ,
			
			{
				"ReviewId" : "1",
				"Sender" : "johannes Schaffensteiger",
				"Icon" : "img/Customers/Sender2.jpg",
				"Info" : "Reply",
				"Timestamp" : "October 10, 2014",
				"Text" :"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat. At vero eos et accusam et justo duo dolores et ea rebum."	
			}

		];
		  
		 		

		var reviews4 =               [{
			"ReviewId" : "0",
			"Sender" : "Sender A",
			"Icon" : "img/Customers/Sender A.jpg",
			"Info" : "Request",
			"Timestamp" : "August 15, 2014",
			"Text" :"Review for 4 Stars"	
		} ,

		{
			"ReviewId" : "1",
			"Sender" : "Sender B",
			"Icon" : "img/Customers/Sender B.jpg",
			"Info" : "Reply",
			"Timestamp" : "September 08, 2014",
			"Text" :"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat. At vero eos et accusam et justo duo dolores et ea rebum."	
		}

		];	

		var reviews3 = [{
			"ReviewId" : "0",
			"Sender" : "Sender C",
			"Icon" : "img/Customers/Sender C.jpg",
			"Info" : "Request",
			"Timestamp" : "March 03, 2013",
			"Text" :"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat. At vero eos et accusam et justo duo dolores et ea rebum."	
		} ,

		{
			"ReviewId" : "1",
			"Sender" : "Sender D",
			"Icon" : "img/Customers/Sender D.jpg",
			"Info" : "Reply",
			"Timestamp" : "March 04, 2013",
			"Text" :"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat. At vero eos et accusam et justo duo dolores et ea rebum."	
		}

		];	

		var reviews2        =        [{
			"ReviewId" : "0",
			"Sender" : "Sender E",
			"Icon" : "img/Customers/Sender1.jpg",
			"Info" : "Request",
			"Timestamp" : "March 03, 2013",
			"Text" :"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat. At vero eos et accusam et justo duo dolores et ea rebum."	
		} ,

		{
			"ReviewId" : "1",
			"Sender" : "Sender F",
			"Icon" : "img/Customers/Sender2.jpg",
			"Info" : "Reply",
			"Timestamp" : "March 04, 2013",
			"Text" :"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat. At vero eos et accusam et justo duo dolores et ea rebum."	
		}];
		
		 var reviews1 = [{
				"ReviewId" : "0",
				"Sender" : "Sender G",
				"Icon" : "img/Customers/Sender1.jpg",
				"Info" : "Request",
				"Timestamp" : "March 03, 2013",
				"Text" :"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat. At vero eos et accusam et justo duo dolores et ea rebum."	
			} ,

			{
				"ReviewId" : "1",
				"Sender" : "Sender H",
				"Icon" : "img/Customers/Sender2.jpg",
				"Info" : "Reply",
				"Timestamp" : "March 04, 2013",
				"Text" :"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat. At vero eos et accusam et justo duo dolores et ea rebum."	
			}];
		  

		switch (button)
		   {
		     case "__button0": reviews = reviews5 ;break;
		     case "__button1": reviews = reviews4 ;break;
		     case "__button2": reviews = reviews3 ;break;
		     case "__button3": reviews = reviews2 ;break;
		     case "__button4": reviews = reviews1 ;break;
		
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