import {tabInfos, viewportSizes, animationDurations, textContent, paths} from './testParams.js'


/** Diese Hauptfunktion führt alle E2E-Tests für den "Über mich" Abschnitt aus.
 *  Datum: 09.01.2025
 * */ 
export function run_tests(){
    context("Desktop View", () => {
        beforeEach(() => {
            // Simuliere Desktop-Ansicht
            cy.viewport(viewportSizes.laptop_14[0], viewportSizes.laptop_14[1]);
            // Klick auf den Link zum Abschnitt in der Navigationsleiste
            cy.get('.navigation-elements a[href="#about"]').click();
            cy.wait(animationDurations.DEBOUNCE_TIMEDELAY_ms);
            // Überprüfen, ob der entsprechende Abschnitt sichtbar ist
            cy.get("#about").should('be.visible'); 
        });

        run_test_VisibleElements();
        run_test_ActiveComponent();
    });

    context("Mobile View", () => {
        beforeEach(() => {
            // Simuliere Mobile-Ansicht
            cy.viewport(viewportSizes.mobile_standard[0], viewportSizes.mobile_standard[1]);
            // Öffne die Seitenleiste
            cy.get('[data-testid="nav-elements"] a.showOnMobile').click();
            // Klick auf den Link basierend auf der dynamischen ID
            cy.get('.sidebar-elements a[href="#about"]').click();
            // Schließe die Seitenleiste
            cy.get('[data-testid="close-icon"]').click();
            // Überprüfen, ob der entsprechende Abschnitt sichtbar ist
            cy.get("#about").should('be.visible');                           
        });

        run_test_VisibleElements();
        run_test_ActiveComponent();
    });
}

// Testfunktionen
function run_test_VisibleElements(){
    it("About-Seite: Alle Elemente des Abschnitts werden korrekt angezeigt", () => {
        cy.get("#about-title").should('exist')
            .and('be.visible')
            .and('contain.text', "Über mich");

        cy.get('[data-testid="tabs"]').should('be.visible');
        tabInfos.forEach((tab) => {
            cy.get('[data-testid="tabs"]').within(() => {
                cy.contains(tab.label).should('exist').and('be.visible');
            });
        });
    });
};

function run_test_ActiveComponent(){
    it("About-Seite: Aktive Komponente wird nach dem Klick auf den jeweiligen Button korrekt angezeigt", () => {
        tabInfos.forEach((tab, index) => {
            // Klicke auf den Tab mit jeweiligem Label
            cy.get(`[data-testid="tabs"] button:contains("${tab.label}")`).click();

            // Überprüfe, ob der entsprechende Tab aktiv ist
            cy.get(`[data-testid="tabs"] button:contains("${tab.label}")`)
                .should('have.class', 'active');

            // Überprüfe, ob die korrekte Komponente angezeigt wird
            cy.get('[data-testid="active-tab-content"]').within(() => {
                switch (index) {
                    case 0:
                        cy.get('[data-testid="job-content"]').should('exist').and('be.visible');
                        break;
                    case 1:
                        cy.get('[data-testid="education-content"]').should('exist').and('be.visible');
                        break;
                    case 2:
                        cy.get('[data-testid="personal-content"]').should('exist').and('be.visible');
                        break;
                    default:
                        throw new Error(`Ungültiger Tab-Index: ${index}`);
                }
            });                
        });
    });
};