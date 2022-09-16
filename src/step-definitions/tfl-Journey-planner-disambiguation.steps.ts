import { binding, given, then, when } from "cucumber-tsflow";
import {
  getjpdisambiguationDataData,
  setjpdisambiguationDataData,
  IData,
} from "../utils/data";
import { httpRequest } from "../utils/httpRequest";
import { expect } from "expect";
@binding()
export class TflJourneyPlanerDisambiguationSteps {
  baseURL = "https://api.tfl.gov.uk/journey/journeyresults";

  private classIdentifier = "jpdisambiguation";

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
    if (dtTable.date == "tomorrow") {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateToquery = tomorrow.toISOString().slice(0, 10).replace(/-/g, "");
      url = `${this.baseURL}/${parameter}?date=${dateToquery}&time=${dtTable.time}`;
    } else if (dtTable.date?.length > 0) {
      url = `${this.baseURL}/${parameter}?date=${dtTable.date}&time=${dtTable.time}`;
    }
    const data: IData = {
      key: "",
      value: undefined,
    };
    try {
      const response = await httpRequest(httpmethod, url);
      data.key = this.classIdentifier;
      data.value = response;
      setjpdisambiguationDataData(data);
    } catch (error: any) {
      data.key = this.classIdentifier;
      data.value = error.response;
      setjpdisambiguationDataData(data);
    }
  }
  @then(/I can see the status code is (\d*)/)
  public async JourneyPlanerDisambiguationGetAssertByStatus(status: number) {
    expect(getjpdisambiguationDataData(this.classIdentifier).status).toBe(
      Number(status)
    );
  }
  @then(/I can see the valid response body/)
  public async JourneyPlanerDisambiguationGetAssertByValidResponseBody() {
    const response: any = getjpdisambiguationDataData(
      this.classIdentifier
    ).data;
    expect(response.$type).toBeTruthy();
  }
  @then(/I can see the the message "([^"]*)"/)
  public async JourneyPlanerDisambiguationInvalidMessage(message: string) {
    const response: any = getjpdisambiguationDataData(
      this.classIdentifier
    ).data;
    expect(response.message).toEqual(message);
  }
}
