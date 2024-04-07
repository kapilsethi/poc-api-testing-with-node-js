import "dotenv/config";
import * as testData from "../../test-data/test-data.json";
import { apiHelper } from "../../helpers/api-helper";
import { mockHelper } from "../../helpers/mock-helper";
import registerStationRequestTemplates from "../../request-templates/register-station-request-templates";
import { dateTimeHelper } from "../../helpers/date-time-helper";
import registerStationResponseTemplates from "../../response-templates/register-station-response-templates";
import getStationResponseTemplates from "../../response-templates/get-station-response-templates";

describe("Register station --> using request and response templates - should be able to register station when valid api key is provided in the request ", () => {
  let stationId: string;
  let url: string;
  let apiKey: any;
  let urlForGetRegisteredStationApi: string;
  let postRegisterStationRequest: any;
  let externalId: string;
  let stationName: string;

  let actualRegisterStationResponse: any;
  let expectedRegisterStationResponse: any;
  let actualGetRegisteredStationResponse: any;
  let expectedGetRegisteredStationResponse: any;

  let deleteRegisteredStationResponse: any;
  let actualGetRegisteredStationAfterDeletingResponse: any;
  let expectedGetRegisteredStationAfterDeletingResponse: any;
  const testEnv = process.env.TEST_ENV;

  describe("Test data setup ", () => {
    it("Setup - add mocks if running against mock data", async () => {
      await mockHelper.addStub();
    });

    it("Setup - get the unique external id and name for the register station", async () => {
      const getCurrentDateTime = await dateTimeHelper.getCurrentDateTime();
      externalId = `id-${getCurrentDateTime}`;
      stationName = `name-${getCurrentDateTime}`;
    });

    it("Setup - register station request - get the api key and set the post api endpoint", async () => {
      apiKey =
        testEnv === "prod"
          ? process.env.API_KEY
          : testData[testEnv]["validApiKey"];
      url = `${testData[testEnv]["baseUrl"]}${testData[testEnv]["stationsUrl"]}`;
    });

    it("Setup - register station request - update the register station request template", async () => {
      // deep cloning request object
      postRegisterStationRequest = JSON.parse(
        JSON.stringify(registerStationRequestTemplates.registerStationRequest)
      );

      postRegisterStationRequest.external_id = externalId;
      postRegisterStationRequest.name = stationName;
    });

    it("Setup - register station response - update the register station response template", async () => {
      // deep cloning response object
      expectedRegisterStationResponse = JSON.parse(
        JSON.stringify(
          registerStationResponseTemplates.registerStationSuccessResponse
        )
      );

      expectedRegisterStationResponse.external_id = externalId;
      expectedRegisterStationResponse.name = stationName;
    });
  });

  describe("Test starts here ", () => {
    it("station register request - make a post api request with required api key", async () => {
      actualRegisterStationResponse = await apiHelper.postRequestMethod(
        url,
        postRegisterStationRequest,
        apiKey
      );
      console.log(
        "station register post api response: ",
        actualRegisterStationResponse.data
      );
    });

    it("station register response - validate status code and status text in the post api response", async () => {
      expect(actualRegisterStationResponse.status).toEqual(201);
      expect(actualRegisterStationResponse.statusText).toEqual("Created");
    });

    it("station register response - fetch the station id", async () => {
      stationId = actualRegisterStationResponse.data.ID;
    });

    it("station register response - delete the attibutes which are randomly generated and not required to validate", async () => {
      delete actualRegisterStationResponse.data.ID;
      delete actualRegisterStationResponse.data.created_at;
      delete actualRegisterStationResponse.data.updated_at;
    });

    it("station register response - validate external id, name and the locations in the post api response", async () => {
      expect(actualRegisterStationResponse.data).toEqual(
        expectedRegisterStationResponse
      );
    });

    it("get registered station request - create get registered station url for api call", async () => {
      urlForGetRegisteredStationApi = `${url}/${stationId}`;
      console.log(
        "updated url for get registered station request --> ",
        urlForGetRegisteredStationApi
      );
    });

    it("get registered station request - make a get api call", async () => {
      actualGetRegisteredStationResponse = await apiHelper.getRequestMethod(
        urlForGetRegisteredStationApi,
        apiKey
      );

      console.log(
        "get registered station api response: ",
        actualGetRegisteredStationResponse.data
      );
    });

    it("get registered station response - validate status code and status text in the get api response", async () => {
      expect(actualGetRegisteredStationResponse.status).toEqual(200);
      expect(actualGetRegisteredStationResponse.statusText).toEqual("OK");
      console.log("Station " + stationId + " is registered successfully");
    });

    it("get registered station response - update the get registered station response template", async () => {
      // deep cloning response object
      expectedGetRegisteredStationResponse = JSON.parse(
        JSON.stringify(getStationResponseTemplates.getStationSuccessResponse)
      );

      expectedGetRegisteredStationResponse.external_id = externalId;
      expectedGetRegisteredStationResponse.name = stationName;
      expectedGetRegisteredStationResponse.id = stationId;
    });

    it("get registered station response - delete the attibutes which are randomly generated and not required to validate", async () => {
      delete actualGetRegisteredStationResponse.data.created_at;
      delete actualGetRegisteredStationResponse.data.updated_at;
    });

    it("get registered station response - validate external id, name and the locations in the get api response", async () => {
      expect(actualGetRegisteredStationResponse.data).toEqual(
        expectedGetRegisteredStationResponse
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
      actualGetRegisteredStationAfterDeletingResponse =
        await apiHelper.getRequestMethod(
          urlForGetRegisteredStationApi,
          updatedApiKey
        );

      console.log(
        "get registered station after deleting api response: ",
        actualGetRegisteredStationAfterDeletingResponse.data
      );
    });

    it("get registered station response - delete the attibutes which are randomly generated and not required to validate", async () => {
      delete actualGetRegisteredStationAfterDeletingResponse.data.code;
      expectedGetRegisteredStationAfterDeletingResponse =
        getStationResponseTemplates.getStationStationNotFoundResponse;
      delete expectedGetRegisteredStationAfterDeletingResponse.code;
    });

    it("get registered station response - should not be getting station as its been deleted", async () => {
      expect(actualGetRegisteredStationAfterDeletingResponse.status).toEqual(
        404
      );
      expect(actualGetRegisteredStationAfterDeletingResponse.data).toEqual(
        expectedGetRegisteredStationAfterDeletingResponse
      );
    });
  });
});
