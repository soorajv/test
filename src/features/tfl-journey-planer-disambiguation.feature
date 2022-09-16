Feature: TFL journey planner Request : disambiguation Options
  As a user I wants to plan my journey in London

  Scenario:Verify the request to get journey information working fine
    Given I want to get Journey information from TFL by sending "GET" request to the end point "kingcrossstation/to/liverpoolstreetstation" with following parameter
    |  |  |
    |  |  |
    Then I can see the status code is 300


  Scenario:Verify the request to get journey information working fine 2
    Given I want to get Journey information from TFL by sending "GET" request to the end point "kingcrossstation/to/liverpoolstreetstation" with following parameter
      | date     | time |
      | tomorrow | 0400 |
    Then I can see the valid response body


#    Negative scenarios

Scenario: Verify request to the get journey information of invalid time works as expected
    Given I want to get Journey information from TFL by sending "GET" request to the end point "/kingcrossstation/to/liverpoolstreetstation" with following parameter
      | date     | time |
      | 20220925in | 2400 |
    Then I can see the status code is 400
    And I can see the the message "Date is not in a valid format.  It must be in the format: yyyyMMdd"