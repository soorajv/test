import { binding, before, given, then, when } from "cucumber-tsflow";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { wikiHelper } from "../utils/wikiHelper";
import { expect } from "chai";
import { getDateToquery } from "../utils/utilities";
import {
  getjpdisambiguationData,
  getjourneyResultsnData,
  setjourneyResultsnData,
  IData,
} from "../utils/data";
import { httpRequest } from "../utils/httpRequest";

setDefaultTimeout(60 * 1000);
@binding()
export class tflJourneyPlanningwithinLondonSteps {
  baseURL = "https://api.tfl.gov.uk/journey/journeyresults";
  private accountBalance: number = 0;
  scenarionName = null;
  scenarioId = null;
  toLocationDisambiguationIscCode = null;
  fromLocationDisambiguationIscCode = null;
  @before()
  public beforeScenario(scenario: any): void {
    this.scenarionName = scenario.pickle.name;
    this.scenarioId = scenario.pickle.id;
  }

  @then(
    /I get the ICS code of "([^"]*)" as commonName from "([^"]*)" of the response body/
  )
  public async JourneyPlanerDisambiguationGetAssertByStatus(
    commonName: string,
    locationType: string
  ) {
    const response: any = getjpdisambiguationData(this.scenarioId).data;

    if (locationType === "toLocationDisambiguation") {
      const disambiguationOptions: any =
        response.toLocationDisambiguation.disambiguationOptions;

      const disambiguationOption = disambiguationOptions.find(
        (item) => item.place.commonName === commonName
      );

      this.toLocationDisambiguationIscCode = disambiguationOption.place.icsCode;
    } else {
      const disambiguationOptions: any =
        response.fromLocationDisambiguation.disambiguationOptions;

      const disambiguationOption = disambiguationOptions.find(
        (item) => item.place.commonName === commonName
      );
      this.fromLocationDisambiguationIscCode =
        disambiguationOption.place.icsCode;
    }
  }
  @then(
    /I can't see the ICS code of "([^"]*)" as commonName from "([^"]*)" of the response body/
  )
  public async JourneyPlanerDisambiguationCheck(
    commonName: string,
    locationType: string
  ) {
    const response: any = getjpdisambiguationData(this.scenarioId).data;

    if (locationType === "toLocationDisambiguation") {
      const disambiguationOptions: any =
        response.toLocationDisambiguation.disambiguationOptions;

      const disambiguationOption = disambiguationOptions.find(
        (item) => item.place.commonName === commonName
      );
      expect(disambiguationOption).equal(undefined);
    }
  }
  @when(
    /I create the journey planer request with to and from ICS code and following parameter/
  )
  public async JourneyPlanerDisambiguationGet(query: any) {
    const data: IData = {
      key: "",
      value: undefined,
    };
    try {
      let url = `${this.baseURL}/${this.fromLocationDisambiguationIscCode}/to/${this.toLocationDisambiguationIscCode}`;

      const dtTable = query.hashes()[0];

      if (dtTable.date || dtTable.time || dtTable.mode) {
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
        url = `${url}${params}`;
      }

      const response = await httpRequest("GET", url);
      data.key = this.scenarioId;
      data.value = response;
      setjourneyResultsnData(data);
    } catch (error: any) {
      data.key = this.scenarioId;
      data.value = error.response;
      setjourneyResultsnData(data);
    }
  }
  @then(/I can see the status code is (\d*) for the journey results/)
  public async JourneyPlannerGetAssertByStatus(status: number) {
    expect(getjourneyResultsnData(this.scenarioId).status).equal(
      Number(status)
    );
  }

  @then(/journey results message should be "([^"]*)"/)
  public async JourneyPlanerInvalidMessage(message: string) {
    const response: any = getjourneyResultsnData(this.scenarioId).data;
    expect(response.message).equal(message);
  }
}
