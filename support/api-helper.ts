import * as request from "request-promise";
import { getLogger } from "log4js";
const logger = getLogger();
logger.level = "debug";

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
            const response = await request.get(options);
            logger.info('get request response -->', response);
            return response;
        }
        catch (error) {
            logger.info('get request error -->', error);
            return error;
        }
    }

    async postRequestMethod(url, apiKey, requestBody) {
        let responseStatusCode;
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
            const res = await request.post(options, function(error, response) {
                logger.info('post request response -->', response);
                responseStatusCode = response.statusCode;
            });
            logger.info('post request statusCode -->', responseStatusCode);
            return {
                response: res,
                statusCode: responseStatusCode
            };
        }
        catch (error) {
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
            const response = await request.delete(options);
            logger.info('delete request response -->', response);
            return response;
        }
        catch (error) {
            logger.info('delete request error -->', error);
            return error;
        }
    }
}

const apiHelper = new ApiHelper();
export { apiHelper };