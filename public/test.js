function login() {
	var username = $("#username").val();
	var password = $("#password").val();

	console.log("Username and password:" + username + password);

	var params = {
		username: username,
		password: password
	};

    //sends status message to login.html
	$.post("/login", params, function(result) {
		if (result && result.success) {
			$("#status").text("Successfully logged in.");
		} else {
			$("#status").text("Error logging in.");
		}
	});
}