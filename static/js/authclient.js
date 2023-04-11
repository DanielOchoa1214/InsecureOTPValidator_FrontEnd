let authclient = (function () {  
    let _server = enviroment.server;
    let _publicFunctions = {};

    let _errorLogin = (err) => {
        $("#error-text").text(err.responseText);
    }

    let _successfullLogin = () => {
        $("#error-text").text("");
    }

    _publicFunctions.login = function (username, password) {  
        return $.ajax({
            url: `${_server}/auth`,
            type: 'GET',
            data: {
                user: username,
                password: password,
            },
            contentType: "application/json",
            error: (err) => _errorLogin(err),
            success: () => _successfullLogin(),
        });
    };

    return _publicFunctions;
})();