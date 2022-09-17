Feature: TFL journey planner Request : disambiguation Options
  As a user I wants to plan my journey in London
 
  Scenario:Verify the request to get journey information working fine
    Given I want to get Journey information from TFL by sending "GET" request to the end point "kingcrossstation/to/liverpoolstreetstation" with following parameter
    |  |  |
    |  |  |
    Then I can see the status code is 300 for the disambiguations results


  Scenario:Verify the request to get journey information working fine for tomorrows date
    Given I want to get Journey information from TFL by sending "GET" request to the end point "kingcrossstation/to/liverpoolstreetstation" with following parameter
      | date     | time |
      | +1 | 0400 |
    Then I can see the status code is 300 for the disambiguations results


#    Negative scenarios

  Scenario:Verify the request to get journey information failed for less than 7 date
    Given I want to get Journey information from TFL by sending "GET" request to the end point "kingcrossstation/to/liverpoolstreetstation" with following parameter
      | date     | time |
      | -8 | 0400 |
    Then I can see the status code is 400 for the disambiguations results
    And Disambiguations results message should be "Date cannot be more than 7 days in the past."

Scenario: Verify request to the get journey information of invalid time works as expected
    Given I want to get Journey information from TFL by sending "GET" request to the end point "/kingcrossstation/to/liverpoolstreetstation" with following parameter
      | date     | time |
      | invalid  | 2400 |
    Then I can see the status code is 400 for the disambiguations results
    And Disambiguations results message should be "Date is not in a valid format.  It must be in the format: yyyyMMdd"


Scenario: Verify request to the get journey information of invalid time works as expected
    Given I want to get Journey information from TFL by sending "GET" request to the end point "/kingcrossstation/to/liverpoolstreetstation" with following parameter
      | date     | time |
      | +1       | 2400 |
    Then I can see the status code is 400 for the disambiguations results
    And Disambiguations results message should be "Time is not in a valid format.  It must be in the format: HHmm"
    

