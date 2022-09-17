import { before, binding, given, then, when } from "cucumber-tsflow";
import { expect } from "chai";

import {
  getjpdisambiguationData,
  setjpdisambiguationData,
  IData,
} from "../utils/data";
import { httpRequest } from "../utils/httpRequest";
import { getDateToquery } from "../utils/utilities";
import { DataTable } from "@cucumber/cucumber";

@binding()
export class TflJourneyPlannerDisambiguationSteps {
  baseURL = "https://api.tfl.gov.uk/journey/journeyresults";
  scenarionName = null;
  scenarioId = null;

  @before()
  public beforeScenario(scenario: any): void {
    this.scenarionName = scenario.pickle.name;
    this.scenarioId = scenario.pickle.id;
  }

  @given(
    /I want to get Journey information from TFL by sending "([^"]*)" request to the end point "([^"]*)" with following parameter/
  )
  public async JourneyPlanerDisambiguationGet(
    httpmethod: any,
    parameter: string,
    query: any
  ) {
    let url = `${this.baseURL}/${parameter}`;

    const dtTable = query.hashes()[0];

    if (
      dtTable.date ||
      dtTable.time ||
      dtTable.mode ||
      dtTable.nationalSearch
    ) {
      let params = "?";
      const dateInfo = dtTable.date;

      if (dateInfo !== undefined) {
        const dateToquery = getDateToquery(dateInfo);
        params += `date=${dateToquery}`;
        params += "&";
      }
      if (dtTable.time) {
        params += `time=${dtTable.time}`;
        params += "&";
      }
      if (dtTable.mode) {
        params += `mode=${dtTable.mode}`;
        params += "&";
      }
      if (dtTable.nationalSearch) {
        params += `nationalSearch=${dtTable.nationalSearch}`;
        params += "&";
      }
      url = `${this.baseURL}/${parameter}${params}`;
    }

    const data: IData = {
      key: "",
      value: undefined,
    };
    try {
      const response = await httpRequest(httpmethod, url);
      data.key = this.scenarioId;
      data.value = response;
      setjpdisambiguationData(data);
    } catch (error: any) {
      data.key = this.scenarioId;
      data.value = error.response;
      setjpdisambiguationData(data);
    }
  }
  @then(/I can see the status code is (\d*) for the disambiguations results/)
  public async JourneyPlanerDisambiguationGetAssertByStatus(status: number) {
    expect(getjpdisambiguationData(this.scenarioId).status).equal(
      Number(status)
    );
  }

  @then(/Disambiguations results message should be "([^"]*)"/)
  public async JourneyPlanerDisambiguationInvalidMessage(message: string) {
    const response: any = getjpdisambiguationData(this.scenarioId).data;
    expect(response.message).equal(message);
  }
}
