
function initializeBody() {


}
$(document).ready(function(){

Parse.initialize("E8ap04MFi10rGpHEHyBW8TLT3iI1dujwz5mctm0D", "Tbb1Ue2xaCGAUR9vOKSlB4KyKFj9qcpaPGGD7wnX");
var currentUser = Parse.User.current();
                                if (currentUser) {
                                    document.getElementById("signupBtn").remove();
                                    document.getElementById("signinBtn").remove();

                                }
                                else{
                                    document.getElementById("signoutBtn").remove();
                                }
    
	});
						
function SendFeedBack(){



				var name=document.getElementById("nametxt").value;
				var email=document.getElementById("emailtxt").value;
				var phone=document.getElementById("phtxt").value;
				var msg="Name : "+name+"/nMessage : "+document.getElementById("msgtxt").value;


				$.ajax({
			      type: 'POST',
			      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
			      data: {
			        'key': 'TKR3RIXutCV5JmN2fyyXyQ',
			        'message': {
			          'from_email': email,
			          'to': [
			              {
			                'email': 'me@saqibdb.com',
			                'name': 'Van and Limo',
			                'type': 'to'
			              }
			            ],
			          'autotext': 'true',
			          'subject': 'Van and Limo Contact us',
			          'html': msg
			        }
			      }
			     }).done(function(response) {
			       alert(response.body); // if you're into that sorta thing
			     });




}
