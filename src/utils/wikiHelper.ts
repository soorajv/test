import request from "request";
class WikiHelper {
  requestInstance = request.defaults({ jar: true });
  baseUrl = "https://test.wikipedia.org/w/api.php";

  getLoginToken() {
    const params_LoginToken = {
      action: "query",
      meta: "tokens",
      type: "login",
      format: "json",
    };
    return new Promise((resolve, reject) => {
      this.requestInstance.get(
        { url: this.baseUrl, qs: params_LoginToken },
        function (error, res, body) {
          if (error) {
            reject(error);
          }
          const data = JSON.parse(body);

          resolve(data);
        }
      );
    });
  }

  loginRequest(login_token) {
    const params_LoginToken = {
      action: "login",
      lgname: "Ambilyp2001@ambily",
      lgpassword: "a1etbplf9c03g5savufitvghana6772v",
      lgtoken: login_token,
      format: "json",
    };
    return new Promise((resolve, reject) => {
      this.requestInstance.post(
        { url: this.baseUrl, form: params_LoginToken },
        function (error, res, body) {
          if (error) {
            reject(error);
          }
          const data = JSON.parse(body);
          if (data.login.result == "Success") {
            resolve(true);
          } else {
            reject("Possible cookie error");
          }
        }
      );
    });
  }

  getCsrfToken() {
    const params_Csrf = {
      action: "query",
      meta: "tokens",
      format: "json",
    };
    return new Promise((resolve, reject) => {
      this.requestInstance.get(
        { url: this.baseUrl, qs: params_Csrf },
        function (error, res, body) {
          if (error) {
            reject(error);
          }
          const data: any = JSON.parse(body);
          const token = data.query.tokens.csrftoken;
          if (token.length > 5) {
            resolve(token);
          } else {
            reject("CSRF token creation failed");
          }
        }
      );
    });
  }

  editRequest(editBody) {
    return new Promise((resolve, reject) => {
      this.requestInstance.post(
        { url: this.baseUrl, form: editBody },
        function (error, res) {
          if (error) {
            reject(error);
          }
          resolve(res);
        }
      );
    });
  }
}

export const wikiHelper = new WikiHelper();
