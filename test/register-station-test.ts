import dotenv from 'dotenv';
import { getLogger } from "log4js";
import { expect } from "chai";
import * as testData from "../test-data/test-data.json";
import * as stationTestData from "../test-data/station-test-data.json";
import { apiHelper } from '../helpers/api-helper';
import { mockHelper } from '../helpers/mock-helper';

const logger = getLogger();
logger.level = "debug";
dotenv.config();

describe('Register station -->', () => {
    before(async () => {
        await mockHelper.addStub();
    });

    let stationId;
    const testEnv = process.env.TEST_ENV;
    const apiKey = testEnv === "prod" ?
        process.env.API_KEY : testData[testEnv]["validApiKey"];
    const url = `${testData[testEnv]["baseUrl"]}${testData[testEnv]["stationsUrl"]}`;

    it('should NOT be able to register station when the api key is NOT provided in the request', async () => {
        const response = await apiHelper.postRequestMethod(url, '', '');
        const expectedUrl = `${testData[testEnv]["baseUrl"]}`.replace("api.", "");
        expect(response.status, "post station data api with no api key response status code mismatch").to.equal(401);
        expect(response.data.message).to.equal(`Invalid API key. Please see ${expectedUrl}faq#error401 for more info.`);
    });

    describe('Success scenario --> ', () => {
        it('should be able to register station when the api key is provided in the request', async () => {
            const response = await apiHelper.postRequestMethod(url, stationTestData, apiKey);
            stationId = response.data.ID;
            expect(response.data.external_id).to.equal(stationTestData.external_id);
            expect(response.data.name).to.equal(stationTestData.name);
            expect(response.data.latitude).to.equal(stationTestData.latitude);
            expect(response.data.longitude).to.equal(stationTestData.longitude);
            expect(response.data.altitude).to.equal(stationTestData.altitude);
            expect(response.status, "post station data api response status code mismatch").
                to.equal(201);
            expect(response.statusText).to.equal("Created");
        });
    
        it('should be able to get registered station', async () => {
            const updatedUrl = `${url}/${stationId}`;
            logger.info('updated url for get registered station request --> ', updatedUrl);
            const response = await apiHelper.getRequestMethod(updatedUrl, apiKey);
            expect(response.data.external_id).to.equal(stationTestData.external_id);
            expect(response.data.name).to.equal(stationTestData.name);
            expect(response.data.latitude).to.equal(stationTestData.latitude);
            expect(response.data.longitude).to.equal(stationTestData.longitude);
            expect(response.data.altitude).to.equal(stationTestData.altitude);
            expect(response.status, "get registered station api response status code mismatch").
                to.equal(200);
            expect(response.statusText).to.equal("OK");
            logger.info('Station ' + stationId + ' is registered successfully');
        });

        it('should be able to delete the registered station', async () => {
            // Delete the registered station
            const updatedUrl = `${url}/${stationId}`;
            logger.info('updated url for delete station request --> ', updatedUrl);
            const response = await apiHelper.deleteRequestMethod(
                updatedUrl, apiKey);
            expect(response.status, "delete station api response status code mismatch").
                to.equal(204);
            expect(response.statusText).to.equal("No Content");
        });

        it('should not be getting station as its been deleted', async () => {
            // Check if station is deleted successfully
            const updatedUrl = `${url}/${stationId}`;
            const updatedApiKey = testEnv === "prod" ?
                process.env.API_KEY : testData[testEnv]["deleteValidApiKey"];
            const response = await apiHelper.getRequestMethod(updatedUrl, updatedApiKey);
            expect(response.status, "delete station data api response status code mismatch").
                to.equal(404);
            expect(response.data.message).to.equal('Station not found');
        });
    });
});