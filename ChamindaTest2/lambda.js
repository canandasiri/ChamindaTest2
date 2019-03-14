
let Swagger = require('swagger-client');

exports.handler = function (event, context, callback) {

    Swagger.http({
        url: 'https://services.apixplatform.com/api-sandbox/application/token',
        method: 'post',
        query: {},
        headers: { "Accept": "*/*", "Content-Type": "application/json" },
        body: JSON.stringify({
            "userName": "chamindaa@virtusa.com",
            "password": "1qaz2wsx@A"
        })
    }).then((response) => {
        var access_token = "bearer " + response.body.access_token;
        // Insert new API calls here to call with APIX Access Token


        callback(null, access_token);
    }).catch((err) => {
        console.log(err);
        callback("Execution failed");
    });

}