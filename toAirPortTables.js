

var from;
var to;
var distance;
var totalF=0 ;
var total=0 ;
var time=0;	
var fare;
var accountType;
var HasError=1;
var GlobaldataSet = [];
var GlobalObjectPosition=-1;


function initializeBody() {

				





}
window.onload = function(){

				
				
				
}
$(document).ready(function(){
		
				
					Parse.initialize("E8ap04MFi10rGpHEHyBW8TLT3iI1dujwz5mctm0D", "Tbb1Ue2xaCGAUR9vOKSlB4KyKFj9qcpaPGGD7wnX");
 //					Parse.User.logOut();
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
				query.equalTo("ServiceType", "To AirPort");
				query.find({
				  success: function(results) {
					alert("Successfully retrieved " + results.length + " Bookings.");



					if (currentUser.get('isAdmin')=="Yes") {
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



						  GlobaldataSet[GlobaldataSet.length]=object;
						  dataSet[dataSet.length]=[i+1+" ",object.get('VehicleType'),object.get('NoOfPassengers'),object.get('LuggageType'),OptionalServices,object.get('Date'),object.get('Time'),object.get('PickUp'),object.get('DropOff'),object.get('SpecialNotes'),object.get('TravelTime'),object.get('Distance'),object.get('TotalFare'),'<a class="btn btn-danger" onclick="Delete('+i+');">Delete</a><a class="btn btn-success" onclick="Copy('+i+');">Re-Book</a><a class="btn btn-primary" onclick="Update('+i+');">Update</a>'];
					  
					 
							}

						}
						else{


							var parent = document.getElementById("parent");
							
							var child1 = document.getElementById("VehicleType");
							var child2 = document.getElementById("SelectedLuggage");
							var child3 = document.getElementById("OptionalServices");
							var child4 = document.getElementById("TimeCell");
							var child5 = document.getElementById("DropOffCell");
							var child6 = document.getElementById("SpecialNotesCell");
							var child7 = document.getElementById("CommuteTime");

							parent.removeChild(child1);
							parent.removeChild(child2);
							parent.removeChild(child3);
							parent.removeChild(child4);
							parent.removeChild(child5);
							parent.removeChild(child6);
							parent.removeChild(child7);

							alert("LPC");

							for (var i = 0; i < results.length; i++) { 
						  var object = results[i];

						  GlobaldataSet[GlobaldataSet.length]=object;
						  dataSet[dataSet.length]=[i+1+" ",object.get('NoOfPassengers'),object.get('Date')+" "+object.get('Time'),object.get('PickUp')+" --- "+object.get('DropOff'),object.get('Distance'),object.get('TotalFare'),'<a class="btn btn-danger" onclick="Delete('+i+');">Delete</a><a class="btn btn-success" onclick="Copy('+i+');">Re-Book</a><a class="btn btn-primary" onclick="Update('+i+');">Update</a>'];
					  
					 
							}
						}



					// Do something with the returned Parse.Object values
					
					
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
function Delete(parameter1) {
	
	alert(" "+GlobaldataSet[parameter1].id+" ");


	var Bookings = Parse.Object.extend("Booking_information");
				var query = new Parse.Query(Bookings);
				query.equalTo("objectId", GlobaldataSet[parameter1].id);
				query.find({
				  success: function(results) {
					
					// Do something with the returned Parse.Object values
					 
					  var object = results[0];
					  object.destroy({
					  success: function(myObject) {
					  	alert("Successfully Deleted booking with id : " + myObject.id );
					  	location.reload();
					    // The object was deleted from the Parse Cloud.
					  },
					  error: function(myObject, error) {
					    // The delete failed.
					    // error is a Parse.Error with an error code and message.
					  }
					});



				
					 
					}
				});

}
function Copy(parameter1) {


	GlobalObjectPosition=parameter1;
		var popup;
        popup = window.open("Popup-Calendar.html", "Popup", "width=300,height=500");
        popup.focus();

}
function Update(parameter1) {


		GlobalObjectPosition=parameter1;
		var popup;
        popup = window.open("Popup-Calendar-Update.html", "Popup", "width=300,height=500");
        popup.focus();




 }
window.somefunction = function(newDate,newTime){
		var Bookings = Parse.Object.extend("Booking_information");
				var query = new Parse.Query(Bookings);
				query.equalTo("objectId", GlobaldataSet[GlobalObjectPosition].id);
				query.find({
				  success: function(results) {
					
					// Do something with the returned Parse.Object values
					 
					  var object = results[0];
					  var newobject = new Bookings();
					  //newobject=object;


					 newobject.set("ChildSeat", object.get("ChildSeat"));
			        newobject.set("Date", newDate);
			        newobject.set("Distance", object.get("Distance"));
			        newobject.set("DropOff", object.get("DropOff"));
			        newobject.set("ExtraLargeItems", object.get("ExtraLargeItems"));
			        newobject.set("LuggageType", object.get("LuggageType"));
			        newobject.set("MeetNGreet", object.get("MeetNGreet"));
			        newobject.set("NightSurcharge", object.get("NightSurcharge"));
			        newobject.set("NoOfBags", object.get("NoOfBags"));
			        newobject.set("NoOfPassengers", object.get("NoOfPassengers"));


			        newobject.set("Pets", object.get("Pets"));
			        newobject.set("PickUp", object.get("PickUp"));
			        newobject.set("SpecialNotes", object.get("SpecialNotes"));
			        newobject.set("TotalFare", object.get("TotalFare"));
			        newobject.set("TravelTime", object.get("TravelTime"));

			        newobject.set("VehicleType", object.get("VehicleType"));
			        
					newobject.set("ServiceType", object.get("ServiceType"));



					  newobject.set("Time", newTime);
						newobject.save(null, {
						  success: function(gameScore) {
						    // Execute any logic that should take place after the object is saved.
						    alert('New object created with objectId: ' + gameScore.id);
						    location.reload();
						  },
						  error: function(gameScore, error) {
						    // Execute any logic that should take place if the save fails.
						    // error is a Parse.Error with an error code and message.
						    alert('Failed to create new object, with error code: ' + error.message);
						  }
						});

					 



				
					 
					}
				});



 }
 window.somefunctionUpdate = function(newDate,newTime){
 	 alert("results");
		var Bookings = Parse.Object.extend("Booking_information");
				var query = new Parse.Query(Bookings);
				query.equalTo("objectId", GlobaldataSet[GlobalObjectPosition].id);
				query.find({
				  success: function(results) {
					
					// Do something with the returned Parse.Object values
					 
					  var object = results[0];
					  var newobject = new Bookings();
					  newobject=object;


					
			        newobject.set("Date", newDate);

					  newobject.set("Time", newTime);
						newobject.save(null, {
						  success: function(gameScore) {
						    // Execute any logic that should take place after the object is saved.
						    alert('Object Updated with objectId: ' + gameScore.id);
						    location.reload();
						  },
						  error: function(gameScore, error) {
						    alert('Failed to Update  object, with error code: ' + error.message);
						  }
						});				 
					}
				});
 }