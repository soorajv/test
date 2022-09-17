
Feature: TFL journey planner Request, outside London : StopPoint ICS code Option
  As a user I wants to plan my journey in London

  Background: Finding the ICS code of origin and destination with nationalSearch
    Given I want to get Journey information from TFL by sending "GET" request to the end point "/kingcrossstation/to/keighley" with following parameter
      | nationalSearch |  |
      | true  |  |
    And I get the ICS code of "Keighley, Keighley Rail Station" as commonName from "toLocationDisambiguation" of the response body
    And I get the ICS code of "Kings Cross (London), King's Cross Station" as commonName from "fromLocationDisambiguation" of the response body

  
  Scenario:Checking response code
    When I create the journey planer request with to and from ICS code and following parameter
      |  |  |
      |  |  |
    Then I can see the status code is 200 for the journey results
  
  Scenario:Checking response when passing valid date as parameter or tomorrows date
    When I create the journey planer request with to and from ICS code and following parameter
      | date     | time |
      | +1 | 0400 |
    Then I can see the status code is 200 for the journey results

   Scenario:Checking success response when passing valid date as parameter or tomorrows date with mode national-rail
    When I create the journey planer request with to and from ICS code and following parameter
      | date     | time |  mode |
      | +1       | 0400 |  national-rail |
    Then I can see the status code is 200 for the journey results

#    Negative scenarios

    Scenario: Verify request to the get journey information of invalid date works as expected
    When I create the journey planer request with to and from ICS code and following parameter
      | date     |
      |invalid | 
    Then I can see the status code is 400 for the journey results
    And journey results message should be "Date is not in a valid format.  It must be in the format: yyyyMMdd"

    Scenario:Checking Not available response when passing valid date as parameter or tomorrows date with mode tube
    When I create the journey planer request with to and from ICS code and following parameter
      | date     | time |  mode |
      | +1       | 0400 |  tube |
    Then I can see the status code is 404 for the journey results

    Scenario: Could not find the ICS code of origin and destination outside London with out nationalSearch parameter
    Given I want to get Journey information from TFL by sending "GET" request to the end point "/kingcrossstation/to/keighley" with following parameter
      |  |  |
      |   |  |
    And I can't see the ICS code of "Keighley, Keighley Rail Station" as commonName from "toLocationDisambiguation" of the response body
 
    

    