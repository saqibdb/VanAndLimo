

var from;
var to;
var distance;
var totalF=0 ;
var total=0 ;
var time=0;	
var fare;
var accountType;
var HasError=1;

function initializeBody() {

				alert("FRFRF");





}
window.onload = function(){

				alert("FRFRF");
				
				
}
$(document).ready(function(){
		
				alert("FRFRF");
					Parse.initialize("E8ap04MFi10rGpHEHyBW8TLT3iI1dujwz5mctm0D", "Tbb1Ue2xaCGAUR9vOKSlB4KyKFj9qcpaPGGD7wnX");
					
 					var currentUser = Parse.User.current();
					
					if (currentUser) {
						// do stuff with the user
						
					} else {
						// show the signup or login page
						window.location.href = 'signin.html';
					}
				
				var dataSet = [];
				var Bookings = Parse.Object.extend("Bookings");
				var query = new Parse.Query(Bookings);
				query.equalTo("UserID", currentUser.id);
				query.find({
				  success: function(results) {
					alert("Successfully retrieved " + results.length + " Bookings.");
					// Do something with the returned Parse.Object values
					for (var i = 0; i < results.length; i++) { 
					  var object = results[i];
					  
					  dataSet[dataSet.length]=[i+1+" ",object.id,object.get('TimeAndDate'),object.get('Locations'),object.get('Payment'),object.get('Status')];
					  
					 
					}
					 $('#dataTables-example').dataTable( {
						"data": dataSet
				
						} );  
				  },
				  error: function(error) {
					alert("Error: " + error.code + " " + error.message);
				  }
				});
				
		



				 
				
				 
				//alert("sdscs");
						});
						
