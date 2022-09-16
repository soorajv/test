import { binding, given, then, when } from "cucumber-tsflow";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { wikiHelper } from "../utils/wikiHelper";
import { expect } from "chai";
import {
  getjpdisambiguationDataData,
  setjpdisambiguationDataData,
  IData,
} from "../utils/data";
setDefaultTimeout(60 * 1000);
@binding()
export class BankAccountSteps {
  private accountBalance: number = 0;
  private classIdentifier = "bank";

  @given(/A bank account with starting balance of \$(\d*)/)
  public givenAnAccountWithStartingBalance(amount: number) {
    this.accountBalance = amount;
    const data: IData = {
      key: "",
      value: undefined,
    };
  }

  @when(/\$(\d*) is deposited/)
  public async deposit(amount: number) {
    this.accountBalance = Number(this.accountBalance) + Number(amount);

    try {
      const r1: any = await wikiHelper.getLoginToken();
      await wikiHelper.loginRequest(r1.query.tokens.logintoken);
      const r2: any = await wikiHelper.getCsrfToken();
      console.log(r2);
      const editBody = {
        action: "edit",
        title: "Project:Sandbox",
        appendtext: "test edit1",
        token: r2,
        format: "json",
      };
      const r3: any = await wikiHelper.editRequest(editBody);
      console.log(r3.body);
      console.log(r3.statusCode);
    } catch (error) {}

    // console.log(getjpdisambiguationDataData(this.classIdentifier));

    //const response1 = await httpRequest("POST", baseURL, formData, true);

    /*
    await context.storageState({ path: "state.json" });

    //console.log(dd);

    context = await request.newContext({ storageState: "state.json" });

    const reqParameter2 = <IRequest>{};
    reqParameter2.requestType = "POSTFORM";
    var params_1 = {
      action: "login",
      lgname: "Ambilyp2001@ambily",
      lgpassword: "a1etbplf9c03g5savufitvghana6772v",
      lgtoken: responseJson1.query.tokens.logintoken,
      format: "json",
    };
    reqParameter2.URL = "https://www.mediawiki.org/w/api.php";
    reqParameter2.DATA = params_1;
    reqParameter2.apiContext = context;

    const response2 = await httpRequest(reqParameter2);
    const responseJson2 = await response2.json();
    */
  }

  @then(/The bank account balance should be (\d*)/)
  public accountBalanceShouldEqual(expectedAmount: number) {
    expect(4).equal(6);
    // assert.equal(this.accountBalance, expectedAmount);
  }
}
