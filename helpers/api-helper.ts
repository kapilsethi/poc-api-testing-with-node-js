import * as https from "https";
import axios, { AxiosError } from "axios";

class ApiHelper {
  timeout = 10000;
  instance = axios.create({
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  });
  async postRequestMethod(url: string, requestBody: any, apiKey: string) {
    try {
      const response = await this.instance({
        method: "post",
        url: url,
        headers: {
          "content-type": "application/json",
        },
        params: {
          APPID: apiKey,
        },
        timeout: this.timeout,
        data: requestBody,
      });
      return response;
    } catch (err) {
      return await this.catchError(err);
    }
  }

  async getRequestMethod(url: string, apiKey: string) {
    try {
      const response = await this.instance({
        method: "get",
        url: url,
        headers: {
          "content-type": "application/json",
        },
        params: {
          APPID: apiKey,
        },
        timeout: this.timeout,
      });
      return response;
    } catch (err) {
      return await this.catchError(err);
    }
  }

  async deleteRequestMethod(url: string, apiKey: any) {
    try {
      const response = await this.instance({
        method: "delete",
        url: url,
        headers: {
          "content-type": "application/json",
        },
        params: {
          APPID: apiKey,
        },
        timeout: this.timeout,
      });
      return response;
    } catch (err) {
      return await this.catchError(err);
    }
  }

  private async catchError(error: any) {
    const err = error as AxiosError;
    if (err.response) {
      // the request went through and a response was returned
      // status code in 3xx / 4xx / 5xx range
      console.log(`
                request went through and an error response was returned with data:\n
                ${JSON.stringify(err.response.data, null, 2)}
                and status code\n: ${err.response.status}`);
      return err.response;
    } else if (err.request) {
      console.log(
        `request was made but server returned no response\n
        error.code: ${err.code}
        error.stack: ${err.stack}
        error.name: ${err.name}
        error.message: ${err.message}
        error.config.method: ${err.config.method}
        error.config.url: ${err.config.url}
        }`
      );
      throw err.request;
    } else {
      console.log(
        `something went wrong in setting up the request\n ${JSON.stringify(
          err,
          null,
          2
        )}`
      );
      throw err;
    }
  }
}

const apiHelper = new ApiHelper();
export { apiHelper };
