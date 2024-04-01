import "dotenv/config";
import { expect } from "chai";
import * as testData from "../test-data/test-data.json";
import * as stationTestData from "../test-data/station-test-data.json";
import { apiHelper } from "../helpers/api-helper";
import { mockHelper } from "../helpers/mock-helper";

describe("Register station --> should be able to register station when valid api key is provided in the request ", async () => {
  let stationId: string;
  let url: string;
  let apiKey: any;
  let urlForGetRegisteredStationApi: string;
  let postRegisterStationResponse: any;
  let getRegisteredStationResponse: any;
  let deleteRegisteredStationResponse: any;
  let getRegisteredStationAfterDeletingResponse: any;
  const testEnv = process.env.TEST_ENV;

  describe("Test data setup ", async () => {
    it("Setup - add mocks if running against mock data", async () => {
      await mockHelper.addStub();
    });

    it("Setup - get the api key and set the post station register api endpoint", async () => {
      apiKey =
        testEnv === "prod"
          ? process.env.API_KEY
          : testData[testEnv]["validApiKey"];
      url = `${testData[testEnv]["baseUrl"]}${testData[testEnv]["stationsUrl"]}`;
    });
  });

  describe("Test starts here ", async () => {
    it("make a post request to register station with required api key", async () => {
      postRegisterStationResponse = await apiHelper.postRequestMethod(
        url,
        stationTestData,
        apiKey
      );
      console.log(
        "post station register api response: ",
        postRegisterStationResponse.data
      );
    });

    it("validate status code and status text in the post register station api response", async () => {
      expect(
        postRegisterStationResponse.status,
        "post station data api response status code mismatch"
      ).to.equal(201);
      expect(postRegisterStationResponse.statusText).to.equal("Created");
    });

    it("validate external id, name and the locations in the post register station api response", async () => {
      expect(postRegisterStationResponse.data.external_id).to.equal(
        stationTestData.external_id
      );
      expect(postRegisterStationResponse.data.name).to.equal(
        stationTestData.name
      );
      expect(postRegisterStationResponse.data.latitude).to.equal(
        stationTestData.latitude
      );
      expect(postRegisterStationResponse.data.longitude).to.equal(
        stationTestData.longitude
      );
      expect(postRegisterStationResponse.data.altitude).to.equal(
        stationTestData.altitude
      );
    });

    it("fetch the registered station id from post register station api response and create get registered station url for api call", async () => {
      stationId = postRegisterStationResponse.data.ID;
      urlForGetRegisteredStationApi = `${url}/${stationId}`;
      console.log(
        "updated url for get registered station request --> ",
        urlForGetRegisteredStationApi
      );
    });

    it("make a get registered station api call", async () => {
      getRegisteredStationResponse = await apiHelper.getRequestMethod(
        urlForGetRegisteredStationApi,
        apiKey
      );

      console.log(
        "get registered station api response: ",
        postRegisterStationResponse.data
      );
    });

    it("validate status code and status text in the get registered station api response", async () => {
      expect(
        getRegisteredStationResponse.status,
        "get registered station api response status code mismatch"
      ).to.equal(200);
      expect(getRegisteredStationResponse.statusText).to.equal("OK");
      console.log("Station " + stationId + " is registered successfully");
    });

    it("validate external id, name and the locations in the get registered station api response", async () => {
      expect(getRegisteredStationResponse.data.external_id).to.equal(
        stationTestData.external_id
      );
      expect(getRegisteredStationResponse.data.name).to.equal(
        stationTestData.name
      );
      expect(getRegisteredStationResponse.data.latitude).to.equal(
        stationTestData.latitude
      );
      expect(getRegisteredStationResponse.data.longitude).to.equal(
        stationTestData.longitude
      );
      expect(getRegisteredStationResponse.data.altitude).to.equal(
        stationTestData.altitude
      );
    });
  });

  describe("Tear down --> should be able to delete the registered station ", async () => {
    it("make a delete registered station api call", async () => {
      deleteRegisteredStationResponse = await apiHelper.deleteRequestMethod(
        urlForGetRegisteredStationApi,
        apiKey
      );

      console.log(
        "delete registered station api response: ",
        deleteRegisteredStationResponse.data
      );
    });

    it("validate status in the delete registered station api response", async () => {
      expect(
        deleteRegisteredStationResponse.status,
        "delete station api response status code mismatch"
      ).to.equal(204);
      expect(deleteRegisteredStationResponse.statusText).to.equal("No Content");
    });

    it("make a get registered station api call after deleting", async () => {
      const updatedApiKey =
        testEnv === "prod"
          ? process.env.API_KEY
          : testData[testEnv]["deleteValidApiKey"];
      getRegisteredStationAfterDeletingResponse =
        await apiHelper.getRequestMethod(
          urlForGetRegisteredStationApi,
          updatedApiKey
        );

      console.log(
        "get registered station after deleting api response: ",
        getRegisteredStationAfterDeletingResponse.data
      );
    });

    it("should not be getting station as its been deleted", async () => {
      expect(
        getRegisteredStationAfterDeletingResponse.status,
        "delete station data api response status code mismatch"
      ).to.equal(404);
      expect(getRegisteredStationAfterDeletingResponse.data.message).to.equal(
        "Station not found"
      );
    });
  });
});
