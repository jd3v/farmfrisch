sap.ui.controller("testApp.testlayout.MyPortfolioDetail", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf testlayout.Detail
*/
	onInit: function() {
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		this._oRouter.attachRoutePatternMatched(this._handleRouteMatched, this);
		
		//define global variable for markers in product map
		markersProd = []; 
	},
	

	_handleRouteMatched: function(evt){
		
		
		if("productDetail" !== evt.getParameter("name")){
			
			return;
		}
		console.log("test")
		this.prodGroupID = evt.getParameter("arguments").prodgroupID;
		this.prodID = evt.getParameter("arguments").prodID;
		
		//specific bind for object header otherwise odata will not integrate this binding
		//get objectheader
		var objectHeader = this.getView().byId("productProfileObjectHeader");
		objectHeader.bindElement("/Products('"+this.prodID+"')")	
		
		//set binding for rest of the detail page
		var sPath = "/Products('"+this.prodID+"')";		
		
		var oModel = this.getView().getModel();		
		
		var oContext = new sap.ui.model.Context(oModel, sPath);		
		this.getView().setBindingContext(oContext);	
		console.log(oContext)
		this.initialize_map(sPath);
		
		setTimeout(function(){
			google.maps.event.trigger(mapProduct, "resize");			
		},1000);

	},
	
	initialize_map : function (sPath) {
		
		var oDataModel = this.getView().getModel();
		
		//create temporary jsonModel for Map
		var jsonModelMap = new sap.ui.model.json.JSONModel();
		
		var urlForMap = sPath + "/ProductMap"
		oDataModel.read(urlForMap, null, null, false, 
	 			function(oData, oResponse)
	 			{	 				
	    	 		jsonModelMap.setData(oData);    			
	 			},
	 			function()
	 			{
	 				alert("Failed to read Data");
	 	        });
		
			var locations = jsonModelMap.oData.results;
		
		  /*clean up*/
		  //delete all markers from map
		  for(var i = 0; i < markersProd.length; i++){
			  markersProd[i].setMap(null);
		  };
		  //delete markers from array
		  markersProd = [];
		
			
		        //initialize geoloc marker
		      //Get GeoLoc
				 if(navigator.geolocation) {
					    navigator.geolocation.getCurrentPosition(function(position) {
					      
					    	//currently globals, change...
					    	 var lat = position.coords.latitude;
					         var long = position.coords.longitude;
					        
					         var pinColor = "009ACD"
					         var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor)
					         var meMarker = new google.maps.Marker({
							        map: mapProduct,
							        position: new google.maps.LatLng(lat, long),
							        icon: pinImage
							      });
					        
					         var meInfowindow = new google.maps.InfoWindow({content:'<div style="width:150px; height:30px"> Hier bist du! </div>'});
					         
					         google.maps.event.addListener(meMarker, 'click', function() {
					        	    meInfowindow.open(mapProduct,meMarker);				        	    
					        	  });
					        
						        
					    }, function() {
					      alert("Geolocation failed")
					      
					      
					    }
					    
					    );
					  } else {
					    // Browser doesn't support Geolocation
					    alert("Your browser has no geolocation services");
					  };

			
				
		        //initialize other markers
				var infowindow = new google.maps.InfoWindow({maxWidth: 500});
		        var marker, i;
		      
		        for (i = 0; i < locations.length; i++) {  
		          marker = new google.maps.Marker({
		            position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
		            map: mapProduct
		            
		          });
		          markersProd.push(marker)
		          console.log("initializing markers")
		          google.maps.event.addListener(marker, 'click', (function(marker, i) {
		            return function() {
		              
		              infowindow.setContent('<div style="width:150px; height:60px">'+locations[i].locName+'</br>'+"Farmer: "+ locations[i].surname + "," + locations[i].lastname+'</div>');
		              infowindow.open(mapProduct, marker);
		            }
		          })(marker, i));
		        }
		       
		      
		        
	},
	
	navToFarmerProfile: function(oEvent){
	
		//get selected item
		var sPath = oEvent.getSource().getBindingContext().getPath(); 
		var oObject = this.getView().getModel().getProperty(sPath);
			
		
		this._oRouter.navTo("farmMaster",{farmerID: oObject.producerID}) 
		this._oRouter.navTo("farmDetail",{farmerID: oObject.producerID});
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf testlayout.Detail
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf testlayout.Detail
*/
onAfterRendering: function(){
		
		var mapDiv = this.getView().byId("map_canvas");				
    	mapDiv.addStyleClass("myMap");
    	//initialize map
		var  farmerLatLng = [49.4874918,8.5477371];
		var geocoder = new google.maps.Geocoder();
	        var mapOptions = {  
	        	center:  new google.maps.LatLng(farmerLatLng[0], farmerLatLng[1]),  
	            zoom: 11,  
	            mapTypeId: google.maps.MapTypeId.ROADMAP  
        	}; 	
	        var mapDiv = this.getView().byId("map_canvas");
	        var mapRef = mapDiv.getDomRef();
	        console.log(mapRef)
	        if(mapRef == null){return;}
	        mapProduct = new google.maps.Map(mapRef, mapOptions);
	        //IMPORTANT
	        google.maps.event.trigger(mapProduct, "resize");
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