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
	
	Available: function(value){ 
	try {
			return (value) ? value = "Verfügbar": value = "";
		} catch (err) {
			return "Not-A-Sting";
		}
	}
};