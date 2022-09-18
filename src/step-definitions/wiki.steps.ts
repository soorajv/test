import { binding, before, given, then, when } from "cucumber-tsflow";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { wikiHelper } from "../utils/wikiHelper";
import {
  getwikiResultsnData,
  setjpdisambiguationData,
  IWikiData,
  IWikiValue,
  setjwikiResultsnData,
} from "../utils/data";
import { expect } from "chai";
setDefaultTimeout(60 * 1000);
@binding()
export class WikiSteps {
  baseURL = "https://api.tfl.gov.uk/journey/journeyresults";
  private accountBalance: number = 0;
  scenarionName = null;
  scenarioId = null;
  toLocationDisambiguationIscCode = null;
  fromLocationDisambiguationIscCode = null;
  wikiData: IWikiData = {
    key: "",
    value: undefined,
  };
  @before()
  public beforeScenario(scenario: any): void {
    this.scenarionName = scenario.pickle.name;
    this.scenarioId = scenario.pickle.id;
  }
  @given(/I authenticate the token/)
  public async wikiAuthenticate() {
    const wikiloginToken: any = await wikiHelper.getLoginToken();
    const wikiValue: IWikiValue = {
      loginToken: wikiloginToken,
    };
    this.wikiData.key = this.scenarioId;
    this.wikiData.value = wikiValue;
    setjwikiResultsnData(this.wikiData);
  }

  @when(/I login successful with the valid credentials/)
  public async wikiLogin() {
    try {
      const wikiValue: IWikiValue = getwikiResultsnData(this.scenarioId);
      await wikiHelper.loginRequest(wikiValue.loginToken);
    } catch (error) {}
  }

  @when(/I create CSRF token/)
  public async wikiCsrfToken() {
    try {
      const wikiCSRFToken: any = await wikiHelper.getCsrfToken();
      const wikiValue: IWikiValue = {
        loginToken: this.wikiData.value.loginToken,
        csrfToken: wikiCSRFToken,
      };
      this.wikiData.key = this.scenarioId;
      this.wikiData.value = wikiValue;
      setjwikiResultsnData(this.wikiData);
    } catch (error) {}
  }
  @then(
    /I can not edit the wiki page of title "([^"]*)" by amending the text "([^"]*)"/
  )
  public async wikEditRequestFail(wikiTitie: string, wikiText: string) {
    const wikiValue: IWikiValue = getwikiResultsnData(this.scenarioId);

    const editBody = {
      action: "edit",
      title: wikiTitie,
      appendtext: wikiText,
      token: wikiValue.csrfToken,
      format: "json",
    };
    const editResponse: any = await wikiHelper.editRequest(editBody);
    const data = JSON.parse(editResponse.body);
    expect(data.error.code).equal("cantcreate");
  }

  @then(
    /I can edit the wiki page of title "([^"]*)" by amending the text "([^"]*)"/
  )
  public async wikEditRequest(wikiTitie: string, wikiText: string) {
    const wikiValue: IWikiValue = getwikiResultsnData(this.scenarioId);

    const editBody = {
      action: "edit",
      title: wikiTitie,
      appendtext: wikiText,
      token: wikiValue.csrfToken,
      format: "json",
    };
    const editResponse: any = await wikiHelper.editRequest(editBody);
    const data = JSON.parse(editResponse.body);

    expect(data.edit?.result).equal("Success");
  }
}
