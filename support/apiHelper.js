const request = require('request-promise')

class ApiHelper {
    getRequestMethod(url, apiKey) {
        const options = {
            method: 'GET',
            url: url,
            json: true,
            headers: {
                'content-type': 'application/json'
            },
            qs: {
                APPID: apiKey
            }
        };
        return request(options).then (function (response) {
            return response;
        })
        .catch(function (error) {
            return error;
        });
    };

    postRequestMethod(url, apiKey, requestBody) {
        const options = {
            method: 'POST',
            url: url,
            json: true,
            headers: {
                'content-type': 'application/json'
            },
            qs: {
                APPID: apiKey
            },
            body:{
                    "external_id": requestBody.external_id,
                    "name": requestBody.name,
                    "latitude": requestBody.latitude,
                    "longitude": requestBody.longitude,
                    "altitude": requestBody.altitude
            }
        };
        return request(options).then (function (response) {
            // console.log('post request response -->', response);
            return response;
        })
        .catch(function (error) {
            // console.log('post request error -->', response);
            return error;
        });
    };

    deleteRequestMethod(url, apiKey) {
        const options = {
            method: 'DELETE',
            url: url,
            json: true,
            headers: {
                'content-type': 'application/json'
            },
            qs: {
                APPID: apiKey
            }
        };
        return request(options).then (function (response) {
            // console.log('delete request response -->', response);
            return response;
        })
        .catch(function (error) {
            // console.log('delete request error -->', error);
            return error;
        });
    }
}

module.exports = ApiHelper;