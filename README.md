# Cypress test framework


## Cypress command extended command library
    {HOME}\cypress-ekb-e2e\cypress\support

## Test case
    The unit test case corresponding to the command extension command
    {HOME}\cypress-ekb-e2e\cypress\integration\commandtest
    e2e test case
    {HOME}\cypress-ekb-e2e\cypress\integration\ekbtest
    use case template
    {HOME}\cypress-ekb-e2e\cypress\integration\ekbtest\template_test.spec.js
    environment constant
    {HOME}\ekb\cypress-ekb-e2e\cypress.env.json
    {HOME}\cypress-ekb-e2e\cypress.json

## Execute the unit test case corresponding to the command extension command
    node cypress_runner -b electron -s cmd_*.spec.js

## Execute e2e test cases
    node cypress_runner -b electron -s ekb_*.spec.js

## Testing report
    {HOME}\cypress-ekb-e2e\cypress\report\mochawesome-report\mochawesome.html

## Error screenshot
    {HOME}\cypress-ekb-e2e\cypress\screenshots

## Video Recording
    {HOME}\cypress-ekb-e2e\cypress\videos

## Practice Guide
    1. Priority of web page element positioning strategy
       Positioning element strategies are arranged according to priority, but not limited to one strategy, and should be preferred according to the situation:
            css selector +id,name,cy-data;
            xpath + class
            xpath + class contains()
            xpath + text
       The element positioning in the cypress integration test should avoid long paths and index values, which will lead to unstable positioning under dynamic pages;
       The experience summed up in the actual work of automated testing: The script is unstable and the cost of positioning and repairing is greater than that of the script because of the UI text
       The maintenance cost invested in updating, after all, copywriting is not updated every day, so you don’t have to worry about using text as a positioning strategy, but you need to worry about it.
       What matters is how to ensure that the positioning strategy you use can always locate the only element you want to operate in a dynamic page;
    2. Judging the success of asynchronous loading
       Note that in most cases, the possible reason for the element operation failure is the asynchronous appearance of the element "data loading, please wait...", during the operation
       Calling cy.waitLoadingMarkDisappear() before the element can be effectively resolved;
    3. Key problem solving and experience summary
       Experienced architects are required to participate in test framework design, key problem solving and experience summarization;
    4. Test case management
       Establish e2e automated test case warehouse, establish master, dev, and feature three use case library branches combined with project iteration management test cases;
       Use the test cases on the branch of the Master use case library to do the daily run regression test online environment;
       Every time the Feature branch of the project is merged with the Dev branch of the project, the test case of the Dev use case library branch is automatically triggered for regression testing;
       Add or change test cases related to this project iteration on the branch of the Feature use case library. Developers can write, debug, and execute test cases locally.
       The developer submits the project code to the Feature branch of the project, and CICD triggers the test case of the Feature use case library branch;
       Before merging the Feature branch of the project with the Dev branch of the project, do not forget to merge the Feature use case library branch into the Dev use case library branch first, otherwise it will affect the Dev environment regression test;
       After each project goes online, don't forget to merge the Dev use case library branch into the master use case library, otherwise it will affect the daily run regression test online environment;
    5. Test case management review
       After the project goes online, before the Dev use case library branch is merged into the master use case library branch, the developer should review the test cases with the architect to ensure the quality of the test cases on the master use case library;
    6. Test data management in use cases
       Keep read-only for initial test dataset, managed in cypress.env.json file;
       If the initialization data must be changed, it is necessary to restore the original value when the use case exits regardless of the success or failure of the use case execution;
       Separate management of special test data;
