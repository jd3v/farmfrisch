jQuery.sap.require("testApp.util.Formatter");

sap.ui.controller("testApp.testlayout.FarmDetail", {

	onInit: function() {
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		this._oRouter.attachRoutePatternMatched(this._handleRouteMatched, this);
		
		//global marker variable
		markers = [];
	},
	

	_handleRouteMatched: function(evt){
		if("farmDetail" !== evt.getParameter("name")){			
			return;
		}
		
		this.farmerID = evt.getParameter("arguments").farmerID;	
		
			
		var sPath = "/Producers('"+this.farmerID+"')";	
		
		var oModel = this.getView().getModel();
		
		var oContext = new sap.ui.model.Context(oModel, sPath);		
		this.getView().setBindingContext(oContext);	
		this.initialize_map(sPath);	
		
		setTimeout(function(){
			google.maps.event.trigger(map, "resize");			
		},1000);
	},
	
	navToProdProfile: function(oEvent){
		
		//get selected item
		var sPath = oEvent.getSource().getBindingContext().getPath(); 
		var oObject = this.getView().getModel().getProperty(sPath);
			console.log(oObject.prodID)	
		this._oRouter.navTo("productMaster",{prodgroupID: oObject.prodGroupID}) 
		this._oRouter.navTo("productDetail",{prodgroupID: oObject.prodGroupID, prodID: oObject.productID});
	},
	
	onBeforeShow: function(){
		console.log("on before show")
		  google.maps.event.trigger(map, "resize");
	},
	
initialize_map : function (sPath) {
		
	var oDataModel = this.getView().getModel();
	
	//create temporary jsonModel for Map
	var jsonModelMap = new sap.ui.model.json.JSONModel();
	
	var urlForMap = sPath + "/ProducerLocationsGrouped"
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
	  console.log(locations);
	  /*clean up*/
	  //delete all markers from map
	  for(var i = 0; i < markers.length; i++){
		  markers[i].setMap(null);
	  };
	  //delete markers from array
	  markers = [];
	
		
	        
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
						        map: map,
						        position: new google.maps.LatLng(lat, long),
						        icon: pinImage
						      });
				        
				         var meInfowindow = new google.maps.InfoWindow({content: '<div style="width:150px; height:30px"> Hier bist du! </div>'});
				         
				         google.maps.event.addListener(meMarker, 'click', function() {
				        	    meInfowindow.open(map,meMarker);				        	    
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
	            map: map
	            
	          });
	          markers.push(marker)
	          console.log("initializing markers")
	          google.maps.event.addListener(marker, 'click', (function(marker, i) {
	            return function() {
	              
	              infowindow.setContent('<div style="width:150px; height:50px">'+locations[i].locName+'</div>');
	              infowindow.open(map, marker);
	            }
	          })(marker, i));
	        }
	        console.log("marker")
	      
	        
	},
	
	
	
	
	zoomIntoLoc: function(position){
		
		map.setZoom(15);
		map.panTo(position);
	},	
	
	
	 onAfterRendering: function(){
		
		var mapDiv = this.getView().byId("map_canvas");				
    	mapDiv.addStyleClass("myMap");
    	//initialize map
    	//center of the map
		var  farmerLatLng = [49.4874918,8.5477371];
		var geocoder = new google.maps.Geocoder();
	        var mapOptions = {  
	        	center:  new google.maps.LatLng(farmerLatLng[0], farmerLatLng[1]),  
	            zoom: 12,  
	            mapTypeId: google.maps.MapTypeId.ROADMAP  
        	}; 	
	        var mapDiv = this.getView().byId("map_canvas");
	        var mapRef = mapDiv.getDomRef();
	        console.log(mapRef)
	        if(mapRef == null){return;}
	        map = new google.maps.Map(mapRef, mapOptions);
	        //IMPORTANT
	        window.addEventListener('DOMContentLoaded', function() {
	        	google.maps.event.trigger(map, "resize");
	        	console.log("loaded")
	        }, true);
	      
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

});