let auth = (function (api) {  
    let _publicFunctions = {};
    let _userInput = $("#user");
    let _passwordInput = $("#password");
    let _otp = "";
    let tries = 0;

    let _login = () => {
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
    };

    let _setALink = () => {
        $("#forgot-password-a").click(() => {
            $("#login-form-div").addClass("not-in-screen");
            $("#recover-div").removeClass("not-in-screen");
        });
    };

    let _setBack = () => {
        $("#back-to-login").click(() => {
            tries = 0;
            $("#recover-div").addClass("not-in-screen");
            $("#login-form-div").removeClass("not-in-screen");
        });
    };

    let _sendOTP = () => {
        let username = $("#recover-user").val();
        api.sendOTP(username).then((res) => {
            tries = 0;
            _otp = res;
            alert(`The email was sent to ${username} check it and with it fill the next field`);
            $("#recover-btn").addClass("not-in-screen");
            $("#validate-otp-form").removeClass("not-in-screen");
            console.log(_otp);
        });
    };

    let _backValidateOTP = () => {
        let username = $("#recover-user").val();
        let otp = $("#otp").val();
        // Revisar como se limitan los intentos tal vez se puede con html ??? PauseChamp
        api.verifyOTP(username, otp).then((res) => {
            if (res) {
                // Crear formulario de cambio de contraseña y la API para ello
            } else {
                tries++;
            }
        });
    };

    let _frontValidateOTP = () => {

    };

    _publicFunctions.init = function () {  
        $("#login-form").submit((event) => {
            event.preventDefault();
            _login();
        });
        $("#recover-form").submit((event) => {
            event.preventDefault();
            _sendOTP();
        });
        $("#validate-otp-form").submit((event) => {
            event.preventDefault();
            _backValidateOTP();
            _frontValidateOTP();
        })
        _setALink();
        _setBack();        
    };

    return _publicFunctions;
})(authclient);