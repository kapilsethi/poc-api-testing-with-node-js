[![Build Status](https://travis-ci.org/kapilsethi/poc-api-testing-with-node-js.png)](https://travis-ci.org/kapilsethi/poc-api-testing-with-node-js)

# **What's in this repository**

## **How to use this repository:**

**Prerequisite:**

- Need to have
- `node.js` (version "^v17.8.0")
- Rancher desktop (can be downloaded from [rancher website](https://rancherdesktop.io/))
- docker (if on mac run `brew install docker`)
- docker compose (if on mac run `brew install docker-compose`)

installed on the local machine

**Setup:**

- Run '`npm install`' command

**API key:**

- Register with https://openweathermap.org/stations website and get the API key

**Setting up environment variables:**

- Rename '[.env.example](https://github.com/kapilsethi/poc-api-testing-with-node-js/blob/master/.env.example)' file to '.env'
- Update API_KEY value in '.env' file

**Using linting utility:**

- Run '`npm run lint`' command to run eslint

**Starting wiremock:**

- run `npm run start:mock:server` to start the wiremock (should be able to see wiremock test data on [wiremock mappping page](http://localhost:9000/__admin/mappings) url) OR
- Download wiremock standalone JAR from [here](http://wiremock.org/docs/download-and-installation/)
- start the wiremock in standalone mode using '`java -jar wiremock-standalone-<version>.jar --port 9000`'

**Stopping wiremock:**

- run `npm run stop:mock:server` to stop the wiremock

**Running tests:**

- Run '`npm run test:mock`' command to run all the tests against mock
- Run '`npm run test:prod`' command to run all the tests against prod
- Run `npm run generate:report` command to open html report of the test execution results

**Test execution report:**

- Test execution report can be found in './mochawesome-report'

## **Features:**

- _Test framework:_

  - Jest

- _Reporting framework:_

  - Jest html reporters

- _HTTP client:_

  - [Axios](https://github.com/axios/axios)

- _CI:_

  - Travis CI

- _Mock:_

  - Wiremock docker image

- _Linting Utility:_

  - ESLint (extends typescript recommened rules. Details can be found [here](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin))

- _Pre-Commit hook:_
  - [pre-commit](https://www.npmjs.com/package/pre-commit) npm package to run linting utility before commit

## **Example API:**

- https://openweathermap.org/stations

## **Troubleshooting:**

Error: If getting `error.code: ECONNREFUSED` error when running tests against mock then

- update the base url with ip instead of localhost in [test-data.json](https://github.com/kapilsethi/poc-api-testing-with-node-js/blob/master/test-data/test-data.json) file <br />

`"baseUrl": "http://<ip-of-the-machine>:9000/",`

<br /> for more details refer to following stackoverflow pages

- [Get api working in Postman but not with Axios](https://stackoverflow.com/questions/70744842/get-api-working-in-postman-but-not-with-axios) and
- [Can't send HTTP requests to Localhost Backend from React Native Mobile App](https://stackoverflow.com/questions/70547373/cant-send-http-requests-to-localhost-backend-from-react-native-mobile-app)

## **Have a feedback?**

If you have any feedback or question, please email me at kapil.sethi9+github@gmail.com
