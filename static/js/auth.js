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

        $("#forgot-password-a").click(() => {
            $("#login-form-div").addClass("not-in-screen");
            $("#recover-div").removeClass("not-in-screen");
        });

        $("#back-to-login").click(() => {
            $("#recover-div").addClass("not-in-screen");
            $("#login-form-div").removeClass("not-in-screen");
        });
    };

    return _publicFunctions;
})(authclient);