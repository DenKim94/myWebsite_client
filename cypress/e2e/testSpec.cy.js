import * as startSection from './tests/testsStartSection.js'
import {genericSettings} from './tests/testParams.js'

describe("E2E Tests: Portfolio-Webseite", () => {
  beforeEach(() => {
    cy.visit(genericSettings.clientURL);
  });

  startSection.run_tests()
});