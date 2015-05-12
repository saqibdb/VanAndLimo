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
var accountType;
var HasError=1;

var isBusiness=1;

function initializeBody() {
	
								
	
	
		
	
	

}
$(document).ready(function(){

		Parse.initialize("E8ap04MFi10rGpHEHyBW8TLT3iI1dujwz5mctm0D", "Tbb1Ue2xaCGAUR9vOKSlB4KyKFj9qcpaPGGD7wnX");
    
				/**///Sign up
					
					$("#my-comment").EasyComment();
		radioClick();			
				
		
		
						});
						
function LoginCheck(){

				var username=document.getElementById("usernametxt").value;
				var password=document.getElementById("passwordtxt").value;

alert(password);
				Parse.User.logIn(username, password, {
				  success: function(user) {
					if(user.get("emailVerified")==false){
						alert("The Email for "+username+" was not verified. Please Verify Email to Login");
					}
					else{
						alert("Hooray! Let "+user.get("HomeNumber")+" use");// Do stuff after successful login.
						
						var currentUser = Parse.User.current();
						window.location.href = 'Dashboard.html';
					}
					
				  },
				  error: function(user, error) {
					alert(error.code+" "+error.message);// The login failed. Check error to see why.
				  }
				});//log in





}
function test(){
				//PassMatch();

				var GameScore = Parse.Object.extend("Booking_information");
				var gameScore = new GameScore();
				 





					gameScore.set("ChildSeat", "Yes");
			        gameScore.set("Date", "14,2,2015");
			        gameScore.set("Distance", "100miles");
			        gameScore.set("DropOff", "BWI");
			        gameScore.set("ExtraLargeItems", "No");
			        gameScore.set("LuggageType", "Standard");
			        gameScore.set("MeetNGreet", "No");
			        gameScore.set("NightSurcharge", "Yes");
			        gameScore.set("NoOfBags", "4");
			        gameScore.set("NoOfPassengers", "5");


			        gameScore.set("Pets", "Snake");
			        gameScore.set("PickUp", "Woodlawn");
			        gameScore.set("SpecialNotes", "Lol");
			        gameScore.set("Time", "4:50pm");
			        gameScore.set("TotalFare", "190$");
			        gameScore.set("TravelTime", "55mins");

			        gameScore.set("VehicleType", "Hummer");
			        

			

				gameScore.save(null, {
				  success: function(gameScore) {
				    // Execute any logic that should take place after the object is saved.
				    alert('New object created with objectId: ' + gameScore.id);
				  },
				  error: function(gameScore, error) {
				    // Execute any logic that should take place if the save fails.
				    // error is a Parse.Error with an error code and message.
				    alert('Failed to create new object, with error code: ' + error.message);
				  }
				});



			        			        				 									alert("saqib");


}
function haha(){
alert("hahahah");
}
function radioClick(){

	if(!document.getElementById("optionsRadios1").checked){
	var Ext = document.createElement("input");
	
	Ext.class="form-control input";
	Ext.id="ExtInput";
	Ext.placeholder="Extension";
	Ext.required="required";
	Ext.maxlength="10";
	Ext.type="text";
	Ext.name="email";

	document.getElementById("ExtensionDiv").appendChild(Ext);
	
	document.getElementById("BusinessPhInp").placeholder="Business Phone # ";
		//document.getElementById("BusinessPhInp").innerHTML= "Company Name : ";
		//document.getElementById("HomePhTxt").innerHTML= "* Business Phone : ";
		accountType="Business";
	isBusiness=1;
	}
	else{
	
		var element = document.getElementById("ExtInput");
			element.remove();
		document.getElementById("BusinessPhInp").placeholder="Home Phone # ";

		//document.getElementById("CompanyTxt").innerHTML= "User Name : ";
		//document.getElementById("HomePhTxt").innerHTML= "* Home Phone : ";
		accountType="Home";
		isBusiness=0;
	}
		

}
function PassMatch(){
		var password1=document.getElementById("inputPassword").value;
		var password2=document.getElementById("inputPassword2").value;
		if(password1==password2){
			//document.getElementById("ConfirmTxt").style.color = "black";
			HasError=0;
		}
		else{
			//document.getElementById("ConfirmTxt").style.color = "red";
			HasError=1;
		}
	

}
