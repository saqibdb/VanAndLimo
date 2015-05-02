
function initializeBody() {


}
$(document).ready(function(){

Parse.initialize("E8ap04MFi10rGpHEHyBW8TLT3iI1dujwz5mctm0D", "Tbb1Ue2xaCGAUR9vOKSlB4KyKFj9qcpaPGGD7wnX");
    
	});
						
function SendFeedBack(){



				var name=document.getElementById("nametxt").value;
				var email=document.getElementById("emailtxt").value;
				var phone=document.getElementById("phtxt").value;
				var msg=document.getElementById("msgtxt").value;


				var GameScore = Parse.Object.extend("Feedbacks");
				var gameScore = new GameScore();
				 





					gameScore.set("Name", name);
			        gameScore.set("Email", email);
			        gameScore.set("Ph_number", phone);
			        gameScore.set("Message", msg);
			        

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




}
