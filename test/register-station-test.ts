import dotenv from 'dotenv';
import { getLogger } from "log4js";
import { expect } from "chai";
import * as testData from "../test-data/test-data.json";
import * as stationTestData from "../test-data/station-test-data.json";
import { apiHelper } from '../helpers/api-helper';

const logger = getLogger();
logger.level = "debug";
dotenv.config();

describe('Register station -->', () => {
    let responseId;
    const apiKey = process.env.API_KEY;
    const url = `${testData["baseUrl"]}${testData["stationsUrl"]}`;

    it('should NOT be able to register station when the api key is NOT provided in the request', async () => {
        const response = await apiHelper.postRequestMethod(url, '', '');
        const expectedUrl = testData["baseUrl"].replace("api.", "");
        expect(response.status, "post station data api with no api key response status code mismatch").to.equal(401);
        expect(response.data.message).to.equal(`Invalid API key. Please see ${expectedUrl}faq#error401 for more info.`);
    });

    describe('Success scenario --> ', () => {
        stationTestData.stations.forEach(stationData => {
            it('should be able to register station when the api key is provided in the request', async () => {
                const response = await apiHelper.postRequestMethod(url, stationData, apiKey);
                responseId = response.data.ID;
                expect(response.data.external_id).to.equal(stationData.external_id);
                expect(response.data.name).to.equal(stationData.name);
                expect(response.data.latitude).to.equal(stationData.latitude);
                expect(response.data.longitude).to.equal(stationData.longitude);
                expect(response.data.altitude).to.equal(stationData.altitude);
                expect(response.status, "post station data api response status code mismatch").to.equal(201);
                expect(response.statusText).to.equal("Created");
            });
        
            it('should be able to get registerted station', async () => {
                const updatedUrl = `${url}/${responseId}`;
                logger.info('updatedUrl in register -->', updatedUrl);
                const response = await apiHelper.getRequestMethod(updatedUrl, apiKey);
                expect(response.external_id).to.equal(stationData.external_id);
                expect(response.name).to.equal(stationData.name);
                expect(response.latitude).to.equal(stationData.latitude);
                expect(response.longitude).to.equal(stationData.longitude);
                expect(response.altitude).to.equal(stationData.altitude);
                logger.info('Station ' + responseId + ' is registered successfully');
            });

            it('should be able to delete the registered station', async () => {
                // Delete the registered station
                const updatedUrl = `${url}/${responseId}`;
                logger.info('updatedUrl in delete -->', updatedUrl);
                const deleteRequestResponse = await apiHelper.deleteRequestMethod(
                    updatedUrl, apiKey);
                expect(deleteRequestResponse.status).to.equal(204);
                expect(deleteRequestResponse.statusText).to.equal("No Content");
                // Check if station is deleted successfully
                const res = await apiHelper.getRequestMethod(updatedUrl, apiKey);
                expect(res.status, "delete station data api response status code mismatch").to.equal(404);
                expect(res.data.message).to.equal('Station not found');
                logger.info('Registered station ' + responseId + ' is not found which means it is deleted successfully');
            });
        });
    });
});