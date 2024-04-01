import "dotenv/config";
import { expect } from "chai";
import * as testData from "../test-data/test-data.json";
import { apiHelper } from "../helpers/api-helper";
import { mockHelper } from "../helpers/mock-helper";

describe("Register station --> should NOT be able to register station when the api key is NOT provided in the request ", async () => {
  let url: string;
  let apiKey: any;
  let response: any;
  let expectedUrl: string;
  const testEnv = process.env.TEST_ENV;

  describe("Test data setup ", async () => {
    it("Setup - add mocks if running against mock data", async () => {
      await mockHelper.addStub();
    });

    it("Setup - get the api key and set the endpoint url", async () => {
      apiKey =
        testEnv === "prod"
          ? process.env.API_KEY
          : testData[testEnv]["validApiKey"];
      url = `${testData[testEnv]["baseUrl"]}${testData[testEnv]["stationsUrl"]}`;
    });

    it("Setup - endpoint in the expected response", async () => {
      expectedUrl = `${testData[testEnv]["baseUrl"]}`.replace("api.", "");
    });
  });

  describe("Test starts here ", async () => {
    it("make a post request to register station without required api key", async () => {
      response = await apiHelper.postRequestMethod(url, "", "");
    });

    it("validate the api response is as expected", async () => {
      expect(
        response.status,
        "post station data api with no api key response status code mismatch"
      ).to.equal(401);
      expect(response.data.message).to.equal(
        `Invalid API key. Please see ${expectedUrl}faq#error401 for more info.`
      );
    });
  });
});
