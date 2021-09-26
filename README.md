[![Build Status](https://travis-ci.org/kapilsethi/poc-api-testing-with-node-js.png)](https://travis-ci.org/kapilsethi/poc-api-testing-with-node-js)

# **What's in this repository**

**How to use this repository:**
----

**Prerequisite:**

- Need to have ````node.js```` installed on the machine (version "^v12.16.x")

**Setup:**

- Run '````npm install````' command

**API key:**
 - Register with https://openweathermap.org/stations website and get the API key
 
 **Setting up environment variables:**
 - Rename '[.env.example](https://github.com/kapilsethi/poc-api-testing-with-node-js/blob/master/.env.example)' file to '.env'
 - Update API_KEY value in '.env' file
 
**Using linting utility:**
- Run '````npm run lint````' command to run eslint

**Starting wiremock:**
- Download wiremock standalone JAR from [here](http://wiremock.org/docs/download-and-installation/)
- start the wiremock in standalone mode using '````java -jar wiremock-standalone-<version>.jar --port 8080````' 

**Running tests:**
- Run '````TEST_ENV=prod npm test````' command to run all the tests against prod
- Run '````TEST_ENV=mock npm test````' command to run all the tests against mock

**Test execution report:**

- Test execution report can be found in './mochawesome-report'

**Features:**
----

- _Test framework:_
    - Mocha

- _Assertion library:_
    - Chai

- _Reporting framework:_
    - Mochawesome

- _HTTP client:_
    - [Axios](https://github.com/axios/axios)

- _CI:_
    - Travis CI

- _Mock:_
    - Wiremock standalone docker image

- _Linting Utility:_
    - ESLint (extends typescript recommened rules. Details can be found [here](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin))

- _Pre-Commit hook:_
    - [pre-commit](https://www.npmjs.com/package/pre-commit) npm package to run linting utility before commit  

**Example API:**
----

- https://openweathermap.org/stations

**Troubleshooting:**
----

Error: If test fails with '_Timeout of 10000ms exceeded. For async tests and hooks, ensure "done()" is called;_'

then increase the timeout in [package.json](https://github.com/kapilsethi/poc-api-testing-with-node-js/blob/master/package.json) <br />

`
"./node_modules/.bin/mocha --timeout 20000 -r ts-node/register --unhandled-rejections=warn test/**/*.ts",
`

<br />for more details refer to [mocha issue](https://github.com/mochajs/mocha/issues/2025)

**Have a feedback?**
---

If you have any feedback or question, please email me at kapil.sethi9+github@gmail.com