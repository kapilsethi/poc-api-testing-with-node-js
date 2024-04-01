import "dotenv/config";
import { expect } from "chai";
import * as testData from "../test-data/test-data.json";
import { apiHelper } from "../helpers/api-helper";
import { mockHelper } from "../helpers/mock-helper";

describe("Register station --> should NOT be able to register station when the api key is NOT provided in the request ", async () => {
  let url: string;
  let response: any;
  let expectedUrl: string;
  const testEnv = process.env.TEST_ENV;

  describe("Test data setup ", async () => {
    it("Setup - add mocks if running against mock data", async () => {
      await mockHelper.addStub();
    });

    it("Setup - create station register request - set the post api endpoint", async () => {
      url = `${testData[testEnv]["baseUrl"]}${testData[testEnv]["stationsUrl"]}`;
    });

    it("Setup - create station register response - update the post api endpoint in the expected response", async () => {
      expectedUrl = `${testData[testEnv]["baseUrl"]}`.replace("api.", "");
    });
  });

  describe("Test starts here ", async () => {
    it("create station register request - make a post api request without required api key", async () => {
      response = await apiHelper.postRequestMethod(url, "", "");
    });

    it("create station register response - validate the api response is as expected", async () => {
      expect(
        response.status,
        "create station register post api response when no api key - status code mismatch"
      ).to.equal(401);
      expect(response.data.message).to.equal(
        `Invalid API key. Please see ${expectedUrl}faq#error401 for more info.`
      );
    });
  });
});
