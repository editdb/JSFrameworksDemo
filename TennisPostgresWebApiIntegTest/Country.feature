Feature: Country feature file

Scenario: Countries are listed alphabetically by default
	Given I have some unordered countries
	When I ask for them
	Then they are ordered alphabetically
