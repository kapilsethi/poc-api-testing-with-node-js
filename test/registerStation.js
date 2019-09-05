var chai = require('chai');
var expect = chai.expect;
var ApiHelper = require('../support/apiHelper');
var testData = require('./../testData/testData.json');

describe('Register station -->', () => {
    var apiHelper = new ApiHelper();
    var body = {
        external_id: "KS_DEMO_TEST001",
        name: "KS Team Demo Test Station 001",
        latitude: 33.33,
        longitude: -122.43,
        altitude: 222
    };
    var responseId;

    it('should NOT be able to register station when the api key is NOT provided in the request', async () => {
        const response = await apiHelper.postRequestMethod(testData["url"], '', body);
        expect(response.statusCode).to.equal(401);
        expect(response.error.message).to.equal('Invalid API key. Please see http://openweathermap.org/faq#error401 for more info.');
    });

    it('should be able to register station when the api key is provided in the request', async () => {
        const response = await apiHelper.postRequestMethod(testData["url"], testData["apiKey"], body);
        responseId = response["ID"];
        expect(response["external_id"]).to.equal(body.external_id);
        expect(response["name"]).to.equal(body.name);
        expect(response["latitude"]).to.equal(body.latitude);
        expect(response["longitude"]).to.equal(body.longitude);
        expect(response["altitude"]).to.equal(body.altitude);
    });

    after ('Delete the registered station', async() => {
        
        // Delete the registered station
        const updatedUrl = testData["url"] + '/' + responseId;
        await apiHelper.deleteRequestMethod(updatedUrl, testData["apiKey"]);
        
        // Check if station is deleted successfully
        const response = await apiHelper.getRequestMethod(updatedUrl, testData["apiKey"]);
        expect(response.statusCode).to.equal(404);
        expect(response.error.message).to.equal('Station not found');
        console.log('----------------------------------------------------');
        console.log('Registered station is not found which means it is deleted successuly at the end of the test as part of after hook.');
        console.log('----------------------------------------------------');        
    });
});