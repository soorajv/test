Feature: Wiki create the token and update an existing page
  As a user I wants to edit wiki's online document
 
  Scenario:Verify the wiki document can be successfully edited by amending some test
    Given  I authenticate the token 
    When I login successful with the valid credentials
    And I create CSRF token
    Then I can edit the wiki page of title "Project:Sandbox" by amending the text "test edit1"

   

   Scenario:Verify the wiki document can  not be edited with wrong title
    Given  I authenticate the token 
    When I login successful with the valid credentials
    And I create CSRF token
    Then I can not edit the wiki page of title "Project:Sandbox-invalid" by amending the text "test edit1"