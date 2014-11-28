jQuery.sap.declare("testApp.util.Formatter");



testApp.util.Formatter = {
	
	
	Quantity :  function (value) {
		try {
			return (value) ? parseFloat(value).toFixed(2) : value;
		} catch (err) {
			return "Not-A-Number";
		}
	},
	
	CurrencyEuro :  function (value) {
		try {
			return (value) ? parseFloat(value).toFixed(2) + '€' : value;
		} catch (err) {
			return "Not-A-Number";
		}
	},
	
	Percentage: function(value){ 
	try {
			return (value) ? parseInt(value) + '%' : value;
		} catch (err) {
			return "Not-A-Number";
		}
	}
};