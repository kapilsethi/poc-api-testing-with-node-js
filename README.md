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

**Running tests:**
- Run '````npm test````' command to run all the tests
- Run '````npm run generate:report````' command to generate html report of the test execution results

**Test execution report:**

- Test execution report can be found in './allure-results' and './allure-report' locations

**Features:**
----

- _Test framework:_
    - Mocha

- _Assertion library:_
    - Chai

- _Reporting framework:_
    - Allure

- _HTTP client:_
    - [Request](https://github.com/request/request)

- _CI:_
    - Travis CI

- _Linting Utility:_
    - ESLint (extends typescript recommened rules. Details can be found [here](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin))

- _Pre-Commit hook:_
    - [pre-commit](https://www.npmjs.com/package/pre-commit) npm package to run linting utility before commit  

**Example API:**
----

- https://openweathermap.org/stations

**Troubleshooting:**
----

- Sometime 'Delete station test' fails as the request takes more than 2000ms to respond <br />
    _How to fix:_ Increase the timeout. Just add in [package.json](https://github.com/kapilsethi/poc-api-testing-with-node-js/blob/master/package.json) under scripts
    ```json
    "test": "./node_modules/.bin/mocha -r ts-node/register --unhandled-rejections=warn test/**/*.ts",
    "generate:report": "allure generate --clean && allure open",
    ```

**Have a feedback?**
---

If you have any feedback or question, please email me at kapil.sethi9@gmail.com