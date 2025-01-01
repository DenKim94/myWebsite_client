import * as tc from './tests/testCases.js'
import {viewportSizes, genericSettings} from './tests/testParams.js'

describe("E2E Tests: Portfolio-Webseite", () => {
  beforeEach(() => {
    cy.visit(genericSettings.clientURL);
    cy.viewport(viewportSizes.width_px[0], viewportSizes.height_px[0]); // Fenstergröße des Browsers vorgeben
  });

  tc.run_test_StartSection()
});