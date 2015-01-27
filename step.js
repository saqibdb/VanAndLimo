

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
										value:new Date(),
										min: new Date()
										
									});		//for the date picker one
								  $("#timepickerOnly").kendoTimePicker({
										interval: 15,
										value:new Date(),
										min: new Date()
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
	var nightSurcharge=0;
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
			//document.getElementById("PointATOPointB").innerHTML= "Distance From: 550 Light St to: "+to+" = "+r1+" miles";

			document.getElementById("DistanceCBText").innerHTML= "Distance(CB) : "+Math.round(r1)+" Miles";
			
					calcDistance(from,to,1, function(r2) {
							var distaneAll3=r2;
							//document.getElementById("550stTOPointA").innerHTML= "Distance From: "+from+" to: "+to+" = "+r2+" miles";	
							
							document.getElementById("DistanceBAText").innerHTML= "Distance(BA) : "+Math.round(r2)+" Miles";

							distaneAll3=(distaneAll3).toFixed(2);
							 //document.getElementById("DistanceText").innerHTML= "Distance = "+distaneAll3+" Miles";	
							 document.getElementById("TimeText").innerHTML= "Travel Time : "+time+ " Minutes";
								calcDistance(to,"550 Light St, Baltimore",0, function(r3) {
									//document.getElementById("PointBTO550st").innerHTML= "Distance From: "+from+" to: 550 Light St = "+r3+" miles";	

									document.getElementById("DistanceACText").innerHTML= "Distance(AC) : "+Math.round(r3)+" Miles";

										calcDistance(to,from,0, function(r4) {

											document.getElementById("DistanceABText").innerHTML= "Distance(AB) : "+Math.round(r4)+" Miles";

											var AverageTripDistance=(r2+r4)/2;
											document.getElementById("DistanceDText").innerHTML= "Average Trip Distance (D) : "+Math.round(AverageTripDistance)+" Miles";





											var Allowed_Travel_Dist= ((r2+r4)/2)*3;
											document.getElementById("DistanceLText").innerHTML= "Allowed Distance (L) : "+Math.round(Allowed_Travel_Dist)+" Miles";
											document.getElementById("DistanceMText").innerHTML= "Actual Trip Mileage (M) : "+Math.round(r1+r2+r3)+" Miles";


											var bagsValue=document.getElementById("sliderBags").value;
											document.getElementById("BagsText").innerHTML= "Bags "+bagsValue;


											var personValue=document.getElementById("sliderPerson").value;
											document.getElementById("PsngrText").innerHTML= "Passenger "+personValue;

											var datePicker=$("#datepickerOnly").data("kendoDatePicker").value();
											var day=datePicker.getDate();
											var month=datePicker.getMonth()+1;
											var year=datePicker.getFullYear();
											
											var timePicker=$("#timepickerOnly").data("kendoTimePicker").value();
											var hours=timePicker.getHours();
											 var dd = "AM";
											 
											if (hours >= 21 || hours <= 5){
												nightSurcharge=5;
												
											}
											else{
												nightSurcharge=0;
											}
											

											if (hours >= 12){
												hours = hours-12;
												dd = "PM";
											}
											if (hours == 0){
												hours = 12;
											}
											var minutes=timePicker.getMinutes();
											
											document.getElementById("DateTimeText").innerHTML= "Trip Estimate for "+month+"-"+day+"-"+year+" / DOW / "+hours+":"+minutes+" "+dd;

											var MileageCost=0;
											var MileageCostHybrid=0;
											var MileageCostExecutiveSedan=0;
											var MileageCostMiniVan=0;
											var MileageCostExecutiveSUV=0;
											
											var EstimatedFareHybrid=0;
											var EstimatedFareExecutiveSedan=0;
											var EstimatedFareMiniVan=0;
											var EstimatedFareExecutiveSUV=0;
											
											var TimeCost=0;
											if(Allowed_Travel_Dist >= (r1+r2+r3)){
												AllDistance=Allowed_Travel_Dist/3;
												
												TimeCost=time*0.4;
												
												MileageCostHybrid=(AllDistance*2.5);
												MileageCostExecutiveSedan=AllDistance*2.75;
												MileageCostMiniVan=AllDistance*3;
												MileageCostExecutiveSUV=AllDistance*3.25;

												
											}
											else{
												
												
												
												
												
												AllDistance=r1+r2+r3;
												TimeCost=time*0;
												
												MileageCostHybrid=AllDistance+30;
												MileageCostExecutiveSedan=AllDistance+40;
												MileageCostMiniVan=AllDistance+45;
												MileageCostExecutiveSUV=AllDistance+50;
												
												
												//var fareTotal= (r1*0.25)+(r2*2.75)+(r3*0.25)+(time*0.25);

											}
											
											
											
											
												
											
											/*MileageCost=(MileageCost).toFixed(2);
											MileageCostHybrid=(MileageCostHybrid).toFixed(2);
											MileageCostExecutiveSedan=(MileageCostExecutiveSedan).toFixed(2);
											MileageCostMiniVan=(MileageCostMiniVan).toFixed(2);
											MileageCostExecutiveSUV=(MileageCostExecutiveSUV).toFixed(2);*/
											
											
											EstimatedFareHybrid=MileageCostHybrid+TimeCost;
											EstimatedFareExecutiveSedan=MileageCostExecutiveSedan+TimeCost;
											EstimatedFareMiniVan=MileageCostMiniVan+TimeCost;
											EstimatedFareExecutiveSUV=MileageCostExecutiveSUV+TimeCost;
											
											
												
											
												if(document.getElementById("MeetNGreetInp").checked==true){
														EstimatedFareHybrid=EstimatedFareHybrid+15;
														EstimatedFareExecutiveSedan=EstimatedFareExecutiveSedan+15;
														EstimatedFareMiniVan=EstimatedFareMiniVan+15;
														EstimatedFareExecutiveSUV=EstimatedFareExecutiveSUV+15;
												}
												else{
														

												}
												
												if(document.getElementById("PetsInputCheck").checked==true){
														EstimatedFareHybrid=EstimatedFareHybrid+15;
														EstimatedFareExecutiveSedan=EstimatedFareExecutiveSedan+15;
														EstimatedFareMiniVan=EstimatedFareMiniVan+15;
														EstimatedFareExecutiveSUV=EstimatedFareExecutiveSUV+15;
												}
												if(document.getElementById("ItemsInputCheck").checked==true){
														EstimatedFareHybrid=EstimatedFareHybrid+15;
														EstimatedFareExecutiveSedan=EstimatedFareExecutiveSedan+15;
														EstimatedFareMiniVan=EstimatedFareMiniVan+15;
														EstimatedFareExecutiveSUV=EstimatedFareExecutiveSUV+15;
												}
												if(nightSurcharge==5){
														EstimatedFareHybrid=EstimatedFareHybrid+5;
														EstimatedFareExecutiveSedan=EstimatedFareExecutiveSedan+5;
														EstimatedFareMiniVan=EstimatedFareMiniVan+5;
														EstimatedFareExecutiveSUV=EstimatedFareExecutiveSUV+5;
												}
												if(document.getElementById("carSeatInp").checked==true){
														EstimatedFareHybrid=EstimatedFareHybrid+15;
														EstimatedFareExecutiveSedan=EstimatedFareExecutiveSedan+15;
														EstimatedFareMiniVan=EstimatedFareMiniVan+15;
														EstimatedFareExecutiveSUV=EstimatedFareExecutiveSUV+15;
												}
												if(document.getElementById("ExtraStopsInp").checked==true){
														EstimatedFareHybrid=EstimatedFareHybrid+15;
														EstimatedFareExecutiveSedan=EstimatedFareExecutiveSedan+15;
														EstimatedFareMiniVan=EstimatedFareMiniVan+15;
														EstimatedFareExecutiveSUV=EstimatedFareExecutiveSUV+15;
												}
												
												
											
											var gratuatiValue=document.getElementById("selectGratuity").value;
													var TotalEstimatedFareHybrid=EstimatedFareHybrid+(EstimatedFareHybrid*gratuatiValue);
													var TotalEstimatedFareExecutiveSedan=EstimatedFareExecutiveSedan+(EstimatedFareExecutiveSedan*gratuatiValue);
													var TotalEstimatedFareMiniVan=EstimatedFareMiniVan+(EstimatedFareMiniVan*gratuatiValue);
													var TotalEstimatedFareExecutiveSUV=EstimatedFareExecutiveSUV+(EstimatedFareExecutiveSUV*gratuatiValue);
													
													
											/*if(document.getElementById("Gratuity10").checked==true){
													var TotalEstimatedFareHybrid=EstimatedFareHybrid+(EstimatedFareHybrid*0.10);
													var TotalEstimatedFareExecutiveSedan=EstimatedFareExecutiveSedan+(EstimatedFareExecutiveSedan*0.10);
													var TotalEstimatedFareMiniVan=EstimatedFareMiniVan+(EstimatedFareMiniVan*0.10);
													var TotalEstimatedFareExecutiveSUV=EstimatedFareExecutiveSUV+(EstimatedFareExecutiveSUV*0.10);


												}
												else if(document.getElementById("Gratuity15").checked==true){
													var TotalEstimatedFareHybrid=EstimatedFareHybrid+(EstimatedFareHybrid*0.15);
													var TotalEstimatedFareExecutiveSedan=EstimatedFareExecutiveSedan+(EstimatedFareExecutiveSedan*0.15);
													var TotalEstimatedFareMiniVan=EstimatedFareMiniVan+(EstimatedFareMiniVan*0.15);
													var TotalEstimatedFareExecutiveSUV=EstimatedFareExecutiveSUV+(EstimatedFareExecutiveSUV*0.15);

												}
												else if(document.getElementById("Gratuity20").checked==true){
													var TotalEstimatedFareHybrid=EstimatedFareHybrid+(EstimatedFareHybrid*0.2);
													var TotalEstimatedFareExecutiveSedan=EstimatedFareExecutiveSedan+(EstimatedFareExecutiveSedan*0.2);
													var TotalEstimatedFareMiniVan=EstimatedFareMiniVan+(EstimatedFareMiniVan*0.2);
													var TotalEstimatedFareExecutiveSUV=EstimatedFareExecutiveSUV+(EstimatedFareExecutiveSUV*0.2);

												}
												else if(document.getElementById("Gratuity25").checked==true){
													var TotalEstimatedFareHybrid=EstimatedFareHybrid+(EstimatedFareHybrid*0.25);
													var TotalEstimatedFareExecutiveSedan=EstimatedFareExecutiveSedan+(EstimatedFareExecutiveSedan*0.25);
													var TotalEstimatedFareMiniVan=EstimatedFareMiniVan+(EstimatedFareMiniVan*0.25);
													var TotalEstimatedFareExecutiveSUV=EstimatedFareExecutiveSUV+(EstimatedFareExecutiveSUV*0.25);

												}
												else if(document.getElementById("Gratuity50").checked==true){
													var TotalEstimatedFareHybrid=EstimatedFareHybrid+(EstimatedFareHybrid*0.5);
													var TotalEstimatedFareExecutiveSedan=EstimatedFareExecutiveSedan+(EstimatedFareExecutiveSedan*0.5);
													var TotalEstimatedFareMiniVan=EstimatedFareMiniVan+(EstimatedFareMiniVan*0.5);
													var TotalEstimatedFareExecutiveSUV=EstimatedFareExecutiveSUV+(EstimatedFareExecutiveSUV*0.5);

												}
												else if(document.getElementById("Gratuity100").checked==true){
													var TotalEstimatedFareHybrid=EstimatedFareHybrid+(EstimatedFareHybrid);
													var TotalEstimatedFareExecutiveSedan=EstimatedFareExecutiveSedan+(EstimatedFareExecutiveSedan);
													var TotalEstimatedFareMiniVan=EstimatedFareMiniVan+(EstimatedFareMiniVan);
													var TotalEstimatedFareExecutiveSUV=EstimatedFareExecutiveSUV+(EstimatedFareExecutiveSUV);

												}
												else{
													var TotalEstimatedFareHybrid=EstimatedFareHybrid;
													var TotalEstimatedFareExecutiveSedan=EstimatedFareExecutiveSedan;
													var TotalEstimatedFareMiniVan=EstimatedFareMiniVan;
													var TotalEstimatedFareExecutiveSUV=EstimatedFareExecutiveSUV;

												}*/
											
											
											
											
												ChangeCell("HybridBaseFare","$ "+30.00);
												ChangeCell("HybridMileageCost","$ "+Math.round(MileageCostHybrid));
												ChangeCell("HybridTimeCost","$ "+Math.round(TimeCost));
												ChangeCell("HybridCurbside","Free ");
												if(document.getElementById("MeetNGreetInp").checked==true){
													ChangeCell("HybridCurbside","$ 15.00 ");
												}
												ChangeCell("HybridSurcharge"," ");
												if(nightSurcharge==5){
													ChangeCell("HybridSurcharge","$ 5.00");
												}
												ChangeCell("HybridAnimals"," ");
												if(document.getElementById("PetsInputCheck").checked==true){
													ChangeCell("HybridAnimals","$ 15.00 ");
												}
												ChangeCell("HybridItems"," ");
												if(document.getElementById("ItemsInputCheck").checked==true){
													ChangeCell("HybridItems","$ 15.00 ");
												}												
												ChangeCell("HybridBooster"," ");
												if(document.getElementById("carSeatInp").checked==true){
													ChangeCell("HybridBooster","$ 15.00 ");
												}
												ChangeCell("HybridWaiting","$*");
												ChangeCell("HybridExtraStops"," ");
												if(document.getElementById("ExtraStopsInp").checked==true){
													ChangeCell("HybridExtraStops","$ 15.00 ");
												}
												ChangeCell("HybridEstimateFare","$ "+Math.round(EstimatedFareHybrid));
												ChangeCell("HybridTotalEstimateFare","$ "+Math.round(TotalEstimatedFareHybrid));
												
												ChangeCell("ExecutiveSedanBaseFare","$ "+40.00);
												ChangeCell("ExecutiveSedanMileageCost","$ "+Math.round(MileageCostExecutiveSedan));
												ChangeCell("ExecutiveSedanTimeCost","$ "+Math.round(TimeCost));
												ChangeCell("ExecutiveSedanCurbside","Free ");
												if(document.getElementById("MeetNGreetInp").checked==true){
													ChangeCell("ExecutiveSedanCurbside","$ 15.00 ");
												}
												ChangeCell("ExecutiveSedanSurcharge"," ");
												if(nightSurcharge==5){
													ChangeCell("ExecutiveSedanSurcharge","$ 5.00");
												}
												ChangeCell("ExecutiveSedanAnimals"," ");
												if(document.getElementById("PetsInputCheck").checked==true){
													ChangeCell("ExecutiveSedanAnimals","$ 15.00 ");
												}
												ChangeCell("ExecutiveSedanItems"," ");
												if(document.getElementById("ItemsInputCheck").checked==true){
													ChangeCell("ExecutiveSedanItems","$ 15.00 ");
												}												
												ChangeCell("ExecutiveSedanBooster"," ");
												if(document.getElementById("carSeatInp").checked==true){
													ChangeCell("ExecutiveSedanBooster","$ 15.00 ");
												}
												ChangeCell("ExecutiveSedanWaiting","$*");
												ChangeCell("ExecutiveSedanExtraStops"," ");
												if(document.getElementById("ExtraStopsInp").checked==true){
													ChangeCell("ExecutiveSedanExtraStops","$ 15.00 ");
												}
												ChangeCell("ExecutiveSedanEstimateFare","$ "+Math.round(EstimatedFareExecutiveSedan));
												ChangeCell("ExecutiveSedanTotalEstimateFare","$ "+Math.round(TotalEstimatedFareExecutiveSedan));
												
												ChangeCell("MiniVanBaseFare","$ "+45.00);
												ChangeCell("MiniVanMileageCost","$ "+Math.round(MileageCostMiniVan));
												ChangeCell("MiniVanTimeCost","$ "+Math.round(TimeCost));
												ChangeCell("MiniVanCurbside","Free ");
												if(document.getElementById("MeetNGreetInp").checked==true){
													ChangeCell("MiniVanCurbside","$ 15.00 ");
												}
												ChangeCell("MiniVanSurcharge"," ");
												if(nightSurcharge==5){
													ChangeCell("MiniVanSurcharge","$ 5.00");
												}
												ChangeCell("MiniVanAnimals"," ");
												if(document.getElementById("PetsInputCheck").checked==true){
													ChangeCell("MiniVanAnimals","$ 15.00 ");
												}
												ChangeCell("MiniVanItems"," ");
												if(document.getElementById("ItemsInputCheck").checked==true){
													ChangeCell("MiniVanItems","$ 15.00 ");
												}												
												ChangeCell("MiniVanBooster"," ");
												if(document.getElementById("carSeatInp").checked==true){
													ChangeCell("MiniVanBooster","$ 15.00 ");
												}
												ChangeCell("MiniVanWaiting","$*");
												ChangeCell("MiniVanExtraStops"," ");
												if(document.getElementById("ExtraStopsInp").checked==true){
													ChangeCell("MiniVanExtraStops","$ 15.00 ");
												}
												ChangeCell("MiniVanEstimateFare","$ "+Math.round(EstimatedFareMiniVan));
												ChangeCell("MiniVanTotalEstimateFare","$ "+Math.round(TotalEstimatedFareMiniVan));
												
												
												
												
												
												ChangeCell("ExecutiveSUVBaseFare","$ "+50.00);
												ChangeCell("ExecutiveSUVMileageCost","$ "+Math.round(MileageCostExecutiveSUV));
												ChangeCell("ExecutiveSUVTimeCost","$ "+Math.round(TimeCost));
												ChangeCell("ExecutiveSUVCurbside","Free ");
												if(document.getElementById("MeetNGreetInp").checked==true){
													ChangeCell("ExecutiveSUVCurbside","$ 15.00 ");
												}
												ChangeCell("ExecutiveSUVSurcharge"," ");
												if(nightSurcharge==5){
													ChangeCell("ExecutiveSUVSurcharge","$ 5.00");
												}
												ChangeCell("ExecutiveSUVAnimals"," ");
												if(document.getElementById("PetsInputCheck").checked==true){
													ChangeCell("ExecutiveSUVAnimals","$ 15.00 ");
												}
												ChangeCell("ExecutiveSUVItems"," ");
												if(document.getElementById("ItemsInputCheck").checked==true){
													ChangeCell("ExecutiveSUVItems","$ 15.00 ");
												}												
												ChangeCell("ExecutiveSUVBooster"," ");
												if(document.getElementById("carSeatInp").checked==true){
													ChangeCell("ExecutiveSUVBooster","$ 15.00 ");
												}
												ChangeCell("ExecutiveSUVWaiting","$*");
												ChangeCell("ExecutiveSUVExtraStops"," ");
												if(document.getElementById("ExtraStopsInp").checked==true){
													ChangeCell("ExecutiveSUVExtraStops","$ 15.00 ");
												}
												ChangeCell("ExecutiveSUVEstimateFare","$ "+Math.round(EstimatedFareExecutiveSUV));
												ChangeCell("ExecutiveSUVTotalEstimateFare","$ "+Math.round(TotalEstimatedFareExecutiveSUV));
												
												
												
												
												
												
												
												
												
												
												
												/*ChangeCell("ExecutiveSedanBaseFare","$ "+40.00);
												ChangeCell("ExecutiveSedanMileageCost","$ "+MileageCostExecutiveSedan);
												ChangeCell("ExecutiveSedanTimeCost","$ "+TimeCost);
												ChangeCell("ExecutiveSedanCurbside","Free ");
												ChangeCell("ExecutiveSedanMeetNGreet","$ 15.00");
												ChangeCell("ExecutiveSedanSurcharge","$ 5.00");
												ChangeCell("ExecutiveSedanBooster","$ 15.00");
												ChangeCell("ExecutiveSedanWaiting","$*");
												ChangeCell("ExecutiveSedanExtraStops","$**");
												ChangeCell("ExecutiveSedanEstimateFare","$ "+EstimatedFareExecutiveSedan);
												ChangeCell("ExecutiveSedanTotalEstimateFare","$ "+TotalEstimatedFareExecutiveSedan);
												
												ChangeCell("MiniVanBaseFare","$ "+45.00);
												ChangeCell("MiniVanMileageCost","$ "+MileageCostMiniVan);
												ChangeCell("MiniVanTimeCost","$ "+TimeCost);
												ChangeCell("MiniVanCurbside","Free ");
												ChangeCell("MiniVanMeetNGreet","$ 15.00");
												ChangeCell("MiniVanSurcharge","$ 5.00");
												ChangeCell("MiniVanBooster","$ 15.00");
												ChangeCell("MiniVanWaiting","$*");
												ChangeCell("MiniVanExtraStops","$**");
												ChangeCell("MiniVanEstimateFare","$ "+EstimatedFareMiniVan);
												ChangeCell("MiniVanTotalEstimateFare","$ "+TotalEstimatedFareMiniVan);
												
												ChangeCell("ExecutiveSUVBaseFare","$ "+50.00);
												ChangeCell("ExecutiveSUVMileageCost","$ "+MileageCostExecutiveSUV);
												ChangeCell("ExecutiveSUVTimeCost","$ "+TimeCost);
												ChangeCell("ExecutiveSUVCurbside","Free ");
												ChangeCell("ExecutiveSUVMeetNGreet","$ 15.00");
												ChangeCell("ExecutiveSUVSurcharge","$ 5.00");
												ChangeCell("ExecutiveSUVBooster","$ 15.00");
												ChangeCell("ExecutiveSUVWaiting","$*");
												ChangeCell("ExecutiveSUVExtraStops","$**");
												ChangeCell("ExecutiveSUVEstimateFare","$ "+EstimatedFareExecutiveSUV);
												ChangeCell("ExecutiveSUVTotalEstimateFare","$ "+TotalEstimatedFareExecutiveSUV);*/
											
											
												ChangeCellColor(selectedCar,"BaseFare");
												ChangeCellColor(selectedCar,"MileageCost");
												ChangeCellColor(selectedCar,"TimeCost");
												ChangeCellColor(selectedCar,"Curbside");
												
												ChangeCellColor(selectedCar,"Animals");
												ChangeCellColor(selectedCar,"Items");

												//ChangeCellColor(selectedCar,"MeetNGreet");
												ChangeCellColor(selectedCar,"Surcharge");
												ChangeCellColor(selectedCar,"Booster");
												ChangeCellColor(selectedCar,"Waiting");
												ChangeCellColor(selectedCar,"ExtraStops");
												ChangeCellColor(selectedCar,"Toll");
												ChangeCellColor(selectedCar,"EstimateFare");
												ChangeCellColor(selectedCar,"TotalEstimateFare");
												
											if(selectedCar=="Hybrid"){
													var fareTotal=TotalEstimatedFareHybrid;
													fareTotal=(fareTotal).toFixed(2);
													alert(fareTotal);
													document.getElementById("FareText").innerHTML= "Fare = "+fareTotal+" $";
											}
											else if(selectedCar=="ExecutiveSedan"){
												var fareTotal=TotalEstimatedFareExecutiveSedan;
													fareTotal=(fareTotal).toFixed(2);
													alert(fareTotal);
													document.getElementById("FareText").innerHTML= "Fare = "+fareTotal+" $";
											}
											else if(selectedCar=="ExecutiveSUV"){
												var fareTotal=TotalEstimatedFareExecutiveSUV;
													fareTotal=(fareTotal).toFixed(2);
													alert(fareTotal);
													document.getElementById("FareText").innerHTML= "Fare = "+fareTotal+" $";
											}
											else if(selectedCar=="ClubVan"){
												var fareTotal=EstimatedFareHybrid;
													fareTotal=(fareTotal).toFixed(2);
													alert(fareTotal);
													document.getElementById("FareText").innerHTML= "Fare = "+fareTotal+" $";
											}
											else if(selectedCar=="MercedesVan"){
												var fareTotal=EstimatedFareHybrid;
													fareTotal=(fareTotal).toFixed(2);
													alert(fareTotal);
													document.getElementById("FareText").innerHTML= "Fare = "+fareTotal+" $";
											}
											else if(selectedCar=="MiniVan"){
												var fareTotal=TotalEstimatedFareMiniVan;
													fareTotal=(fareTotal).toFixed(2);
													alert(fareTotal);
													document.getElementById("FareText").innerHTML= "Fare = "+fareTotal+" $";
											}
											else if(selectedCar=="Limo"){
												var fareTotal=EstimatedFareHybrid;
													fareTotal=(fareTotal).toFixed(2);
													alert(fareTotal);
													document.getElementById("FareText").innerHTML= "Fare = "+fareTotal+" $";
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



