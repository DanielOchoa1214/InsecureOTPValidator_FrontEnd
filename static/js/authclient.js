let authclient = (function () {  
    let _server = enviroment.server;
    let _publicFunctions = {};

    let _error = (err) => {
        $(".error-text").text(err.responseText);
    }

    let _success = () => {
        $(".error-text").text("");
    }

    _publicFunctions.login = function (username, password) {  
        return $.ajax({
            url: `${_server}/auth/login`,
            type: 'GET',
            data: {
                user: username,
                password: password,
            },
            contentType: "application/json",
            error: (err) => _error(err),
            success: () => _success(),
        });
    };

    _publicFunctions.sendOTP = function (username) {  
        return $.ajax({
            url: `${_server}/auth/passwords`,
            type: 'POST',
            data: JSON.stringify({userName: username}),
            contentType: "application/json",
            error: (err) => _error(err),
            success: () => _success(),
        });
    };

    _publicFunctions.verifyOTP = function (username, otp) {  
        return $.ajax({
            url: `${_server}/auth/passwords`,
            type: 'GET',
            data: {
                user: username,
                otp: otp,
            },
            contentType: "application/json",
            error: (err) => _error(err),
            success: () => _success(),
        });
    };

    _publicFunctions.changePassword = function (userName, password) {  
        return $.ajax({
            url: `${_server}/auth/passwords`,
            type: 'PUT',
            data: JSON.stringify({
                userName: userName,
                password: password,
            }),
            contentType: "application/json",
            error: (err) => _error(err),
            success: () => _success(),
        });
    };

    return _publicFunctions;
})();