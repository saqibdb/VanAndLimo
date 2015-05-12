
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

                         
        