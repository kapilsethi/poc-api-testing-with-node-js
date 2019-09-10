require('dotenv').config();
var chai = require('chai');
var expect = chai.expect;
var ApiHelper = require('../support/apiHelper');
var testData = require('./../testData/testData.json');
var stationTestData = require('./../testData/stationTestData.json');

describe('Register station -->', () => {
    var apiHelper = new ApiHelper();
    var responseId;
    var apiKey;
    if(process.env.API_KEY) { 
        console.log('###########Required API_KEY is set!###########'); 
        apiKey = process.env.API_KEY;
    }
    else { 
        console.log('###########Required API_KEY is NOT set!###########'); 
    }
    

    it('should NOT be able to register station when the api key is NOT provided in the request', async () => {
        var response = await apiHelper.postRequestMethod(testData["url"], '', '');
        expect(response.statusCode).to.equal(401);
        expect(response.error.message).to.equal('Invalid API key. Please see http://openweathermap.org/faq#error401 for more info.');
    });

    describe('Success scenario --> ', () => {
        stationTestData.forEach(stationData => {
            it('should be able to register station when the api key is provided in the request', async () => {
                var result = await apiHelper.postRequestMethod(testData["url"], apiKey, stationData);
                var response = result.response;
                responseId = response["ID"];
                expect(response["external_id"]).to.equal(stationData.external_id);
                expect(response["name"]).to.equal(stationData.name);
                expect(response["latitude"]).to.equal(stationData.latitude);
                expect(response["longitude"]).to.equal(stationData.longitude);
                expect(response["altitude"]).to.equal(stationData.altitude);
                expect(result.statusCode).to.equal(201);
            });
        
            it('should be able to get registerted station', async () => {
                var updatedUrl = testData["url"] + '/' + responseId;
                console.log('updatedUrl in register -->', updatedUrl);
                var response = await apiHelper.getRequestMethod(updatedUrl, apiKey);
                expect(response["external_id"]).to.equal(stationData.external_id);
                expect(response["name"]).to.equal(stationData.name);
                expect(response["latitude"]).to.equal(stationData.latitude);
                expect(response["longitude"]).to.equal(stationData.longitude);
                expect(response["altitude"]).to.equal(stationData.altitude);
                console.log('----------------------------------------------------');
                console.log('Station ' + responseId + ' is registered successfully');
                console.log('----------------------------------------------------');
            });

            it('should be able to delete the registered station', async () => {
                // Delete the registered station
                var updatedUrl = testData["url"] + '/' + responseId;
                console.log('updatedUrl in delete -->', updatedUrl);
                await apiHelper.deleteRequestMethod(updatedUrl, apiKey);
                // Check if station is deleted successfully
                var res = await apiHelper.getRequestMethod(updatedUrl, apiKey);
                expect(res.statusCode).to.equal(404);
                expect(res.error.message).to.equal('Station not found');
                console.log('----------------------------------------------------');
                console.log('Registered station ' + responseId + ' is not found which means it is deleted successfully');
                console.log('----------------------------------------------------');
            });
        });
    });
});