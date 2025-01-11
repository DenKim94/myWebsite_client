import * as startSection from './tests/testsStartSection.js'
import * as portfolioSection from './tests/testsPortfolioSection.js'
import * as aboutSection from './tests/testsAboutSection.js'
import * as contactSection from './tests/testsContactSection.js'
import {genericSettings} from './tests/testParams.js'

describe("E2E Tests: Portfolio-Webseite", () => {
  beforeEach(() => {
    cy.visit(genericSettings.clientURL);
  });

  // startSection.run_tests();
  // portfolioSection.run_tests();
  // aboutSection.run_tests();
  contactSection.run_tests();
});