sap.ui.controller("testApp.testlayout.AnalyticsMaster", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf testlayout.AnalyticsMaster
	 */
	onInit : function() {

		// get Router
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		this._oRouter.attachRoutePatternMatched(this._handleRouteMatched, this);
		// Local ListModel
		var jsonString = {
			ListItems : [ {
				listId : "0",
				listName : "Übersicht",
				navLink: "analyticsGeneral"
			}, {
				listId : "1",
				listName : "Produkte",
				navLink: "analyticsProducts"
			}, {
				listId : "2",
				listName : "Kunden",
				navLink: "analyticsCustomer"
			} ]
		};
		this.listModel = new sap.ui.model.json.JSONModel();
		this.listModel.setData(jsonString);
		this.getView().setModel(this.listModel);
	},
	
	_handleRouteMatched: function(evt){
		
		if("analyticsMaster" !== evt.getParameter("name")){			
			
			return;
		}
		
		
		
		//navigate
		this._oRouter.navTo("analyticsGeneral");
	},
	
	navigateToDetail: function(oEvent){
		
		var item = oEvent.getParameter("listItem");		
		var sPath = item.getBindingContext().getPath(); 		
		var oObject = this.getView().getModel().getProperty(sPath);		
		this._oRouter.navTo(oObject.navLink);
	},
	
back: function() {
		
		this._oRouter.navTo("_index");
		
	}

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf testlayout.AnalyticsMaster
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf testlayout.AnalyticsMaster
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf testlayout.AnalyticsMaster
 */
// onExit: function() {
//
// }
});