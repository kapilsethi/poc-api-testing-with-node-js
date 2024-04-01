import * as fs from "fs";
import * as testData from "../test-data/test-data.json";
import * as path from "path";
import { apiHelper } from "./api-helper";
import { getLogger } from "log4js";
const logger = getLogger();
logger.level = "debug";

class MockHelper {
  endpoint = `${testData[process.env.TEST_ENV]["baseUrl"]}__admin/mappings`;
  async addStub() {
    const testEnv = process.env.TEST_ENV;
    if (testEnv !== "mock") {
      logger.info("not running against mock so not loading any mock responses");
      return;
    }
    const folderPath = path.resolve(__dirname, "../mappings");
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const fileContent = await this.getFilePath(file);
      await apiHelper.postRequestMethod(this.endpoint, fileContent, "");
    }
    await this.verifyRequest(files.length);
  }

  private async getFilePath(fileName) {
    return await JSON.parse(
      fs.readFileSync(
        path.resolve(__dirname, `../mappings/${fileName}`),
        "utf-8"
      )
    );
  }

  private async verifyRequest(expectedNumberOfMocks) {
    let flag = false;
    let count = 0;
    while (flag == false) {
      if (count == 10) {
        break;
      }
      const response = await apiHelper.getRequestMethod(this.endpoint, "");
      flag = response.data.meta.total === expectedNumberOfMocks;
      await this.sleep(500);
      count = count + 1;
    }
  }

  private async sleep(ms) {
    logger.info(`sleeping for ${ms} ms`);
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }
}

const mockHelper = new MockHelper();
export { mockHelper };
