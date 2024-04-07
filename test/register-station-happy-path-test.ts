import "dotenv/config";
import * as testData from "../test-data/test-data.json";
import * as stationTestData from "../test-data/station-test-data.json";
import { apiHelper } from "../helpers/api-helper";
import { mockHelper } from "../helpers/mock-helper";

describe("Register station --> should be able to register station when valid api key is provided in the request ", () => {
  let stationId: string;
  let url: string;
  let apiKey: any;
  let urlForGetRegisteredStationApi: string;
  let postRegisterStationResponse: any;
  let getRegisteredStationResponse: any;
  let deleteRegisteredStationResponse: any;
  let getRegisteredStationAfterDeletingResponse: any;
  const testEnv = process.env.TEST_ENV;

  describe("Test data setup ", () => {
    it("Setup - add mocks if running against mock data", async () => {
      await mockHelper.addStub();
    });

    it("Setup - create station register request - get the api key and set the post api endpoint", async () => {
      apiKey =
        testEnv === "prod"
          ? process.env.API_KEY
          : testData[testEnv]["validApiKey"];
      url = `${testData[testEnv]["baseUrl"]}${testData[testEnv]["stationsUrl"]}`;
    });
  });

  describe("Test starts here ", () => {
    it("create station register request - make a post api request with required api key", async () => {
      postRegisterStationResponse = await apiHelper.postRequestMethod(
        url,
        stationTestData,
        apiKey
      );
      console.log(
        "create station register post api response: ",
        postRegisterStationResponse.data
      );
    });

    it("create station register response - validate status code and status text in the post api response", async () => {
      expect(postRegisterStationResponse.status).toEqual(201);
      expect(postRegisterStationResponse.statusText).toEqual("Created");
    });

    it("create station register response - validate external id, name and the locations in the post api response", async () => {
      expect(postRegisterStationResponse.data.external_id).toEqual(
        stationTestData.external_id
      );
      expect(postRegisterStationResponse.data.name).toEqual(
        stationTestData.name
      );
      expect(postRegisterStationResponse.data.latitude).toEqual(
        stationTestData.latitude
      );
      expect(postRegisterStationResponse.data.longitude).toEqual(
        stationTestData.longitude
      );
      expect(postRegisterStationResponse.data.altitude).toEqual(
        stationTestData.altitude
      );
    });

    it("create station register response- fetch the registered station id from the post api response and create get registered station url for api call", async () => {
      stationId = postRegisterStationResponse.data.ID;
      urlForGetRegisteredStationApi = `${url}/${stationId}`;
      console.log(
        "updated url for get registered station request --> ",
        urlForGetRegisteredStationApi
      );
    });

    it("get registered station request - make a get api call", async () => {
      getRegisteredStationResponse = await apiHelper.getRequestMethod(
        urlForGetRegisteredStationApi,
        apiKey
      );

      console.log(
        "get registered station api response: ",
        getRegisteredStationResponse.data
      );
    });

    it("get registered station response - validate status code and status text in the get api response", async () => {
      expect(getRegisteredStationResponse.status).toEqual(200);
      expect(getRegisteredStationResponse.statusText).toEqual("OK");
      console.log("Station " + stationId + " is registered successfully");
    });

    it("get registered station response - validate external id, name and the locations in the get api response", async () => {
      expect(getRegisteredStationResponse.data.external_id).toEqual(
        stationTestData.external_id
      );
      expect(getRegisteredStationResponse.data.name).toEqual(
        stationTestData.name
      );
      expect(getRegisteredStationResponse.data.latitude).toEqual(
        stationTestData.latitude
      );
      expect(getRegisteredStationResponse.data.longitude).toEqual(
        stationTestData.longitude
      );
      expect(getRegisteredStationResponse.data.altitude).toEqual(
        stationTestData.altitude
      );
    });
  });

  describe("Tear down --> should be able to delete the registered station ", () => {
    it("delete registered station request - make a delete api call", async () => {
      deleteRegisteredStationResponse = await apiHelper.deleteRequestMethod(
        urlForGetRegisteredStationApi,
        apiKey
      );

      console.log(
        "delete registered station api response: ",
        deleteRegisteredStationResponse.data
      );
    });

    it("delete registered station response - validate status in the delete api response", async () => {
      expect(deleteRegisteredStationResponse.status).toEqual(204);
      expect(deleteRegisteredStationResponse.statusText).toEqual("No Content");
    });

    it("get registered station request - make a get api call after deleting registered station", async () => {
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

    it("get registered station response - should not be getting station as its been deleted", async () => {
      expect(getRegisteredStationAfterDeletingResponse.status).toEqual(404);
      expect(getRegisteredStationAfterDeletingResponse.data.message).toEqual(
        "Station not found"
      );
    });
  });
});
