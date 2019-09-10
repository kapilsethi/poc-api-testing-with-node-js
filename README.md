# **What's in this repository**

**How to use this repository:**
----

**Prerequisite**

- Need to have ````node.js```` installed on the machine (version "^v10.15.x")

**Setup:**

- Run '````npm install````' command

**API Key**
 - Register with https://openweathermap.org/stations website and get the API key
 
 **Setting up environment variables**
 - Rename '[.env.example](https://github.com/kapilsethi/poc-api-testing-with-node-js/blob/master/.env.example)' file to '.env'
 - Update API_KEY value in '.env' file

**Running Tests:**

- Run '````npm test````' command to run all the tests
- Run '````npm run generatereport````' command to generate html report of the test execution results
- Run '````npm run rtag````' command to run the tests and generate html report

**Test Execution Report:**

- Test execution report can be found in './allure-results' and './allure-report' locations

**Features:**
----

- Test framework:_
    - Mocha

- _Assertion library:_
    - Chai

- _Reporting framework_:
    - Allure

- _HTTP client_:
    - [Request](https://github.com/request/request)

**Example API:**
----

- https://openweathermap.org/stations

**Troubleshooting:**
----

- Sometime 'Delete station test' fails as the request takes more than 2000ms to respond <br />
    _How to fix_: Increase the timeout. Just add in [package.json](https://github.com/kapilsethi/poc-api-testing-with-node-js/blob/master/package.json) under scripts
    ```json
    "test": "./node_modules/.bin/mocha --timeout 10000 --reporter mocha-allure-reporter",
    "generatereport": "allure generate --clean && allure open",
    "rtag": "./node_modules/.bin/mocha --timeout 10000 --reporter mocha-allure-reporter && allure generate --clean && allure open"
    ```

**Have a feedback?**
---

If you have any feedback or question, please email me at kapil.sethi9@gmail.com
