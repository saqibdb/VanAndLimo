

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

				





}
window.onload = function(){

				
				
				
}
$(document).ready(function(){
		
				
					Parse.initialize("E8ap04MFi10rGpHEHyBW8TLT3iI1dujwz5mctm0D", "Tbb1Ue2xaCGAUR9vOKSlB4KyKFj9qcpaPGGD7wnX");
					
 					var currentUser = Parse.User.current();
					
					if (currentUser) {
						// do stuff with the user
						
					} else {
						// show the signup or login page
						window.location.href = 'signin.html';
					}
				
				var dataSet = [];
				var Bookings = Parse.Object.extend("Booking_information");
				var query = new Parse.Query(Bookings);
				query.equalTo("ServiceType", "Point to Point");
				query.find({
				  success: function(results) {
					alert("Successfully retrieved " + results.length + " Bookings.");
					// Do something with the returned Parse.Object values
					for (var i = 0; i < results.length; i++) { 
					  var object = results[i];
					  var OptionalServices="";

					  if(object.get('MeetNGreet')=="Yes"){
							OptionalServices=OptionalServices+"MeetNGreet";
					  }
					  if(object.get('Pets')=="Yes"){
							OptionalServices=OptionalServices+" Pets";
					  }
					  if(object.get('ExtraLargeItems')=="Yes"){
							OptionalServices=OptionalServices+" ExtraLargeItems";
					  }
					  if(object.get('NightSurcharge')=="Yes"){
							OptionalServices=OptionalServices+" NightSurcharge";
					  }
					  if(object.get('ChildSeat')=="Yes"){
							OptionalServices=OptionalServices+" ChildSeat";
					  }
					  
					  dataSet[dataSet.length]=[i+1+" ",object.get('VehicleType'),object.get('NoOfPassengers'),object.get('LuggageType'),OptionalServices,object.get('Date'),object.get('Time'),object.get('PickUp'),object.get('DropOff'),object.get('SpecialNotes'),object.get('TravelTime'),object.get('Distance'),object.get('TotalFare')];
					  
					 
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
						
