import axios from "axios";
import { IResponse } from "./constants";
import { HTTP_METHODS } from "./constants";
class HelperFunctions {
    async makeHttpRequest(method: HTTP_METHODS,url: string, headers?: any, body?: any) {
        const options = {
            method: method,
            url: url,
            headers: headers
          };
          console.log(options)
          const response = await axios(options);
          const result = response.data;
          return result;
    }

    OkResponseBuilder(message: string, status: number, data?: any) {
        const response : IResponse = {
            message: message,
            status: status,
            data: data
        }
        return response;
    }

}

export default new HelperFunctions();