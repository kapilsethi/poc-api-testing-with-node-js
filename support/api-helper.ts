import axios from 'axios';
import { getLogger } from "log4js";
const logger = getLogger();
logger.level = "debug";

class ApiHelper {
    timeout = 10000;

    async postRequestMethod(url, requestBody, useApiKey) {
        try {
            const response = await axios({
                method: 'post',
                url: url,
                headers: {
                    'content-type': 'application/json'
                },
                params: {
                    APPID: await this.getApiLKey(useApiKey)
                },
                timeout: this.timeout,
                data: {
                    "external_id": requestBody.external_id,
                    "name": requestBody.name,
                    "latitude": requestBody.latitude,
                    "longitude": requestBody.longitude,
                    "altitude": requestBody.altitude
                }
            });
            return response;
        }
        catch(err) {
            return this.catchError(err);
        }
    }

    async getRequestMethod(url) {
        try {
            const response = await axios({
                method: 'get',
                url: url,
                // baseURL: testData["url"],
                headers: {
                    'content-type': 'application/json'
                },
                params: {
                    APPID: await this.getApiLKey(true)
                },
                timeout: this.timeout
            });
            return response.data;
        }
        catch (err) {
            return this.catchError(err);
        }
    }

    async deleteRequestMethod(url) {
        try {
            const response = await axios({
                method: 'delete',
                url: url,
                headers: {
                    'content-type': 'application/json'
                },
                params: {
                    APPID: await this.getApiLKey(true)
                },
                timeout: this.timeout
            });
            return response;
        }
        catch(err) {
            return this.catchError(err);
        }
    }

    private async getApiLKey(useApiKey) {
        return useApiKey? process.env.API_KEY : '';
    }

    private catchError(err) {
        if (err.response) {
            // the request went through and a response was returned
            // status code in 3xx / 4xx / 5xx range
            logger.info(`request went through and an error response was returned with\n
                message: ${err.response.data.message} and\nstatus code: ${err.response.status}`);
            return err.response;

        } else if (err.request) {
            logger.info(`request was made but server returned no response\n ${err.request}`);
            throw err.request;
        } else {
            logger.info(`somthing went wrong in setting up the request\n ${err.message}`);
            throw err.message;
        }
    }
}

const apiHelper = new ApiHelper();
export { apiHelper };