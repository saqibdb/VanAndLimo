

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
		var BaseFare=0;
		if(selectedCar=="hybrid"){
			RateFactorMile=2.5;
			BaseFare=30;
			selectedCar="Hybrid";
		}
		else if(selectedCar=="ExecutiveSedan"){
			RateFactorMile=2.75;
			BaseFare=40;
		}
		else if(selectedCar=="ExecutiveSUV"){
			RateFactorMile=3.25;
			BaseFare=50;
		}
		else if(selectedCar=="ClubVan"){
			RateFactorMile=2.75;
			BaseFare=0;
		}
		else if(selectedCar=="MercedesVan"){
			RateFactorMile=2.75;
			BaseFare=0;
		}
		else if(selectedCar=="MiniVan"){
			RateFactorMile=3;
			BaseFare=45;
		}
		else if(selectedCar=="Limo"){
			RateFactorMile=2.75;
			BaseFare=0;
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
											var MileageCost=0;
											var MileageCostHybrid=0;
											var MileageCostExecutiveSedan=0;
											var MileageCostMiniVan=0;
											var MileageCostExecutiveSUV=0;
											var TimeCost=0;
											if( !Allowed_Travel_Dist >= (r1+r2+r3)){
												AllDistance=(r1+r2+r3);
												MileageCost=AllDistance+BaseFare;
												TimeCost=0;
												
												MileageCostHybrid=AllDistance+30;
												MileageCostExecutiveSedan=AllDistance+40;
												MileageCostMiniVan=AllDistance+45;
												MileageCostExecutiveSUV=AllDistance+50;
												
											}
											else{
												
												
												
												AllDistance=Allowed_Travel_Dist/3;
												MileageCost=AllDistance*RateFactorMile;
												TimeCost=time*0.4;
												
												MileageCostHybrid=AllDistance*2.5;
												MileageCostExecutiveSedan=AllDistance*2.75;
												MileageCostMiniVan=AllDistance*3;
												MileageCostExecutiveSUV=AllDistance*3.25;
												
												//var fareTotal= (r1*0.25)+(r2*2.75)+(r3*0.25)+(time*0.25);

											}
											var fareTotal=MileageCost+TimeCost;
											fareTotal=(fareTotal).toFixed(2);
											alert(fareTotal);
											document.getElementById("FareText").innerHTML= "Fare = "+fareTotal+" $";	
											
											MileageCost=(MileageCost).toFixed(2);
											MileageCostHybrid=(MileageCostHybrid).toFixed(2);
											MileageCostExecutiveSedan=(MileageCostExecutiveSedan).toFixed(2);
											MileageCostMiniVan=(MileageCostMiniVan).toFixed(2);
											MileageCostExecutiveSUV=(MileageCostExecutiveSUV).toFixed(2);
											
											
											
											
												ChangeCell("HybridBaseFare","$ "+30.00);
												ChangeCell("HybridMileageCost","$ "+MileageCostHybrid);
												ChangeCell("HybridTimeCost","$ "+TimeCost);
												ChangeCell("HybridCurbside","Free ");
												ChangeCell("HybridMeetNGreet","$ 15.00");
												ChangeCell("HybridSurcharge","$ 5.00");
												ChangeCell("HybridBooster","$ 15.00");
												ChangeCell("HybridWaiting","$*");
												ChangeCell("HybridExtraStops","$**");
												ChangeCell("HybridEstimateFare","$ "+MileageCostHybrid+TimeCost);
												ChangeCell("HybridTotalEstimateFare","$ "+TimeCost);
												
												ChangeCell("ExecutiveSedanBaseFare","$ "+40.00);
												ChangeCell("ExecutiveSedanMileageCost","$ "+MileageCostExecutiveSedan);
												ChangeCell("ExecutiveSedanTimeCost","$ "+TimeCost);
												ChangeCell("ExecutiveSedanCurbside","Free ");
												ChangeCell("ExecutiveSedanMeetNGreet","$ 15.00");
												ChangeCell("ExecutiveSedanSurcharge","$ 5.00");
												ChangeCell("ExecutiveSedanBooster","$ 15.00");
												ChangeCell("ExecutiveSedanWaiting","$*");
												ChangeCell("ExecutiveSedanExtraStops","$**");
												ChangeCell("ExecutiveSedanEstimateFare","$ "+MileageCostExecutiveSedan+TimeCost);
												ChangeCell("ExecutiveSedanTotalEstimateFare","$ "+TimeCost);
												
												ChangeCell("MiniVanBaseFare","$ "+45.00);
												ChangeCell("MiniVanMileageCost","$ "+MileageCostMiniVan);
												ChangeCell("MiniVanTimeCost","$ "+TimeCost);
												ChangeCell("MiniVanCurbside","Free ");
												ChangeCell("MiniVanMeetNGreet","$ 15.00");
												ChangeCell("MiniVanSurcharge","$ 5.00");
												ChangeCell("MiniVanBooster","$ 15.00");
												ChangeCell("MiniVanWaiting","$*");
												ChangeCell("MiniVanExtraStops","$**");
												ChangeCell("MiniVanEstimateFare","$ "+MileageCostMiniVan+TimeCost);
												ChangeCell("MiniVanTotalEstimateFare","$ "+TimeCost);
												
												ChangeCell("ExecutiveSUVBaseFare","$ "+50.00);
												ChangeCell("ExecutiveSUVMileageCost","$ "+MileageCostExecutiveSUV);
												ChangeCell("ExecutiveSUVTimeCost","$ "+TimeCost);
												ChangeCell("ExecutiveSUVCurbside","Free ");
												ChangeCell("ExecutiveSUVMeetNGreet","$ 15.00");
												ChangeCell("ExecutiveSUVSurcharge","$ 5.00");
												ChangeCell("ExecutiveSUVBooster","$ 15.00");
												ChangeCell("ExecutiveSUVWaiting","$*");
												ChangeCell("ExecutiveSUVExtraStops","$**");
												ChangeCell("ExecutiveSUVEstimateFare","$ "+MileageCostExecutiveSUV+TimeCost);
												ChangeCell("ExecutiveSUVTotalEstimateFare","$ "+TimeCost);
											
											
												ChangeCellColor(selectedCar,"BaseFare");
												ChangeCellColor(selectedCar,"MileageCost");
												ChangeCellColor(selectedCar,"TimeCost");
												ChangeCellColor(selectedCar,"Curbside");
												ChangeCellColor(selectedCar,"MeetNGreet");
												ChangeCellColor(selectedCar,"Surcharge");
												ChangeCellColor(selectedCar,"Booster");
												ChangeCellColor(selectedCar,"Waiting");
												ChangeCellColor(selectedCar,"ExtraStops");
												ChangeCellColor(selectedCar,"EstimateFare");
												ChangeCellColor(selectedCar,"TotalEstimateFare");
												
											
									

										});
								
								
									});
								});
				});
		
		
		
			//calcRouteReverse();
			
			//AllDistance +=calcDistance("550 Light St, Baltimore",from)+calcDistance(from,to)+calcDistance(to,"550 Light St, Baltimore");
			//alert(totalF);
		//}
		
		
		
		
		
}	
function ChangeCell(ElementName,innerHtml) {
												document.getElementById(ElementName).innerHTML= innerHtml;

}

function ChangeCellColor(CarName,ElementIdentifier) {
												document.getElementById("Hybrid"+ElementIdentifier).style.backgroundColor = "#FFFFFF";
												document.getElementById("Hybrid"+ElementIdentifier).style.fontWeight = "normal";
												document.getElementById("ExecutiveSedan"+ElementIdentifier).style.backgroundColor = "#FFFFFF";
												document.getElementById("ExecutiveSedan"+ElementIdentifier).style.fontWeight = "normal";
												document.getElementById("MiniVan"+ElementIdentifier).style.backgroundColor = "#FFFFFF";
												document.getElementById("MiniVan"+ElementIdentifier).style.fontWeight = "normal";
												document.getElementById("ExecutiveSUV"+ElementIdentifier).style.backgroundColor = "#FFFFFF";
												document.getElementById("ExecutiveSUV"+ElementIdentifier).style.fontWeight = "normal";





												document.getElementById(CarName+""+ElementIdentifier).style.backgroundColor = "#FEF200";
												document.getElementById(CarName+""+ElementIdentifier).style.fontWeight = "bold";
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



