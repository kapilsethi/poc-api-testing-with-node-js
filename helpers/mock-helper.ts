import * as fs from "fs";
import * as testData from "../test-data/test-data.json";
import * as path from "path";
import { apiHelper } from "./api-helper";
import { getLogger } from "log4js";
const logger = getLogger();
logger.level = "debug";

class MockHelper {
    async addStub() {
        const testEnv = process.env.TEST_ENV;
        if(testEnv !== "mock") {
            logger.info("not running against mock so not loading any mock responses");
            return;
        }
        const folderPath = path.resolve(__dirname, '../mappings');
        const files = fs.readdirSync(folderPath);
        const endpoint = `${testData[process.env.TEST_ENV]["baseUrl"]}__admin/mappings`;
        files.forEach(async file => {
                const fileContent =  await this.getFilePath(file);
                await apiHelper.postRequestMethod(endpoint,fileContent,'');
            });
    }

    private async getFilePath(fileName) {
        return await JSON.parse(fs.readFileSync(path.resolve(__dirname, `../mappings/${fileName}`), "utf-8"));
    }
}

const mockHelper = new MockHelper();
export { mockHelper };