import moment from "moment";
class DateTimeHelper {
  async getCurrentDateTime() {
    return moment().format("DDMMYYYY-HHmmssSS");
  }
}

const dateTimeHelper = new DateTimeHelper();
export { dateTimeHelper };
