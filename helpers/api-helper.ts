import axios from 'axios';
import { getLogger } from "log4js";
const logger = getLogger();
logger.level = "debug";

class ApiHelper {
    timeout = 10000;

    async postRequestMethod(url, requestBody, apiKey) {
        try {
            const response = await axios({
                method: 'post',
                url: url,
                headers: {
                    'content-type': 'application/json'
                },
                params: {
                    APPID: apiKey
                },
                timeout: this.timeout,
                data: requestBody
            });
            return response;
        }
        catch(err) {
            return this.catchError(err);
        }
    }

    async getRequestMethod(url, apiKey) {
        try {
            const response = await axios({
                method: 'get',
                url: url,
                headers: {
                    'content-type': 'application/json'
                },
                params: {
                    APPID: apiKey
                },
                timeout: this.timeout
            });
            return response;
        }
        catch (err) {
            return this.catchError(err);
        }
    }

    async deleteRequestMethod(url, apiKey) {
        try {
            const response = await axios({
                method: 'delete',
                url: url,
                headers: {
                    'content-type': 'application/json'
                },
                params: {
                    APPID: apiKey
                },
                timeout: this.timeout
            });
            return response;
        }
        catch(err) {
            return this.catchError(err);
        }
    }

    private catchError(err) {
        if (err.response) {
            // the request went through and a response was returned
            // status code in 3xx / 4xx / 5xx range
            logger.info(`
                request went through and an error response was returned with
                message: ${err.response.data.message} and
                status code: ${err.response.status}`);
            return err.response;

        } else if (err.request) {
            logger.info(
                `request was made but server returned no response\n ${err.request}`);
            throw err.request;
        } else {
            logger.info(
                `something went wrong in setting up the request\n ${err.message}`);
            throw err.message;
        }
    }
}

const apiHelper = new ApiHelper();
export { apiHelper };