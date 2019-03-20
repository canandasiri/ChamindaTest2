
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
        console.log("---------Calling Banks------------");
        Swagger.http({
            url: `https://api.apixplatform.com/sbbank/1.0/bank/banks/banks`,
            method: 'get',
            query: { "page": "0", "size": "1" },
            headers: { "X-Authorization": access_token, "Accept": "*/*" }
        }).then((response) => {
            // your code goes here
            console.log(response.body);
            console.log("---------Calling Accounts------------");
            Swagger.http({
                url: `https://api.apixplatform.com/sbaccount/1.0/account/accounts/accounts`,
                method: 'get',
                query: { "page": "0", "size": "1" },
                headers: { "X-Authorization": access_token, "Accept": "*/*" }
            }).then((response) => {
                // your code goes here
                console.log(response.body);
                console.log("---------Calling listPersonTypes------------");
                Swagger.http({
                    url: `https://api.apixplatform.com/sbparty/1.0/party/party/person-types`,
                    method: 'get',
                    query: { "page": "0", "size": "1" },
                    headers: { "X-Authorization": access_token, "Accept": "*/*" }
                }).then((response) => {
                    // your code goes here
                    console.log(response.body);
                }).catch((err) => {
                    // error handling goes here
                    console.log("Error");
                });

            }).catch((err) => {
                // error handling goes here
            });
            console.log(response.body);
        }).catch((err) => {
            // error handling goes here
        });


        callback(null, access_token);
    }).catch((err) => {
        console.log(err);
        callback("Execution failed");
    });

}