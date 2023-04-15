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
        api.verifyOTP(username, otp).then((res) => {
            console.log(res);
            if (res) {
                // Crear formulario de cambio de contraseña y la API para ello / pasar al siguiente formulario
                $("#recover-div").addClass("not-in-screen");
                $("#change-password").removeClass("not-in-screen");
                $(".error-text").text("");
                //OIDC
            } else {
                $(".error-text").text("Incorrect, try again");
            }
        });
    };

    let _frontValidateOTP = () => {
        let otp = $("#otp").val();
        if(otp === _otp){
            $("#recover-div").addClass("not-in-screen");
            $("#change-password").removeClass("not-in-screen");
            $(".error-text").text("");
        } else {
            $(".error-text").text("Incorrect, try again");
        }
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
            // Revisar intentos
            if(tries !== 5){
                _backValidateOTP();
                // _frontValidateOTP();
                tries++;
            } else {
                alert("You've exeded the maximum amount of atempts, the page will now reload and you can try again");
                location.reload();
            }
        });
        // Crear cambio de contraseña
        _setALink();
        _setBack();        
    };

    return _publicFunctions;
})(authclient);