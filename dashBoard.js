

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
				var Bookings = Parse.Object.extend("User");
				var query = new Parse.Query(Bookings);
				query.find({
				  success: function(results) {
					alert("Successfully retrieved " + results.length + " Users.");

 					Counts("Bookings");
 					Counts("Feedbacks");
 					Counts("Booking_information");





						  for (var i = 0; i < results.length; i++) { 
							  var object = results[i];
							  
							  GlobaldataSet[GlobaldataSet.length]=object;
							  dataSet[dataSet.length]=[i+1+" ",object.get('accountType'),object.get('email'),object.get('MobileNumber'),object.get('HomeNumber'),'<a class="btn btn-danger" onclick="Delete('+i+');">Remove</a><a class="btn btn-primary" onclick="Update('+i+');">Update</a>'];
					  
					 
							}		
					 $('#dataTables-example').dataTable( {
						"data": dataSet
				
						} );  
				  },
				  error: function(error) {
					alert("Error: " + error.code + " " + error.message);
				  }
				});
						







						});
function Counts(table) {
				var Bookings = Parse.Object.extend(table);
				var query = new Parse.Query(Bookings);
				query.find({
				  success: function(results) {
					var Label = document.getElementById(table+"CountLablel");
					Label.innerHTML = results.length + "";

				  },
				  error: function(error) {
					alert("Error: " + error.code + " " + error.message);
				  }
				});
			

}
function Delete(parameter1) {
	
	alert(" "+GlobaldataSet[parameter1].id+" ");


	var Bookings = Parse.Object.extend("User");
				var query = new Parse.Query(Bookings);
				query.equalTo("objectId", GlobaldataSet[parameter1].id);
				query.find({
				  success: function(results) {
					
					// Do something with the returned Parse.Object values
					 
					  var object = results[0];
					  object.destroy({
					  success: function(myObject) {
					  	alert("Successfully Deleted User with id : " + myObject.id );
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

function Update(parameter1) {


		GlobalObjectPosition=parameter1;
		var popup;
        popup = window.open("Popup-User-Update.html", "Popup", "width=500,height=700");
			popup.document.getElementById("inputLastName").value = "wdwd";
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
						    // Execute any logic that should take place if the save fails.
						    // error is a Parse.Error with an error code and message.
						    alert('Failed to Update  object, with error code: ' + error.message);
						  }
						});				 
					}
				});
 }

 function SendSMS(){


				Parse.Cloud.run('SMSWithTwilio', {number : '+923115761376' , msgBody : 'AOA Sufyan'}, {
			  success: function(result) {
			  		alert ("SMS Sent"+result );
			    // result is 'Hello world!'
			  },
			  error: function(error) {
			  	alert ("SMS not sent, some issue"+error.message + "");
			  }
				});
 }