let auth = (function (api) {  
    let _publicFunctions = {};
    let _userInput = $("#user");
    let _passwordInput = $("#password");

    _publicFunctions.init = function () {  
        $("#login-form").submit((event) => {
            event.preventDefault();
            let username = _userInput.val();
            let password = _passwordInput.val();
            api.login(username, password).then((res) => {
                if(res) {
                    $(".container").first().addClass("not-in-screen");
                    $("#login-success").removeClass("not-in-screen");
                } else {
                    $("#error-text").text("Incorrect Username or Password");
                }
            });
        });
    };

    return _publicFunctions;
})(authclient);