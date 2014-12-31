

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
		var RateFactorMile=0;
		if(selectedCar=="hybrid"){
			RateFactorMile=2.5;
		}
		else if(selectedCar=="ExecutiveSedan"){
			RateFactorMile=2.75;
		}
		else if(selectedCar=="ExecutiveSUV"){
			RateFactorMile=3.25;
		}
		else if(selectedCar=="ClubVan"){
			RateFactorMile=2.75;
		}
		else if(selectedCar=="MercedesVan"){
			RateFactorMile=2.75;
		}
		else if(selectedCar=="MiniVan"){
			RateFactorMile=3;
		}
		else if(selectedCar=="Limo"){
			RateFactorMile=2.75;
		}
		
		
		
		

		
			
		//calcDistance("550 Light St, Baltimore",from);
		calcDistance("550 Light St, Baltimore",from,0, function(r1) {
		
					calcDistance(from,to,1, function(r2) {
							var distaneAll3=r2;
							distaneAll3=(distaneAll3).toFixed(2);
							 document.getElementById("DistanceText").innerHTML= "Distance = "+distaneAll3+" Miles";	
							 document.getElementById("TimeText").innerHTML= "Time = "+time+ " mins";
								calcDistance(to,"550 Light St, Baltimore",0, function(r3) {
								
										calcDistance(to,from,0, function(r4) {
											var Allowed_Travel_Dist= ((r2+r4)/2)*3;
											if( Allowed_Travel_Dist >= (r1+r2+r3)){
												AllDistance=Allowed_Travel_Dist;

											}
											else{
												AllDistance=(r1+r2+r3);
												//var fareTotal= (r1*0.25)+(r2*2.75)+(r3*0.25)+(time*0.25);

											}
											var fareTotal=(AllDistance*RateFactorMile)+(time*0.4);
											fareTotal=(fareTotal).toFixed(2);
											alert(fareTotal);
											document.getElementById("FareText").innerHTML= "Fare = "+fareTotal+" $";	
											
											
											
											
											
											if(selectedCar=="hybrid"){
												
												document.getElementById("HybridFare").innerHTML= fareTotal+" $";
												document.getElementById("Hybrid").className = "success";
												document.getElementById("Hybrid").style.fontWeight = "bold";
												
												document.getElementById("ExecutiveSedanFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("ExecutiveSedan").className = "nil";
												document.getElementById("ExecutiveSedan").style.fontWeight = "normal";
												
												document.getElementById("ExecutiveSUVFare").innerHTML= ((AllDistance*3.25)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("ExecutiveSUV").className = "nil";
												document.getElementById("ExecutiveSUV").style.fontWeight = "normal";
												
												document.getElementById("ClubVanFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("ClubVan").className = "nil";
												document.getElementById("ClubVan").style.fontWeight = "normal";
												
												document.getElementById("MercedesVanFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("MercedesVan").className = "nil";
												document.getElementById("MercedesVan").style.fontWeight = "normal";
												
												document.getElementById("MiniVanFare").innerHTML= ((AllDistance*3)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("MiniVan").className = "nil";
												document.getElementById("MiniVan").style.fontWeight = "normal";
												
												document.getElementById("StretchLimoFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("StretchLimo").className = "nil";
												document.getElementById("StretchLimo").style.fontWeight = "normal";


											}
											else if(selectedCar=="ExecutiveSedan"){
												document.getElementById("ExecutiveSedanFare").innerHTML= fareTotal+" $";
												document.getElementById("ExecutiveSedan").className = "success";
												document.getElementById("ExecutiveSedan").style.fontWeight = "bold";
												
												document.getElementById("HybridFare").innerHTML= ((AllDistance*2.5)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("Hybrid").className = "nil";
												document.getElementById("Hybrid").style.fontWeight = "normal";
												
												document.getElementById("ExecutiveSUVFare").innerHTML= ((AllDistance*3.25)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("ExecutiveSUV").className = "nil";
												document.getElementById("ExecutiveSUV").style.fontWeight = "normal";
												
												document.getElementById("ClubVanFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("ClubVan").className = "nil";
												document.getElementById("ClubVan").style.fontWeight = "normal";
												
												document.getElementById("MercedesVanFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("MercedesVan").className = "nil";
												document.getElementById("MercedesVan").style.fontWeight = "normal";
												
												document.getElementById("MiniVanFare").innerHTML= ((AllDistance*3)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("MiniVan").className = "nil";
												document.getElementById("MiniVan").style.fontWeight = "normal";
												
												document.getElementById("StretchLimoFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("StretchLimo").className = "nil";
												document.getElementById("StretchLimo").style.fontWeight = "normal";
											}
											else if(selectedCar=="ExecutiveSUV"){
												document.getElementById("ExecutiveSUVFare").innerHTML= fareTotal+" $";
												document.getElementById("ExecutiveSUV").className = "success";
												document.getElementById("ExecutiveSUV").style.fontWeight = "bold";
												
												document.getElementById("ExecutiveSedanFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("ExecutiveSedan").className = "nil";
												document.getElementById("ExecutiveSedan").style.fontWeight = "normal";
												
												document.getElementById("HybridFare").innerHTML= ((AllDistance*2.5)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("Hybrid").className = "nil";
												document.getElementById("Hybrid").style.fontWeight = "normal";
												
												document.getElementById("ClubVanFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("ClubVan").className = "nil";
												document.getElementById("ClubVan").style.fontWeight = "normal";
												
												document.getElementById("MercedesVanFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("MercedesVan").className = "nil";
												document.getElementById("MercedesVan").style.fontWeight = "normal";
												
												document.getElementById("MiniVanFare").innerHTML= ((AllDistance*3)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("MiniVan").className = "nil";
												document.getElementById("MiniVan").style.fontWeight = "normal";
												
												document.getElementById("StretchLimoFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("StretchLimo").className = "nil";
												document.getElementById("StretchLimo").style.fontWeight = "normal";
											}
											else if(selectedCar=="ClubVan"){
												document.getElementById("ClubVanFare").innerHTML= fareTotal+" $";
												document.getElementById("ClubVan").className = "success";
												document.getElementById("ClubVan").style.fontWeight = "bold";
												
												document.getElementById("ExecutiveSedanFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("ExecutiveSedan").className = "nil";
												document.getElementById("ExecutiveSedan").style.fontWeight = "normal";
												
												document.getElementById("ExecutiveSUVFare").innerHTML= ((AllDistance*3.25)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("ExecutiveSUV").className = "nil";
												document.getElementById("ExecutiveSUV").style.fontWeight = "normal";
												
												document.getElementById("HybridFare").innerHTML= ((AllDistance*2.5)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("Hybrid").className = "nil";
												document.getElementById("Hybrid").style.fontWeight = "normal";
												
												document.getElementById("MercedesVanFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("MercedesVan").className = "nil";
												document.getElementById("MercedesVan").style.fontWeight = "normal";
												
												document.getElementById("MiniVanFare").innerHTML= ((AllDistance*3)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("MiniVan").className = "nil";
												document.getElementById("MiniVan").style.fontWeight = "normal";
												
												document.getElementById("StretchLimoFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("StretchLimo").className = "nil";
												document.getElementById("StretchLimo").style.fontWeight = "normal";
											}
											else if(selectedCar=="MercedesVan"){
												document.getElementById("MercedesVanFare").innerHTML= fareTotal+" $";
												document.getElementById("MercedesVan").className = "success";
												document.getElementById("MercedesVan").style.fontWeight = "bold";
												
												document.getElementById("ExecutiveSedanFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("ExecutiveSedan").className = "nil";
												document.getElementById("ExecutiveSedan").style.fontWeight = "normal";
												
												document.getElementById("ExecutiveSUVFare").innerHTML= ((AllDistance*3.25)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("ExecutiveSUV").className = "nil";
												document.getElementById("ExecutiveSUV").style.fontWeight = "normal";
												
												document.getElementById("ClubVanFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("ClubVan").className = "nil";
												document.getElementById("ClubVan").style.fontWeight = "normal";
												
												document.getElementById("HybridFare").innerHTML= ((AllDistance*2.5)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("Hybrid").className = "nil";
												document.getElementById("Hybrid").style.fontWeight = "normal";
												
												document.getElementById("MiniVanFare").innerHTML= ((AllDistance*3)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("MiniVan").className = "nil";
												document.getElementById("MiniVan").style.fontWeight = "normal";
												
												document.getElementById("StretchLimoFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("StretchLimo").className = "nil";
												document.getElementById("StretchLimo").style.fontWeight = "normal";
											}
											else if(selectedCar=="MiniVan"){
												document.getElementById("MiniVanFare").innerHTML= fareTotal+" $";
												document.getElementById("MiniVan").className = "success";
												document.getElementById("MiniVan").style.fontWeight = "bold";
												
												document.getElementById("ExecutiveSedanFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("ExecutiveSedan").className = "nil";
												document.getElementById("ExecutiveSedan").style.fontWeight = "normal";
												
												document.getElementById("ExecutiveSUVFare").innerHTML= ((AllDistance*3.25)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("ExecutiveSUV").className = "nil";
												document.getElementById("ExecutiveSUV").style.fontWeight = "normal";
												
												document.getElementById("ClubVanFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("ClubVan").className = "nil";
												document.getElementById("ClubVan").style.fontWeight = "normal";
												
												document.getElementById("MercedesVanFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("MercedesVan").className = "nil";
												document.getElementById("MercedesVan").style.fontWeight = "normal";
												
												document.getElementById("HybridFare").innerHTML= ((AllDistance*2.5)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("Hybrid").className = "nil";
												document.getElementById("Hybrid").style.fontWeight = "normal";
												
												document.getElementById("StretchLimoFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("StretchLimo").className = "nil";
												document.getElementById("StretchLimo").style.fontWeight = "normal";
											}
											else if(selectedCar=="Limo"){
												document.getElementById("StretchLimoFare").innerHTML= fareTotal+" $";
												document.getElementById("StretchLimo").className = "success";
												document.getElementById("StretchLimo").style.fontWeight = "bold";
												
												document.getElementById("ExecutiveSedanFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("ExecutiveSedan").className = "nil";
												document.getElementById("ExecutiveSedan").style.fontWeight = "normal";
												
												document.getElementById("ExecutiveSUVFare").innerHTML= ((AllDistance*3.25)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("ExecutiveSUV").className = "nil";
												document.getElementById("ExecutiveSUV").style.fontWeight = "normal";
												
												document.getElementById("ClubVanFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("ClubVan").className = "nil";
												document.getElementById("ClubVan").style.fontWeight = "normal";
												
												document.getElementById("MercedesVanFare").innerHTML= ((AllDistance*2.75)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("MercedesVan").className = "nil";
												document.getElementById("MercedesVan").style.fontWeight = "normal";
												
												document.getElementById("MiniVanFare").innerHTML= ((AllDistance*3)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("MiniVan").className = "nil";
												document.getElementById("MiniVan").style.fontWeight = "normal";
												
												document.getElementById("HybridFare").innerHTML= ((AllDistance*2.5)+(time*0.4)).toFixed(2)+" $";
												document.getElementById("Hybrid").className = "nil";
												document.getElementById("Hybrid").style.fontWeight = "normal";
											}

										});
								
								
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



