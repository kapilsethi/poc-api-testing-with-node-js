const request = require('request-promise');

class ApiHelper {
    async getRequestMethod(url, apiKey) {
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
        try {
            const response = await request(options);
            // console.log('get request response -->', response);
            return response;
        }
        catch (error) {
            // console.log('get request error -->', error);
            return error;
        }
    }

    async postRequestMethod(url, apiKey, requestBody) {
        var responseStatusCode;
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
        try {
            const res = await request(options, function(error, response) {
                responseStatusCode = response.statusCode;
            });
            // console.log('post request response -->', response);
            // console.log('post request statusCode -->', responseStatusCode);
            return {
                response: res,
                statusCode: responseStatusCode
            };
        }
        catch (error) {
            // console.log('post request error -->', response);
            return error;
        }
    }

    async deleteRequestMethod(url, apiKey) {
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
        try {
            const response = await request(options);
            // console.log('delete request response -->', response);
            return response;
        }
        catch (error) {
            // console.log('delete request error -->', error);
            return error;
        }
    }
}

module.exports = ApiHelper;