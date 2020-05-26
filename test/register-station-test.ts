import dotenv from 'dotenv';
import { getLogger } from "log4js";
import { expect } from "chai";
import { apiHelper } from "../support/api-helper";
import * as testData from "../test-data/test-data.json";
import * as stationTestData from "../test-data/station-test-data.json";

const logger = getLogger();
logger.level = "debug";
dotenv.config();

describe('Register station -->', () => {
    let responseId;
    let apiKey;
    if(process.env.API_KEY) { 
        logger.info('----------Woo hoo, Required API_KEY is set!----------'); 
        apiKey = process.env.API_KEY;
    }
    else { 
        logger.info('----------Opps, Required API_KEY is NOT set!----------'); 
    }
    
    it('should NOT be able to register station when the api key is NOT provided in the request', async () => {
        const response = await apiHelper.postRequestMethod(testData["url"], '', '');
        expect(response.statusCode).to.equal(401);
        expect(response.error.message).to.equal('Invalid API key. Please see http://openweathermap.org/faq#error401 for more info.');
    });

    describe('Success scenario --> ', () => {
        stationTestData.stations.forEach(stationData => {
            it('should be able to register station when the api key is provided in the request', async () => {
                const result = await apiHelper.postRequestMethod(testData["url"], apiKey, stationData);
                const response = result.response;
                responseId = response["ID"];
                expect(response["external_id"]).to.equal(stationData.external_id);
                expect(response["name"]).to.equal(stationData.name);
                expect(response["latitude"]).to.equal(stationData.latitude);
                expect(response["longitude"]).to.equal(stationData.longitude);
                expect(response["altitude"]).to.equal(stationData.altitude);
                expect(result.statusCode).to.equal(201);
            });
        
            it('should be able to get registerted station', async () => {
                const updatedUrl = testData["url"] + '/' + responseId;
                logger.info('updatedUrl in register -->', updatedUrl);
                const response = await apiHelper.getRequestMethod(updatedUrl, apiKey);
                expect(response["external_id"]).to.equal(stationData.external_id);
                expect(response["name"]).to.equal(stationData.name);
                expect(response["latitude"]).to.equal(stationData.latitude);
                expect(response["longitude"]).to.equal(stationData.longitude);
                expect(response["altitude"]).to.equal(stationData.altitude);
                logger.info('Station ' + responseId + ' is registered successfully');
            });

            it('should be able to delete the registered station', async () => {
                // Delete the registered station
                const updatedUrl = testData["url"] + '/' + responseId;
                logger.info('updatedUrl in delete -->', updatedUrl);
                await apiHelper.deleteRequestMethod(updatedUrl, apiKey);
                // Check if station is deleted successfully
                const res = await apiHelper.getRequestMethod(updatedUrl, apiKey);
                expect(res.statusCode).to.equal(404);
                expect(res.error.message).to.equal('Station not found');
                logger.info('Registered station ' + responseId + ' is not found which means it is deleted successfully');
            });
        });
    });
});