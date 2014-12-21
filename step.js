

var react_time = 0;
var x_accuracy = 0;
var y_accuracy = 0;

var stepper = 1;
var slider;
window.onload = initializeBody;

var BusinessBox;
var IntersectionBox;
var StreetBox;
var CityBox;

var directionsDisplay;
var directionsService;
var map;

var from;
var to;
var distance;
var totalF=0 ;
var total=0 ;
var time=0;	
var fare;

function initializeBody() {
	
								 BusinessBox = document.getElementById("inpBusinessp");
								IntersectionBox = document.getElementById("inpIntersectionp");
								StreetBox = document.getElementById("inpStreetp");
								CityBox = document.getElementById("inpCityp");
								  BusinessBox.remove();
									IntersectionBox.remove();
									StreetBox.remove();
									CityBox.remove();
									document.getElementById("checkboxResidence").checked=true;
									handleClickResidence();
									directionsService = new google.maps.DirectionsService();
										directionsDisplay = new google.maps.DirectionsRenderer();
									  var chicago = new google.maps.LatLng(39.2833, -76.6167);
									  var mapOptions = {
										zoom: 9,
										center: chicago
									  }
									  map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
									  directionsDisplay.setMap(map);
			

	

   // alert("eeeeeeeeeefffffffffffffeeeee");
	
	
		
	
	

}
$(document).ready(function(){
									// find the input fields and apply the time select to them.
									$("#datepickerOnly").kendoDatePicker({
										value:new Date()
									});		//for the date picker one
								  $("#timepickerOnly").kendoTimePicker({
										interval: 15
									});		//for the time picker one
								 google.maps.event.addDomListener(window, 'load', initialize);

						}); // end ready()

						
						
						
