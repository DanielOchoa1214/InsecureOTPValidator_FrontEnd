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

    let _setBack = (from) => {
        $(".back-to-login").click(() => {
            tries = 0;
            $(`#${from}`).addClass("not-in-screen");
            $("#login-form-div").removeClass("not-in-screen");
        });
    };

    let _sendOTP = () => {
        let username = $("#recover-user").val();
        api.sendOTP(username).then((res) => {
            tries = 0;
            _otp = res;
            alert(`An email was sent to ${username} with the code to recover your password`);
            $("#recover-btn").addClass("not-in-screen");
            $("#validate-otp-form").removeClass("not-in-screen");
            console.log(_otp);
        });
    };

    let _checkChangeForms = (condition) => {
        if (condition) {
            $("#recover-div").addClass("not-in-screen");
            $("#change-password").removeClass("not-in-screen");
            $(".error-text").text("");
            //OIDC
        } else {
            $(".error-text").text("Incorrect, try again");
        }
    };

    let _backValidateOTP = () => {
        let username = $("#recover-user").val();
        let otp = $("#otp").val();
        api.verifyOTP(username, otp).then((res) => {
            console.log(res);
            _checkChangeForms(res);
        });
    };

    let _frontValidateOTP = () => {
        let otp = $("#otp").val();
        _checkChangeForms(otp === _otp);
    };

    let _checkTooMuchAttempts = () => {
        tries++;
        if(tries === 5){
            alert("You've exceded the maximum amount of atempts, the page will now reload and you can try again");
            location.reload();
        }
    };

    let _changePassword = () => {
        let newPass = $("#new-password").val();
        let newPassConfirm = $("#confirm-password").val();
        let username = $("#recover-user").val();
        if(newPass === newPassConfirm){
            api.changePassword(username, newPass).then((res) => {
                alert(res);
                location.reload();
            });
            $(".error-text").text("");
        } else {
            $(".error-text").text("The inputs don't match each other, try again");
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
            // _backValidateOTP();
            _frontValidateOTP();
            _checkTooMuchAttempts();
        });
        $("#change-password-form").submit((event) => {
            event.preventDefault();
            _changePassword();
        });
        _setALink();
        _setBack("recover-div");   
    };

    return _publicFunctions;
})(authclient);