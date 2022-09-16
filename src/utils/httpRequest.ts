import Axios, { AxiosPromise, AxiosInstance } from "axios";

import https from "https";

export function httpRequest(
  requestType: "GET" | "POST",
  url: string,
  data?: any,
  postForm?: Boolean
): AxiosPromise<any> {
  const instance: AxiosInstance = Axios.create({
    httpsAgent: new https.Agent({ rejectUnauthorized: false, keepAlive: true }),
  });

  instance.interceptors.request.use((request) => {
    if (postForm) {
      request.headers = data.headers;
    } else {
      request.headers["Content-Type"] = "application/json";
      request.headers["Accept"] = "application/json";
    }
    return request;
  });

  return instance({
    withCredentials: true,
    validateStatus: function (status) {
      return status >= 200 && status <= 300; // default
    },
    method: requestType,
    url,
    data,
  });
}