function calcRoute() {
					var select=document.getElementById("select");
					  var start = document.getElementById("inpCity").value;
					  var end = select.value//document.getElementById("inpCityTo").value;
					  var waypts = [];
					  
					  

					  var request = {
						  origin: start,
						  destination: end,
						  waypoints: waypts,
						  optimizeWaypoints: true,
						  travelMode: google.maps.TravelMode.DRIVING
					  };
					  directionsService.route(request, function(response, status) {
						if (status == google.maps.DirectionsStatus.OK) {
						  directionsDisplay.setDirections(response);
						  
						  
						  
						  for (var i = 0; i < response.routes[0].legs.length; i++) {
								totalF += response.routes[0].legs[i].distance.value;
								time +=response.routes[0].legs[i].duration.value;
								


							  }
						  
						time = time / 60;
						  totalF = totalF / 1000;
						  
						  totalF = totalF*0.62137;
						  
						time=(time).toFixed(2);		
						//fare=(total*2.75)+(time*0.25);
						  from = response.routes[0].legs[0].start_address;
						  to = response.routes[0].legs[0].end_address;
						  //total =Math.round(total);
						  //time =Math.round(time);
						  //fare =Math.round(fare);
						}
					  });
}			
			
										
function calcFare() {
	
	time=0;
   var AllDistance=0;
		/*if(time==0){
			alert("No route found!");
		}
		else{*/
			from=document.getElementById("inpCity").value;
			to=document.getElementById("select").value;
			document.getElementById("FromText").innerHTML= "From = "+from;
			document.getElementById("ToText").innerHTML= "To = "+to;
		
		
			
		//calcDistance("550 Light St, Baltimore",from);
		calcDistance("550 Light St, Baltimore",from,0, function(r1) {
		
					calcDistance(from,to,1, function(r2) {
							var distaneAll3=r2;
							distaneAll3=(distaneAll3).toFixed(2);
							 document.getElementById("DistanceText").innerHTML= "Distance = "+distaneAll3+" Miles";	
							 document.getElementById("TimeText").innerHTML= "Time = "+time+ " mins";
								calcDistance(to,"550 Light St, Baltimore",0, function(r3) {
								var fareTotal= (r1*0.25)+(r2*2.75)+(r3*0.25)+(time*0.25);
								fareTotal=(fareTotal).toFixed(2);
										document.getElementById("FareText").innerHTML= "Fare = "+fareTotal+" $";	
									});
								});
				});
		
		
		
			//calcRouteReverse();
			
			//AllDistance +=calcDistance("550 Light St, Baltimore",from)+calcDistance(from,to)+calcDistance(to,"550 Light St, Baltimore");
			//alert(totalF);
		//}
		
		
		
		
		
}					
function calcDistance(start,end,mainRoute,callback) {
					  var tester=0;
					  var waypts = [];

					  var request = {
						  origin: start,
						  destination: end,
						  waypoints: waypts,
						  optimizeWaypoints: true,
						  travelMode: google.maps.TravelMode.DRIVING
					  };
					  directionsService.route(request, function(response, status) {
						if (status == google.maps.DirectionsStatus.OK) {
							if(mainRoute==1){
								directionsDisplay.setDirections(response);
								for (var j = 0; j < response.routes[0].legs.length; j++) {
									tester += response.routes[0].legs[j].distance.value;
									time +=response.routes[0].legs[j].duration.value;
							  }	
							time = time / 60;
							time=(time).toFixed(2);
							}
							else{
								for (var j = 0; j < response.routes[0].legs.length; j++) {
									tester += response.routes[0].legs[j].distance.value;
								}	
							}
						
						  					  												
						  tester = tester / 1000;
						  tester = tester*0.62137;
						  callback(tester);
						}
					  });
					  //alert(tester);
}									
						
						
						
						
						
						
						
						
function handleClickPublic(cb){
	var CurrentCheckbox = document.getElementById("checkboxPublic");

	
	
	if(CurrentCheckbox.checked === true){
				if(document.getElementById("checkboxResidence").checked==true){
					document.getElementById("checkboxResidence").checked=false;
					handleClickResidence();
				}
				if(document.getElementById("checkboxBusiness").checked==true){
					document.getElementById("checkboxBusiness").checked=false;
					handleClickBusiness();
				}
		document.getElementById("AddressDiv").appendChild( IntersectionBox );
		document.getElementById("AddressDiv").appendChild( StreetBox );
		document.getElementById("AddressDiv").appendChild( CityBox );
		}
	else{
	
		IntersectionBox.remove();
		StreetBox.remove();
		CityBox.remove();
	}
}
function handleClickResidence(cb){
	var CurrentCheckbox = document.getElementById("checkboxResidence");

	
	
	if(CurrentCheckbox.checked === true){
	
				if(document.getElementById("checkboxPublic").checked==true){
					document.getElementById("checkboxPublic").checked=false;
					handleClickPublic();
				}
				if(document.getElementById("checkboxBusiness").checked==true){
					document.getElementById("checkboxBusiness").checked=false;
					handleClickBusiness();
				}
		
		document.getElementById("AddressDiv").appendChild( StreetBox );
		document.getElementById("AddressDiv").appendChild( CityBox );
		}
	else{
		StreetBox.remove();
		CityBox.remove();
	}
}
function handleClickBusiness(cb){
	var CurrentCheckbox = document.getElementById("checkboxBusiness");

	
	
	if(CurrentCheckbox.checked === true){
				if(document.getElementById("checkboxResidence").checked==true){
					document.getElementById("checkboxResidence").checked=false;
					handleClickResidence();
				}
				if(document.getElementById("checkboxPublic").checked==true){
					document.getElementById("checkboxPublic").checked=false;
					handleClickPublic();
				}
		document.getElementById("AddressDiv").appendChild( BusinessBox );
		document.getElementById("AddressDiv").appendChild( StreetBox );
		document.getElementById("AddressDiv").appendChild( CityBox );
		}
	else{
	
		BusinessBox.remove();
		StreetBox.remove();
		CityBox.remove();
	}
}



