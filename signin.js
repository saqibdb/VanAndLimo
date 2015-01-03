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
					
					
		radioClick();			
				
		
		
						});
						
function LoginCheck(){

				var username=document.getElementById("usernametxt").value;
				var password=document.getElementById("passwordtxt").value;


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
					alert(error.message);// The login failed. Check error to see why.
				  }
				});//log in





}
function SignUp(){
				//PassMatch();
				
			if(HasError==0){
				var email=document.getElementById("inputEmail").value;
				var password=document.getElementById("inputPassword").value;

				
				var accountType="Business";//change needed here after the net
				var username=email;

				var LastName=document.getElementById("inputLastName").value;
				var FirstName=document.getElementById("inputFirstName").value;
				var MobileNumber=document.getElementById("inputMobile").value;
				var HomeNumber=document.getElementById("BusinessPhInp").value;
							
				var Extension="nil";
				

				if(isBusiness==1){
					accountType="Business";
					Extension=document.getElementById("ExtInput").value;
				}
				else{
					accountType="Home";
					Extension="nil";
				}

				var user = new Parse.User();
					user.set("email", email);
					user.set("password", password);	
					user.set("accountType", accountType);
					user.set("username", username);
					user.set("LastName", LastName);
					user.set("FirstName", FirstName);
					user.set("MobileNumber", MobileNumber);
					user.set("HomeNumber", HomeNumber);
					user.set("Extension", Extension);
					
					user.signUp(null, {
						  success: function(user) {
							// Hooray! Let them use the app now.
							alert("Hooray! Let them use the app now");
						  },
						  error: function(user, error) {
							// Show the error message somewhere and let the user try again.
							alert("Error: " + error.code + " " + error.message);
						  }
						});
				}
				else{
					alert("Password Do not match");
				}


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
