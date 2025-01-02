import * as startSection from './tests/testsStartSection.js'
import * as portfolioSection from './tests/testsPortfolioSection.js'
import {genericSettings} from './tests/testParams.js'

describe("E2E Tests: Portfolio-Webseite", () => {
  beforeEach(() => {
    cy.visit(genericSettings.clientURL);
  });

  // startSection.run_tests();
  portfolioSection.run_tests();
});