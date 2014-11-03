sap.ui.controller("testApp.testlayout.ProductDetail", {

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
		
		
		var sPath = "/Farmfrisch/ProductGroups/"+this.prodGroupID+"/product/"+this.prodID;	
		
		var oModel = this.getView().getModel();		
		
		var oContext = new sap.ui.model.Context(oModel, sPath);		
		this.getView().setBindingContext(oContext);	
		
		this.initialize_map();

	},
	
	initialize_map : function () {
		
		
		  
		  /*clean up*/
		  //delete all markers from map
		  for(var i = 0; i < markersProd.length; i++){
			  markersProd[i].setMap(null);
		  };
		  //delete markers from array
		  markersProd = [];
		
			//get Model
			var oModel = this.getView().getModel();	
			var locations = oModel.oData.Farmfrisch.ProductGroups[this.prodGroupID].product[this.prodID].locations;
		      console.log(locations)  
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
					        
					         var meInfowindow = new google.maps.InfoWindow({content: 'Your location'});
					         
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
		              
		              infowindow.setContent('<div style="width:150px; height:60px">'+locations[i].locName+'</div>');
		              infowindow.open(mapProduct, marker);
		            }
		          })(marker, i));
		        }
		       
		      
		        
		},
	
	
	navBack: function(){
		
		this._oRouter.navTo("_index") 
	},
	
navToFarmerProfile: function(oEvent){

	if (window.map !== undefined) {
		console.log(map)
		google.maps.event.trigger(map, "resize");
	}
	
		//get selected item
		var sPath = oEvent.getSource().getBindingContext().getPath(); 
		var oObject = this.getView().getModel().getProperty(sPath);
			console.log(oObject.prodID)	
		
		this._oRouter.navTo("farmMaster",{farmerID: oObject.farmerID}) 
		this._oRouter.navTo("farmDetail",{farmerID: oObject.farmerID});
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
	}

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf testlayout.Detail
*/
//	onExit: function() {
//
//	}

});