sap.ui.controller("testApp.testlayout.AnalyticsProducts", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf piechartmulti.main
	 */
	onInit : function() {

		var jsonString = {
			Fruits : [ {
				ProductId : "0",
				Product : "Kirschen",
				Visits : "10",
				UniqueVisits : "88",
				AverageRating : "3.52"
			}, {
				ProductId : "1",
				Product : "Äpfel",
				Visits : "240",
				UniqueVisits : "100",
				AverageRating : "4.52"
			}, {
				ProductId : "2",
				Product : "Bananen",
				Visits : "500",
				UniqueVisits : "200",
				AverageRating : "4.11"
			} ],
			DataSets : [ {
				dataSetId : "d1",
				name : "Seitenaufrufe"

			}, {
				dataSetId : "d2",
				name : "Indiv. Seitenaufrufe"

			}, {
				dataSetId : "d3",
				name : "Durchschnittsbewertung"

			} ],
			Table : [ {
				ProductGroup : "Apfel",
				Product : "Pink Lady, 6",
				Visitors : "2032",
				UniqueVisitors : "960",
				Price: "1.20",
				Currency: "EUR"
			}, {
				ProductGroup : "Apfel",
				Product : "Arlet, 6",
				Visitors : "1232",
				UniqueVisitors : "920",
					Price: "1.85",
					Currency: "EUR"
			}, {
				ProductGroup : "Apfel",
				Product : "Brettacher, 6",
				Visitors : "500",
				UniqueVisitors : "124",
				Price: "2.30",
				Currency: "EUR"
			}, {
				ProductGroup : "Apfel",
				Product : "Boskop, 6",
				Visitors : "990",
				UniqueVisitors : "321",
				Price: "3.20",
				Currency: "EUR"
			},
			{
				ProductGroup : "Milch",
				Product : "Fettarme Milch, 1 Liter",
				Visitors : "990",
				UniqueVisitors : "321",
				Price: "1.22",
				Currency: "EUR"
			} ,
			{
				ProductGroup : "Milch",
				Product : "Vollmilch, 1 Liter",
				Visitors : "990",
				UniqueVisitors : "321",
				Price: "1.45",
				Currency: "EUR"
			},
			{
				ProductGroup : "Milch",
				Product : "Vollmilch 1.5% Fett, 1 Liter",
				Visitors : "1090",
				UniqueVisitors : "621",
				Price: "2.45",
				Currency: "EUR"
			}]

		};
		this.oModel1 = new sap.ui.model.json.JSONModel();
		this.oModel1.setData(jsonString);
		this.getView().setModel(this.oModel1); // set Model to this view only

		// data set
		var dataset1 = new sap.viz.ui5.data.FlattenedDataset("d1", {

			dimensions : [ {
				axis : 1,
				name : 'Obst',
				value : "{Product}"
			} ],

			measures : [ {
				name : 'Seitenaufrufe',
				value : '{Visits}'
			} ],

			data : {
				path : "/Fruits"
			}
		});
		var dataset2 = new sap.viz.ui5.data.FlattenedDataset("d2", {

			dimensions : [ {
				axis : 1,
				name : 'Obst',
				value : "{Product}"
			} ],

			measures : [ {
				name : 'Individuelle Seitenaufrufe',
				value : '{UniqueVisits}'
			} ],

			data : {
				path : "/Fruits"
			}

		});
		var dataset3 = new sap.viz.ui5.data.FlattenedDataset("d3", {

			dimensions : [ {
				axis : 1,
				name : 'Obst',
				value : "{Product}"
			} ],

			measures : [ {
				name : 'Durchschnittsbewertung',
				value : '{AverageRating}'
			} ],

			data : {
				path : "/Fruits"
			}

		});
		console.log(this.getView().byId("xmlPie"))
		this.getView().byId("xmlPie").setTitle(new sap.viz.ui5.types.Title({
			text : "Obst im Überblick",
			visible : true
		}))
		this.getView().byId("xmlPie").setDataset(dataset1)
	},

	onChange : function() {

		var key = this.getView().byId("select").getSelectedItem().getKey()
		var selectedDataSet = sap.ui.getCore().byId(key);
		this.getView().byId("xmlPie").setDataset(selectedDataSet)

	},

	openDialog : function() {

		if (!this.helpDialog) {
			this.helpDialog = sap.ui.xmlfragment(
					"testApp.testlayout.fragments.HelpDialog", this);
		}
		this.helpDialog.open()
	},

	onMsgDialogPress : function(oEvent) {
		console.log("hi")
		this.openDialog();
	},

	onDialogCloseButton : function(oEvent) {
		this.helpDialog.close();
	}

});